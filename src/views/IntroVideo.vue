<template>
  <div>
    <h1>Yo</h1>
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
  computed: {},
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
    asd: function() {
      console.log("asd");
    }
  }
});
</script>

<style scoped></style>
