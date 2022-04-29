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
            <v-card-text> </v-card-text>
            <v-card-actions class="mt-10">
              <v-spacer></v-spacer>
              <v-btn large @click="onResponse(false)" outlined text>
                {{ btnNo }}
              </v-btn>
              <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn large @click="onResponse(true)" color="primary">
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
    currentWord() {
      return this.words.c1c5.set1.real[0];
    },
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
    }
  },
  props: {},
  data() {
    return {
      s1:
        "Gratulerer! Du kan ca. x ord på fransk. Ta en ny test for å bekrefte resultatet ditt.",
      s2:
        "Gratulerer! Du kan ca. x ord på fransk. Ta neste test for å utforske nivået ditt.",
      currentBand: 0,
      currentSet: 0,
      currentSequence: [],
      currentSequenceUserAnser: [],
      currentSequenceKey: [],
      bands: ["c1c5", "c6c10", "c11c15", "c16c20", "k3k4"],
      sets: ["set1", "set2", "set3", "set4", "set5"],
      words: this.$store.state.words
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    generateSequence: function() {
      const band = this.bands[0];
      const set = this.sets[0];

      const real = this.words[band][set].real;
      const nonsense = this.words[band][set].nonsense;

      const map = {};
      // function range(start, end) {
      //   return Array(end - start + 1)
      //     .fill()
      //     .map((_, idx) => start + idx);
      // }
      // console.log(range(0, 30));
      // prettier-ignore
      let indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
      indexArray = this.shuffle(indexArray);
      const combined = [...real, ...nonsense];

      for (let i = 0; i < 30; i++) {
        console.log(combined[i]);
      }

      console.log(real);
      console.log(nonsense);

      //  currentSequence: [],
      // currentSequenceUserAnser: [],
      // currentSequenceKey: [],
    },

    /*
     *METHOD START:
     */
    onResponse: function(response) {
      console.log("Response: ", response);
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
    this.generateSequence;
  }
});
</script>

<style scoped></style>
