<template>
  <div class="wrapper">
      <div class="viewSurvey__top--wrapper">
      <div class="register-headings">
      <h1>View Survey</h1>
      <h4 class="highlight__text"><strong style="color:#202020"> SURVEY TITLE :</strong> {{ survey.survey_title }}</h4>
      <h4 class="highlight__text">
        <strong style="color:#202020">SURVEY DESCRIPTION :</strong> {{ survey.survey_description }}
      </h4>
      <h4 class="highlight__text">
        <strong style="color:#202020">SURVEY STATUS :</strong> {{ survey.survey_isPublished ? "Published" :
            'UnPublished'
        }}
      </h4>
      <v-btn tile color="success" @click="openShareLinkDiv" style="margin-top:10px"
      >SEND SURVEY LINK<v-icon right>mdi-share</v-icon>
      </v-btn
    >
    <DownloadSurveyReport :exportFileData="exportFileData" />
    </div>
      <div class="share__link">
    <v-form class="survey__question" v-if="openShareLink === true" @submit="sendSurveyLink">
      <h1 class="survey__question--heading">SHARE SURVEY LINK TO PARTICIPANTS</h1>
      <span class="error" v-show="submitLinkMessage">{{submitLinkMessage}}</span>
      <v-text-field
        v-model="userEmail"
        label="Enter participant email Id"
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <div class="share__btn--wrapper"> 
         <v-btn tile color="error" @click="closeShareLinkDiv">CLOSE</v-btn>
         <v-btn tile color="indigo" type="submit">SEND <v-icon right>mdi-share</v-icon></v-btn>
      </div>
    </v-form>
  </div>
      </div>

    <ul class="accordian" v-if="survey.questions.length > 0">
      <li class="accordian__item" v-for="question in survey.questions" :key="question.id">
        <input type="checkbox" checked />
        <i></i>
        <h2>{{ question.title }}</h2>
        <p>
        <h4 v-if="question.options && question.options.length > 0">CHOICES</h4>
        <div class="question__choices" v-if="question.options && question.options.length > 0">
          <div  v-for="(item, index) in question.options"
            :key="index">
            <span>{{ item.option }}</span>
          </div>
        </div>
         <section v-if="question.surveyresponse && question.surveyresponse.length > 0">
          <div v-for="item in question.surveyresponse" :key="item.id">
            <span class="viewSurvey__choice response">
              {{ `PARTICIPANT EMAIL ID  : ${item.participant.email_id} ---  RESPONSE : ${item.response}`}}
              </span>
          </div>
        </section>
        <span
          v-if="question.surveyresponse && question.surveyresponse.length <= 0" class="highlight__text" style="text-align: center"
          >NO RESPONSES FOUND</span
        >
        </p>
      </li>
    </ul>
    <h2 v-if="survey.questions.length < 1" class="highlight__text" style="text-align: center">
      NO QUESTIONS FOUND FOR THIS SURVEY
    </h2>
  </div>
</template>
<script>
import SurveyDataService from "../../services/SurveyDataService";
import SurveyListItem from "@/components/SurveyListItem.vue";
import DownloadSurveyReport from "./DownloadSurveyReport.vue";
export default {
  name: "view survey",
  props: ["id"],
  components: {
    DownloadSurveyReport,
    SurveyListItem,
  },
  data() {
    return {
      openShareLink: false,
      userEmail: "",
      exportFileData: [],
      survey: {
        id: 1,
        survey_title: "",
        survey_description: "",
        survey_isPublished: false,
        questions: [
          {
            title: "What is astronomy",
          },
        ],
      },
      rules: {
        required: (value) =>
          !!value || `Email ID Required To Share The Survey Link !`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      message: "View survey details and questions",
      submitLinkMessage: "",
    };
  },
  methods: {
    retreiveSurvey() {
      SurveyDataService.getSurvey(this.id)
        .then((response) => {
          this.survey = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    openShareLinkDiv() {
      this.openShareLink = true;
    },
    closeShareLinkDiv() {
      this.openShareLink = false;
    },
    sendSurveyLink() {
      const linkData = {
        survey_link: `http://18.117.235.63/survey-frontend-survey/submit-survey/${this.id}/`,
        user_email: this.userEmail,
      };
      SurveyDataService.sendSurveyLink(linkData)
        .then((response) => {
          if (response.status === 200) {
            this.submitLinkMessage = "SURVEY LINK HAS BEEN SUCCESSFULLY SENT";
            this.userEmail = "";
          }
        })
        .catch((e) => {
          this.submitLinkMessage = e.response.data.message;
        });
    },
    retreiveSurveyReportData() {
      SurveyDataService.fetchSurveyReportDetails(this.id)
        .then((response) => {
          this.exportFileData = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retreiveSurvey();
    this.retreiveSurveyReportData();
  },
};
</script>
<style>
.question__choices {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 0 20px 0;
  border-bottom: 1px solid var(--colorLightGrey);
}

.question__choices span {
  padding: 10px;
  border: 1px solid var(--colorLightGrey);
  box-shadow: var(--boxShadow);
}
.viewSurvey__top--wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.share__btn--wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid rgb(202, 198, 198);
  margin-top: -20px;
}
@media screen and (max-width: 768px) {
  .viewSurvey__top--wrapper {
    grid-template-columns: 1fr;
  }
}
</style>