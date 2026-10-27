import React from 'react';
import { EventItem } from '../../types/database';
import { Gamepad2, Users, Music, Flame, Sparkles } from 'lucide-react';

interface EventSpecificFieldsProps {
  event: EventItem;
  participationCategory: string;
  setParticipationCategory: (val: string) => void;
  teamName: string;
  setTeamName: (val: string) => void;
  teamDetails: string;
  setTeamDetails: (val: string) => void;
  eventSpecificData: Record<string, any>;
  setEventSpecificData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  errors: Record<string, string>;
}

export const EventSpecificFields: React.FC<EventSpecificFieldsProps> = ({
  event,
  participationCategory,
  setParticipationCategory,
  teamName,
  setTeamName,
  teamDetails,
  setTeamDetails,
  eventSpecificData,
  setEventSpecificData,
  errors
}) => {
  const slug = event.slug;

  // 1. DANCE COMPETITION
  if (slug === 'dance-competition') {
    return (
      <div className="p-5 rounded-xl bg-[#07152F] border border-pink-500/30 space-y-4">
        <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
          <Music className="w-4 h-4" />
          <span>Dance Competition Format</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Performance Category <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Solo', 'Duo', 'Group'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setParticipationCategory(cat)}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  participationCategory === cat
                    ? 'bg-pink-500 text-white border-pink-400 shadow-sm'
                    : 'bg-[#0D2345] text-slate-300 border-slate-700 hover:border-pink-500/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {errors.participationCategory && (
            <p className="text-xs text-red-400 mt-1">{errors.participationCategory}</p>
          )}
        </div>

        {(participationCategory === 'Duo' || participationCategory === 'Group') && (
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Group / Crew Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Rhythm Shockers"
                className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-pink-400 text-xs sm:text-sm text-white focus:outline-none"
              />
              {errors.teamName && <p className="text-xs text-red-400 mt-1">{errors.teamName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Team Member Names & Student IDs <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                value={teamDetails}
                onChange={(e) => setTeamDetails(e.target.value)}
                placeholder="List full name and ID card numbers of all team members..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-pink-400 text-xs sm:text-sm text-white focus:outline-none resize-none"
              />
              {errors.teamDetails && <p className="text-xs text-red-400 mt-1">{errors.teamDetails}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SINGING COMPETITION
  if (slug === 'singing-competition') {
    return (
      <div className="p-5 rounded-xl bg-[#07152F] border border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Music className="w-4 h-4" />
          <span>Singing Competition Format</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Participation Category <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Solo', 'Duo'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setParticipationCategory(cat)}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  participationCategory === cat
                    ? 'bg-cyan-500 text-[#07152F] border-cyan-400 shadow-sm'
                    : 'bg-[#0D2345] text-slate-300 border-slate-700 hover:border-cyan-500/40'
                }`}
              >
                {cat} Vocal
              </button>
            ))}
          </div>
        </div>

        {participationCategory === 'Duo' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Co-Singer Name & Student ID Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={teamDetails}
              onChange={(e) => setTeamDetails(e.target.value)}
              placeholder="e.g. Rahul Mishra (Roll: 2024/048)"
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-cyan-400 text-xs sm:text-sm text-white focus:outline-none"
            />
            {errors.teamDetails && <p className="text-xs text-red-400 mt-1">{errors.teamDetails}</p>}
          </div>
        )}
      </div>
    );
  }

  // 3. GAMING TOURNAMENT (BGMI or FREE FIRE)
  if (slug === 'gaming-tournament') {
    return (
      <div className="p-5 rounded-xl bg-[#07152F] border border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>Esports Battle Royale Details</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Select Game Title <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Battlegrounds Mobile India (BGMI)', 'Free Fire Max'].map((title) => {
              const short = title.includes('BGMI') ? 'BGMI' : 'Free Fire';
              return (
                <button
                  key={short}
                  type="button"
                  onClick={() => setEventSpecificData(prev => ({ ...prev, gameChoice: short }))}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all text-center ${
                    eventSpecificData.gameChoice === short
                      ? 'bg-cyan-500 text-[#07152F] border-cyan-400 shadow-sm'
                      : 'bg-[#0D2345] text-slate-300 border-slate-700 hover:border-cyan-500/40'
                  }`}
                >
                  {short}
                </button>
              );
            })}
          </div>
          {errors.gameChoice && <p className="text-xs text-red-400 mt-1">{errors.gameChoice}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              In-Game Name (IGN) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={eventSpecificData.gameIgn || ''}
              onChange={(e) => setEventSpecificData(prev => ({ ...prev, gameIgn: e.target.value }))}
              placeholder="e.g. Soul_Mortal99"
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-cyan-400 text-xs sm:text-sm text-white focus:outline-none"
            />
            {errors.gameIgn && <p className="text-xs text-red-400 mt-1">{errors.gameIgn}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Character / Player ID Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={eventSpecificData.gameId || ''}
              onChange={(e) => setEventSpecificData(prev => ({ ...prev, gameId: e.target.value }))}
              placeholder="e.g. 5182947192"
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-cyan-400 text-xs sm:text-sm text-white focus:outline-none"
            />
            {errors.gameId && <p className="text-xs text-red-400 mt-1">{errors.gameId}</p>}
          </div>
        </div>
      </div>
    );
  }

  // 4. TREASURE HUNTING (Cap: 25)
  if (slug === 'treasure-hunting') {
    return (
      <div className="p-5 rounded-xl bg-[#07152F] border border-[#F5C451]/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#F5C451] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>Treasure Hunt Team Profile</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
            Strict Cap: 25 Teams
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Team Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. The Campus Trackers"
            className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none"
          />
          {errors.teamName && <p className="text-xs text-red-400 mt-1">{errors.teamName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Team Members (Leader + up to 3 members) with Student IDs <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={3}
            value={teamDetails}
            onChange={(e) => setTeamDetails(e.target.value)}
            placeholder="1. Leader (You)&#10;2. Member 2 (ID: XYZ)&#10;3. Member 3 (ID: ABC)&#10;4. Member 4 (ID: 123)"
            className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none resize-none"
          />
          {errors.teamDetails && <p className="text-xs text-red-400 mt-1">{errors.teamDetails}</p>}
        </div>
      </div>
    );
  }

  // 5. MIMICRY OR STAND-UP COMEDY
  if (slug === 'mimicry-competition' || slug === 'stand-up-comedy') {
    return (
      <div className="p-5 rounded-xl bg-[#07152F] border border-slate-700 space-y-3">
        <label className="block text-xs font-semibold text-slate-300">
          Brief Performance Concept or Preferred Language (Optional)
        </label>
        <input
          type="text"
          value={eventSpecificData.notes || ''}
          onChange={(e) => setEventSpecificData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="e.g. Political satire / Bollywood mimicry (Hindi)"
          className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none"
        />
      </div>
    );
  }

  // 6. MODEL PRESENTATION
  if (slug === 'model-presentation') {
    return (
      <div className="p-5 rounded-xl bg-[#07152F] border border-slate-700 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Working Model / Project Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. IoT Smart Irrigation Telemetry"
            className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none"
          />
          {errors.teamName && <p className="text-xs text-red-400 mt-1">{errors.teamName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Project Co-Authors / Teammates (if any)
          </label>
          <textarea
            rows={2}
            value={teamDetails}
            onChange={(e) => setTeamDetails(e.target.value)}
            placeholder="Names and roll numbers of contributing team members..."
            className="w-full px-3.5 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none resize-none"
          />
        </div>
      </div>
    );
  }

  return null;
};
