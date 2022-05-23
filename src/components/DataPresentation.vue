<template>
  <div>
    <h1 class="heading1">Data presentasjon</h1>

    <v-btn @click="populateTable()">
      Load data from server, and display in table</v-btn
    >
    <br />
    <br />
    <br />
    <v-btn @click="displayRaw()"> Load data from server, and display raw</v-btn>
    <br />
    <br />
    <br />

    <!-- Table -->
    <v-data-table
      :headers="tableHeaders"
      :items="tableData"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :sort-by="['createdTSreadable']"
      :sort-desc="[true]"
      item-key="createdTS"
      show-expand
      class="elevation-1"
      :items-per-page="1000000"
      :disable-pagination="true"
      :multi-sort="true"
    >
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title
            >{{ tableData.length }} lagrede tester under. Klikk på en rad for
            alternativer.</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-switch
            v-model="singleExpand"
            label="Single expand"
            class="mt-2"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          Detaljer for {{ item.createdTSreadable }}:
          <vue-json-pretty :data="item"> </vue-json-pretty>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
//import dummy from "@/components/dummy.vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default Vue.extend({
  name: "DataPresentation",
  components: {
    VueJsonPretty
  },
  computed: {},
  props: {},
  data() {
    return {
      debug: false,
      showAllTestsInAllMenues: false,
      // eslint-disable-next-line
      //testEntries: [],
      // eslint-disable-next-line
      tableData: [],
      // eslint-disable-next-line
      //selectedRowData: [] as any[], //Will/should only have 1 entry. For dialog box display of data.
      //For main dialog, when clicking test-data-rows
      dialog: false,
      //For table
      expanded: [],
      singleExpand: true,
      tableHeaders: [
        {
          text: "Gjennomført",
          align: "start",
          sortable: true,
          value: "createdTSreadable"
        },
        { text: "fullname", value: "fullname", sortable: true },
        { text: "isPilot", value: "isPilot", sortable: true },
        { text: "grade", value: "grade", sortable: true },
        { text: "country", value: "country", sortable: true },
        { text: "school", value: "school", sortable: true }
      ]
    };
  },

  methods: {
    /*
     * METHOD START:
     */
    displayRaw: async function() {
      const arrayOfjsons = await this.getArrayOfJSONsFromServer();
      const win = window.open(
        "",
        "Title",
        "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" +
          (screen.height - 400) +
          ",left=" +
          (screen.width - 840)
      );
      console.log(arrayOfjsons);
      win.document.body.innerHTML = arrayOfjsons;
    },
    /*
     * METHOD START:
     */
    populateTable: async function() {
      const arrayOfjsons = await this.getArrayOfJSONsFromServer();
      //Add to array testEntries
      this.tableData = []; //Clear
      for (const json of arrayOfjsons) {
        this.tableData.push(json);
      }
    },
    /*
     * METHOD START:
     */
    getArrayOfJSONsFromServer: async function() {
      //Get all jsons from server
      let arrayOfjsons = [];
      try {
        const response = await fetch(
          //"http://localhost:3022/get-data",
          "https://app.languages.no/api/get-data",
          {
            method: "GET"
          }
        );
        if (response.status == 200) {
          arrayOfjsons = await response.json();
        }
      } catch (err) {
        console.log("Fetch Error: ", err);
        alert("[loadDataFromServer] Fetch Error: " + err);
      }
      return arrayOfjsons;
    }
  },
  mounted() {
    if (this.$route.query.debug == "1") {
      console.log("Debug mode detected");
      this.debug = true;
    }
  }
});
</script>

<style scoped></style>
