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
      <div className="p-6 rounded-2xl bg-[#FCE7F3]/50 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center gap-2 text-pink-900 text-xs font-bold uppercase tracking-wider">
          <Music className="w-4 h-4 text-pink-700" />
          <span>Dance Competition Format</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Performance Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Solo', 'Duo', 'Group'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setParticipationCategory(cat)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border-[1.5px] border-slate-900 transition-all ${
                  participationCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {errors.participationCategory && (
            <p className="text-xs text-red-600 mt-1">{errors.participationCategory}</p>
          )}
        </div>

        {(participationCategory === 'Duo' || participationCategory === 'Group') && (
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Group / Crew Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Rhythm Shockers"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none"
              />
              {errors.teamName && <p className="text-xs text-red-600 mt-1">{errors.teamName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Team Member Names &amp; Student IDs <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={teamDetails}
                onChange={(e) => setTeamDetails(e.target.value)}
                placeholder="List full name and ID card numbers of all team members..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none resize-none font-medium"
              />
              {errors.teamDetails && <p className="text-xs text-red-600 mt-1">{errors.teamDetails}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SINGING COMPETITION
  if (slug === 'singing-competition') {
    return (
      <div className="p-6 rounded-2xl bg-[#EDE9FE]/50 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center gap-2 text-purple-900 text-xs font-bold uppercase tracking-wider">
          <Music className="w-4 h-4 text-purple-700" />
          <span>Singing Competition Format</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Solo', 'Duo'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setParticipationCategory(cat)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border-[1.5px] border-slate-900 transition-all ${
                  participationCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {participationCategory === 'Duo' && (
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Partner's Full Name &amp; ID Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={teamDetails}
              onChange={(e) => setTeamDetails(e.target.value)}
              placeholder="e.g. Shalini Roy (ID: YBN/2023/SCI-104)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none"
            />
            {errors.teamDetails && <p className="text-xs text-red-600 mt-1">{errors.teamDetails}</p>}
          </div>
        )}
      </div>
    );
  }

  // 3. GAMING TOURNAMENT (Free Fire & BGMI)
  if (slug === 'gaming-tournament') {
    return (
      <div className="p-6 rounded-2xl bg-[#E0E7FF]/60 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center gap-2 text-[#2B59FF] text-xs font-black uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>Esports Battle Royale Configuration</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Select Tournament Game <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['BGMI (Battlegrounds Mobile)', 'Free Fire Max'].map((game) => (
              <button
                key={game}
                type="button"
                onClick={() => setEventSpecificData(prev => ({ ...prev, gameChoice: game }))}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border-[1.5px] border-slate-900 transition-all ${
                  eventSpecificData.gameChoice === game
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
          {errors.gameChoice && <p className="text-xs text-red-600 mt-1">{errors.gameChoice}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              In-Game Character Name (IGN) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={eventSpecificData.gameIgn || ''}
              onChange={(e) => setEventSpecificData(prev => ({ ...prev, gameIgn: e.target.value }))}
              placeholder="e.g. Soul_Predator"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] font-mono text-xs sm:text-sm text-slate-950 focus:outline-none"
            />
            {errors.gameIgn && <p className="text-xs text-red-600 mt-1">{errors.gameIgn}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Player UID / Character ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={eventSpecificData.gameId || ''}
              onChange={(e) => setEventSpecificData(prev => ({ ...prev, gameId: e.target.value }))}
              placeholder="e.g. 5183920194"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] font-mono text-xs sm:text-sm text-slate-950 focus:outline-none"
            />
            {errors.gameId && <p className="text-xs text-red-600 mt-1">{errors.gameId}</p>}
          </div>
        </div>
      </div>
    );
  }

  // 4. TREASURE HUNTING
  if (slug === 'treasure-hunting') {
    return (
      <div className="p-6 rounded-2xl bg-[#FEF08A]/60 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-950 text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#2B59FF]" />
            <span>Treasure Hunting Expedition Team</span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-900 text-slate-950">
            CAP: 25 TEAMS ONLY
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Official Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. The Cryptic Voyagers"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
          />
          {errors.teamName && <p className="text-xs text-red-600 mt-1">{errors.teamName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Team Members with Student ID Numbers <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={teamDetails}
            onChange={(e) => setTeamDetails(e.target.value)}
            placeholder="1. Lead Name (Captain) - ID: ...&#10;2. Member 2 - ID: ...&#10;3. Member 3 - ID: ..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none resize-none font-mono"
          />
          {errors.teamDetails && <p className="text-xs text-red-600 mt-1">{errors.teamDetails}</p>}
        </div>
      </div>
    );
  }

  // 5. MODEL PRESENTATION
  if (slug === 'model-presentation') {
    return (
      <div className="p-6 rounded-2xl bg-[#D1FAE5]/60 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Innovation Prototype Model Specifications</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Project / Prototype Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. Solar Telemetry Automated Irrigation System"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
          />
          {errors.teamName && <p className="text-xs text-red-600 mt-1">{errors.teamName}</p>}
        </div>
      </div>
    );
  }

  return null;
};
