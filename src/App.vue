<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),

  methods: {
    /*
     *METHOD START
     */
    // eslint-disable-next-line
    getLexiographicallySortableDateString: function(dateObject: any) {
      const humanDateFormat = dateObject.toLocaleDateString("no-NO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      let y = "";
      let m = "";
      let d = "";
      let t = "";
      //reorder 23.12.2021, 11:15:13 -> 2021.12.23, 11:15:13
      for (let x = 0; x < humanDateFormat.length; x++) {
        const c = humanDateFormat.charAt(x);
        if (c == ".") {
          continue;
        }
        if (d.length < 2) {
          d = d + c;
        } else if (m.length < 2) {
          m = m + c;
        } else if (y.length < 4) {
          y = y + c;
        } else {
          t = t + c;
        }
      }
      return y + "." + m + "." + d + t;
    }
  },

  mounted() {
    console.log("MOUNTED");
    this.$store.state.createdTS = Date.now();
    //Convert createdTS to human readable and add (in a format that is sorting-friendly,
    //i.e. year, month, date, time)
    const dateObject = new Date(this.$store.state.createdTS);
    const humanDateFormat = this.getLexiographicallySortableDateString(
      dateObject
    );
    this.$store.state.createdTSreadable = humanDateFormat;
  }
});
</script>

<style>
body {
  /*
  margin-left: 1rem;
  margin-right: 1rem;
  */
}

.heading1 {
  text-align: center;
  color: rgb(22, 151, 246);
  margin: 1rem;
}
</style>
