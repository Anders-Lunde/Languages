<template>
  <div style="height: 66%">
    <v-container fill-height fluid>
      <v-row class="" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <span class="text-h2  mx-auto font-weight-light">{{
                capitalize(currentWord)
              }}</span>
            </v-card-title>
            <v-card-text>
              msg: {{ feedbackMessage }}
              <br />
              vocabularySize: {{ vocabularySize }}
              <br />
              currentWord: {{ currentWord }}
              <br />
              currentWordIndex: {{ currentWordIndex }}
              <br />
              currentBandIndex: {{ currentBandIndex }}
              <br />
              currentSetIndex: {{ currentSetIndex }}
              <br />
              currentUserAllDataMap: {{ currentSetIndex }}
              <br />
              isFullStopOfTest: {{ isFullStopOfTest }}
              <br />
            </v-card-text>
            <v-card-actions class="mt-10">
              <v-spacer></v-spacer>
              <!-- OK button between sets -->
              <v-btn
                v-if="isSetDone"
                large
                @click="setDoneOkBtn()"
                color="primary"
              >
                {{ btnSetDoneOk }}
              </v-btn>
              <!-- No button -->

              <v-btn
                v-if="!isSetDone"
                large
                @click="onResponse(false)"
                outlined
                text
              >
                {{ btnNo }}
              </v-btn>
              <v-spacer v-if="!isSetDone"></v-spacer
              ><v-spacer v-if="!isSetDone"></v-spacer
              ><v-spacer v-if="!isSetDone"></v-spacer>
              <!-- Yes button -->

              <v-btn
                v-if="!isSetDone"
                large
                @click="onResponse(true)"
                color="primary"
              >
                {{ btnYes }}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn large @click="generateSequence()" color="primary">
      generate
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
//import dummy from "@/components/dummy.vue";

export default Vue.extend({
  name: "VocabularyTest",
  components: {
    //dummy
  },
  computed: {
    dispLang() {
      return this.$store.state.displayLanguage;
    },

    btnYes() {
      if (this.dispLang == "no") {
        return "Ja";
      } else {
        return "Yes";
      }
    },
    btnNo() {
      if (this.dispLang == "no") {
        return "Nei";
      } else {
        return "No";
      }
    },
    btnSetDoneOk() {
      if (this.dispLang == "no") {
        return "OK";
      } else {
        return "OK";
      }
    }
  },
  props: {},
  data() {
    return {
      currentWord: "placeholder",
      currentWordIndex: 0,
      currentBandIndex: 0, //Always start with bottom band
      currentSetIndex: 0, //This is set in mounted(), depending on grade9/10 as 0 or 2. (grade 10 starts with set 3)
      currentUserAllDataMap: {},
      isSetDone: false,
      isFullStopOfTest: false,
      feedbackMessage: "",
      bands: ["c1c5", "c6c10", "c11c15", "c16c20", "k3k4"],
      sets: ["set1", "set2", "set3", "set4", "set5"],
      words: this.$store.state.words,
      //For debug:
      vocabularySize: 0
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    setDoneOkBtn() {
      this.isSetDone = false;
      this.feedbackMessage = "";
    },

    /*
     *METHOD START:
     */
    setNextWord() {
      const currentBand = this.bands[this.currentBandIndex];
      const currentSet = this.sets[this.currentSetIndex];
      this.currentWord = this.currentUserAllDataMap[currentBand][currentSet][
        this.currentWordIndex
      ].word;
    },

    /*
     *METHOD START:
     */
    generateSequence: function() {
      console.log("Starting generateSequence()");
      this.isSetDone = false;
      const currentBand = this.bands[this.currentBandIndex];
      const currentSet = this.sets[this.currentSetIndex];

      const real = this.words[currentBand][currentSet].real;
      const nonsense = this.words[currentBand][currentSet].nonsense;

      /* GENERATE A MAP THAT LOOKS LIKE THIS WHEN FILLED.
      FILLED SEQUENTIOALLY, AFTER EACH BAND COMPLETES.
      const map = {
        c1c5: {
          set1: [
            {
            word: ,
            isReal: ,
            userAnswer: ,
            randomIndex: ,
            originalIndex: ,

            },
            {...}
          ],
          set2: []
        },
        c6c10: {},
        c11c15: {},
      };
        */
      // console.log(range(0, 30));
      // prettier-ignore
      const indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
      const indexArrayRandomized = this.shuffle(indexArray);
      const combined = [...real, ...nonsense];

      const array = [];
      for (let i = 0; i < 30; i++) {
        const tmp = {};
        tmp.userAnswer = null;
        tmp.orderAsPresented = i;
        const rndIndex = indexArrayRandomized[i];
        tmp.word = combined[rndIndex];
        tmp.isReal = rndIndex < 20;
        tmp.indexInCombinedArray = rndIndex;
        tmp.score = 0;
        array.push(tmp);
      }
      if (this.currentUserAllDataMap[currentBand] == null) {
        this.currentUserAllDataMap[currentBand] = {};
      }
      this.currentUserAllDataMap[currentBand][currentSet] = array;
      console.log("Generate data success!");
    },

    /*
     *METHOD START:
     */
    onResponse: function(response) {
      console.log("Response: ", response);
      const currentBand = this.bands[this.currentBandIndex];
      const currentSet = this.sets[this.currentSetIndex];
      //Record response
      this.currentUserAllDataMap[currentBand][currentSet][
        this.currentWordIndex
      ].userAnswer = response;

      //Record score
      const isRealWord = this.currentUserAllDataMap[currentBand][currentSet][
        this.currentWordIndex
      ].isReal;
      if (isRealWord && response == true) {
        this.currentUserAllDataMap[currentBand][currentSet][
          this.currentWordIndex
        ].score = 1;
      } else if (!isRealWord && response == true) {
        this.currentUserAllDataMap[currentBand][currentSet][
          this.currentWordIndex
        ].score = -2;
      }

      //Iterate
      this.currentWordIndex += 1;

      const currentUserWordArray = this.currentUserAllDataMap[currentBand][
        currentSet
      ];

      if (this.currentWordIndex >= currentUserWordArray.length) {
        this.isSetDone = true;
      }
      //If done/not done
      if (!this.isSetDone) {
        this.setNextWord();
        return; //RETURN
      }

      //Else, if set is done:
      //Calc total score
      let totalScore = 0;

      for (const e in currentUserWordArray) {
        totalScore += e.score;
      }
      //Calc vocabulary size
      const MaxScore = 20;
      const PercentageForThisBand = (totalScore / MaxScore) * 100;
      let vocabularySize = 0;
      if (this.currentBandIndex == 0) {
        vocabularySize = Math.round(500 * PercentageForThisBand);
      } else if (this.currentBandIndex == 1) {
        vocabularySize = Math.round(1000 * PercentageForThisBand);
      } else if (this.currentBandIndex == 2) {
        vocabularySize = Math.round(1500 * PercentageForThisBand);
      } else if (this.currentBandIndex == 3) {
        vocabularySize = Math.round(2000 * PercentageForThisBand);
      } else if (this.currentBandIndex == 4) {
        vocabularySize = Math.round(3000 * PercentageForThisBand);
      } else {
        alert("ERROR: SOMETHING WENT WRONG WITH CALCULATING VOCABULARY SIZE");
        vocabularySize =
          "ERROR: SOMETHING WENT WRONG WITH CALCULATING VOCABULARY SIZE";
      }

      this.vocabularySize = vocabularySize;

      const CUTOFF = 70;
      const isPilot = this.$store.state.grade.isPilot;
      const firstOfTwoSetsAndPilot =
        [0, 2].includes(this.currentSetIndex) && isPilot;
      let msg = "";

      //       s1:
      //   "Gratulerer! Du kan ca. x ord på fransk. Ta en ny test for å bekrefte resultatet ditt.",
      // s2:
      //   "Gratulerer! Du kan ca. x ord på fransk. Ta neste test for å utforske nivået ditt.",

      // if (this.dispLang == "no") {
      //             message = "";
      //           } else {
      //             message = "";
      //           }

      //CASE 1: If passed the test
      if (PercentageForThisBand >= CUTOFF) {
        //If this is pilot, and the first of two sets to be forced to take
        if (firstOfTwoSetsAndPilot) {
          msg =
            "Gratulerer! Du kan ca. x ord på fransk. Ta en ny test for å bekrefte resultatet ditt.";
        } else {
          msg =
            "Gratulerer! Du kan ca. x ord på fransk. Ta neste test for å utforske nivået ditt.";
        }
      }
      //CASE 2: If NOT passed the test, but with positive score
      else if (PercentageForThisBand > 0) {
        //If pilot, always force a possible second set, even when low score
        if (firstOfTwoSetsAndPilot) {
          msg =
            "Gratulerer! Du kan ca. x ord på fransk. Ta en ny test for å bekrefte resultatet ditt.";
        } else {
          this.isFullStopOfTest = true;
          msg = "Gratulerer! Du kan ca. x ord på fransk.";
        }
      }
      //CASE 3: If NOT passed the test, with negative score
      else {
        //If pilot, always force a possible second set, even when low score
        if (firstOfTwoSetsAndPilot) {
          msg =
            "Beklager! Vi kunne ikke estimere din vokabularstørrelse. Ta en ny test for å prøve igjen.";
        } else {
          this.isFullStopOfTest = true;
          msg = "Beklager! Vi kunne ikke estimere din vokabularstørrelse.";
        }
      }

      this.feedbackMessage = msg;

      //If there are no more bands/sets
      if (
        !firstOfTwoSetsAndPilot &&
        this.currentBandIndex == this.bands.length
      ) {
        this.isFullStopOfTest = true;
      }

      //Last calcs
      if (this.isFullStopOfTest == false) {
        this.currentWordIndex = 0;

        //Iterate to next set/band
        if (firstOfTwoSetsAndPilot) {
          this.currentSetIndex += 1;
        } else {
          this.currentBandIndex += 1;
          if (this.$store.state.grade == "grade9") {
            this.currentSetIndex = 0;
          }
          if (this.$store.state.grade == "grade10") {
            this.currentSetIndex = 2;
          }
        }
        //Prepare for next set/band
        this.generateSequence(); //generates this.currentUserAllDataMap
        this.setNextWord();
      }
    },
    /*
     *METHOD START:
     */
    capitalize: function(s) {
      return s[0].toUpperCase() + s.slice(1);
    },

    /*
     *METHOD START:
     */
    shuffle: function(array) {
      //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      let currentIndex = array.length,
        randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }
      return array;
    }
  },
  mounted() {
    if (this.$store.state.grade == "grade9") {
      this.currentSetIndex = 0;
    }
    if (this.$store.state.grade == "grade10") {
      this.currentSetIndex = 2;
    }
    this.currentBandIndex = 0;
    this.currentWordIndex = 0;

    this.generateSequence(); //generates this.currentUserAllDataMap
    this.setNextWord();
  }
});
</script>

<style scoped></style>
