<template>
  <div>
    <h1 class="heading1">LANGUAGES</h1>
    <v-container fluid>
      <!-- Video and video related  buttons -->
      <v-row v-if="showVideo" justify="center">
        <v-card class="mx-auto" max-width="96%">
          <v-card-title>
            <span
              style="word-break: break-word;"
              class="text-h5  mx-auto font-weight-light"
              >Intro video</span
            >
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
            <v-btn
              :disabled="disableBtnNext"
              @click="showVideo = false"
              color="primary"
              class="mx-auto"
            >
              {{ btnNext }}
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn @click="$router.push('/')" outlined text class="mx-auto">
              {{ btnPrevious }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <!-- Message to user that appears after video -->
      <v-row v-if="!showVideo" justify="center">
        <v-col cols="12" md="7" sm="7">
          <v-card>
            <v-card-text class="text-center">
              <span
                text-color="black"
                class="text-h5 mx-auto black--text font-weight-medium"
              >
                {{ txtFinalTextInstruction }}
              </span>
            </v-card-text>

            <!-- Button to proceed to the very last messages -->
            <v-card-actions>
              <v-btn
                class="mx-auto"
                @click="$router.push('vocabulary-test')"
                color="primary"
              >
                {{ txtStartTest }}
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
    },
    txtStartTest() {
      if (this.dispLang == "no") {
        return "Start testen";
      } else {
        return "Start the test";
      }
    },
    txtFinalTextInstruction() {
      if (this.dispLang == "no") {
        return "Testen tar ca. 15 minutter. Jo bedre du gjør det, jo flere deler får du.";
      } else {
        return "The test takes about 15 minutes. The better you perform, the more parts you get.";
      }
    }
  },
  props: {},
  data() {
    return {
      introductionVideo: require("@/assets/norwegian.mp4"),
      disableBtnNext: true,
      showVideo: true
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
      if (vm.disableBtnNext == false || vm.showVideo == false) {
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
