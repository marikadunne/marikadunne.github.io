/*
  Marika Dunne — site content.
  Everything a visitor reads lives in this one file. To add a piece of art:
  put the image in images/full + images/thumb, then add an entry to WORKS.
  The order of WORKS is the order on the site.
*/

window.SITE = {
  name: "Marika Dunne",
  tagline: "Painting, drawing, printmaking & photography",
  location: "Oxford, Mississippi",
  email: "mikadunne98@gmail.com",
  instagram: "marikadunneart", // handle without the @; leave empty to hide everywhere
  cvPdf: "shared/marika-dunne-cv.pdf?v=20261020212127", // ?v= changes on every publish (publish.sh)
  featured: "blankcanvas",                // piece shown large on the opening screen
  headshot: "images/marika-headshot.jpg", // black & white portrait, 1000 x 1488
  logo: "images/logo-ink.png",            // round seal, dark ink on transparent
  logoLight: "images/logo-light.png",     // same seal in light ink, for dark backgrounds
  year: 2026,
};

// The work is split into Recent Work and Past Work (like her Adobe Portfolio).
// cover = the piece shown when linking to this collection (same as on her Adobe
// Portfolio); coverFocus = which part of it stays in view in the 4:3 crop
window.COLLECTIONS = [
  { id: "recent", title: "Recent Work", cover: "blankcanvas", coverFocus: "50% 50%" },
  { id: "past",   title: "Past Work",   cover: "past-hands",  coverFocus: "50% 88%" },
];

// Medium of each piece. Not used for menus; it labels a piece whose caption
// details aren't filled in yet (e.g. "Painting").
window.MEDIA = [
  { id: "painting",    title: "Painting" },
  { id: "drawing",     title: "Drawing" },
  { id: "printmaking", title: "Printmaking" },
  { id: "photography", title: "Photography" },
];

// Every piece, newest first, in the order shown on the site. collection says
// whether it appears under Recent Work or Past Work.
// Titles, media and sizes come from Marika's Adobe Portfolio captions. Pieces
// marked "working title" still need their real title, medium and size.
// file = image name in images/full and images/thumb (without .jpg)
// w, h = image pixel size (keeps the layout steady while images load)
// tone = average color of the image (used as a soft placeholder while loading)
window.WORKS = [
  // ---- Recent Work ----
  { file: "blue",               collection: "recent", medium: "painting",    title: "Inner Immersion",           details: "Oil paint and cyanotype on canvas", size: '18x24"', year: "2026", w: 1553, h: 1920, tone: "#7C858E" },
  { file: "clothstrips",        collection: "recent", medium: "painting",    title: "What Peeks",                details: "", size: "", year: "", w: 1440, h: 1920, tone: "#B6B3A9" }, // working title
  { file: "ripples",            collection: "recent", medium: "painting",    title: "Moments of Impact",         details: "", size: "", year: "", w: 1466, h: 1920, tone: "#9E897C" }, // working title
  { file: "flashbacks",         collection: "recent", medium: "drawing",     title: "Flashbacks",                details: "", size: "", year: "", w: 1406, h: 1920, tone: "#958366" }, // working title (Yaya drawing made of many photos)
  { file: "house",              collection: "recent", medium: "painting",    title: "Faulkner\u2019s Farm",       details: "Oil paint on canvas",           size: '5x7"',   year: "", w: 1920, h: 1364, tone: "#9F9983" },
  { file: "blankcanvas",        collection: "recent", medium: "painting",    title: "Blank Spaces",              details: "Oil paint on wood panel",       size: '20x20"', year: "", w: 1884, h: 1920, tone: "#828383" },
  { file: "water",              collection: "recent", medium: "printmaking", title: "Untitled II",               details: "Stone Lithography",             size: '11x14"', year: "", w: 1518, h: 1920, tone: "#C4C2C0" },
  { file: "hands",              collection: "recent", medium: "printmaking", title: "Untitled I",                details: "Stone Lithography",             size: '11x14"', year: "", w: 1545, h: 1920, tone: "#E0DFDC" },
  { file: "smiley",             collection: "recent", medium: "painting",    title: "Trash Painting I",          details: "Acrylic paint on plastic bags", size: '8x10"',  year: "", w: 1539, h: 1920, tone: "#9B865F" },
  { file: "garbage",            collection: "recent", medium: "painting",    title: "Trash Painting II",         details: "Acrylic paint on plastic bags", size: '8x10"',  year: "", w: 1920, h: 1618, tone: "#7D96A3" },
  { file: "phonecall",          collection: "recent", medium: "painting",    title: "Esca",                      details: "Oil paint on canvas",           size: '18x24"', year: "", w: 1920, h: 1432, tone: "#584F3F" },
  { file: "phoneaddiction",     collection: "recent", medium: "painting",    title: "Daughter of Eve",           details: "Oil paint on canvas",           size: '18x24"', year: "", w: 1443, h: 1920, tone: "#95897C" },
  { file: "screentime",         collection: "recent", medium: "painting",    title: "Screen Time",               details: "", size: "", year: "", w: 1920, h: 1912, tone: "#6C5F40" }, // working title
  { file: "bus",                collection: "recent", medium: "painting",    title: "Bus",                       details: "", size: "", year: "", w: 1920, h: 1428, tone: "#827F73" }, // working title
  { file: "anxiety",            collection: "recent", medium: "painting",    title: "Breathe",                   details: "Oil paint on canvas",           size: '12x12"', year: "", w: 1920, h: 1920, tone: "#966A51" },
  // ---- Past Work (BFA years and before) ----
  { file: "past-oldlady",       collection: "past",   medium: "drawing",     title: "Portrait of Sultana",       details: "Ink, gouache, black and white charcoal on kraft Stonehenge paper", size: '13x18"', year: "", w: 1404, h: 1920, tone: "#716B62" },
  { file: "past-bucket",        collection: "past",   medium: "drawing",     title: "Pickled Gold",              details: "Ink, gouache, black and white charcoal on kraft Stonehenge paper", size: '16x22"', year: "", w: 1361, h: 1920, tone: "#726B61" },
  { file: "past-wedding",       collection: "past",   medium: "drawing",     title: "New Beginnings",            details: "Ink, gouache, black and white charcoal on kraft Stonehenge paper", size: '18x24"', year: "", w: 1553, h: 1920, tone: "#827A67" },
  { file: "past-hands",         collection: "past",   medium: "drawing",     title: "Yaya",                      details: "Ink, gouache, black and white charcoal on kraft Stonehenge paper", size: '22x30"', year: "", w: 1454, h: 1920, tone: "#988B70" },
  { file: "past-silverware",    collection: "past",   medium: "drawing",     title: "Southern Silver",           details: "White charcoal on black paper",                                    size: '17x21"', year: "", w: 1603, h: 1920, tone: "#434343" },
  { file: "past-paper",         collection: "past",   medium: "drawing",     title: "Crumple",                   details: "Colored pencils on white paper",                                   size: '22x30"', year: "", w: 1920, h: 1373, tone: "#8A8276" },
  { file: "past-leehall",       collection: "past",   medium: "drawing",     title: "Lee Hall",                  details: "Chalk pastel on black paper",                                      size: '12x14"', year: "", w: 1920, h: 1499, tone: "#877F71" },
  { file: "past-yaya",          collection: "past",   medium: "drawing",     title: "Yaya",                      details: "Colored pencils on white BFK Reeves paper",                        size: '14x17"', year: "", w: 1920, h: 1541, tone: "#A4A580" },
  { file: "past-miscellaneous", collection: "past",   medium: "drawing",     title: "Still Life with Cow Skull", details: "", size: "", year: "", w: 1839, h: 1374, tone: "#837661" }, // working title
  { file: "past-seashells",     collection: "past",   medium: "drawing",     title: "Seashells",                 details: "", size: "", year: "", w: 1783, h: 1920, tone: "#C7C2BB" }, // working title
];

window.BIO = [
  "Marika Dunne is a Mississippi artist who investigates grief, memory, and connection amid social and technological change, drawing from personal experience and family history to consider how individuals navigate time, distance, and shifting cultural realities.",
  "Born in Williamsburg, Virginia, she earned a Bachelor of Fine Arts from Mississippi State University. Her work utilizes painting, drawing, printmaking, and photography to examine tensions between presence and absence, clarity and obscurity, and the distances that form between people, memory, and place.",
  "She is currently in her second year of graduate study at the University of Mississippi, where she will earn her Master of Fine Arts in 2027 with a concentration in oil painting. Her artwork is influenced by her Greek American heritage and the Southern landscapes that shaped her upbringing. Her award-winning artwork has been featured in local and national exhibitions, including multiple juried art shows and the United States Capitol Building in Washington, D.C.",
];

window.STATEMENT = [
  "I am interested in how time transforms what we hold dear, eroding clarity and leaving behind impressions rather than complete images.",
  "My work visualizes this tension between permanence and impermanence, presence and absence, and clarity and obscurity through layered processes in painting. Among the current motifs I have focused on, water has become a significant element as a means of working through the concepts of time, death, distance, and memory. Other symbols in my work also echo these ideas. Scenes from memories, fragments of dreams and organic forms appear repeatedly, acting as markers of what remains and what fades.",
  "My paintings and prints are an attempt to give form to intangible experiences: the ebb and flow of grief, the slow dissolution of memory, and the search for continuity amid change. Through the blending of imagery and form, I aim to create spaces where viewers can sense both the weight of loss and the quiet persistence of connection, even as time moves forward and the markers of the past sink into shadow. Each piece becomes a meditation on what we hold onto and what slips away, inviting viewers to consider their own relationships with time, memory, and personal and cultural identity.",
];

// CV — same content as cv/marika-dunne-cv.tex
// Each entry: [year, title, details, juried?]  (year "" = same year as above)
window.CV = [
  ["Education", [
    ["2027", "MFA Candidate, Painting", "University of Mississippi, Oxford, MS"],
    ["2022", "BFA, Drawing, Summa Cum Laude", "Mississippi State University, Starkville, MS"],
  ]],
  ["Selected Exhibitions", [
    ["2026", "Black and White 2026", "Fusion International Art Gallery", true],
    ["", "16th Annual Figurative Art Exhibition", "Light Space & Time Gallery", true],
    ["", "Red", "Colors of Humanity Art Gallery", true],
    ["", "Human Nature", "Colors of Humanity Art Gallery", true],
    ["", "Yellow", "Colors of Humanity Art Gallery", true],
    ["", "Student Summer Exhibition", "University of Mississippi, Oxford, MS", true],
    ["", "Ecdysis Graduate Art Exhibition", "University of Mississippi, Oxford, MS"],
    ["", "24 Hours of Wonder", "University of Mississippi Museum, Oxford, MS"],
    ["", "One Night Stand", "Ole Miss Motel, Oxford, MS"],
    ["2025", "Square/Cubic", "Starkville Area Arts Council, Starkville, MS", true],
    ["", "Annual Holiday Miniatures Show", "Bozarts Gallery, Water Valley, MS"],
    ["", "Plein Air Art Exhibition", "Southside Gallery, Oxford, MS"],
    ["2024", "TEDx: Purpose and Potential Exhibit", "Ford Center for the Performing Arts, Oxford, MS"],
    ["2021", "49th Mississippi State Student Juried Exhibition", "Visual Arts Center, Mississippi State University, Starkville, MS"],
    ["", "MS Arts Farmer’s Market Exhibition", "Mississippi State University, Starkville, MS", true],
    ["2020", "Mississippi Collegiate Art Competition", "Summer Hall Art Gallery, The W, Columbus, MS", true],
    ["2019", "48th Mississippi State Student Juried Exhibition", "Mississippi State University, Starkville, MS"],
    ["", "Exploring the Farm and Livestock", "Cullis Wade Depot Art Gallery, Starkville, MS", true],
    ["2018", "47th Mississippi State Student Juried Exhibition", "Mississippi State University, Starkville, MS"],
  ]],
  ["Arts Festivals & Conferences", [
    ["2026", "Participant, Annual Ole Miss Iron Pour", "Oxford, MS"],
    ["2025", "Double Decker Arts Festival", "Oxford Arts Council, Oxford, MS"],
    ["2023", "Holiday Festival", "Starkville Area Arts Council, Starkville, MS"],
    ["", "Cotton District Arts Festival", "Starkville Area Arts Council, Starkville, MS"],
    ["2022", "MS Clayworks Clay Conference", "Meridian Community College, Meridian, MS"],
    ["", "Cotton District Arts Festival", "Starkville Area Arts Council, Starkville, MS"],
    ["2021", "Cotton District Arts Festival", "Starkville Area Arts Council, Starkville, MS", true],
  ]],
  ["Talks & Presentations", [
    ["2026", "Artist Talk Presenter", "Ecdysis Graduate Art Talk Session, University of Mississippi"],
    ["", "Research Podium Presenter", "Graduate Student Council Research & Creative Achievement Symposium"],
    ["", "Creative Research Presenter", "Graduate Student Council Research & Creative Achievement Symposium"],
    ["2025", "Presenter, Flux Flow Conference", "SECAC, Cincinnati, OH"],
    ["", "Visiting Artist", "Octopus Questions Podcast"],
  ]],
  ["Awards, Grants & Fellowships", [
    ["2026", "Honorable Mention, Human Nature", "Colors of Humanity Art Gallery"],
    ["", "Honorable Mention, Red", "Colors of Humanity Art Gallery"],
    ["2020", "Bill and Nelle D. Elam Scholarship", "Mississippi State University, Starkville, MS"],
    ["2019", "Del Rendon Scholarship", "Mississippi State University, Starkville, MS"],
    ["2017", "Overall Winner, National Congressional Art Competition, for Southern Silver", "Congressional Institute, Washington, D.C."],
    ["", "Best in Show, Buzzy’s Art Competition", "Starkville Area Arts Council, Starkville, MS"],
    ["", "Oktibbeha County Alumni Scholarship", ""],
  ]],
  ["Teaching & Professional Experience", [
    ["2027", "Graduate Teacher", "University of Mississippi, Oxford, MS"],
    ["2026", "Gallery Coordinator", "University of Mississippi, Oxford, MS"],
    ["", "Curator", ""],
    ["", "Painting Workshop Designer and Lecturer", ""],
    ["", "Printmaking Workshop Designer and Lecturer", ""],
    ["2024–26", "Graduate Teaching Assistant", "University of Mississippi, Oxford, MS"],
    ["2021, 2023", "Art Tutor, Private Lessons", "Starkville, MS"],
    ["2019–20", "Art Director and Counselor, SSD Spark Art Summer Camp", "Starkville Consolidated School District, Starkville, MS"],
    ["2017–26", "Freelance Artist", ""],
  ]],
  ["Service", [
    ["2026", "Jury Committee Member, Yokna Sculpture Trail", "Oxford, MS"],
  ]],
  ["Commissions & Sales", [
    ["2025", "Plein Air Painting Sales, Plein Air Art Exhibition", "Southside Gallery, Oxford, MS"],
    ["2020–22", "Provost Holiday Card Commission", "Office of the Provost, Mississippi State University, Starkville, MS"],
  ]],
];
