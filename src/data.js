// Survivor Season 50 cast data — all 24 returning players
export const TRIBES = {
    cila: {
        name: 'Cila',
        color: 'cila',
        members: [
            { id: 'rick_devens', name: 'Rick Devens', seasons: 'Edge of Extinction', short: 'S38' },
            { id: 'cirie_fields', name: 'Cirie Fields', seasons: 'Panama +3', short: 'S12,16,20,34' },
            { id: 'emily_flippen', name: 'Emily Flippen', seasons: 'S45', short: 'S45' },
            { id: 'christian_hubicki', name: 'Christian Hubicki', seasons: 'David vs. Goliath', short: 'S37' },
            { id: 'joe_hunter', name: 'Joe Hunter', seasons: 'S48', short: 'S48' },
            { id: 'jenna_lewis', name: 'Jenna Lewis', seasons: 'Borneo, All-Stars', short: 'S1,8' },
            { id: 'savannah_louie', name: 'Savannah Louie', seasons: 'S49 Winner 👑', short: 'S49' },
            { id: 'ozzy_lusth', name: 'Ozzy Lusth', seasons: 'Cook Islands +3', short: 'S13,16,23,34' },
        ],
    },
    vatu: {
        name: 'Vatu',
        color: 'vatu',
        members: [
            { id: 'aubry_bracco', name: 'Aubry Bracco', seasons: 'Kaôh Rōng +2', short: 'S32,34,38' },
            { id: 'q_burdette', name: 'Q Burdette', seasons: 'S46', short: 'S46' },
            { id: 'colby_donaldson', name: 'Colby Donaldson', seasons: 'Outback +2', short: 'S2,8,20' },
            { id: 'kyle_fraser', name: 'Kyle Fraser', seasons: 'S48 Winner 👑', short: 'S48' },
            { id: 'angelina_keeley', name: 'Angelina Keeley', seasons: 'David vs. Goliath', short: 'S37' },
            { id: 'stephenie_lagrossa', name: 'Stephenie LaGrossa', seasons: 'Palau +2', short: 'S10,11,20' },
            { id: 'genevieve_mushaluk', name: 'Genevieve Mushaluk', seasons: 'S47', short: 'S47' },
            { id: 'rizo_velovic', name: 'Rizo Velovic', seasons: 'S49', short: 'S49' },
        ],
    },
    kalo: {
        name: 'Kalo',
        color: 'kalo',
        members: [
            { id: 'charlie_davis', name: 'Charlie Davis', seasons: 'S46', short: 'S46' },
            { id: 'tiffany_ervin', name: 'Tiffany Ervin', seasons: 'S46', short: 'S46' },
            { id: 'chrissy_hofbeck', name: 'Chrissy Hofbeck', seasons: 'HvHvH', short: 'S35' },
            { id: 'kamilla_karthigesu', name: 'Kamilla Karthigesu', seasons: 'S48', short: 'S48' },
            { id: 'dee_valladares', name: 'Dee Valladares', seasons: 'S45 Winner 👑', short: 'S45' },
            { id: 'coach_wade', name: 'Coach Wade', seasons: 'Tocantins +2', short: 'S18,20,23' },
            { id: 'mike_white', name: 'Mike White', seasons: 'David vs. Goliath', short: 'S37' },
            { id: 'jonathan_young', name: 'Jonathan Young', seasons: 'S42', short: 'S42' },
        ],
    },
};

export const ALL_CASTAWAYS = Object.values(TRIBES).flatMap(t => t.members);

export const PLAYER_COLORS = [
    { bg: 'bg-player-1', text: 'text-player-1', border: 'border-player-1', ring: 'ring-player-1', hex: '#e8722a' },
    { bg: 'bg-player-2', text: 'text-player-2', border: 'border-player-2', ring: 'ring-player-2', hex: '#1db954' },
    { bg: 'bg-player-3', text: 'text-player-3', border: 'border-player-3', ring: 'ring-player-3', hex: '#1a8cbb' },
    { bg: 'bg-player-4', text: 'text-player-4', border: 'border-player-4', ring: 'ring-player-4', hex: '#c77dff' },
];

// Scoring events
export const SCORE_EVENTS = [
    { key: 'survived', label: 'Survived Episode', points: 2, emoji: '✅' },
    { key: 'immunity', label: 'Won Immunity', points: 3, emoji: '🏅' },
    { key: 'reward', label: 'Won Reward', points: 1, emoji: '🎁' },
    { key: 'idol_found', label: 'Found Idol', points: 3, emoji: '🗿' },
    { key: 'idol_played', label: 'Played Idol', points: 4, emoji: '💎' },
    { key: 'advantage', label: 'Used Advantage', points: 2, emoji: '🃏' },
    { key: 'blindside', label: 'Blindside', points: 3, emoji: '🔪' },
    { key: 'no_votes', label: 'Zero Votes', points: 1, emoji: '🛡️' },
    { key: 'merge', label: 'Made Merge', points: 5, emoji: '🤝' },
    { key: 'final5', label: 'Made Final 5', points: 5, emoji: '🖐️' },
    { key: 'ftc', label: 'Made FTC', points: 7, emoji: '🏛️' },
    { key: 'winner', label: 'Sole Survivor', points: 10, emoji: '👑' },
    { key: 'voted_out', label: 'Voted Out', points: -2, emoji: '🔥', negative: true },
    { key: 'first_boot', label: 'First Boot', points: -5, emoji: '💀', negative: true },
];

// Bingo squares pool
export const BINGO_ITEMS = [
    '"The tribe has spoken"',
    '"Come on in!"',
    '"Dig deep!"',
    '"Worth playing for?"',
    '"Blindside!"',
    'Someone says "million dollars"',
    'Player cries',
    'Someone talks about family',
    'Secret meeting at well',
    'Shot of wildlife',
    'Rain at camp',
    'Challenge involves water',
    'Someone falls in challenge',
    'Idol is found',
    'Idol is played',
    'Vote is split',
    'Player complains about hunger',
    'Someone makes fire',
    'Jeff snuffs a torch',
    '"Outwit, outplay, outlast"',
    'Puzzle in challenge',
    'Player boasts about themselves',
    'Someone whispers at tribal',
    'Jeff gives life advice',
    'Immunity necklace closeup',
    'Someone says "threat"',
    'Alliance is formed',
    'Alliance is betrayed',
    'Someone says "resume"',
    'Player finds a clue',
    'Reward has food',
    'Someone strategizes in confessional',
    'Jeff says "previously on"',
    'Tree mail arrives',
    'Someone says "game changer"',
    'Coach does Coach things',
    'Ozzy catches fish',
    'Cirie makes a big move',
    'Angelina mentions the jacket',
    'Someone says "4th time playing"',
    'Player hides an idol',
    'Emotional tribal council',
    'Jeff narrates the challenge',
    'Post-merge feast',
    'Someone says "at the end of the day"',
    'Player throws someone under the bus',
    'Coconut is cracked open',
    'Someone says "trust"',
    'Tribe swap happens',
    'Medical team is called',
    'Player gets sunburned',
    'Jeff says "want to know?"',
    'Someone does a victory dance',
    '"I didn\'t come here to lose"',
    'Player fake-cries',
    'Bug/insect closeup',
    'Someone says "it\'s just a game"',
    'Player talks to camera at night',
    '"This is my island"',
    'Jeff raises his eyebrow',
];

// Generate a shuffled bingo card (5x5 with free center)
export function generateBingoCard(seed) {
    const shuffled = [...BINGO_ITEMS];
    // Seeded shuffle using simple hash
    let s = seed || Math.random() * 10000;
    for (let i = shuffled.length - 1; i > 0; i--) {
        s = (s * 16807 + 0) % 2147483647;
        const j = s % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const items = shuffled.slice(0, 24);
    // Insert free space at center (index 12)
    items.splice(12, 0, 'FREE SPACE 🏝️');
    return items;
}
