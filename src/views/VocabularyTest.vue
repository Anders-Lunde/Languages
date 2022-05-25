<template>
  <div style="height: 66%">
    <v-container fill-height fluid>
      <v-row class="" justify="center">
        <v-col cols="12" md="3" sm="7">
          <v-card>
            <!--Current word / Title -->
            <v-card-title>
              <v-chip v-if="isRealMethod() && debug">REAL</v-chip>
              <span
                v-if="!showUserfeedback && !showLastMessages"
                class="word  mx-auto font-weight-light"
                >{{ capitalize(currentWord) }}</span
              >
            </v-card-title>

            <v-card-text v-if="showProgressCircularTSDupload">
              Sending data - please wait...
              <v-progress-circular
                color="light-green"
                indeterminate
              ></v-progress-circular>
            </v-card-text>

            <!-- User feedback between sets -->
            <v-card-text v-if="showUserfeedback">
              <span
                text-color="black"
                class="text-h5 mx-auto black--text font-weight-medium"
                v-html="feedbackMessage"
              ></span>
            </v-card-text>

            <!-- Button to proceed to the very last messages -->
            <v-card-actions v-if="showFinalFormBtn">
              <v-btn
                class="mx-auto"
                @click="showFinalFormBtnClicked()"
                color="primary"
              >
                {{ txtBtnShowLastMessages }}
                <span v-if="showFinalFormBtnFirstClick">{{
                  txtBtnShowLastMessagesSecondClick
                }}</span>
              </v-btn>
            </v-card-actions>

            <!-- Very last messages (final result + feedback input field) -->
            <v-form
              v-model="isValidFinalForm"
              ref="form"
              v-if="showLastMessages"
            >
              <v-card-text>
                <!-- Hva syns du om testen? -->
                <span
                  text-color="black"
                  class="text-h6 mx-auto  font-weight-medium"
                >
                  {{ txtWhatDidYouThinkAboutTest }}
                </span>

                <v-text-field
                  v-model="commentsFromUser"
                  :label="txtWriteHere"
                ></v-text-field>
                <br />
                <!-- Hvor mange ord på fransk tror du at du egentlig kan,? -->
                <span
                  text-color="black"
                  class="text-h6 mx-auto  font-weight-medium"
                >
                  {{ txtHowManyWords }}
                </span>

                <v-radio-group
                  required
                  v-model="selfEstimateFromUser"
                  :rules="[v => !!v || txtMustBeAnswered]"
                >
                  <v-radio :label="selfEstimateFromUser1" value="1"></v-radio>
                  <v-radio :label="selfEstimateFromUser2" value="2"></v-radio>
                  <v-radio :label="selfEstimateFromUser3" value="3"></v-radio>
                  <v-radio :label="selfEstimateFromUser4" value="4"></v-radio>
                  <v-radio :label="selfEstimateFromUser5" value="5"></v-radio>
                </v-radio-group>
                <br />
                <!-- :disabled="commentsFromUser.length == 0" -->
                <v-btn
                  @click="onClickFinishTest()"
                  :disabled="!isValidFinalForm"
                  color="primary"
                >
                  {{ txtSubmitAndFinish }}
                </v-btn>
              </v-card-text>
            </v-form>

            <!-- Debug things -->

            <v-card-text v-if="debug">
              current msg: {{ feedbackMessage }}
              <br />
              <br />

              vocabularySizeForThisSet: {{ vocabularySizeForThisSet }}
              <br />
              averageVocabularySizeForCurrentBand:
              {{ averageVocabularySizeForCurrentBand }}
              <br />
              totalVocabulary: {{ totalVocabulary }}
              <br />
              <br />
              totalScoreForThisSet: {{ totalScoreForThisSet }}
              <br />
              PercentageForThisSet: {{ PercentageForThisSet }}
              <br />
              atLeastOneSetInCurrentBandAboveCutoff:
              <b
                ><u>{{ atLeastOneSetInCurrentBandAboveCutoff }}</u>
              </b>
              <br />
              <br />
              currentWord: {{ currentWord }}
              <br />
              isRealCurrentWordReal?: {{ isRealMethod() }}
              <br />
              currentWordIndex:<b
                ><u> {{ currentWordIndex }}</u>
              </b>
              <br />
              currentBandIndex: {{ currentBandIndex }}
              <br />
              currentSetIndex: {{ currentSetIndex }}
              <br />
              <br />
              isFullStopOfTest: {{ isFullStopOfTest }}
              <br />
              isSetDone: {{ isSetDone }}
              <br />
              firstOfTwoSetsAndPilot: {{ firstOfTwoSetsAndPilot }}
              <br />
              <br />

              <v-btn
                v-if="!isSetDone"
                large
                @click="debugForceCorrectUserAnswer(1)"
                outlined
                text
              >
                Avgi rett svar
              </v-btn>
              <v-btn
                v-if="!isSetDone"
                large
                @click="debugForceInCorrectUserAnswer(1)"
                outlined
                text
              >
                Avgi feil svar
              </v-btn>
              <br />
              <br />

              <v-btn
                v-if="!isSetDone"
                large
                @click="debugForceCorrectUserAnswer(15)"
                outlined
                text
              >
                Avgi 15 rett svar
              </v-btn>
              <v-btn
                v-if="!isSetDone"
                large
                @click="debugForceInCorrectUserAnswer(15)"
                outlined
                text
              >
                Avgi 15 feil svar
              </v-btn>
            </v-card-text>

            <!-- No, Yes, and OK buttons -->
            <v-card-actions class="mt-10">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

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
              <v-spacer></v-spacer>
              <!-- OK button between sets -->
              <v-btn
                v-if="isSetDone && isFullStopOfTest == false"
                large
                @click="setDoneOkBtn()"
                color="light-gray"
              >
                {{ btnSetDoneOk }}
              </v-btn>
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
  components: {},
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
        return "Fortsett...";
      } else {
        return "Continue...";
      }
    },
    selfEstimateFromUser1() {
      if (this.dispLang == "no") {
        return "mange flere";
      } else {
        return "many more";
      }
    },
    selfEstimateFromUser2() {
      if (this.dispLang == "no") {
        return "noen flere ";
      } else {
        return "some more";
      }
    },
    selfEstimateFromUser3() {
      if (this.dispLang == "no") {
        return "omtrent like mange";
      } else {
        return "a similar number";
      }
    },
    selfEstimateFromUser4() {
      if (this.dispLang == "no") {
        return "noen færre ";
      } else {
        return "somewhat fewer";
      }
    },
    selfEstimateFromUser5() {
      if (this.dispLang == "no") {
        return "langt færre";
      } else {
        return "far fewer";
      }
    },
    txtHowManyWords() {
      if (this.dispLang == "no") {
        return "(Obligatorisk) Uavhengig av ditt resultat på denne testen, hvor mange ord på fransk tror du at du egentlig kan, sammenliknet med dine klassekamerater?";
      } else {
        return "(Mandatory) Regardless of how you performed on this test, how many French words do you believe you know compared with your classmates?";
      }
    },
    txtWhatDidYouThinkAboutTest() {
      if (this.dispLang == "no") {
        return "(Valgfritt) Hva syns du om testen?";
      } else {
        return "(Optional) What did you think about this test?";
      }
    },

    txtSubmitAndFinish() {
      if (this.dispLang == "no") {
        return "Send inn og avslutt";
      } else {
        return "Submit and finish";
      }
    },

    txtWriteHere() {
      if (this.dispLang == "no") {
        return "Skriv her";
      } else {
        return "Write here";
      }
    },

    txtMustBeAnswered() {
      if (this.dispLang == "no") {
        return "Må besvares";
      } else {
        return "Must be answered";
      }
    },

    txtBtnShowLastMessages() {
      if (this.dispLang == "no") {
        return "Klikk for neste skjerm. ";
      } else {
        return "Click for next screen. ";
      }
    },

    txtBtnShowLastMessagesSecondClick() {
      if (this.dispLang == "no") {
        return " Vennligst klikk en gang til.";
      } else {
        return " Please click again.";
      }
    }
  },
  props: {},
  data() {
    return {
      tsGlobalStart: null,
      tsCurrentSetStart: null,
      showFinalFormBtn: false,
      showFinalFormBtnFirstClick: false,
      showLastMessages: false,
      isValidFinalForm: false,
      selfEstimateFromUser: null,
      debug: false,
      showProgressCircularTSDupload: false,
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
      averageVocabularySizeForCurrentBand: 0,
      commentsFromUser: "",
      atLeastOneSetInCurrentBandAboveCutoff: false,
      vocabularySizeForThisSet: 0,
      PercentageForThisSet: 0,
      totalScoreForThisSet: 0,
      currentPart: 1
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
    //If pilot, we use the average value of each band (2 sets each band)
    totalVocabularyMethodCalcAndSet() {
      // const currentBand = this.bands[this.currentBandIndex];
      // if (this.currentUserAllDataMap[currentBand]) {
      let totalVocabulary = 0;
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
            "vocabularySizeForThisSet"
          ];
          innerLength += 1;
        }
        const averageVocabularySizeForBand = Math.round(innerSum / innerLength);
        totalVocabulary += averageVocabularySizeForBand;
        //Set global which will after all loops be only the most recent band (current)
        this.averageVocabularySizeForCurrentBand = averageVocabularySizeForBand;
      }
      //this.currentUserAllDataMap["totalVocabulary"] = totalVocabulary; //deprecated. now only in outer map
      this.totalVocabulary = totalVocabulary;
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
        c1c5: {
          set1: {
            vocabularySizeForThisSet: 0,
            totalScoreForThisSet: 0,
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
      vocabularySizeForThisSet: 0,
      totalScoreForThisSet: 0,
      PercentageForThisSet: 0,
      */
      this.currentUserAllDataMap[currentBand][currentSet][
        "vocabularySizeForThisSet"
      ] = 0;
      this.currentUserAllDataMap[currentBand][currentSet][
        "totalScoreForThisSet"
      ] = 0;
      this.currentUserAllDataMap[currentBand][currentSet][
        "PercentageForThisSet"
      ] = 0;
      console.log("Generate sequence success!");
    },
    /*
     *METHOD START:
     */
    debugForceCorrectUserAnswer: function(loops) {
      for (let i = 0; i < loops; i++) {
        const currentBand = this.bands[this.currentBandIndex];
        const currentSet = this.sets[this.currentSetIndex];
        const correctAnswer = this.currentUserAllDataMap[currentBand][
          currentSet
        ]["array"][this.currentWordIndex].isReal;
        this.onResponse(correctAnswer);
      }
    },
    /*
     *METHOD START:
     */
    debugForceInCorrectUserAnswer: function(loops) {
      for (let i = 0; i < loops; i++) {
        const currentBand = this.bands[this.currentBandIndex];
        const currentSet = this.sets[this.currentSetIndex];
        const correctAnswer = this.currentUserAllDataMap[currentBand][
          currentSet
        ]["array"][this.currentWordIndex].isReal;
        this.onResponse(!correctAnswer);
      }
    },
    /*
     *METHOD START:
     */
    //Calculating all variables on each response, for debugging purposes
    //(so they can be displayed in debug view after each response)
    //However, stricktly speaking only after end of test would be neccessary.
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

      if (this.currentWordIndex >= currentUserWordArray.length - 1) {
        this.isSetDone = true;
      }

      //Calc total score
      let totalScoreForThisSet = 0;

      for (const e of currentUserWordArray) {
        totalScoreForThisSet += e.score;
      }
      //update component this.totalScoreForThisSet
      this.totalScoreForThisSet = totalScoreForThisSet;
      //Calc vocabulary size
      const MaxScore = 20;
      let PercentageForThisSet = Math.round(
        (totalScoreForThisSet / MaxScore) * 100
      );
      PercentageForThisSet = Math.max(0, PercentageForThisSet);
      //update component this.PercentageForThisSet
      this.PercentageForThisSet = PercentageForThisSet;

      let vocabularySizeForThisSet = 0;
      if (this.currentBandIndex == 0) {
        vocabularySizeForThisSet = Math.round(
          500 * (PercentageForThisSet / 100)
        );
      } else if (this.currentBandIndex == 1) {
        vocabularySizeForThisSet = Math.round(
          500 * (PercentageForThisSet / 100)
        );
      } else if (this.currentBandIndex == 2) {
        vocabularySizeForThisSet = Math.round(
          500 * (PercentageForThisSet / 100)
        );
      } else if (this.currentBandIndex == 3) {
        vocabularySizeForThisSet = Math.round(
          500 * (PercentageForThisSet / 100)
        );
      } else if (this.currentBandIndex == 4) {
        vocabularySizeForThisSet = Math.round(
          1000 * (PercentageForThisSet / 100)
        );
      } else {
        alert("ERROR: SOMETHING WENT WRONG WITH CALCULATING VOCABULARY SIZE");
        vocabularySizeForThisSet =
          "ERROR: SOMETHING WENT WRONG WITH CALCULATING VOCABULARY SIZE";
      }

      this.vocabularySizeForThisSet = vocabularySizeForThisSet;

      //Set map values
      this.currentUserAllDataMap[currentBand][currentSet][
        "vocabularySizeForThisSet"
      ] = vocabularySizeForThisSet;
      this.currentUserAllDataMap[currentBand][currentSet][
        "totalScoreForThisSet"
      ] = totalScoreForThisSet;
      this.currentUserAllDataMap[currentBand][currentSet][
        "PercentageForThisSet"
      ] = PercentageForThisSet;

      this.totalVocabularyMethodCalcAndSet();

      const CUTOFF = 70;
      const isPilot = this.$store.state.isPilot;
      const firstOfTwoSetsAndPilot =
        [0, 2].includes(this.currentSetIndex) && isPilot;
      this.firstOfTwoSetsAndPilot = firstOfTwoSetsAndPilot;

      //Figure out value of this.atLeastOneSetInCurrentBandAboveCutoff
      this.atLeastOneSetInCurrentBandAboveCutoff = false;
      for (const setName in this.currentUserAllDataMap[currentBand]) {
        if (!this.sets.includes(setName)) {
          continue;
        }
        if (
          this.currentUserAllDataMap[currentBand][setName][
            "PercentageForThisSet"
          ] >= CUTOFF
        ) {
          this.atLeastOneSetInCurrentBandAboveCutoff = true;
        }
      }

      let msg = "";
      //CASE 1: If passed the test
      if (
        PercentageForThisSet >= CUTOFF ||
        this.atLeastOneSetInCurrentBandAboveCutoff
      ) {
        //If this is pilot, and the first of two sets to be forced to take
        if (firstOfTwoSetsAndPilot) {
          this.isFullStopOfTest = false;
          if (this.dispLang == "no") {
            msg = `Gratulerer! Du kan minst ${this.totalVocabulary} ord på fransk. Ta en ny test for å bekrefte resultatet ditt.`;
          } else {
            msg = `Congratulations! You know at least ${this.totalVocabulary} words in French. Take a new test to confirm your results.`;
          }
        } else {
          this.isFullStopOfTest = false;
          if (this.dispLang == "no") {
            msg = `Gratulerer! Du kan minst ${this.totalVocabulary} ord på fransk. Ta en ny test på neste nivå for å utforske nivået ditt.`;
          } else {
            msg = `Congratulations! You know at least ${this.totalVocabulary} words in French. Take a new test at the next level to explore your upper limit.`;
          }
        }
      }
      //CASE 2: If NOT passed the test, but with positive score
      //If this.currentBandIndex > 0 , always display a vocab score even if PercentageForThisSet < 0,
      //since we want to show the extrapolated value from previous bands
      else if (PercentageForThisSet > 0 || this.currentBandIndex > 0) {
        //If pilot, always force a possible second set, even when low score
        if (firstOfTwoSetsAndPilot) {
          this.isFullStopOfTest = false;
          if (this.dispLang == "no") {
            msg = `Gratulerer! Du kan minst ${this.totalVocabulary} ord på fransk. Ta en ny test for å bekrefte resultatet ditt.`;
          } else {
            msg = `Congratulations! You know at least ${this.totalVocabulary} words in French. Take a new test to confirm your results.`;
          }
        } else {
          this.isFullStopOfTest = true;
          console.log("Full stop set in place = 111");
          if (this.dispLang == "no") {
            msg = `Gratulerer! Du kan minst ${this.totalVocabulary} ord på fransk.`;
          } else {
            msg = `Congratulations! You know at least ${this.totalVocabulary} words in French.`;
          }
        }
      }
      //CASE 3: If NOT passed the test, with negative score
      //This is only triggered for the case where this.currentBandIndex == 0 (due to previous conditional)
      else {
        //If pilot, always force a possible second set, even when low score
        if (firstOfTwoSetsAndPilot) {
          this.isFullStopOfTest = false;
          if (this.dispLang == "no") {
            msg = `Beklager! Vi kunne ikke estimere din vokabularstørrelse. Ta en ny test for å prøve igjen.`;
          } else {
            msg = `Sorry, we were unable to estimate your vocabulary size. Would you like to try again?`;
          }
        } else {
          this.isFullStopOfTest = true;
          console.log("Full stop set in place = 222");
          if (this.dispLang == "no") {
            msg = `Beklager! Vi kunne ikke estimere din vokabularstørrelse.`;
          } else {
            msg = `Sorry, we were unable to estimate your vocabulary size.`;
          }
        }
      }

      // this is needed because of '|| this.currentBandIndex > 0' in case 2 above.
      // with new forcing band 2 rules, this is neccessary.
      if (this.totalVocabulary <= 0) {
        if (this.dispLang == "no") {
          msg = `Beklager! Vi kunne ikke estimere din vokabularstørrelse.`;
        } else {
          msg = `Sorry, we were unable to estimate your vocabulary size.`;
        }
      }

      //If there are no more bands/sets
      if (
        !firstOfTwoSetsAndPilot &&
        this.currentBandIndex + 1 == this.bands.length &&
        this.isSetDone
      ) {
        console.log("Full stop set in place = 825");
        this.isFullStopOfTest = true;
      }

      /*
      //NEW STUFF AFTER MEETING 25.05
      */
      //Calculate del1, del2, del3 etc
      let partStr = "";

      if (this.dispLang == "no") {
        partStr = `Du er ferdig med del ${
          this.currentPart
        }. Gå videre til del ${this.currentPart + 1}.`;
      } else {
        partStr = `You are done with part ${
          this.currentPart
        }. Please proceed to part ${this.currentPart + 1}.`;
      }
      //Force everyone past the first band:
      if (this.currentBandIndex == 0) {
        this.isFullStopOfTest = false;
      }
      //New display messages:
      if (this.isFullStopOfTest == false) {
        msg = partStr;
      }

      this.feedbackMessage = msg;

      //If not done with current set, goto next word
      if (!this.isSetDone) {
        //Iterate
        this.currentWordIndex += 1;
        this.setNextWord();
        return; //RETURN
      } else {
        const setDuration = (Date.now() - this.tsCurrentSetStart).toFixed(1);
        this.tsCurrentSetStart;
        this.currentUserAllDataMap[currentBand][currentSet][
          "duration"
        ] = setDuration;

        this.currentPart += 1;
        this.showUserfeedback = true;

        if (this.isFullStopOfTest) {
          this.onTestFinished();
        }
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
        this.tsCurrentSetStart = Date.now();
      } else {
        this.onTestFinished();
      }
    },

    /*
     *METHOD START:
     */
    onTestFinished() {
      let txtExtraFinalBandNo = "";
      let txtExtraFinalBandEn = "";

      if (this.currentBandIndex + 1 == this.bands.length) {
        txtExtraFinalBandNo =
          " Du har nådd grensen for maksimal vokabularstørrelse denne testen kan beregne. ";
        txtExtraFinalBandEn =
          " You have reached the maximum vocabulary size that this test can calculate. ";
      }

      this.showUserfeedback = true;
      this.feedbackMessage = this.feedbackMessage.replace(
        "Ta en ny test på neste nivå for å utforske nivået ditt.",
        ""
      );
      this.feedbackMessage = this.feedbackMessage.replace(
        "Take a new test at the next level to explore your upper limit.",
        ""
      );
      this.feedbackMessage = this.feedbackMessage.replace(" minst ", " ca. ");
      this.feedbackMessage = this.feedbackMessage.replace(
        " at least ",
        " ca. "
      );
      if (this.dispLang == "no") {
        this.feedbackMessage =
          "<u>Sluttresultat: </u><br>" +
          this.feedbackMessage +
          txtExtraFinalBandNo +
          "<br><br>Hvis du vil ta vare på resultatet ditt, kan du ta et skjermbilde av denne siden.";
      } else {
        this.feedbackMessage =
          "<u>Final result: </u><br>" +
          this.feedbackMessage +
          txtExtraFinalBandEn +
          "<br><br>If you wish to save your result, you may take a screen shot of this page.";
      }

      //Save  to vuex
      this.$store.state.currentUserAllDataMap = this.currentUserAllDataMap;

      this.showFinalFormBtn = true;
    },

    async onClickFinishTest() {
      if (this.$refs.form.validate()) {
        //Save  to vuex
        this.$store.state.commentsFromUser = this.commentsFromUser;
        this.$store.state.totalVocabulary = this.totalVocabulary;
        this.$store.state.selfEstimateFromUser = this.selfEstimateFromUser;
        //Remove data-set from Vuex before submitting data (words)
        Vue.delete(this.$store.state, "words");
        //Send to server
        await this.sendTestDataToServer();
        //Goto exit page
        if (this.debug) {
          this.$router.push("data-presentation");
        } else {
          this.$router.push("exit-screen");
        }
      }
    },

    /*
     *METHOD START
     */
    async sendTestDataToServer() {
      /*
      stringify
      ->
      send this with formdata to server
      */
      console.log("Starting sendTestDataToServer");
      this.showProgressCircularTSDupload = true;

      const stringifiedData = JSON.stringify(this.$store.state);
      const filename =
        this.$store.state.createdTS +
        "_" +
        this.$store.state.fullname +
        "_" +
        this.$store.state.isPilot +
        "_" +
        this.$store.state.grade +
        "_" +
        this.$store.state.country +
        "_" +
        ".json";

      //Create a file from the string data
      const file = new File([stringifiedData], filename);

      //Send the file to server.
      const form = new FormData();
      form.append("stringifiedData", file);

      //const url = "http://localhost:3022/transmit-data"; //for debug
      const url = "https://app.languages.no/api/transmit-data";

      console.log("Sending data to server...");
      // eslint-disable-next-line
      const vm = this;
      await fetch(url, {
        method: "POST",
        headers: {
          filename: filename
          // metadata: JSON.stringify(testConfig.metadata),
          // vlfkey: testConfig.vlfKey
        },
        body: form
      })
        .then(function(response) {
          if (response.ok) {
            return response;
          }
          return Promise.reject(response);
        })
        .then(function() {
          vm.showProgressCircularTSDupload = false;
          alert("Data successfully transmitted :)");
        })
        .catch(function(error) {
          try {
            error.json().then(data => {
              console.error("Something went wrong.", data.msg);
              alert(
                "Data NOT successfully transmitted :( Please report this error to your teacher. Error message: " +
                  data.msg
              );
            });
          } catch (e) {
            console.error("Error (Server er kanskje ute av drift)", e);
            alert(
              "Data NOT successfully transmitted :( Please report this error to your teacher. (fetch error: Server might be down, or no internet connection.)"
            );
          }
        });
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
    },
    /*
     *METHOD START:
     */
    showFinalFormBtnClicked: function() {
      //Must click twice (to avoid premature clicking)
      if (this.showFinalFormBtnFirstClick == false) {
        this.showFinalFormBtnFirstClick = true;
        return;
      }
      this.showLastMessages = true;
      this.showUserfeedback = false;
      this.showFinalFormBtn = false;
    }
  },
  mounted() {
    if (this.$route.query.debug == "1") {
      console.log("Debug mode detected");
      this.debug = true;
      this.$store.state.isPilot = true;
      this.$store.state.grade = "grade9";
      this.$store.state.displayLanguage = "no";
      //this.$store.state.grade = "grade10";
    }
    if (this.$store.state.isPilot == null) {
      console.warn(
        'WARNIGN: isPilot==null. Setting to "true" (Probably you went directly to this url (should not happen in prod))'
      );
      this.$store.state.isPilot = true;
    }

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
    this.tsCurrentSetStart = Date.now();
    console.log("this.$store.state.isPilot ", this.$store.state.isPilot);
    console.log("this.$store.state.grade ", this.$store.state.grade);
    console.log("this.debug ", this.debug);
  }
});
</script>

<style scoped>
.truecorrect {
  transform: scale(100);
  background-color: red;
  font-size: 50rem;
}

.word {
  font-size: 220%;
}
</style>
