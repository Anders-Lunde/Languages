<template>
  <div>
    <h1 class="heading1">LANGUAGES</h1>
    <v-container fluid>
      <v-row>
        <v-card class="mx-auto" max-width="96%">
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
            <v-btn
              :disabled="disableBtnNext"
              @click="$router.push('register-info')"
              color="primary"
            >
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
        if (this.disableBtnNext) {
          return "Se hele videoen for å gå videre...";
        } else {
          return "Neste";
        }
      } else {
        if (this.disableBtnNext) {
          return "Watch the whole video to proceed...";
        } else {
          return "Next";
        }
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
      introductionVideo: require("@/assets/norwegian.mp4"),
      disableBtnNext: true
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
  mounted() {
    //Loading videos  ensures smooth experience
    const video = this.$refs.introductionVideo;
    if (video) {
      video.load();
    }
    /*
    video.addEventListener("pause", function() {
      // enable NEXT button when video finished:
      this.disableBtnNext = false;
      console.log("asd");
    });
*/
    // eslint-disable-next-line
    const vm = this;
    setInterval(function() {
      if (vm.disableBtnNext == false) {
        return;
      }
      if (video.duration - video.currentTime < 1) {
        console.log("video done");
        vm.disableBtnNext = false;
      }
    }, 500);
  }
});
</script>

<style scoped></style>
