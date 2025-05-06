// Hotspot data structure for the interactive video experience
// Each hotspot represents a character or interaction point in the video
export const hotspotsTimeline = [
  {
    id: 1,
    label: "happy-man",
    startTime: 2,
    endTime: 4,
    keyframes: [
      { time: 2, top: 0, left: 50 },
      { time: 4, top: 150, left: 50 },
    ],
    thought: {
      texts: [
        "Zolang ik het druk heb, hoef ik niet te voelen hoe moe ik eigenlijk ben.",
        "Ik heb geen tijd voor rust, dat is tijdsverspilling.",
        "Ik zeg tegen anderen dat ze mild moeten zijn voor zichzelf. Maar ik weet niet hoe dat voelt.",
      ],
      image: "/images/texting.png",
      backgroundImage: "/backgrounds/still-dark.gif",
    },
  },
  {
    id: 2,
    label: "Secondary interaction point",
    startTime: 11,
    endTime: 15,
    keyframes: [
      { time: 11.5, top: 100, left: 50 },
      { time: 15, top: -50, left: 50 },
    ],
    thought: {
      texts: [
        "Als ik zou verdwijnen, zou iemand het merken?",
        "Soms kijk ik naar mezelf in de spiegel en zie ik iemand die ik niet meer herken.",
        "Ik weet niet meer wanneer ik me voor het laatst écht blij voelde.",
      ],
      image: "/images/child-alone.png",
      backgroundImage: "/backgrounds/still-dark.gif",
    },
  },
];
