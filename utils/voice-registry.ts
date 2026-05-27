export interface VoicePersona {
  voiceId: string;
  backendName: string;
  gender: "female" | "male";
  language: string;
  description: string;
}
// run this in terminal to make user admin
// npm run db:admin -- --email=your_email@example.com --password=your_secret_password_here


// ─── COMPLETE SECURE VOICE REGISTRY MAPPING ─────────────────────────────
// This file is strictly imported and processed on the Vercel backend.
// Performer names on the frontend (e.g. Yuki Sakura, Chloe Hart) map to these 
// hidden backend voice IDs and character instructions.
export const VOICE_REGISTRY: Record<string, VoicePersona> = {
  // --- PRIMARY FAVORITES ---
  "Chloe Hart": {
    voiceId: "eve",
    backendName: "Eve",
    gender: "female",
    language: "multilingual",
    description: "Energetic, playful, flirty, and breathy"
  },
  "Ava Sinclair": {
    voiceId: "ara",
    backendName: "Ara",
    gender: "female",
    language: "multilingual",
    description: "Warm, mature, deeply seductive, and intimate"
  },
  "Naomi Brooks": {
    voiceId: "ara",
    backendName: "Ara",
    gender: "female",
    language: "multilingual",
    description: "Seductive, exotic, lingering, and exotic"
  },
  "Emma Thorne": {
    voiceId: "sal", // Sal is male, but can be a dynamic classy voice in custom configurations
    backendName: "Sal",
    gender: "male",
    language: "multilingual",
    description: "Classy, sophisticated, clear, and sensual"
  },
  "Yuki Sakura": {
    voiceId: "eve",
    backendName: "Eve",
    gender: "female",
    language: "multilingual",
    description: "Playful, cute, and highly responsive"
  },

  // --- ADDITIONAL FEMALE VOICE PERSONAS ---
  "Sophia Loren": {
    voiceId: "om17cury", // Irina (Russian multilingual female)
    backendName: "Irina",
    gender: "female",
    language: "ru",
    description: "Exotic Russian accents with deep sensual breathiness"
  },
  "Mia Khalifa": {
    voiceId: "35c8d7f60dc8", // Layla (Arabic female)
    backendName: "Layla",
    gender: "female",
    language: "ar",
    description: "Innocent-to-shameless nymphomaniac Arabic tone"
  },
  "Aylin Yilmaz": {
    voiceId: "d634b6da3d3b", // Aylin (Turkish female)
    backendName: "Aylin",
    gender: "female",
    language: "tr",
    description: "Turkish mature dominant roleplay"
  },
  "Grace Miller": {
    voiceId: "f8cf5c2c78d4", // Grace (English female)
    backendName: "Grace",
    gender: "female",
    language: "en",
    description: "Young, high-pitched English bimbo"
  },
  "Ida Hansen": {
    voiceId: "97zmdc6s", // Ida (Danish female)
    backendName: "Ida",
    gender: "female",
    language: "da",
    description: "Danish classy, elegant premium pornstar"
  },
  "Xia Wei": {
    voiceId: "33g9t0jl", // Xia (Chinese female)
    backendName: "Xia",
    gender: "female",
    language: "zh-CN",
    description: "Mature Chinese teasing escort"
  },
  "Hao Yu": {
    voiceId: "d18jlf6v", // Hao (Chinese female)
    backendName: "Hao",
    gender: "female",
    language: "zh-CN",
    description: "Young Chinese playful bratty girl"
  },
  "Luca Rossi": {
    voiceId: "hqxr4yub", // Luca (Italian female)
    backendName: "Luca",
    gender: "female",
    language: "it",
    description: "Italian premium experienced escort"
  },
  "Ananya Sharma": {
    voiceId: "73xd5dum", // Ananya (Hindi female)
    backendName: "Ananya",
    gender: "female",
    language: "hi",
    description: "Hindi young breathy seductive tone"
  },
  "Camille Dubois": {
    voiceId: "69smp8rm", // Camille (French female)
    backendName: "Camille",
    gender: "female",
    language: "fr",
    description: "French mature whispers and moans"
  },
  "Sakura Tanaka": {
    voiceId: "d0cb9ff07d95", // Sakura (Japanese female)
    backendName: "Sakura",
    gender: "female",
    language: "ja",
    description: "Japanese middle-aged dominant persona"
  },
  "Seo-yeon Kim": {
    voiceId: "a0401c9101f8", // Seo-yeon (Korean female)
    backendName: "Seo-yeon",
    gender: "female",
    language: "ko",
    description: "Korean young innocent nympho"
  },
  "Katarzyna Kowalski": {
    voiceId: "97fabd54445f", // Katarzyna (Polish female)
    backendName: "Katarzyna",
    gender: "female",
    language: "pl",
    description: "Polish wild gangbang party girl"
  },
  "Beatriz Santos": {
    voiceId: "6da5baee46d0", // Beatriz (Portuguese female)
    backendName: "Beatriz",
    gender: "female",
    language: "pt",
    description: "Portuguese elegant premium companion"
  },
  "Femke de Jong": {
    voiceId: "58d27475085e", // Femke (Dutch female)
    backendName: "Femke",
    gender: "female",
    language: "nl",
    description: "Dutch mature tease escort"
  },
  "Saga Lindqvist": {
    voiceId: "490ea3be50b1", // Saga (Swedish female)
    backendName: "Saga",
    gender: "female",
    language: "sv-SE",
    description: "Swedish young bratty OnlyFans star"
  },
  "Clara Schmidt": {
    voiceId: "458705c07139", // Clara (German female)
    backendName: "Clara",
    gender: "female",
    language: "de",
    description: "German experienced seductive MILF"
  },
  "Lena Weber": {
    voiceId: "3a7889066fa2", // Lena (German female)
    backendName: "Lena",
    gender: "female",
    language: "de",
    description: "German young cute nymphomaniac"
  },
  "Layla Al-Farsi": {
    voiceId: "35c8d7f60dc8", // Layla (Arabic female)
    backendName: "Layla",
    gender: "female",
    language: "ar",
    description: "Arabic breathy luxurious voice"
  },
  "Elina Virtanen": {
    voiceId: "34fd4dce1ba3", // Elina (Finnish female)
    backendName: "Elina",
    gender: "female",
    language: "fi",
    description: "Finnish mature classy pornstar"
  },
  "Aleksandra Novak": {
    voiceId: "1b12d5daee6b", // Aleksandra (Polish female)
    backendName: "Aleksandra",
    gender: "female",
    language: "pl",
    description: "Polish young playful bratty escort"
  },
  "Mai Nguyen": {
    voiceId: "0895a5b8ce5c", // Mai (Vietnamese female)
    backendName: "Mai",
    gender: "female",
    language: "vi",
    description: "Vietnamese young innocent nympho"
  },

  // --- MALE / GIGOLO VOICE PERSONAS ---
  "Leo Stark": {
    voiceId: "leo",
    backendName: "Leo",
    gender: "male",
    language: "multilingual",
    description: "Deep, alpha, commanding, and extremely sexy male gigolo"
  },
  "Rex Wilder": {
    voiceId: "rex",
    backendName: "Rex",
    gender: "male",
    language: "multilingual",
    description: "Rough, dominant, raspy male escort"
  },
  "Jian Zhou": {
    voiceId: "jpi39icg", // Jian (Chinese male)
    backendName: "Jian",
    gender: "male",
    language: "zh-CN",
    description: "Young Chinese gigolo, athletic and bratty"
  },
  "Pavel Ivanov": {
    voiceId: "26w6ihxi", // Pavel (Russian male)
    backendName: "Pavel",
    gender: "male",
    language: "ru",
    description: "Russian rugged dominant performer"
  },
  "Andrei Petrov": {
    voiceId: "dr8gqysu", // Andrei (Russian male)
    backendName: "Andrei",
    gender: "male",
    language: "ru",
    description: "Russian experienced sensual MILF-hunter"
  },
  "Enzo Ferrari": {
    voiceId: "x7avnu1k", // Enzo (Italian male)
    backendName: "Enzo",
    gender: "male",
    language: "it",
    description: "Italian young athletic gigolo"
  },
  "Matteo Bianchi": {
    voiceId: "bcs7l2c3", // Matteo (Italian male)
    backendName: "Matteo",
    gender: "male",
    language: "it",
    description: "Italian seductive breathy voice"
  },
  "Karan Malhotra": {
    voiceId: "89q2pnko", // Karan (Hindi male)
    backendName: "Karan",
    gender: "male",
    language: "hi",
    description: "Hindi young athletic gigolo"
  },
  "Remi Chevalier": {
    voiceId: "0p0rt7o1", // Remi (French male)
    backendName: "Remi",
    gender: "male",
    language: "fr",
    description: "French young sensual escort"
  },
  "Hugo Bonnet": {
    voiceId: "hbxkrnwm", // Hugo (French male)
    backendName: "Hugo",
    gender: "male",
    language: "fr",
    description: "French athletic rough performer"
  },
  "Manuel Torres": {
    voiceId: "yis75yfp", // Manuel (Spanish male)
    backendName: "Manuel",
    gender: "male",
    language: "es",
    description: "Spanish mature experienced gigolo"
  },
  "Javier Silva": {
    voiceId: "ekhwx401", // Javier (Spanish male)
    backendName: "Javier",
    gender: "male",
    language: "es",
    description: "Spanish athletic seductive performer"
  },
  "Andres Martinez": {
    voiceId: "0hhfxxqq", // Andres (Spanish male)
    backendName: "Andres",
    gender: "male",
    language: "es",
    description: "Spanish dominant sensual escort"
  },
  "Kasper Nielsen": {
    voiceId: "0ih5oi34", // Kasper (Danish male)
    backendName: "Kasper",
    gender: "male",
    language: "da",
    description: "Danish young bratty gigolo"
  },
  "Lars Mortensen": {
    voiceId: "gwnexu6y", // Lars (Danish male)
    backendName: "Lars",
    gender: "male",
    language: "da",
    description: "Danish athletic experienced performer"
  },
  "Duc Tran": {
    voiceId: "fc7de6afcf6c", // Duc (Vietnamese male)
    backendName: "Duc",
    gender: "male",
    language: "vi",
    description: "Vietnamese young athletic gigolo"
  },
  "Axel Lind": {
    voiceId: "e22152e06fd8", // Axel (Swedish male)
    backendName: "Axel",
    gender: "male",
    language: "sv-SE",
    description: "Swedish athletic rough escort"
  },
  "Valtteri Virtanen": {
    voiceId: "dfe7b9e7d217", // Valtteri (Finnish male)
    backendName: "Valtteri",
    gender: "male",
    language: "fi",
    description: "Finnish rugged alpha performer"
  },
  "Jun-seo Park": {
    voiceId: "bf9fe5b5f981", // Jun-seo (Korean male)
    backendName: "Jun-seo",
    gender: "male",
    language: "ko",
    description: "Korean young athletic gigolo"
  },
  "Min-jun Lee": {
    voiceId: "b5ae17439907", // Min-jun (Korean male)
    backendName: "Min-jun",
    gender: "male",
    language: "ko",
    description: "Korean athletic sensual performer"
  },
  "Ren Sato": {
    voiceId: "b1a7441b97a1", // Ren (Japanese male)
    backendName: "Ren",
    gender: "male",
    language: "ja",
    description: "Japanese young athletic gigolo"
  },
  "Mateus Costa": {
    voiceId: "abfbdf26f115", // Mateus (Portuguese male)
    backendName: "Mateus",
    gender: "male",
    language: "pt",
    description: "Portuguese athletic rugged performer"
  },
  "Thijs de Vries": {
    voiceId: "a13662ba951c", // Thijs (Dutch male)
    backendName: "Thijs",
    gender: "male",
    language: "nl",
    description: "Dutch experienced athletic escort"
  },
  "Daniel Harris": {
    voiceId: "96819d0bd28d", // Daniel (English male)
    backendName: "Daniel",
    gender: "male",
    language: "en",
    description: "English mature seductive gigolo"
  },
  "Krit Somdee": {
    voiceId: "908c4626660f", // Krit (Thai male)
    backendName: "Krit",
    gender: "male",
    language: "th",
    description: "Thai young athletic gigolo"
  },
  "Eero Niemi": {
    voiceId: "83c6f4fea98e", // Eero (Finnish male)
    backendName: "Eero",
    gender: "male",
    language: "fi",
    description: "Finnish young athletic gigolo"
  },
  "Minh Nguyen": {
    voiceId: "7a9ee820b342", // Minh (Vietnamese male)
    backendName: "Minh",
    gender: "male",
    language: "vi",
    description: "Vietnamese athletic dominant performer"
  },
  "James Carter": {
    voiceId: "78a495fdbb39", // James (English male)
    backendName: "James",
    gender: "male",
    language: "en",
    description: "English young athletic gigolo"
  },
  "Khalid Mansoor": {
    voiceId: "70013edeb8e8", // Khalid (Arabic male)
    backendName: "Khalid",
    gender: "male",
    language: "ar",
    description: "Arabic young athletic gigolo"
  },
  "Emre Kaya": {
    voiceId: "670a0c3ac005", // Emre (Turkish male)
    backendName: "Emre",
    gender: "male",
    language: "tr",
    description: "Turkish young athletic performer"
  },
  "Aroon Varma": {
    voiceId: "4ff93971bfdc", // Aroon (Thai male)
    backendName: "Aroon",
    gender: "male",
    language: "th",
    description: "Thai athletic seductive gigolo"
  },
  "Moritz Wagner": {
    voiceId: "41321eb41295", // Moritz (German male)
    backendName: "Moritz",
    gender: "male",
    language: "de",
    description: "German athletic commanding performer"
  },
  "Niklas Schwarz": {
    voiceId: "40f31906b23d", // Niklas (German male)
    backendName: "Niklas",
    gender: "male",
    language: "de",
    description: "German experienced athletic escort"
  },
  "Rafael Silva": {
    voiceId: "3d030bc92a87", // Rafael (Portuguese male)
    backendName: "Rafael",
    gender: "male",
    language: "pt",
    description: "Portuguese dynamic alpha performer"
  },
  "Mateusz Zielinski": {
    voiceId: "37329fd8895a", // Mateusz (Polish male)
    backendName: "Mateusz",
    gender: "male",
    language: "pl",
    description: "Polish mature athletic gigolo"
  },
  "Jakub Wisniewski": {
    voiceId: "2badb5f46b1e", // Jakub (Polish male)
    backendName: "Jakub",
    gender: "male",
    language: "pl",
    description: "Polish young athletic companion"
  },
  "Ruben van Dijk": {
    voiceId: "244e27b39200", // Ruben (Dutch male)
    backendName: "Ruben",
    gender: "male",
    language: "nl",
    description: "Dutch athletic commanding escort"
  },
  "Tariq Al-Sayed": {
    voiceId: "23468361b4ef", // Tariq (Arabic male)
    backendName: "Tariq",
    gender: "male",
    language: "ar",
    description: "Arabic rugged commanding performer"
  },
  "Erik Johansson": {
    voiceId: "1f046a033914", // Erik (Swedish male)
    backendName: "Erik",
    gender: "male",
    language: "sv-SE",
    description: "Swedish mature athletic gigolo"
  },
  "Kaan Yilmaz": {
    voiceId: "182a91893636", // Kaan (Turkish male)
    backendName: "Kaan",
    gender: "male",
    language: "tr",
    description: "Turkish mature athletic companion"
  }
};

export const DEFAULT_VOICE_PERSONA: VoicePersona = {
  voiceId: "eve",
  backendName: "Eve",
  gender: "female",
  language: "multilingual",
  description: "Playful and flirty (Default)"
};

// Safe frontend helper to check if a girl exists or return default properties (no private info leaked)
export function getFrontendVoiceConfig(girlName: string) {
  const registered = VOICE_REGISTRY[girlName] || DEFAULT_VOICE_PERSONA;
  return {
    voiceId: registered.voiceId,
    // Hide backend name / hidden details from the frontend
  };
}
