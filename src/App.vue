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
  })
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
