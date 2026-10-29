import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ParticipantType, EventItem } from '../../types/database';
import { registrationStore } from '../../lib/registrationStore';
import { EventSpecificFields } from './EventSpecificFields';
import { 
  Sparkles, ShieldAlert, CheckCircle2, AlertCircle, ArrowRight, 
  Loader2, Building2, GraduationCap, Calendar, User, Phone, Mail, FileText
} from 'lucide-react';

interface RegistrationFormProps {
  participantType: ParticipantType;
  events: EventItem[];
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ participantType, events }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedEventSlug = searchParams.get('event');

  // Filter events based on participant eligibility
  const eligibleEvents = events.filter((e) => {
    if (!e.registration_open) return false;
    if (participantType === 'outside_student') {
      return e.eligible_participant_types === 'all' || e.eligible_participant_types === 'outside_only';
    }
    return true; // YBN students can participate in all internal & open events
  });

  // State management
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  
  // YBN specific
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [academicYear, setAcademicYear] = useState('1st Year');
  const [semester, setSemester] = useState('1st Semester');
  
  // Outside college specific
  const [institutionName, setInstitutionName] = useState('');
  const [institutionLocation, setInstitutionLocation] = useState('');

  // Event specific
  const [participationCategory, setParticipationCategory] = useState('Solo');
  const [teamName, setTeamName] = useState('');
  const [teamDetails, setTeamDetails] = useState('');
  const [eventSpecificData, setEventSpecificData] = useState<Record<string, any>>({});

  // Mandatory checkboxes
  const [idCardConfirmed, setIdCardConfirmed] = useState(false);
  const [consent, setConsent] = useState(false);

  // Submission state & validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-select event if passed in query param
  useEffect(() => {
    if (preselectedEventSlug) {
      const match = eligibleEvents.find(e => e.slug === preselectedEventSlug || e.id === preselectedEventSlug);
      if (match) {
        setSelectedEventId(match.id);
      }
    } else if (eligibleEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(eligibleEvents[0].id);
    }
  }, [preselectedEventSlug, eligibleEvents]);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  // Form Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = "Full legal name is required.";
    
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!mobile.trim()) {
      errs.mobile = "Mobile number is required.";
    } else if (!/^[0-9]{10}$/.test(mobile.replace(/\D/g, ''))) {
      errs.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!studentIdNumber.trim()) {
      errs.studentIdNumber = participantType === 'ybn_student' ? "University roll / ID number is required." : "College student ID number is required.";
    }

    if (!course.trim()) errs.course = "Course or degree name is required.";

    if (participantType === 'ybn_student') {
      if (!department.trim()) errs.department = "Department / Faculty is required.";
    } else {
      if (!institutionName.trim()) errs.institutionName = "College / University name is required.";
      if (!institutionLocation.trim()) errs.institutionLocation = "College city and state is required.";
    }

    if (!selectedEventId) {
      errs.selectedEventId = "Please select an event to register for.";
    }

    // Event specific validations
    if (selectedEvent) {
      if (selectedEvent.slug === 'gaming-tournament') {
        if (!eventSpecificData.gameChoice) errs.gameChoice = "Please choose BGMI or Free Fire.";
        if (!eventSpecificData.gameIgn) errs.gameIgn = "In-game name (IGN) is required.";
        if (!eventSpecificData.gameId) errs.gameId = "Player ID number is required.";
      }

      if (selectedEvent.slug === 'dance-competition') {
        if (participationCategory === 'Duo' || participationCategory === 'Group') {
          if (!teamName.trim()) errs.teamName = "Team/Crew name is required.";
          if (!teamDetails.trim()) errs.teamDetails = "Please specify team members with ID numbers.";
        }
      }

      if (selectedEvent.slug === 'singing-competition' && participationCategory === 'Duo') {
        if (!teamDetails.trim()) errs.teamDetails = "Please provide partner's name and ID number.";
      }

      if (selectedEvent.slug === 'treasure-hunting') {
        if (!teamName.trim()) errs.teamName = "Team name is required.";
        if (!teamDetails.trim()) errs.teamDetails = "Team member names and student IDs are required.";
      }

      if (selectedEvent.slug === 'model-presentation') {
        if (!teamName.trim()) errs.teamName = "Model / Project title is required.";
      }
    }

    if (!idCardConfirmed) {
      errs.idCardConfirmed = "You must confirm carrying a valid physical ID card.";
    }

    if (!consent) {
      errs.consent = "Consent to data processing is required for registration.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registrationStore.submitRegistration({
        event_id: selectedEventId,
        participant_type: participantType,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        institution_name: participantType === 'ybn_student' ? "YBN University, Ranchi" : institutionName.trim(),
        institution_location: participantType === 'outside_student' ? institutionLocation.trim() : "Ranchi, Jharkhand",
        department: participantType === 'ybn_student' ? department.trim() : undefined,
        course: course.trim(),
        academic_year: academicYear,
        semester: participantType === 'ybn_student' ? semester : undefined,
        student_id_number: studentIdNumber.trim(),
        id_card_confirmed: idCardConfirmed,
        participation_category: participationCategory,
        team_name: teamName.trim() || undefined,
        team_details: teamDetails.trim() || undefined,
        event_specific_data: eventSpecificData,
        consent: consent,
      });

      if (!result.success || !result.data) {
        setSubmitError(result.error || "Failed to process registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      navigate('/register/success', { state: { registration: result.data } });
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-[32px] border-[1.5px] border-slate-900 bg-white p-8 sm:p-12 shadow-solid-pop text-slate-950">
      
      {/* Banner */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b-[1.5px] border-slate-900/10">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#2B59FF]">
            [ STEP 02 // ADMISSION FORM ]
          </span>
          <h3 className="font-headline font-black text-2xl text-slate-950 mt-1">
            {participantType === 'ybn_student' ? "YBN University Student Form" : "Visiting Delegate Registration"}
          </h3>
          <p className="font-mono text-xs text-slate-600 mt-1">
            FEE: <strong className="text-slate-950 bg-[#FEF08A] px-2 py-0.5 rounded border border-slate-900">₹0 (FREE ENTRY)</strong> • SINGLE PASS ENTRY
          </p>
        </div>
      </div>

      {submitError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border-[1.5px] border-red-500 text-red-900 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Registration Blocked:</span>
            <span>{submitError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Event Selection */}
        <div className="space-y-2">
          <label className="block font-mono text-xs uppercase font-bold tracking-wider text-slate-900">
            1. SELECT COMPETITION / EVENT <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-sm text-slate-950 font-bold focus:outline-none"
          >
            {eligibleEvents.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name} — ({evt.event_day === 'tbd' ? 'Date TBA' : evt.event_day.replace('_', ' ').toUpperCase()})
                {evt.capacity ? ` [Slots: ${evt.capacity} ${evt.capacity_unit}]` : ''}
              </option>
            ))}
          </select>
          {errors.selectedEventId && <p className="font-mono text-xs text-red-600">{errors.selectedEventId}</p>}

          {selectedEvent && (
            <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300 font-mono text-xs text-slate-700 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Coordinators:</span>
                <span className="text-slate-950 font-bold">
                  {selectedEvent.student_coordinator} (Student) • {selectedEvent.faculty_coordinator} (Faculty)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Timing &amp; Venue:</span>
                <span className="text-[#2B59FF] font-bold">
                  {selectedEvent.timing_display} • {selectedEvent.venue}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Event Specific Fields */}
        {selectedEvent && (
          <EventSpecificFields
            event={selectedEvent}
            participationCategory={participationCategory}
            setParticipationCategory={setParticipationCategory}
            teamName={teamName}
            setTeamName={setTeamName}
            teamDetails={teamDetails}
            setTeamDetails={setTeamDetails}
            eventSpecificData={eventSpecificData}
            setEventSpecificData={setEventSpecificData}
            errors={errors}
          />
        )}

        {/* Section 2: Personal Identification */}
        <div className="space-y-4 pt-6 border-t-[1.5px] border-slate-900/10">
          <div className="font-mono text-xs uppercase font-bold tracking-wider text-slate-900">
            2. PARTICIPANT IDENTITY CREDENTIALS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As printed on student ID"
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
              {errors.fullName && <p className="font-mono text-xs text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Student ID / Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={studentIdNumber}
                onChange={(e) => setStudentIdNumber(e.target.value)}
                placeholder={participantType === 'ybn_student' ? "e.g. YBN/2023/BT-042" : "e.g. BIT/2024/091"}
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] font-mono text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
              />
              {errors.studentIdNumber && <p className="font-mono text-xs text-red-600 mt-1">{errors.studentIdNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="For digital pass delivery"
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
              {errors.email && <p className="font-mono text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] font-mono text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
              />
              {errors.mobile && <p className="font-mono text-xs text-red-600 mt-1">{errors.mobile}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Institutional Details */}
        <div className="space-y-4 pt-6 border-t-[1.5px] border-slate-900/10">
          <div className="font-mono text-xs uppercase font-bold tracking-wider text-slate-900">
            3. INSTITUTIONAL &amp; ACADEMIC DATA
          </div>

          {participantType === 'outside_student' ? (
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                  College / University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="e.g. Ranchi University / BIT Mesra"
                  className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
                />
                {errors.institutionName && <p className="font-mono text-xs text-red-600 mt-1">{errors.institutionName}</p>}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                  College City &amp; State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={institutionLocation}
                  onChange={(e) => setInstitutionLocation(e.target.value)}
                  placeholder="e.g. Ranchi, Jharkhand"
                  className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
                />
                {errors.institutionLocation && <p className="font-mono text-xs text-red-600 mt-1">{errors.institutionLocation}</p>}
              </div>
            </div>
          ) : (
            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                YBN Department / Faculty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Faculty of Engineering / Agriculture / Science"
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
              {errors.department && <p className="font-mono text-xs text-red-600 mt-1">{errors.department}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Degree / Course <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. B.Tech / BCA"
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
              {errors.course && <p className="font-mono text-xs text-red-600 mt-1">{errors.course}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                Semester (Optional)
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. 5th Sem"
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Mandatory Acknowledgements */}
        <div className="space-y-3 pt-6 border-t-[1.5px] border-slate-900/10">
          <div className="p-5 rounded-2xl bg-[#FEF08A]/40 border-[1.5px] border-slate-900 space-y-3">
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={idCardConfirmed}
                onChange={(e) => setIdCardConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-900 text-slate-950 focus:ring-slate-950"
              />
              <span className="font-display text-xs text-slate-900 leading-relaxed font-medium">
                <strong className="text-slate-950 font-bold">MANDATORY ID CONFIRMATION:</strong> I confirm that I will carry my original, valid physical College/University ID card during campus entry and competition verification. I understand entry without a physical ID is strictly prohibited. <span className="text-red-600 font-bold">*</span>
              </span>
            </label>
            {errors.idCardConfirmed && <p className="font-mono text-xs text-red-600 pl-7">{errors.idCardConfirmed}</p>}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-900 text-slate-950 focus:ring-slate-950"
              />
              <span className="font-display text-xs text-slate-700 leading-relaxed">
                I consent to the processing of my registration details strictly for organizing YUNIFEST 2026. <span className="text-red-600 font-bold">*</span>
              </span>
            </label>
            {errors.consent && <p className="font-mono text-xs text-red-600 pl-7">{errors.consent}</p>}

          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-voltage w-full py-4 text-sm font-black flex items-center justify-center gap-3 disabled:opacity-60 shadow-solid-pop hover:shadow-solid-pop-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>GENERATING DIGITAL BADGE...</span>
              </>
            ) : (
              <>
                <span>COMPLETE REGISTRATION &amp; ISSUE PASS (₹0)</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="font-mono text-center text-[10px] text-slate-500 mt-2.5 uppercase tracking-wider font-bold">
            ZERO ENTRY CHARGES • INSTANT SCANNABLE DIGITAL BADGE
          </p>
        </div>

      </form>
    </div>
  );
};
