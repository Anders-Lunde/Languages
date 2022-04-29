<template>
  <div style="height: 66%">
    <v-container fill-height fluid>
      <v-row class="" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <span class="text-h2  mx-auto font-weight-light">{{
                currentWord
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
      bands: ["c1c5", "c6c10", "c11c15", "c16c20", "k3k4"],
      words: this.$store.state.words
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    onResponse: function(response) {
      console.log("Response: ", response);
    }
  }
});
</script>

<style scoped></style>
