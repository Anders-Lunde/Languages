<template>
  <div>
    <h1 class="heading1">LANGUAGES</h1>
    <v-col cols="12" md="7" class="mx-auto">
      <v-form v-model="valid" ref="form" v-on:submit.prevent="onSubmit">
        <v-container fluid>
          <v-card class="mx-auto" max-width="96%">
            <v-card-title>
              <span
                style="word-break: break-word;"
                class="text-h5  mx-auto font-weight-light"
                >{{ registerInfoHeading }}</span
              >
            </v-card-title>
            <!--   In which country do you attend school?
            <v-col cols="12" md="7">
              <v-radio-group
                v-model="country"
                :rules="[v => !!v || txtMustBeAnswered]"
                required
                :label="questionWhichCounty"
              >
                <v-radio :label="lblEngland" value="en"></v-radio>
                <v-radio :label="lblNorway" value="no"></v-radio>
                <v-radio :label="lblOther" value="other"></v-radio>
              </v-radio-group>
            </v-col>
            -->

            <v-col cols="12" md="7">
              <v-text-field
                v-model="school"
                :rules="nameRules"
                :label="lblSchool"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field
                v-model="fullname"
                :rules="nameRules"
                :label="lblName"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7" v-if="enableEmailQuestion">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :label="lblEmail"
                required
              ></v-text-field>
            </v-col>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="$router.push('intro-video')" outlined text>
                {{ btnPrevious }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="btnGotoNext()" color="primary">
                {{ btnNext }}
              </v-btn>
              <span class="mx-4 red--text" v-if="nextPressed && !valid">
                {{ lblInvalidForm }}</span
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-form>
    </v-col>
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
  data() {
    return {
      enableEmailQuestion: true,
      valid: false,
      nextPressed: false,
      fullname: "",
      nameRules: [v => !!v || "Required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
      ],
      country: "",
      school: ""
    };
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
        return "Navn på elev";
      } else {
        return "Name of student";
      }
    },
    lblSchool() {
      if (this.dispLang == "no") {
        return "Navn på skole";
      } else {
        return "Name of school";
      }
    },

    questionWhichCounty() {
      if (this.dispLang == "no") {
        return "I hvilket land går du på skole?";
      } else {
        return "In which country do you attend school?";
      }
    },

    lblEngland() {
      if (this.dispLang == "no") {
        return "England";
      } else {
        return "England";
      }
    },

    lblNorway() {
      if (this.dispLang == "no") {
        return "Norge";
      } else {
        return "Norway";
      }
    },

    lblOther() {
      if (this.dispLang == "no") {
        return "Annet";
      } else {
        return "Other";
      }
    },

    lblEmail() {
      if (this.dispLang == "no") {
        return "E-post";
      } else {
        return "E-mail";
      }
    },
    lblInvalidForm() {
      if (this.dispLang == "no") {
        return "Skjema ikke fullstendig utfylt!";
      } else {
        return "Incomplete form!";
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
    },
    txtMustBeAnswered() {
      if (this.dispLang == "no") {
        return "Må besvares";
      } else {
        return "Must be answered";
      }
    }
  },
  props: {},

  methods: {
    /*
     *METHOD START:
     */
    btnGotoNext: function() {
      this.nextPressed = true;
      if (this.$refs.form.validate()) {
        console.log("Valid form detected");
        //Save form to vuex
        this.$store.state.country = this.country;
        this.$store.state.school = this.school;
        this.$store.state.fullname = this.fullname;
        if (this.enableEmailQuestion) {
          this.$store.state.email = this.email;
        }
        //Goto test
        this.$router.push("intro-video");
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
