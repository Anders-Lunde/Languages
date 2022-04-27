<template>
  <div>
    <h1 class="heading">LANGUAGES</h1>
    <h2 class="heading2">{{ registerInfoHeading }}</h2>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="5">
            <v-text-field
              :label="lblName"
              :rules="nameRules(input)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
//import dummy from "@/components/dummy.vue";

export default Vue.extend({
  name: "RegisterInfo",
  components: {
    //dummy
  },
  computed: {
    dispLang() {
      return this.$store.state.displayLanguage;
    },
    registerInfoHeading() {
      if (this.dispLang == "no") {
        return "Registrer info";
      } else {
        return "Register info";
      }
    },
    lblName() {
      if (this.dispLang == "no") {
        return "Ditt navn";
      } else {
        return "Your name";
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
      dummy: 0
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    nameRules: function(input) {
      console.log(input);
      if (input == "x") {
        return true;
      } else {
        return "Not right";
      }
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
