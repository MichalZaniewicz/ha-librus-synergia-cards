/** Usual Polish school abbreviations, keyed by lower-cased subject name. */
const SUBJECT_ABBREVIATIONS: Record<string, string> = {
  matematyka: "Mat",
  fizyka: "Fiz",
  chemia: "Chem",
  biologia: "Bio",
  geografia: "Geo",
  historia: "Hist",
  informatyka: "Inf",
  muzyka: "Muz",
  plastyka: "Plas",
  religia: "Rel",
  etyka: "Ety",
  technika: "Tech",
  przyroda: "Przy",
  "wychowanie fizyczne": "WF",
  "zajęcia z wychowawcą": "GW",
  "godzina wychowawcza": "GW",
  "edukacja dla bezpieczeństwa": "EDB",
  "wiedza o społeczeństwie": "WOS",
};

const LANGUAGE_ABBREVIATIONS: Record<string, string> = {
  polski: "Pol",
  angielski: "Ang",
  niemiecki: "Niem",
  francuski: "Fra",
  hiszpański: "Hisz",
  rosyjski: "Ros",
  włoski: "Wł",
  łaciński: "Łac",
};

const MINOR_WORDS = new Set(["z", "i", "w", "o", "dla", "na", "ze"]);

/** A short (≤4 chars) abbreviation for a subject name. Known subjects use
 * the usual school short forms; "Język X" becomes the language alone (so
 * three languages no longer all read "Jęz"); other multi-word names use
 * their initials; anything else is cut to 3 letters. */
export function abbreviate(name: string): string {
  const clean = name.replace(/\(.*\)/, "").trim();
  const key = clean.toLowerCase();
  if (SUBJECT_ABBREVIATIONS[key]) return SUBJECT_ABBREVIATIONS[key];
  const lang = key.match(/^język\s+(\S+)/);
  if (lang) {
    const word = lang[1];
    return LANGUAGE_ABBREVIATIONS[word] ?? word.charAt(0).toUpperCase() + word.slice(1, 3);
  }
  const words = clean.split(/\s+/).filter((w) => !MINOR_WORDS.has(w.toLowerCase()));
  if (words.length > 1) {
    return words.slice(0, 3).map((w) => w.charAt(0).toUpperCase()).join("");
  }
  return clean.length <= 4 ? clean : clean.slice(0, 3);
}
