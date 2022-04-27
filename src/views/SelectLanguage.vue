<template>
  <div class="body">
    <h1 class="heading">LANGUAGES</h1>
    <h2 class="heading2">Select your language / Velg ønsket språk</h2>

    <v-card color="grey lighten-3" class="mb-12" height="200px">
      <v-container class="px-0" fluid>
        <v-radio-group
          v-model="radioGroupDisplayLanguage"
          @change="setDisplayLanguage()"
        >
          <v-radio label="English" value="en"></v-radio>
          <v-radio label="Norsk" value="no"></v-radio>
        </v-radio-group>
      </v-container>
    </v-card>

    <v-btn color="primary" @click="$router.push('register-info')">
      {{ btnNext }}
    </v-btn>
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
      e6: 1,
      radioGroupDisplayLanguage: "en"
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
  }
});
</script>

<style scoped>
.body {
  margin-left: 1rem;
}

.heading {
  text-align: center;
  color: rgb(22, 151, 246);
  margin: 1rem;
}
.heading2 {
  text-align: center;
  color: rgb(0, 0, 0);
  margin: 1rem;
}
</style>
