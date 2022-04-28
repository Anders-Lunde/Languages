<template>
  <div>
    <h1 class="heading1">LANGUAGES</h1>
    <v-container fluid>
      <v-row>
        <v-card class="mx-auto" max-width="96%" max-height="6%">
          <v-card-title>
            <span class="text-h5  mx-auto font-weight-light">Intro video</span>
          </v-card-title>
          <v-card-text>
            <video
              controls
              ref="introductionVideo"
              preload="auto"
              style="max-width: 100%; max-height: 85vh"
            >
              <source :src="introductionVideo + '#t=0.0'" type="video/mp4" />
            </video>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push('/')" outlined text>
              {{ btnPrevious }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push('register-info')" color="primary">
              {{ btnNext }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
//import dummy from "@/components/dummy.vue";

export default Vue.extend({
  name: "IntroVideo",
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
      introductionVideo: require("@/assets/example_video.mp4")
    };
  },

  methods: {
    /*
     *METHOD START:
     */
    asd: function() {
      console.log("asd");
    }
  },
  mouned() {
    //Important! Neccesary to update source of videos on screen change (ii change).
    //Loading videos also ensures smooth experience on button clicks.
    const video = this.$refs.introductionVideo;
    if (video) {
      video.load();
    }
  }
});
</script>

<style scoped></style>
