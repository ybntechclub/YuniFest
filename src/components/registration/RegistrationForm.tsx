import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ParticipantType, EventItem } from '../../types/database';
import { EventSpecificFields } from './EventSpecificFields';
import { PaymentStep } from './PaymentStep';
import { RegistrationStep } from './RegistrationProgressBar';
import { 
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft,
  Calendar, Check, User, Phone, Mail, FileText, Building2, ShieldCheck, Gamepad2
} from 'lucide-react';

interface RegistrationFormProps {
  participantType: ParticipantType;
  events: EventItem[];
  currentStep: RegistrationStep;
  setCurrentStep: (step: RegistrationStep) => void;
  onBackToAffiliation: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  participantType, 
  events,
  currentStep,
  setCurrentStep,
  onBackToAffiliation,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedEventSlug = searchParams.get('event');

  // Filter events based on participant eligibility (Memoized to prevent infinite re-render loops)
  const eligibleEvents = useMemo(() => {
    return events.filter((e) => {
      if (!e.registration_open) return false;
      if (participantType === 'outside_student') {
        return e.eligible_participant_types === 'all' || e.eligible_participant_types === 'outside_only';
      }
      return true; // YBN students can participate in all internal & open events
    });
  }, [events, participantType]);

  // Events partitioned by festival day with strict deduplication by name/slug
  const day1Events = useMemo(() => {
    const seen = new Set<string>();
    return eligibleEvents.filter(e => {
      if (e.event_day !== 'day_1') return false;
      if (e.slug === 'poster-making') return false; // Merged into model-presentation
      const cleanName = e.name.trim().toLowerCase();
      if (seen.has(cleanName)) return false;
      seen.add(cleanName);
      return true;
    });
  }, [eligibleEvents]);

  const day2Events = useMemo(() => {
    const seen = new Set<string>();
    return eligibleEvents.filter(e => {
      if (e.event_day !== 'day_2') return false;
      const cleanName = e.name.trim().toLowerCase();
      if (seen.has(cleanName)) return false;
      seen.add(cleanName);
      return true;
    });
  }, [eligibleEvents]);

  const day3Events = useMemo(() => {
    const seen = new Set<string>();
    return eligibleEvents.filter(e => {
      if (e.event_day !== 'day_3') return false;
      const cleanName = e.name.trim().toLowerCase();
      if (seen.has(cleanName)) return false;
      seen.add(cleanName);
      return true;
    });
  }, [eligibleEvents]);

  // Multi-day Event Selections (At most 1 competition per day)
  const [day1EventId, setDay1EventId] = useState<string>('');
  const [day2EventId, setDay2EventId] = useState<string>('');
  const [day3EventId, setDay3EventId] = useState<string>('');

  // Personal & Academic credentials (Step 2)
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

  // Event specific fields & team states (Step 3)
  const [participationCategory, setParticipationCategory] = useState('Solo');
  const [teamName, setTeamName] = useState('');
  const [teamDetails, setTeamDetails] = useState('');
  const [eventSpecificData, setEventSpecificData] = useState<Record<string, any>>({
    rampWalkTheme: 'Waste to Wow (Eco / Upcycled Couture)',
    iksFormat: 'Working / Static 3D Model',
    faceArtCategory: 'Face Painting',
    squadMembers: [
      { name: '', ign: '', uid: '', role: 'Player 1 (Team Leader / Captain)' },
      { name: '', ign: '', uid: '', role: 'Player 2' },
      { name: '', ign: '', uid: '', role: 'Player 3' },
      { name: '', ign: '', uid: '', role: 'Player 4' },
    ]
  });

  // Mandatory checkboxes
  const [idCardConfirmed, setIdCardConfirmed] = useState(false);
  const [consent, setConsent] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track if initial query param preselection has already been applied once
  const hasInitializedFromUrlRef = useRef(false);

  // Auto-select event if passed in query param ONCE upon initial load
  useEffect(() => {
    if (preselectedEventSlug && !hasInitializedFromUrlRef.current && eligibleEvents.length > 0) {
      const match = eligibleEvents.find(e => 
        e.slug === preselectedEventSlug || 
        e.id === preselectedEventSlug ||
        (preselectedEventSlug === 'poster-making' && e.slug === 'model-presentation')
      );
      if (match) {
        if (match.event_day === 'day_1') setDay1EventId(match.id);
        else if (match.event_day === 'day_2') setDay2EventId(match.id);
        else if (match.event_day === 'day_3') setDay3EventId(match.id);
        else {
          if (match.slug === 'model-presentation') setDay1EventId(match.id);
          else setDay2EventId(match.id);
        }
      }
      hasInitializedFromUrlRef.current = true;
    }
  }, [preselectedEventSlug, eligibleEvents]);

  // Clean event selection handlers that isolate event fields and purge validation errors
  const handleSelectDay1 = (id: string) => {
    setDay1EventId(id);

    const nextEvent = events.find(e => e.id === id);
    if (!nextEvent) {
      setTeamName('');
      setTeamDetails('');
    } else if (nextEvent.slug === 'gaming-tournament') {
      setTeamName(eventSpecificData.gamingTeamName || '');
      const format = eventSpecificData.gamingFormat || 'squad';
      const size = format === 'duo' ? 2 : 4;
      const squad = eventSpecificData.squadMembers || [];
      const rosterStr = squad.slice(0, size)
        .map((m: any, i: number) => `${i + 1}. ${m.name || 'Member'} (IGN: ${m.ign || 'N/A'}, UID: ${m.uid || 'N/A'})`)
        .join('\n');
      setTeamDetails(rosterStr);
    } else if (nextEvent.slug === 'face-painting') {
      setTeamName('');
      setTeamDetails(eventSpecificData.modelPartnerName || '');
    } else if (nextEvent.slug === 'model-presentation' || nextEvent.slug === 'poster-making') {
      setTeamName(eventSpecificData.iksProjectTitle || '');
      setTeamDetails(eventSpecificData.iksTeamMembers || '');
    } else {
      setTeamName('');
      setTeamDetails('');
    }

    setErrors(prev => {
      const copy = { ...prev };
      delete copy.gameChoice;
      delete copy.teamName;
      delete copy.teamDetails;
      for (let i = 0; i < 4; i++) {
        delete copy[`squad_${i}_name`];
        delete copy[`squad_${i}_ign`];
        delete copy[`squad_${i}_uid`];
      }
      return copy;
    });
  };

  const handleSelectDay2 = (id: string) => {
    setDay2EventId(id);
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.teamName;
      delete copy.teamDetails;
      return copy;
    });
  };

  const handleSelectDay3 = (id: string) => {
    setDay3EventId(id);
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.rampWalkTheme;
      return copy;
    });
  };

  // Selected event objects
  const selectedDay1Event = events.find(e => e.id === day1EventId);
  const selectedDay2Event = events.find(e => e.id === day2EventId);
  const selectedDay3Event = events.find(e => e.id === day3EventId);

  // Count how many events are chosen
  const selectedCount = [day1EventId, day2EventId, day3EventId].filter(Boolean).length;

  // Validate Step 2 (Delegate Profile)
  const validateStep2 = (): boolean => {
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
      errs.studentIdNumber = participantType === 'ybn_student' 
        ? "University roll / ID number is required." 
        : "College student ID number is required.";
    }

    if (!course.trim()) errs.course = "Course or degree name is required.";

    if (participantType === 'ybn_student') {
      if (!department.trim()) errs.department = "Department / Faculty is required.";
    } else {
      if (!institutionName.trim()) errs.institutionName = "College / University name is required.";
      if (!institutionLocation.trim()) errs.institutionLocation = "College city and state is required.";
    }

    if (!idCardConfirmed) {
      errs.idCardConfirmed = "You must confirm carrying your physical College/University ID card.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 3 (3-Day Event Selection)
  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};

    // Check Day 1 Event Validations
    if (selectedDay1Event) {
      if (selectedDay1Event.slug === 'gaming-tournament') {
        if (!eventSpecificData.gameChoice) errs.gameChoice = "Please select BGMI or Free Fire Max.";
        if (!teamName.trim()) errs.teamName = "Official Squad / Clan name is required.";
        
        // Validate squad members depending on team choice (Duo = 2 players, Squad = 4 players)
        const format = eventSpecificData.gamingFormat || 'squad';
        const requiredCount = format === 'duo' ? 2 : 4;
        const squad = eventSpecificData.squadMembers || [];
        
        for (let i = 0; i < requiredCount; i++) {
          const m = squad[i] || {};
          if (!m.name || !m.name.trim()) errs[`squad_${i}_name`] = `Player ${i + 1} name is required.`;
          if (!m.ign || !m.ign.trim()) errs[`squad_${i}_ign`] = `Player ${i + 1} IGN is required.`;
          if (!m.uid || !m.uid.trim()) errs[`squad_${i}_uid`] = `Player ${i + 1} UID is required.`;
        }
      }

      if (selectedDay1Event.slug === 'model-presentation' || selectedDay1Event.slug === 'poster-making') {
        const title = eventSpecificData.iksProjectTitle || teamName;
        if (!title.trim()) errs.teamName = "Project or Poster title is required.";
      }

      if (selectedDay1Event.slug === 'face-painting') {
        const partner = eventSpecificData.modelPartnerName || teamDetails;
        if (!partner.trim()) errs.teamDetails = "Model / Canvas partner's name is required.";
      }
    }

    // Check Day 2 Event Validations
    if (selectedDay2Event) {
      if (selectedDay2Event.slug === 'dance-competition' && (participationCategory === 'Duo' || participationCategory === 'Group')) {
        if (!teamName.trim()) errs.teamName = "Crew / Group name is required.";
        if (!teamDetails.trim()) errs.teamDetails = "Please specify member names with IDs.";
      }

      if (selectedDay2Event.slug === 'singing-competition' && participationCategory === 'Duo') {
        if (!teamDetails.trim()) errs.teamDetails = "Please provide partner's name and ID number.";
      }

      if (selectedDay2Event.slug === 'treasure-hunting') {
        if (!teamName.trim()) errs.teamName = "Treasure hunting team name is required.";
        if (!teamDetails.trim()) errs.teamDetails = "Team member names and student IDs are required.";
      }
    }

    // Check Day 3 Event Validations
    if (selectedDay3Event) {
      if (selectedDay3Event.slug === 'ramp-walk-fashion-show') {
        if (!eventSpecificData.rampWalkTheme) {
          errs.rampWalkTheme = "Please select either 'Waste to Wow' or 'Divas and Beasts'.";
        }
      }
    }

    if (!consent) {
      errs.consent = "Consent to festival rules and data processing is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToEvents = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }
    setErrors({});
    setCurrentStep(3);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }
    setErrors({});
    setCurrentStep(4);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const feeAmount = participantType === 'ybn_student' ? 399 : 499;

  // Build composite event summary
  const selectedDayNames: string[] = [];
  if (selectedDay1Event) selectedDayNames.push(`Day 1: ${selectedDay1Event.name}`);
  if (selectedDay2Event) selectedDayNames.push(`Day 2: ${selectedDay2Event.name}`);
  if (selectedDay3Event) selectedDayNames.push(`Day 3: ${selectedDay3Event.name}`);
  if (selectedDayNames.length === 0) selectedDayNames.push('YUNIFEST 2026 Three-Day Pass');

  const compositeEvent: EventItem = {
    id: selectedDay1Event?.id || selectedDay2Event?.id || selectedDay3Event?.id || 'fest-3day-pass',
    slug: selectedDay1Event?.slug || selectedDay2Event?.slug || selectedDay3Event?.slug || 'fest-pass',
    name: selectedDayNames.join(' • '),
    description: 'Unified Three-Day Festival Pass with access to competitions and cultural nights.',
    category: 'cultural',
    event_day: 'tbd',
    timing_display: 'Dec 10, 11 & 12, 2026',
    venue: 'YBN University Main Campus, Ranchi',
    registration_open: true,
    eligible_participant_types: participantType === 'ybn_student' ? 'ybn_only' : 'all',
    capacity: null,
    capacity_unit: 'participants',
    rules: [],
    student_coordinator: 'Aryan Sharma & Megha Kumari',
    faculty_coordinator: 'Dr. Asha Puran Mam & Namrata Mam',
    icon_name: selectedDay1Event?.icon_name || 'Sparkles',
  };

  // STEP 4: PASS ISSUANCE & PAYMENT
  if (currentStep === 4) {
    return (
      <PaymentStep
        participantType={participantType}
        selectedEvent={compositeEvent}
        formData={{
          fullName,
          email,
          mobile: mobile.replace(/\D/g, '').slice(0, 10),
          institutionName: participantType === 'ybn_student' ? "YBN University, Ranchi" : institutionName.trim(),
          institutionLocation: participantType === 'outside_student' ? institutionLocation.trim() : "Ranchi, Jharkhand",
          department: participantType === 'ybn_student' ? department.trim() : undefined,
          course: course.trim(),
          academicYear,
          semester: participantType === 'ybn_student' ? semester : undefined,
          studentIdNumber: studentIdNumber.trim(),
          idCardConfirmed,
          teamName: teamName.trim() || undefined,
          teamDetails: teamDetails.trim() || undefined,
          participationCategory: selectedDay1Event?.slug === 'gaming-tournament'
            ? (eventSpecificData.gamingFormat === 'duo' ? 'Duo' : 'Squad')
            : participationCategory,
          eventSpecificData: {
            ...eventSpecificData,
            gamingFormat: eventSpecificData.gamingFormat || 'squad',
            squadMembers: selectedDay1Event?.slug === 'gaming-tournament'
              ? (eventSpecificData.squadMembers || []).slice(0, eventSpecificData.gamingFormat === 'duo' ? 2 : 4)
              : eventSpecificData.squadMembers,
            selectedEventsByDay: {
              day_1: selectedDay1Event ? { id: selectedDay1Event.id, name: selectedDay1Event.name, slug: selectedDay1Event.slug } : null,
              day_2: selectedDay2Event ? { id: selectedDay2Event.id, name: selectedDay2Event.name, slug: selectedDay2Event.slug } : null,
              day_3: selectedDay3Event ? { id: selectedDay3Event.id, name: selectedDay3Event.name, slug: selectedDay3Event.slug } : null,
            }
          },
          consent,
        }}
        onBack={() => {
          setCurrentStep(3);
          window.scrollTo({ top: 250, behavior: 'smooth' });
        }}
        onSuccess={(record, localPreviewUrl) => {
          navigate('/register/success', { 
            state: { 
              registration: record,
              localScreenshotUrl: localPreviewUrl 
            } 
          });
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-[32px] border-[1.5px] border-slate-900 bg-white p-6 sm:p-12 shadow-solid-pop text-slate-950">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b-[1.5px] border-slate-900/10 gap-3">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#2B59FF]">
            {currentStep === 2 ? '[ STEP 02 // DELEGATE PROFILE ]' : '[ STEP 03 // 3-DAY EVENT SELECTION ]'}
          </span>
          <h3 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 mt-1">
            {currentStep === 2 
              ? (participantType === 'ybn_student' ? "YBN Student Credentials" : "Visiting Delegate Profile")
              : "Select 3-Day Festival Competitions"
            }
          </h3>
          <p className="font-mono text-xs text-slate-600 mt-1">
            FESTIVAL ENTRY FEE: <strong className="text-slate-950 bg-[#FEF08A] px-2 py-0.5 rounded border border-slate-900">₹{feeAmount}</strong> • PAY ONCE • ALL 3 DAYS
          </p>
        </div>

        {currentStep === 2 && (
          <button
            type="button"
            onClick={onBackToAffiliation}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-950 px-3 py-1.5 rounded-xl bg-[#F6F7F9] border border-slate-300 self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch Affiliation</span>
          </button>
        )}

        {currentStep === 3 && (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-950 px-3 py-1.5 rounded-xl bg-[#F6F7F9] border border-slate-300 self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {submitError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border-[1.5px] border-red-500 text-red-900 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Validation Alert:</span>
            <span>{submitError}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: PARTICIPANT IDENTITY CREDENTIALS & INSTITUTIONAL PROFILE */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <form onSubmit={handleNextToEvents} className="space-y-6">
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase font-bold tracking-wider text-slate-900 flex items-center justify-between">
              <span>1. PARTICIPANT IDENTITY CREDENTIALS</span>
              <span className="text-[11px] text-slate-500 font-normal">Physical ID Required at Campus Gates</span>
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-mono text-xs uppercase text-slate-600 font-bold">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <span className={`font-mono text-[10px] ${mobile.replace(/\D/g, '').length === 10 ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {mobile.replace(/\D/g, '').length}/10 digits
                  </span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] font-mono text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
                />
                {errors.mobile && <p className="font-mono text-xs text-red-600 mt-1">{errors.mobile}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Institutional Credentials */}
          <div className="space-y-4 pt-6 border-t-[1.5px] border-slate-900/10">
            <div className="font-mono text-xs uppercase font-bold tracking-wider text-slate-900">
              2. INSTITUTIONAL &amp; ACADEMIC DATA
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
                    placeholder="e.g. BIT Mesra / Ranchi University / St. Xavier's"
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
                  placeholder="e.g. Faculty of Engineering / Science / Agriculture / Pharmacy"
                  className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
                />
                {errors.department && <p className="font-mono text-xs text-red-600 mt-1">{errors.department}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase text-slate-600 mb-1 font-bold">
                  Degree / Course <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. B.Tech / BCA / B.Sc / MBA"
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
            </div>
          </div>

          {/* Mandatory Physical ID Card Check */}
          <div className="pt-6 border-t-[1.5px] border-slate-900/10">
            <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#FEF08A]/30 border-[1.5px] border-slate-900 cursor-pointer hover:bg-[#FEF08A]/40 transition-colors">
              <input
                type="checkbox"
                checked={idCardConfirmed}
                onChange={(e) => setIdCardConfirmed(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-slate-900 text-[#2B59FF] focus:ring-[#2B59FF] cursor-pointer"
              />
              <span className="font-display text-xs text-slate-900 leading-relaxed font-bold">
                I solemnly confirm that I will carry my original, physical College/University ID card to YUNIFEST 2026. Entry will be denied at campus gates without physical verification. <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.idCardConfirmed && (
              <p className="font-mono text-xs text-red-600 mt-1 font-bold">{errors.idCardConfirmed}</p>
            )}
          </div>

          {/* Next Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="btn-voltage w-full sm:w-auto px-8 py-3.5 text-xs justify-center font-bold"
            >
              <span>NEXT: CHOOSE 3-DAY FESTIVAL EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: 3-DAY FESTIVAL EVENT SELECTION (SINGLE COMPETITION PER DAY) */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <form onSubmit={handleNextToPayment} className="space-y-8 animate-fadeIn">
          
          {/* Instructions Banner */}
          <div className="p-4 rounded-2xl bg-[#E0E7FF]/60 border-[1.5px] border-slate-900 space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#2B59FF]">
              <Sparkles className="w-4 h-4" />
              <span>3-DAY FESTIVAL EVENT REGULATION</span>
            </div>
            <p className="font-display text-xs text-slate-800 leading-relaxed">
              <strong>Single Competition Per Day:</strong> To avoid schedule conflicts across stages, you can select at most <strong>one competition per day</strong> (or general delegate access). Your one-time pass fee covers entry to all three days!
            </p>
          </div>

          {/* ---------------- DAY 1 SELECTION ---------------- */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase font-black text-slate-500 block">
                  DAY 01 // DECEMBER 10, 2026
                </span>
                <h4 className="font-headline font-black text-lg text-slate-950 uppercase mt-0.5">
                  Technical &amp; Innovation Day
                </h4>
              </div>
              <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                MAX 1 EVENT
              </span>
            </div>

            {/* Visual Interactive Option Cards for Day 1 */}
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase font-bold text-slate-800">
                Select Day 1 Competition (Tap to choose or switch):
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Option: None */}
                <button
                  type="button"
                  onClick={() => handleSelectDay1('')}
                  className={`p-3.5 rounded-xl border-[1.5px] text-left transition-all flex items-center justify-between ${
                    day1EventId === ''
                      ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
                  }`}
                >
                  <div>
                    <span className="font-headline font-bold text-xs block">None / General Delegate</span>
                    <span className={`text-[10px] font-mono ${day1EventId === '' ? 'text-slate-400' : 'text-slate-500'}`}>
                      No competition • Campus access
                    </span>
                  </div>
                  {day1EventId === '' && <Check className="w-4 h-4 text-[#CCFF00] shrink-0" />}
                </button>

                {/* Day 1 Competition Cards */}
                {day1Events.map((evt) => {
                  const isSelected = day1EventId === evt.id;
                  return (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => handleSelectDay1(evt.id)}
                      className={`p-3.5 rounded-xl border-[1.5px] text-left transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] font-mono uppercase font-black px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-[#CCFF00] text-black' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {evt.category}
                          </span>
                          {evt.capacity && (
                            <span className={`text-[9px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                              [{evt.capacity} {evt.capacity_unit}]
                            </span>
                          )}
                        </div>
                        <span className="font-headline font-bold text-xs block leading-snug">
                          {evt.name}
                        </span>
                        <span className={`text-[10px] font-mono block mt-1 truncate ${
                          isSelected ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {evt.venue}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#CCFF00] shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dropdown Alternative */}
            <div>
              <span className="font-mono text-[10px] text-slate-500 block mb-1">
                Or select from dropdown:
              </span>
              <select
                value={day1EventId}
                onChange={(e) => handleSelectDay1(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs font-bold text-slate-950 focus:outline-none"
              >
                <option value="">None / General Delegate Attendance (No Day 1 Competition)</option>
                {day1Events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.name} — {evt.venue}
                    {evt.capacity ? ` [Slots: ${evt.capacity} ${evt.capacity_unit}]` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Event Details for Day 1 */}
            {selectedDay1Event && (
              <div className="pt-2">
                <EventSpecificFields
                  event={selectedDay1Event}
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
              </div>
            )}
          </div>

          {/* ---------------- DAY 2 SELECTION ---------------- */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase font-black text-slate-500 block">
                  DAY 02 // DECEMBER 11, 2026
                </span>
                <h4 className="font-headline font-black text-lg text-slate-950 uppercase mt-0.5">
                  Cultural Showcase &amp; Showdowns
                </h4>
              </div>
              <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                MAX 1 EVENT
              </span>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-slate-800 mb-1.5">
                Select Day 2 Competition / Showcase:
              </label>
              <select
                value={day2EventId}
                onChange={(e) => handleSelectDay2(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
              >
                <option value="">None / General Delegate Attendance (No Day 2 Competition)</option>
                {day2Events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.name} — {evt.venue}
                    {evt.capacity ? ` [Cap: ${evt.capacity} ${evt.capacity_unit}]` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Event Details for Day 2 */}
            {selectedDay2Event && (
              <div className="pt-2">
                <EventSpecificFields
                  event={selectedDay2Event}
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
              </div>
            )}
          </div>

          {/* ---------------- DAY 3 SELECTION ---------------- */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase font-black text-slate-500 block">
                  DAY 03 // DECEMBER 12, 2026
                </span>
                <h4 className="font-headline font-black text-lg text-slate-950 uppercase mt-0.5">
                  Grand Runway &amp; EDM DJ Concert
                </h4>
              </div>
              <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                MAX 1 EVENT
              </span>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-slate-800 mb-1.5">
                Select Day 3 Competition / Showcase:
              </label>
              <select
                value={day3EventId}
                onChange={(e) => handleSelectDay3(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
              >
                <option value="">None / General Delegate Attendance (Audience for Runway &amp; EDM Night)</option>
                {day3Events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.name} — {evt.venue}
                    {evt.capacity === null ? ' [Unlimited Seats]' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Event Details for Day 3 */}
            {selectedDay3Event && (
              <div className="pt-2">
                <EventSpecificFields
                  event={selectedDay3Event}
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
              </div>
            )}
          </div>

          {/* Lineup Summary Card */}
          <div className="p-5 rounded-2xl bg-white border-[1.5px] border-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-black text-[#2B59FF]">
                YOUR 3-DAY FESTIVAL SCHEDULE SUMMARY
              </span>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-300">
                1 PASS • ALL 3 DAYS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-[#F6F7F9] border border-slate-200">
                <strong className="text-slate-500 block text-[10px]">DAY 1 (DEC 10)</strong>
                <span className="font-bold text-slate-950">{selectedDay1Event ? selectedDay1Event.name : 'General Delegate'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F6F7F9] border border-slate-200">
                <strong className="text-slate-500 block text-[10px]">DAY 2 (DEC 11)</strong>
                <span className="font-bold text-slate-950">{selectedDay2Event ? selectedDay2Event.name : 'General Delegate'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F6F7F9] border border-slate-200">
                <strong className="text-slate-500 block text-[10px]">DAY 3 (DEC 12)</strong>
                <span className="font-bold text-slate-950">{selectedDay3Event ? selectedDay3Event.name : 'Runway Audience & DJ Night'}</span>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300 cursor-pointer hover:border-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-slate-900 text-[#2B59FF] focus:ring-[#2B59FF] cursor-pointer"
              />
              <span className="font-display text-xs text-slate-800 leading-relaxed font-bold">
                I agree to the official YUNIFEST 2026 rules, disciplinary guidelines, and data consent policy. I understand that the registration pass is non-transferable. <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="font-mono text-xs text-red-600 mt-1 font-bold">{errors.consent}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-slate-950 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO PROFILE</span>
            </button>

            <button
              type="submit"
              className="btn-voltage py-3.5 px-8 text-xs w-full sm:w-auto justify-center font-bold"
            >
              <span>PROCEED TO PASS &amp; PAYMENT (₹{feeAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
