import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displayLanguage: "en",
    country: "",
    school: "",
    fullname: "",
    email: "",
    /* WORDS */
    words: {
      c1c5: {
        set1: {
          real: [
            "jour",
            "rester",
            "entre",
            "bien",
            "famille",
            "partir",
            "ensemble",
            "donc",
            "gens",
            "lorsque",
            "retrouver",
            "plutôt",
            "membre",
            "libre",
            "enfin",
            "essayer",
            "argent",
            "conduire",
            "intérieur",
            "école"
          ],
          nonsense: [
            "abattir",
            "champile",
            "eltrisse",
            "gaston",
            "imbant",
            "leinte",
            "nadoir",
            "palitaire",
            "signard",
            "valiant"
          ]
        },
        set2: {
          real: [
            "monsieur",
            "savoir",
            "dans",
            "quelque",
            "enfant",
            "recevoir",
            "compter",
            "seul",
            "façon",
            "selon",
            "important",
            "nombre",
            "œuvre",
            "américain",
            "assez",
            "apprendre",
            "accord",
            "espérer",
            "prêt",
            "principe"
          ],

          nonsense: [
            "bletter",
            "diroir",
            "fontre",
            "houroux",
            "jiverle",
            "malignant",
            "octe",
            "ralive",
            "taitelle",
            "écourt"
          ]
        },
        set3: {
          real: [
            "part",
            "donner",
            "nous",
            "ainsi",
            "rapport",
            "laisser",
            "petit",
            "contre",
            "exemple",
            "plusieurs",
            "mort",
            "surtout",
            "maison",
            "prochain",
            "atteindre",
            "parti",
            "type",
            "avancer",
            "gros",
            "sauf"
          ],

          nonsense: [
            "abjecter",
            "choint",
            "empâtrer",
            "gestide",
            "introis",
            "lifrer",
            "naçon",
            "pantrier",
            "siève",
            "valline"
          ]
        },
        set4: {
          real: [
            "personne",
            "vouloir",
            "cela",
            "lequel",
            "groupe",
            "appeler",
            "général",
            "homme",
            "face",
            "quoi",
            "international",
            "mieux",
            "manière",
            "juste",
            "recherche",
            "reprendre",
            "activité",
            "engager",
            "grave",
            "époque"
          ],

          nonsense: [
            "boînase",
            "dour",
            "formirique",
            "jousle",
            "mallenier",
            "oinir",
            "rapoise",
            "tellène",
            "éphrasir",
            "aige"
          ]
        },
        set5: {
          real: [
            "raison",
            "prendre",
            "dont",
            "très",
            "femme",
            "montrer",
            "devenir",
            "tant",
            "ministre",
            "toucher",
            "mauvais",
            "également",
            "décision",
            "ailleurs",
            "éviter",
            "reste",
            "mise",
            "prévoir",
            "prise",
            "afin"
          ],

          nonsense: []
        }
      },
      c6c10: {
        set1: {
          real: [
            "appel",
            "mondial",
            "parvenir",
            "nation",
            "fille",
            "tourner",
            "gauche",
            "assister",
            "opinion",
            "commun",
            "accompagner",
            "possibilité",
            "chemin",
            "hier",
            "lever",
            "pression",
            "progrès",
            "séparer",
            "défense",
            "culture"
          ],

          nonsense: [
            "agrautable",
            "clabrer",
            "eupres",
            "gillais",
            "joyance",
            "loruste",
            "nolois",
            "pentée",
            "sortapes",
            "vanide"
          ]
        },
        set2: {
          real: [
            "conseil",
            "noir",
            "quitter",
            "événement",
            "article",
            "réserver",
            "militaire",
            "couvrir",
            "auteur",
            "instant",
            "discuter",
            "mourir",
            "entrée",
            "fédéral",
            "limiter",
            "connaissance",
            "aspect",
            "positif",
            "rapporter",
            "caractère"
          ],

          nonsense: [
            "brigeable",
            "détrame",
            "froise",
            "julir",
            "manchir",
            "optile",
            "ratoir",
            "tentre",
            "évirelle",
            "préjate"
          ]
        },
        set3: {
          real: [
            "genre",
            "riche",
            "envoyer",
            "cœur",
            "justice",
            "naître",
            "capable",
            "découvrir",
            "autorité",
            "dangereux",
            "intervenir",
            "peur",
            "fruit",
            "hors",
            "composer",
            "respect",
            "éducation",
            "outre",
            "septembre",
            "déterminer"
          ],

          nonsense: [
            "aige",
            "crétale",
            "fronter",
            "gineux",
            "jupaire",
            "luvois",
            "nutaindre",
            "pestulant",
            "soupaire",
            "vauche"
          ]
        },
        set4: {
          real: [
            "organisation",
            "puisque",
            "finir",
            "payer",
            "contrôle",
            "répéter",
            "apparaître",
            "soumettre",
            "capacité",
            "actuellement",
            "organiser",
            "dossier",
            "discussion",
            "supérieur",
            "plaire",
            "motion",
            "disposition",
            "civil",
            "prêter",
            "fonder"
          ],

          nonsense: [
            "brossin",
            "fréquir",
            "giste",
            "juquette",
            "matrer",
            "ostral",
            "reportation",
            "tinquant",
            "aperne",
            "porvent"
          ]
        },
        set5: {
          real: [
            "parent",
            "traiter",
            "garder",
            "placer",
            "sénateur",
            "respecter",
            "local",
            "admettre",
            "énergie",
            "opération",
            "résoudre",
            "échange",
            "octobre",
            "direct",
            "police",
            "province",
            "danger",
            "manifester",
            "procédure",
            "presse"
          ],

          nonsense: []
        }
      },
      c11c15: {
        set1: {
          real: [
            "apprécier",
            "puissance",
            "élève",
            "désormais",
            "individu",
            "science",
            "traitement",
            "physique",
            "prévenir",
            "silence",
            "extrême",
            "parlementaire",
            "opérer",
            "institut",
            "participation",
            "samedi",
            "avion",
            "entretien",
            "identité",
            "vague"
          ],

          nonsense: [
            "armantisse",
            "crît",
            "grasper",
            "juvaine",
            "melindre",
            "outrir",
            "retroubir",
            "tirôt",
            "veindre",
            "piédeur"
          ]
        },
        set2: {
          real: [
            "causer",
            "prison",
            "soldat",
            "libéral",
            "maximum",
            "retraite",
            "soutien",
            "tendre",
            "recueillir",
            "roman",
            "disponible",
            "collectif",
            "supporter",
            "juge",
            "marque",
            "démocratique",
            "amendement",
            "fête",
            "représentation",
            "culturel"
          ],

          nonsense: [
            "culon",
            "gélard",
            "légisphérique",
            "plassart",
            "sureux",
            "vernique",
            "montale",
            "prévieux",
            "rérisse",
            "triparoix"
          ]
        },
        set3: {
          real: [
            "contribuer",
            "mardi",
            "recommandation",
            "établissement",
            "emprunter",
            "couple",
            "réserve",
            "vivant",
            "analyser",
            "couleur",
            "précieux",
            "droite",
            "inquiéter",
            "degré",
            "utilisation",
            "clairement",
            "agence",
            "employé",
            "personnage",
            "final"
          ],

          nonsense: [
            "aurois",
            "morler",
            "plite",
            "riquer",
            "touceul",
            "vusier",
            "rubir",
            "prétenser",
            "priet",
            "rojette"
          ]
        },
        set4: {
          real: [
            "provoquer",
            "manque",
            "échec",
            "complètement",
            "emporter",
            "crainte",
            "sang",
            "profond",
            "surveiller",
            "perspective",
            "supplémentaire",
            "défaut",
            "affecter",
            "formule",
            "juillet",
            "léger",
            "août",
            "chômage",
            "meurtre",
            "vertu"
          ],

          nonsense: [
            "métracte",
            "plumbard",
            "trifler",
            "avribeur",
            "overge",
            "prétemance",
            "roile",
            "proine",
            "ronçois",
            "précont"
          ]
        },
        set5: {
          real: [
            "ramener",
            "frère",
            "émission",
            "lourd",
            "acquérir",
            "crédit",
            "professeur",
            "relatif",
            "sauver",
            "code",
            "efficace",
            "exceptionnel",
            "renouveler",
            "habitant",
            "transfert",
            "russe",
            "bois",
            "contexte",
            "israélien",
            "priorité"
          ],

          nonsense: []
        }
      },
      c16c20: {
        set1: {
          real: [
            "sœur",
            "diviser",
            "effectivement",
            "guère",
            "ouest",
            "percevoir",
            "définitif",
            "espagnol",
            "soleil",
            "intégrer",
            "conséquent",
            "écart",
            "goût",
            "mentionner",
            "communautaire",
            "rendez-vous",
            "stade",
            "reculer",
            "québécois",
            "considération"
          ],

          nonsense: [
            "cipiler",
            "attrogne",
            "guif",
            "mocyre",
            "ouacs",
            "défirisol",
            "haileur",
            "canvert",
            "récoger",
            "sinatique"
          ]
        },
        set2: {
          real: [
            "cour",
            "supprimer",
            "malheureusement",
            "trafic",
            "fonctionnaire",
            "rassembler",
            "annuel",
            "hauteur",
            "vacance",
            "financer",
            "phénomène",
            "intellectuel",
            "chrétien",
            "assumer",
            "effectif",
            "clore",
            "cerveau",
            "préserver",
            "nécessairement",
            "véhicule"
          ],

          nonsense: [
            "demiler",
            "cier",
            "iltuible",
            "jouf",
            "métoriste",
            "pervequir",
            "angiol",
            "révoner",
            "attroucer",
            "andulande"
          ]
        },
        set3: {
          real: [
            "foyer",
            "consulter",
            "relativement",
            "approche",
            "concert",
            "résumer",
            "soviétique",
            "indépendance",
            "ennemi",
            "nier",
            "suffisamment",
            "calme",
            "immeuble",
            "faciliter",
            "plainte",
            "apercevoir",
            "bâtiment",
            "illustrer",
            "faim",
            "courrier"
          ],

          nonsense: [
            "dour",
            "substiger",
            "concipter",
            "nuer",
            "algraître",
            "emmagnoc",
            "accroucer",
            "allerande",
            "colfenisme",
            "aveuil"
          ]
        },
        set4: {
          real: [
            "garçon",
            "approcher",
            "colère",
            "occidental",
            "calcul",
            "approuver",
            "incapable",
            "assurance",
            "vice-président",
            "récupérer",
            "fortement",
            "sort",
            "maire",
            "animer",
            "norme",
            "attentat",
            "réception",
            "grandir",
            "bonjour",
            "contester"
          ],

          nonsense: [
            "coir",
            "méddiaraisement",
            "foxer",
            "nair",
            "ancrogner",
            "haitier",
            "canceon",
            "réconer",
            "altroucer",
            "colgenisme"
          ]
        },
        set5: {
          real: [
            "juif",
            "accroître",
            "mécanisme",
            "procès",
            "communiste",
            "avouer",
            "universel",
            "hypothèse",
            "phase",
            "régulier",
            "contribution",
            "découverte",
            "club",
            "rétablir",
            "surprise",
            "exécution",
            "canal",
            "éclater",
            "irakien",
            "destruction"
          ],

          nonsense: []
        }
      },
      k3k4: {
        set1: {
          real: [
            "adversaire",
            "agression",
            "avalanche",
            "billet",
            "chapeau",
            "chasse",
            "comparaison",
            "concurrent",
            "doubler",
            "entamer",
            "intégration",
            "marchandise",
            "portée",
            "préserver",
            "prévu",
            "pénétrer",
            "reporter",
            "répercussion",
            "unanime",
            "vérification"
          ],

          nonsense: [
            "abserbeure",
            "aphassien",
            "mullet",
            "bresse",
            "concoûlent",
            "louvrer",
            "enceder",
            "recester",
            "flisser",
            "intercouc"
          ]
        },
        set2: {
          real: [
            "adolescent",
            "affaiblissement",
            "applicable",
            "bulletin",
            "chimique",
            "classer",
            "continent",
            "diplomatique",
            "engendrer",
            "finale",
            "institutionnel",
            "interview",
            "intituler",
            "investisseur",
            "légèrement",
            "midi",
            "pont",
            "réacteur",
            "répandre",
            "échanger"
          ],

          nonsense: [
            "brisse",
            "toutrer",
            "pestée",
            "sécéder",
            "revetter",
            "prosser",
            "encongler",
            "fecane",
            "infortissier",
            "bidu"
          ]
        },
        set3: {
          real: [
            "abri",
            "calmer",
            "citoyenneté",
            "couler",
            "extension",
            "faim",
            "fondation",
            "fortune",
            "injuste",
            "louer",
            "légal",
            "malheur",
            "marine",
            "performance",
            "potentiel",
            "revendiquer",
            "siéger",
            "spécification",
            "tabac",
            "virus"
          ],

          nonsense: [
            "cresse",
            "réperbinnion",
            "billaton",
            "attouchissament",
            "blisser",
            "intercoup",
            "pint",
            "charrer",
            "pammer",
            "exterpien"
          ]
        },
        set4: {
          real: [
            "abattre",
            "aliment",
            "brusquement",
            "compréhension",
            "croître",
            "dessin",
            "domicile",
            "dominat",
            "drapeau",
            "effacer",
            "modeste",
            "nominal",
            "olympique",
            "plonger",
            "renouveler",
            "repas",
            "rédaction",
            "sacré",
            "sale",
            "vider"
          ],

          nonsense: [
            "trevique",
            "flesser",
            "rognalatique",
            "enconcher",
            "encartisseur",
            "tont",
            "récartre",
            "trander",
            "palger",
            "feum"
          ]
        },
        set5: {
          real: [],
          nonsense: []
        }
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
