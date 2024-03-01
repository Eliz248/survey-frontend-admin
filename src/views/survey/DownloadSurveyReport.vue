<template>
  <download-csv :data="exportFileData" name="survey-report" class="">
    <v-btn tile color="indigo" style="margin-top: 10px"
      >DOWNLOAD SURVEY REPORT <v-icon right>mdi-download</v-icon>
    </v-btn>
  </download-csv>
</template>
<script>
import JsonCSV from "vue-json-csv";
export default {
  components: {
    downloadCsv: JsonCSV,
  },
  props: {
    exportFileData: Array,
  },
};
</script>
