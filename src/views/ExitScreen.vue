<template>
  <div>
    <h1 class="heading1">{{ txtHeading }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
//import dummy from "@/components/dummy.vue";

export default Vue.extend({
  name: "ExitScreen",
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
    },
    txtHeading() {
      if (this.dispLang == "no") {
        return "Takk for din deltakelse!";
      } else {
        return "Thanks for your participation";
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
