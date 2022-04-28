<template>
  <div>
    <h1>YO</h1>
    <p>{{ words }}</p>
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
  computed: {},
  props: {},
  data() {
    return {
      bands: ["c1c5", "c6c10", "c11c15", "c16c20", "k3k4"],
      words: this.$store.state.words
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
