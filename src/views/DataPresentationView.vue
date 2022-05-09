<template>
  <div>
    <DataPresentation />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import DataPresentation from "@/components/DataPresentation.vue";

export default Vue.extend({
  name: "DataPresentationView",
  components: { DataPresentation },
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
    debug: function() {
      console.log(this.$store.state.displayLanguage);
    }
  }
});
</script>

<style scoped></style>
