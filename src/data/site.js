/* ============================================================
   Single place to edit your links & profile data
   ⚠️ Replace the urls below with your real profile links
   ============================================================ */

export const profile = {
  first: 'Icae',
  full: 'Icae D. Alambro',
  initials: 'IA',
  role: 'Electrical Engineering Student · Problem Solver',
  school: 'Western Institute of Technology',
  degree: 'Bachelor of Science in Electrical Engineering',
  location: {
    city: 'Dumangas',
    province: 'Iloilo',
    country: 'Philippines',
    /* coordinates of Dumangas, Iloilo — used by the animated map card.
       ⚠️ these must stay centred on Dumangas (Panay island), otherwise the
       map lands on the neighbouring province across the strait. */
    lat: 10.8216,
    lon: 122.7124,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dumangas%2C+Iloilo%2C+Philippines',
    /* bbox is symmetric around Dumangas so the animated pin sits on the town */
    osmEmbed:
      'https://www.openstreetmap.org/export/embed.html?bbox=122.6374%2C10.7591%2C122.7874%2C10.8841&layer=mapnik',
  },
  email: 'iccae.alambro@gmail.com', // ⚠️ change to your real gmail
  availability: 'Open to learning opportunities',
  year: 'RSEE · 2026',
}

/* ---------- contact (landing page + footer) ----------
   Add `hidden: true` to a network until you have the real profile url —
   hidden entries are filtered out everywhere the icons render. */
export const socials = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'icae.defino',
    url: 'https://www.facebook.com/icae.defino',
    icon: 'facebook',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@icesee_yo',
    url: 'https://www.instagram.com/icesee_yo?rpxt=a3Fid2Zuc3ZkNDdt',
    icon: 'instagram',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Icae Alambro',
    url: 'https://www.linkedin.com/in/', // ⚠️ add your real profile url, then remove `hidden`
    icon: 'linkedin',
    hidden: true,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@your.handle',
    url: 'https://www.tiktok.com/', // ⚠️ add your real profile url, then remove `hidden`
    icon: 'tiktok',
    hidden: true,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    handle: profile.email,
    url: `mailto:${profile.email}`,
    icon: 'gmail',
  },
]

/* ---------- beyond engineering (cards → pages) ---------- */
export const hobbies = [
  {
    id: 'chess',
    index: '01',
    title: 'Chess',
    tagline: 'Strategy over impulse',
    to: '/chess',
    theme: 'dark',
    glyph: '♞',
    action: 'Play now',
  },
  {
    id: 'travel',
    index: '02',
    title: 'Travel',
    tagline: 'New places, new perspectives',
    to: '/travel',
    theme: 'blue',
    glyph: '↗',
    action: 'Explore',
  },
  {
    id: 'jogging',
    index: '03',
    title: 'Jogging',
    tagline: 'Building endurance',
    to: '/jogging',
    theme: 'lime',
    glyph: '42',
    action: 'See Strava',
  },
  {
    id: 'walking',
    index: '04',
    title: 'Walking',
    tagline: 'Where ideas connect',
    to: '/walking',
    theme: 'cream',
    glyph: '•••',
    action: 'Take a walk',
  },
  {
    id: 'anime',
    index: '05',
    title: 'Anime',
    tagline: 'Stories without limits',
    to: '/anime',
    theme: 'red',
    glyph: '観',
    action: 'Watch list',
  },
]

/* ---------- core strengths ---------- */
export const strengths = [
  {
    index: '01 / Logic',
    icon: 'brain',
    title: 'Problem solving',
    body: 'Breaking complex electrical engineering problems into smaller, testable parts and working toward a practical answer.',
    chips: ['Analysis', 'Reasoning', 'Persistence'],
    theme: 'cream',
    art: 'circuit',
  },
  {
    index: '02 / Ideas',
    icon: 'bulb',
    title: 'Creativity',
    body: 'Looking beyond the obvious path, exploring alternatives, and turning fresh ideas into useful possibilities.',
    chips: ['Imagination', 'Adaptability', 'Design'],
    theme: 'blue',
    art: 'orbit',
  },
  {
    index: '03 / Puzzles',
    icon: 'puzzle',
    title: "Rubik's Cube",
    body: "Pattern recognition, algorithms, patience, and speed — puzzle solving keeps my mind sharp and focused.",
    chips: ['Patterns', 'Algorithms', 'Focus'],
    theme: 'cream',
    art: 'cube',
  },
]

/* ---------- navigation ---------- */
export const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Beyond', to: 'beyond' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
]

/* ---------- strava (jogging page) ---------- */
export const strava = {
  profileUrl: 'https://www.strava.com/', // ⚠️ your strava profile
  athlete: 'Icae Alambro',
  stats: [
    { label: 'Distance · 30 days', value: 126.4, suffix: ' km', decimals: 1 },
    { label: 'Runs', value: 18, suffix: '', decimals: 0 },
    { label: 'Avg pace', value: 6.1, suffix: ' /km', decimals: 1 },
    { label: 'Elevation', value: 842, suffix: ' m', decimals: 0 },
  ],
  activities: [
    {
      title: 'Morning loop — Dumangas',
      date: 'Mon · 5:42 AM',
      distance: '7.02 km',
      pace: "5'58\" /km",
      time: '41:52',
      type: 'Run',
      spark: [8, 14, 12, 20, 26, 24, 32, 30, 38, 44, 41, 52],
    },
    {
      title: 'Coastal easy run',
      date: 'Sat · 5:26 AM',
      distance: '5.40 km',
      pace: "6'21\" /km",
      time: '34:12',
      type: 'Run',
      spark: [4, 10, 9, 16, 18, 15, 22, 26, 25, 31, 34, 33],
    },
    {
      title: 'Tempo — campus loop',
      date: 'Thu · 5:31 AM',
      distance: '8.15 km',
      pace: "5'44\" /km",
      time: '46:51',
      type: 'Run',
      spark: [6, 12, 18, 17, 24, 30, 28, 36, 42, 40, 48, 56],
    },
    {
      title: 'Recovery shakeout',
      date: 'Tue · 6:04 AM',
      distance: '4.20 km',
      pace: "6'40\" /km",
      time: '27:58',
      type: 'Run',
      spark: [3, 7, 8, 12, 11, 15, 18, 17, 21, 24, 23, 27],
    },
  ],
}
