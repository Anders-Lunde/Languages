<template>
  <div>
    <h1 class="heading1">LANGUAGES</h1>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="5" class="mx-auto">
          <v-card class="mx-auto">
            <v-card-title>
              <span class="text-h5  mx-auto font-weight-light">Select:</span>
              </v-card-title>
              <v-card-text>
              <v-btn block @click="$router.push('/grade9')">
                Grade 9
              </v-btn>
            </v-card-text>
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
  name: "Home",
  components: {
    //dummy
  },
  computed: {
    dispLang() {
      return this.$store.state.displayLanguage;
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
      dummy: ""
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    asd: function() {
      console.log("asd");
    }
  }
});
</script>

<style scoped></style>
