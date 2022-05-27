<template>
  <div>
    <h1 class="heading1">LANGUAGES</h1>
    <v-container fluid>
      <v-row>
        <v-card class="mx-auto" max-width="96%">
          <v-card-title>
            <span class="text-h5 mx-auto font-weight-light "
              >Select your language / Velg ønsket språk</span
            >
          </v-card-title>
          <v-card-text>
            <v-radio-group
              v-model="radioGroupDisplayLanguage"
              @change="setDisplayLanguage()"
              required
            >
              <v-radio label="English" value="en"></v-radio>
              <v-radio label="Norsk" value="no"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="radioGroupDisplayLanguage.length == 0"
              class="mx-auto"
              color="primary"
              @click="$router.push('register-info')"
            >
              {{ btnNext }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
//import HelloWorld from "@/components/HelloWorld.vue";

export default Vue.extend({
  name: "SelectLanguage",
  components: {},
  computed: {
    dispLang() {
      return this.$store.state.displayLanguage;
    },
    stepHeadingRegInfo() {
      if (this.dispLang == "no") {
        return "Registrer personinfo";
      } else {
        return "Register personal data";
      }
    },
    btnNext() {
      if (this.dispLang == "no") {
        return "Neste";
      } else {
        return "Next";
      }
    },
    btnPrevious() {
      if (this.dispLang == "no") {
        return "Tilbake";
      } else {
        return "Back";
      }
    }
  },
  props: {},
  data() {
    return {
      dummy: 0,
      radioGroupDisplayLanguage: ""
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    debug: function() {
      console.log(this.$store.state.displayLanguage);
    },
    /*
     *METHOD START:
     */
    setDisplayLanguage: function() {
      this.$store.state.displayLanguage = this.radioGroupDisplayLanguage;
    }
  },

  mounted() {
    //Is pilot?
    if (this.$route.path.includes("pilot")) {
      console.log("Route is pilot");
      this.$store.state.isPilot = true;
    } else {
      console.log("Route is NOT pilot");
      this.$store.state.isPilot = false;
    }
    //Is grade 9?
    if (this.$route.path.includes("grade9")) {
      console.log("Route is grade 9");
      this.$store.state.grade = "grade9";
    }
    //Is grade 9?
    if (this.$route.path.includes("grade10")) {
      console.log("Route is grade 10");
      this.$store.state.grade = "grade10";
    }
  }
});
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
