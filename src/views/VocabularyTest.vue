<template>
  <div style="height: 66%">
    <v-container fill-height fluid>
      <v-row class="" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-chip v-if="isRealMethod() && debug">REAL</v-chip>
              <span
                v-if="!showUserfeedback"
                class="text-h2  mx-auto font-weight-light"
                >{{ capitalize(currentWord) }}</span
              >
            </v-card-title>
            <v-card-text v-if="showUserfeedback">
              <span
                text-color="black"
                class="text-h5 mx-auto black--text font-weight-medium"
                >{{ feedbackMessage }}</span
              >
            </v-card-text>

            <v-card-text v-if="debug">
              msg: {{ feedbackMessage }}
              <br />
              vocabularySize: {{ vocabularySize }}
              <br />
              <br />
              totalVocabulary: {{ totalVocabulary }}
              <br />
              <br />
              totalScore: {{ totalScore }}
              <br />
              PercentageForThisSet: {{ PercentageForThisSet }}
              <br />
              currentWord: {{ currentWord }}
              <br />
              currentWordIndex: {{ currentWordIndex }}
              <br />
              currentBandIndex: {{ currentBandIndex }}
              <br />
              currentSetIndex: {{ currentSetIndex }}
              <br />
              isFullStopOfTest: {{ isFullStopOfTest }}
              <br />
              <br />
              isRealMethod: {{ isRealMethod() }}
              <br />
              <br />
              firstOfTwoSetsAndPilot: {{ firstOfTwoSetsAndPilot }}
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
    /*
    STRINGS:
    */
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
      debug: true,
      currentWord: "placeholder",
      currentWordIndex: 0,
      currentBandIndex: 0, //Always start with bottom band
      currentSetIndex: 0, //This is set in mounted(), depending on grade9/10 as 0 or 2. (grade 10 starts with set 3)
      currentUserAllDataMap: {},
      isSetDone: false,
      isFullStopOfTest: false,
      feedbackMessage: "",
      showUserfeedback: false,
      bands: ["c1c5", "c6c10", "c11c15", "c16c20", "k3k4"],
      sets: ["set1", "set2", "set3", "set4", "set5"],
      words: this.$store.state.words,
      firstOfTwoSetsAndPilot: false,
      totalVocabulary: 0,
      //For debug:
      vocabularySize: 0,
      PercentageForThisSet: 0,
      totalScore: 0
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    isRealMethod() {
      const currentBand = this.bands[this.currentBandIndex];
      const currentSet = this.sets[this.currentSetIndex];
      if (this.currentUserAllDataMap[currentBand]) {
        return this.currentUserAllDataMap[currentBand][currentSet]["array"][
          this.currentWordIndex
        ].isReal;
      } else {
        return false;
      }
    },

    /*
     *METHOD START:
     */
    totalVocabularyMethodCalcAndSet() {
      // const currentBand = this.bands[this.currentBandIndex];
      // if (this.currentUserAllDataMap[currentBand]) {
      let sum = 0;
      for (const bandName in this.currentUserAllDataMap) {
        if (!this.bands.includes(bandName)) {
          continue;
        }
        let innerSum = 0;
        let innerLength = 0;
        for (const setName in this.currentUserAllDataMap[bandName]) {
          if (!this.sets.includes(setName)) {
            continue;
          }
          innerSum += this.currentUserAllDataMap[bandName][setName][
            "vocabularySize"
          ];
          innerLength += 1;
        }
        const averageVocabularySizeForBand = Math.round(innerSum / innerLength);
        sum += averageVocabularySizeForBand;
      }
      this.currentUserAllDataMap["totalVocabulary"] = sum;
      this.totalVocabulary = sum;
      // } else {
      //   return -1;
      // }
    },

    /*
     *METHOD START:
     */
    setNextWord() {
      const currentBand = this.bands[this.currentBandIndex];
      const currentSet = this.sets[this.currentSetIndex];
      this.currentWord = this.currentUserAllDataMap[currentBand][currentSet][
        "array"
      ][this.currentWordIndex].word;
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
        totalVocabulary: 0,
        c1c5: {
          set1: {
            vocabularySize: 0,
            totalScore: 0,
            PercentageForThisSet: 0,
            array: [
            {
            word: ,
            isReal: ,
            userAnswer: ,
            randomIndex: ,
            originalIndex: ,

            },
            {...}
          ],
          }
          set2: {...}
        },
        c6c10: {},
        c11c15: {},
      };
        */

      /*
       ADD ARRAY OF WORDS TO MAP:
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
      if (this.currentUserAllDataMap[currentBand][currentSet] == null) {
        this.currentUserAllDataMap[currentBand][currentSet] = {};
      }
      this.currentUserAllDataMap[currentBand][currentSet]["array"] = array;

      /*
      ADD TO MAP:
      vocabularySize: 0,
      totalScore: 0,
      PercentageForThisSet: 0,
      */
      this.currentUserAllDataMap[currentBand][currentSet]["vocabularySize"] = 0;
      this.currentUserAllDataMap[currentBand][currentSet]["totalScore"] = 0;
      this.currentUserAllDataMap[currentBand][currentSet][
        "PercentageForThisSet"
      ] = 0;

      console.log("Generate data success!");
      console.log("AAAAAAA", this.currentUserAllDataMap);
    },

    /*
     *METHOD START:
     */
    onResponse: function(response) {
      const currentBand = this.bands[this.currentBandIndex];
      const currentSet = this.sets[this.currentSetIndex];
      //Record response
      this.currentUserAllDataMap[currentBand][currentSet]["array"][
        this.currentWordIndex
      ].userAnswer = response;

      //Record score
      const isRealWord = this.currentUserAllDataMap[currentBand][currentSet][
        "array"
      ][this.currentWordIndex].isReal;
      if (isRealWord && response == true) {
        this.currentUserAllDataMap[currentBand][currentSet]["array"][
          this.currentWordIndex
        ].score = 1;
      } else if (!isRealWord && response == true) {
        this.currentUserAllDataMap[currentBand][currentSet]["array"][
          this.currentWordIndex
        ].score = -2;
      }

      const currentUserWordArray = this.currentUserAllDataMap[currentBand][
        currentSet
      ]["array"];

      if (this.currentWordIndex >= currentUserWordArray.length - 2) {
        this.isSetDone = true;
      }

      //Else, if set is done:
      //Calc total score
      let totalScore = 0;

      for (const e of currentUserWordArray) {
        totalScore += e.score;
      }
      //update component this.totalScore
      this.totalScore = totalScore;
      //Calc vocabulary size
      const MaxScore = 20;
      const PercentageForThisSet = Math.round((totalScore / MaxScore) * 100);
      //update component this.PercentageForThisSet
      this.PercentageForThisSet = PercentageForThisSet;

      let vocabularySize = 0;
      if (this.currentBandIndex == 0) {
        vocabularySize = Math.round(500 * (PercentageForThisSet / 100));
      } else if (this.currentBandIndex == 1) {
        vocabularySize = Math.round(1000 * (PercentageForThisSet / 100));
      } else if (this.currentBandIndex == 2) {
        vocabularySize = Math.round(1500 * (PercentageForThisSet / 100));
      } else if (this.currentBandIndex == 3) {
        vocabularySize = Math.round(2000 * (PercentageForThisSet / 100));
      } else if (this.currentBandIndex == 4) {
        vocabularySize = Math.round(3000 * (PercentageForThisSet / 100));
      } else {
        alert("ERROR: SOMETHING WENT WRONG WITH CALCULATING VOCABULARY SIZE");
        vocabularySize =
          "ERROR: SOMETHING WENT WRONG WITH CALCULATING VOCABULARY SIZE";
      }

      this.vocabularySize = vocabularySize;

      //Set map values
      this.currentUserAllDataMap[currentBand][currentSet][
        "vocabularySize"
      ] = vocabularySize;
      this.currentUserAllDataMap[currentBand][currentSet][
        "totalScore"
      ] = totalScore;
      this.currentUserAllDataMap[currentBand][currentSet][
        "PercentageForThisSet"
      ] = PercentageForThisSet;

      this.totalVocabularyMethodCalcAndSet();

      const CUTOFF = 1; //todo: 70
      const isPilot = this.$store.state.isPilot;
      const firstOfTwoSetsAndPilot =
        [0, 2].includes(this.currentSetIndex) && isPilot;
      this.firstOfTwoSetsAndPilot = firstOfTwoSetsAndPilot;

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
      if (PercentageForThisSet >= CUTOFF) {
        //If this is pilot, and the first of two sets to be forced to take
        if (firstOfTwoSetsAndPilot) {
          msg = `Gratulerer! Du kan ca. ${this.totalVocabulary} ord på fransk. Ta en ny test for å bekrefte resultatet ditt.`;
        } else {
          msg = `Gratulerer! Du kan ca. ${this.totalVocabulary} ord på fransk. Ta neste test for å utforske nivået ditt.`;
        }
      }
      //CASE 2: If NOT passed the test, but with positive score
      else if (PercentageForThisSet > 0) {
        //If pilot, always force a possible second set, even when low score
        if (firstOfTwoSetsAndPilot) {
          msg = `Gratulerer! Du kan ca. ${this.totalVocabulary} ord på fransk. Ta en ny test for å bekrefte resultatet ditt.`;
        } else {
          this.isFullStopOfTest = true;
          console.log("Full stop set in place = 111");

          msg = `Gratulerer! Du kan ca. ${this.totalVocabulary} ord på fransk.`;
        }
      }
      //CASE 3: If NOT passed the test, with negative score
      else {
        //If pilot, always force a possible second set, even when low score
        if (firstOfTwoSetsAndPilot) {
          msg = `Beklager! Vi kunne ikke estimere din vokabularstørrelse. Ta en ny test for å prøve igjen.`;
        } else {
          this.isFullStopOfTest = true;
          console.log("Full stop set in place = 222");

          msg = `Beklager! Vi kunne ikke estimere din vokabularstørrelse.`;
        }
      }

      this.feedbackMessage = msg;

      //If there are no more bands/sets
      if (
        !firstOfTwoSetsAndPilot &&
        this.currentBandIndex == this.bands.length
      ) {
        console.log("Full stop set in place = 825");
        this.isFullStopOfTest = true;
      }

      //Iterate
      this.currentWordIndex += 1;

      //If not done with current set, goto next word
      if (!this.isSetDone) {
        this.setNextWord();
        return; //RETURN
      } else {
        this.showUserfeedback = true;
      }
    },
    /*
     *METHOD START:
     */
    setDoneOkBtn() {
      this.showUserfeedback = false;

      this.isSetDone = false;
      this.feedbackMessage = "";
      //Last calcs
      if (this.isFullStopOfTest == false) {
        this.currentWordIndex = 0;

        //Iterate to next set/band
        if (this.firstOfTwoSetsAndPilot) {
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
      } else {
        console.log("TODO");
        alert("Full stop of test = true");
      }
    },

    /*
     *METHOD START:
     */
    capitalize: function(s) {
      return s;
      //Deprecated:
      //return s[0].toUpperCase() + s.slice(1);
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

<style scoped>
.truecorrect {
  transform: scale(100);
  background-color: red;
  font-size: 50rem;
}
</style>
