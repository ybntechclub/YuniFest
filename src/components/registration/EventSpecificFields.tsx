import React from 'react';
import { EventItem } from '../../types/database';
import { Gamepad2, Users, Music, Flame, Sparkles, Shirt, Palette, Shield } from 'lucide-react';

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

  // 1. GAMING TOURNAMENT (Free Fire & BGMI) — Duo (2 Players) or Squad (4 Players)
  if (slug === 'gaming-tournament') {
    const gamingFormat = eventSpecificData.gamingFormat || 'squad'; // 'duo' | 'squad'
    const teamSize = eventSpecificData.teamSize || (gamingFormat === 'duo' ? 2 : 4);

    const squad = eventSpecificData.squadMembers || [
      { name: '', ign: '', uid: '', role: 'Player 1 (Team Leader / Captain)' },
      { name: '', ign: '', uid: '', role: 'Player 2' },
      { name: '', ign: '', uid: '', role: 'Player 3' },
      { name: '', ign: '', uid: '', role: 'Player 4' },
    ];

    const handleFormatChange = (format: 'duo' | 'squad') => {
      const size = format === 'duo' ? 2 : 4;
      setParticipationCategory(format === 'duo' ? 'Duo' : 'Squad');

      const activeMembers = squad.slice(0, size);
      const newTeamDetails = activeMembers
        .map((m: any, i: number) => `${i + 1}. ${m.name || 'Member'} (IGN: ${m.ign || 'N/A'}, UID: ${m.uid || 'N/A'})`)
        .join('\n');

      setTeamDetails(newTeamDetails);
      setEventSpecificData(prev => ({
        ...prev,
        gamingFormat: format,
        teamSize: size,
      }));
    };

    const updateSquadMember = (index: number, field: 'name' | 'ign' | 'uid', value: string) => {
      const updated = [...squad];
      while (updated.length < 4) {
        updated.push({ name: '', ign: '', uid: '', role: `Player ${updated.length + 1}` });
      }
      updated[index] = { ...updated[index], [field]: value };
      
      const activeMembers = updated.slice(0, teamSize);
      const newTeamDetails = activeMembers
        .map((m, i) => `${i + 1}. ${m.name || 'Member'} (IGN: ${m.ign || 'N/A'}, UID: ${m.uid || 'N/A'})`)
        .join('\n');
      
      setTeamDetails(newTeamDetails);
      setEventSpecificData(prev => ({
        ...prev,
        squadMembers: updated,
        gameIgn: updated[0]?.ign || '',
        gameId: updated[0]?.uid || '',
      }));
    };

    return (
      <div className="p-6 rounded-2xl bg-[#E0E7FF]/60 border-[1.5px] border-slate-900 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#2B59FF] text-xs font-black uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4" />
            <span>Esports Battle Royale Configuration</span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950 text-white border border-slate-900">
            {gamingFormat === 'duo' ? '2-PLAYER DUO ROSTER' : '4-PLAYER SQUAD ROSTER'}
          </span>
        </div>

        {/* 1. Team Lineup Format (Duo vs Squad) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Select Team Lineup Format <span className="text-red-500">*</span>
            </label>
            <span className="font-mono text-[10px] text-slate-500">
              Not mandatory for 4 players — play Duo or Squad
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleFormatChange('duo')}
              className={`p-3 rounded-xl border-[1.5px] border-slate-900 text-left transition-all flex items-center justify-between ${
                gamingFormat === 'duo'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div>
                <span className="font-headline font-bold text-xs block">Duo Team (2 Players)</span>
                <span className={`text-[10px] font-mono block ${gamingFormat === 'duo' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Leader + 1 Teammate
                </span>
              </div>
              <span className={`font-mono text-[10px] font-black px-2 py-0.5 rounded ${
                gamingFormat === 'duo' ? 'bg-[#CCFF00] text-black' : 'bg-slate-100 text-slate-700'
              }`}>
                2 PLAYERS
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleFormatChange('squad')}
              className={`p-3 rounded-xl border-[1.5px] border-slate-900 text-left transition-all flex items-center justify-between ${
                gamingFormat === 'squad'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div>
                <span className="font-headline font-bold text-xs block">Squad Team (4 Players)</span>
                <span className={`text-[10px] font-mono block ${gamingFormat === 'squad' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Full 4-Player Roster
                </span>
              </div>
              <span className={`font-mono text-[10px] font-black px-2 py-0.5 rounded ${
                gamingFormat === 'squad' ? 'bg-[#CCFF00] text-black' : 'bg-slate-100 text-slate-700'
              }`}>
                4 PLAYERS
              </span>
            </button>
          </div>
        </div>

        {/* 2. Game Choice */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Select Esports Tournament Game <span className="text-red-500">*</span>
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
          {errors.gameChoice && <p className="text-xs text-red-600 mt-1 font-mono">{errors.gameChoice}</p>}
        </div>

        {/* 3. Squad / Team Name */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Official {gamingFormat === 'duo' ? 'Duo / Team' : 'Squad / Clan'} Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={eventSpecificData.gamingTeamName !== undefined ? eventSpecificData.gamingTeamName : teamName}
            onChange={(e) => {
              const val = e.target.value;
              setTeamName(val);
              setEventSpecificData(prev => ({ ...prev, gamingTeamName: val }));
            }}
            placeholder={gamingFormat === 'duo' ? "e.g. Dynamic Duo / Lethal Pair" : "e.g. Soul Reapers Esports / GodLike X"}
            className="w-full px-4 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
          />
          {errors.teamName && <p className="text-xs text-red-600 mt-1 font-mono">{errors.teamName}</p>}
        </div>

        {/* 4. Squad / Duo Members Roster */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-900/15 pb-2">
            <span className="font-mono text-xs uppercase font-bold text-slate-900">
              {gamingFormat === 'duo' ? 'DUO MEMBERS CREDENTIALS (2 PLAYERS)' : 'SQUAD MEMBERS CREDENTIALS (4 PLAYERS)'}
            </span>
            <span className="font-mono text-[10px] text-slate-600">
              All {teamSize} Player UIDs &amp; IGNs mandatory
            </span>
          </div>

          {squad.slice(0, teamSize).map((member: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-white border-[1.5px] border-slate-900 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-slate-950 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEF08A] border border-slate-900 flex items-center justify-center text-[11px]">
                    {idx + 1}
                  </span>
                  {idx === 0 ? 'Player 1 (Team Leader / Captain)' : `Player ${idx + 1}`}
                </span>
                {idx === 0 && (
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    PRIMARY CONTACT
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-[11px] text-slate-600 mb-1 font-bold">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.name || ''}
                    onChange={(e) => updateSquadMember(idx, 'name', e.target.value)}
                    placeholder={`Player ${idx + 1} Name`}
                    className="w-full px-3 py-2 rounded-lg bg-[#F6F7F9] border border-slate-900 focus:border-[#2B59FF] text-xs text-slate-950 font-medium focus:outline-none"
                  />
                  {errors[`squad_${idx}_name`] && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-mono">{errors[`squad_${idx}_name`]}</p>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-600 mb-1 font-bold">
                    In-Game Name (IGN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.ign || ''}
                    onChange={(e) => updateSquadMember(idx, 'ign', e.target.value)}
                    placeholder="e.g. Mortal_007"
                    className="w-full px-3 py-2 rounded-lg bg-[#F6F7F9] border border-slate-900 focus:border-[#2B59FF] font-mono text-xs text-slate-950 font-bold focus:outline-none"
                  />
                  {errors[`squad_${idx}_ign`] && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-mono">{errors[`squad_${idx}_ign`]}</p>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-600 mb-1 font-bold">
                    Character UID / Player ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.uid || ''}
                    onChange={(e) => updateSquadMember(idx, 'uid', e.target.value)}
                    placeholder="e.g. 5183920194"
                    className="w-full px-3 py-2 rounded-lg bg-[#F6F7F9] border border-slate-900 focus:border-[#2B59FF] font-mono text-xs text-slate-950 font-bold focus:outline-none"
                  />
                  {errors[`squad_${idx}_uid`] && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-mono">{errors[`squad_${idx}_uid`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. RAMP WALK / FASHION SHOW — Waste to Wow OR Divas & Beasts, No Max Seat Limit
  if (slug === 'ramp-walk-fashion-show') {
    const selectedTheme = eventSpecificData.rampWalkTheme || 'Waste to Wow (Eco / Upcycled Couture)';

    return (
      <div className="p-6 rounded-2xl bg-[#EDE9FE]/60 border-[1.5px] border-slate-900 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-950 text-xs font-black uppercase tracking-wider">
            <Shirt className="w-4 h-4 text-purple-700" />
            <span>Ramp Walk / Fashion Show Runway Entry</span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
            NO MAX SEAT • OPEN RUNWAY
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Select Runway Theme <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'Waste to Wow',
                title: 'Waste to Wow',
                tag: 'Eco / Upcycled Couture',
                desc: 'Creative sustainable fashion crafted from recycled materials, bio-fabrics, and repurposed textiles.'
              },
              {
                id: 'Divas and Beasts',
                title: 'Divas and Beasts',
                tag: 'Avant-Garde & Fantasy Glamour',
                desc: 'High drama, mythic creatures, royalty, ferocious chic, and avant-garde theatrical couture.'
              }
            ].map((theme) => {
              const active = selectedTheme.startsWith(theme.id);
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setEventSpecificData(prev => ({ ...prev, rampWalkTheme: `${theme.title} (${theme.tag})` }))}
                  className={`text-left p-3.5 rounded-xl border-[1.5px] border-slate-900 transition-all ${
                    active ? 'bg-slate-950 text-white shadow-sm' : 'bg-white text-slate-900 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-bold text-sm">{theme.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${active ? 'bg-[#FEF08A] text-slate-950' : 'bg-slate-100 text-slate-700'}`}>
                      {theme.tag}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-snug ${active ? 'text-slate-300' : 'text-slate-600'}`}>
                    {theme.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Costume Concept &amp; Background Audio Track Note
          </label>
          <input
            type="text"
            value={eventSpecificData.audioTrack || ''}
            onChange={(e) => setEventSpecificData(prev => ({ ...prev, audioTrack: e.target.value }))}
            placeholder="e.g. Track name or aesthetic theme description for runway walk"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none"
          />
        </div>
      </div>
    );
  }

  // 3. MODEL REPRESENTATION & POSTER MAKING — Theme Indian Knowledge System (IKS)
  if (slug === 'model-presentation' || slug === 'poster-making') {
    const isModel = slug === 'model-presentation';
    const defaultFormat = isModel ? 'Working / Static 3D Model' : 'Scientific / Cultural Poster (A1/A2)';
    const selectedFormat = eventSpecificData.iksFormat || defaultFormat;

    return (
      <div className="p-6 rounded-2xl bg-[#D1FAE5]/60 border-[1.5px] border-slate-900 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-950 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{isModel ? 'Model Representation' : 'Poster Making'} (Official Entry)</span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-900 text-slate-950">
            THEME: IKS
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-emerald-300 font-mono text-xs text-emerald-900">
          <span className="font-bold">Official University Theme:</span> Indian Knowledge System (IKS) / Bhartiya Gyan Parampara (Indigenous Sciences, Vedic Math, Sustainable Heritage Architecture &amp; Traditional Medicine).
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Presentation Medium / Format <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[isModel ? 'Working / Static 3D Model' : 'Scientific / Cultural Poster (A1/A2)'].map((fmt) => (
              <button
                key={fmt}
                type="button"
                className="py-2.5 px-3 rounded-xl text-xs font-bold border-[1.5px] border-slate-900 bg-slate-950 text-white shadow-sm"
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {isModel ? 'Model / Prototype Title' : 'Research / Poster Title'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={eventSpecificData.iksProjectTitle !== undefined ? eventSpecificData.iksProjectTitle : teamName}
            onChange={(e) => {
              const val = e.target.value;
              setTeamName(val);
              setEventSpecificData(prev => ({ ...prev, iksProjectTitle: val }));
            }}
            placeholder={isModel ? "e.g. Working Solar Telemetry & Vedic Irrigation Model" : "e.g. Vedic Geometry in Ancient Temple Acoustics"}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none"
          />
          {errors.teamName && <p className="text-xs text-red-600 mt-1">{errors.teamName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Team Members (1 to 4 Members Permitted)
          </label>
          <textarea
            rows={2}
            value={eventSpecificData.iksTeamMembers || ''}
            onChange={(e) => {
              const val = e.target.value;
              setTeamDetails(val);
              setEventSpecificData(prev => ({ ...prev, iksTeamMembers: val }));
            }}
            placeholder="List member names and ID numbers (or leave blank if solo)..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs text-slate-950 focus:outline-none resize-none font-mono"
          />
        </div>
      </div>
    );
  }

  // 4. FACE PAINTING OR TATTOO MAKING
  if (slug === 'face-painting') {
    const selectedFormat = eventSpecificData.faceArtCategory || 'Face Painting';

    return (
      <div className="p-6 rounded-2xl bg-[#FCE7F3]/60 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center gap-2 text-pink-900 text-xs font-black uppercase tracking-wider">
          <Palette className="w-4 h-4 text-pink-700" />
          <span>Face Painting or Tattoo Making (Body Art)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Participation Format <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Face Painting', 'Tattoo Making (Temporary Body Art)'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setEventSpecificData(prev => ({ ...prev, faceArtCategory: cat }))}
                className={`py-2 px-3 rounded-xl text-xs font-bold border-[1.5px] border-slate-900 transition-all ${
                  selectedFormat === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Model / Canvas Partner Name (Mandatory) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={eventSpecificData.modelPartnerName || ''}
            onChange={(e) => {
              const val = e.target.value;
              setTeamDetails(val);
              setEventSpecificData(prev => ({ ...prev, modelPartnerName: val }));
            }}
            placeholder="e.g. Shalini Roy (Model Companion)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none"
          />
          {errors.teamDetails && <p className="text-xs text-red-600 mt-1">{errors.teamDetails}</p>}
        </div>
      </div>
    );
  }

  // 5. DANCE COMPETITION
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

  // 6. SINGING COMPETITION
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

  // 7. TREASURE HUNTING
  if (slug === 'treasure-hunting') {
    return (
      <div className="p-6 rounded-2xl bg-[#FEF08A]/60 border-[1.5px] border-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-950 text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#2B59FF]" />
            <span>Treasure Hunting Expedition Team</span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-900 text-slate-950">
            CAP: 6 TEAMS ONLY (5 MEMBERS EACH)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-amber-300 font-mono text-xs text-amber-900">
          <span className="font-bold">Team Roster Requirement:</span> Exactly 5 members per team from YBN University. Strictly capped at 6 teams.
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
            5 Team Members with Roll / Student ID Numbers <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            value={teamDetails}
            onChange={(e) => setTeamDetails(e.target.value)}
            placeholder="1. Team Captain - Roll No: ...&#10;2. Member 2 - Roll No: ...&#10;3. Member 3 - Roll No: ...&#10;4. Member 4 - Roll No: ...&#10;5. Member 5 - Roll No: ..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 focus:outline-none resize-none font-mono"
          />
          {errors.teamDetails && <p className="text-xs text-red-600 mt-1">{errors.teamDetails}</p>}
        </div>
      </div>
    );
  }

  return null;
};
