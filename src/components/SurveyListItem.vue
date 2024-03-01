<template>
  <v-row class="user__list-item">
    <v-col cols="9" sm="2">
      <span>{{ survey.survey_title }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span> {{ survey.survey_description }}</span>
    </v-col>
    <v-col cols="4" sm="2" class="published__switch">
      <v-switch
        :label="`${survey.survey_isPublished ? 'Published' : 'UnPublished'}`"
        v-model="survey.survey_isPublished"
        @change="handlePublish"
        color="success"
      ></v-switch>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewSurvey"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="editSurvey" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSurvey" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    survey: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteSurvey() {
      this.$emit("deleteSurvey");
    },
    viewSurvey() {
      this.$emit("viewSurvey");
    },
    editSurvey() {
      this.$emit("editSurvey");
    },
    handlePublish() {
      this.$emit("handlePublish");
    },
  },
};
</script>
<style>
.user__list-item {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 5px 0;
  border-top: 1px solid var(--colorLightGrey);
}
.published__switch .v-input__details {
  display: none !important;
}
.published__switch .v-input {
  display: inline-block !important;
  margin: 0 !important;
  padding: 0 !important;
  height: 20px !important;
  margin-top: -50px !important;
}
.published__switch .v-input--density-default {
  --v-input-control-height: 25px !important;
}
</style>
