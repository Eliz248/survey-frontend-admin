<template>
  <div class="wrapper">
    <div class="register-headings">
      <h1>{{ surveyId ? "EDIT" : "CREATE" }} SURVEY</h1>
      <h4 class="highlight__text">{{ message }}</h4>
    </div>
    <v-form class="form" @submit="createSurvey">
      <v-text-field
        label="Title"
        v-model="survey.title"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Description"
        v-model="survey.description"
        :rules="[rules.required]"
      />
      <v-switch
        :label="`${survey.isPublished ? 'UnPublish Survey' : 'Publish Survey'}`"
        v-model="survey.isPublished"
        color="success"
      ></v-switch>

      <h1>ADD QUESTIONS TO SURVEY</h1>
      <div class="survey__questions--wrapper">
        <div class="add__question">
          <v-select
            :items="survey.questionOptions"
            v-model="survey.questionType"
            :rules="[rules.required]"
            label="Select Question Type"
          ></v-select>
          <v-btn color="success" class="align__icon" @click="handleAddQuestion"
            >ADD</v-btn
          >
        </div>
        <div class="survey__question--wrapper">
          <div
            class="survey__question"
            v-for="(question, index) in survey.questions"
            :key="index"
          >
            <div class="survey__question--heading">
              <h3>
                Question Type - {{ question.question_type.toUpperCase() }}
              </h3>
              <h4>Question No - {{ index + 1 }}</h4>
            </div>
            <v-text-field
              v-model="question.title"
              label="Enter your question"
              :rules="[rules.required]"
            >
            </v-text-field>
            <!-- MULTIPLE CHOICE QUESTION-->
            <div v-if="question.question_type === 'multiple-choice'">
              <h5>
                ADD OPTION (max 4*)
                <v-btn
                  color="blue"
                  @click="handleAddOption(index)"
                  >ADD OPTION</v-btn
                >
              </h5>
              <div
                class="survey__question--options"
                v-for="(item, optionIndex) in question.options"
                :key="optionIndex"
              >
                <div class="survey__question--option">
                  <v-text-field
                    v-model="item.option"
                    :label="`Option ${optionIndex + 1}`"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                  <v-icon
                    large
                    color="red"
                    @click="handleDeleteOption(index, optionIndex)"
                    v-show="optionIndex !== 0"
                    class="icon survey__icon del__icon"
                  >
                    mdi-minus</v-icon
                  >
                </div>
              </div>
            </div>
            <div class="survey__question--bottom">
              <v-switch
                label="Required"
                v-model="question.required"
                color="orange"
                class="required__switch"
              >
              </v-switch>
              <v-icon
                large
                color="red"
                class="icon actions__icon"
                @click="handleDeleteQuestion(index)"
              >
                mdi-delete-outline
              </v-icon>
            </div>
          </div>
        </div>
      </div>
      <v-row justify="space-around">
        <v-btn color="success" type="submit"
          >{{ surveyId ? "EDIT" : "CREATE" }} SURVEY</v-btn
        >
      </v-row>
    </v-form>
  </div>
</template>
<script>
import SurveyDataService from "../../services/SurveyDataService";
export default {
  name: "create-survey",
  props: ["surveyId"],
  data() {
    return {
      survey: {
        title: "",
        description: "",
        questions: [],
        isPublished: false,
        questionType: "",
        questionOptions: [
          "text-field",
          "multiple-choice",
          "rating",
          "paragraph",
        ],
      },
      message: "",
      rules: {
        required: (value) => !!value || "Field Required.",
      },
    };
  },
  methods: {
    formQuestionObject(questionType) {
      return {
        title: "",
        question_type: questionType,
        required: false,
      };
    },
    handleAddQuestion() {
      let questions = [...this.survey.questions];
      switch (this.survey.questionType) {
        case "text-field":
          questions = [...questions, this.formQuestionObject("text-field")];
          break;
        case "paragraph":
          questions = [...questions, this.formQuestionObject("paragraph")];
          break;
        case "rating":
          questions = [...questions, this.formQuestionObject("rating")];
          break;
        case "multiple-choice":
          questions = [
            ...questions,
            {
              ...this.formQuestionObject("multiple-choice"),
              options: [
                {
                  option: "",
                },
              ],
            },
          ];
          break;
      }
      this.survey.questions = questions;
    },
    handleDeleteQuestion(id) {
      this.survey.questions = this.survey.questions.filter((_, i) => i !== id);
    },
    handleAddOption(id) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[id].options;
      if (currentQuestionOptions.length >= 4) {
        return;
      }
      currentQuestionOptions = [
        ...currentQuestionOptions,
        {
          option: "",
        },
      ];
      this.survey.questions[id].options = currentQuestionOptions;
    },
    handleDeleteOption(questionId, optionId) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[questionId].options;
      this.survey.questions[questionId].options = currentQuestionOptions.filter(
        (_, i) => i !== optionId
      );
    },
    createSurvey() {
      const surveyData = {
        title: this.survey.title,
        description: this.survey.description,
        isPublished: this.survey.isPublished,
        questions: this.survey.questions,
      };
      // console.log("surveyData???", surveyData);
      // console.log("surveyId", this.surveyId);
      if (this.surveyId) {
        console.log("coming here 1");
        SurveyDataService.editSurvey(surveyData, this.surveyId)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: "surveysList" });
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      } else {
        console.log("coming here 2");
        SurveyDataService.createSurvey(surveyData)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: "surveysList" });
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
    retreiveSurvey() {
      SurveyDataService.getSurvey(this.surveyId)
        .then((response) => {
          const apiRes = response.data;
          this.survey.title = apiRes.survey_title;
          this.survey.description = apiRes.survey_description;
          this.survey.isPublished = apiRes.survey_isPublished;
          this.survey.questions = apiRes.questions;
          this.survey.questionType = "text-field";
          console.log("response", apiRes);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    if (this.surveyId) {
      this.retreiveSurvey();
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.survey.title = "";
        this.survey.description = "";
        this.survey.isPublished = false;
        this.survey.questions = [];
        this.survey.questionType = "";
      }
    );
  },
};
</script>
<style>
.register__form {
  width: 90% !important;
}

.add__question {
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 10px;
  width: 50%;
  margin: 0 auto;
}

.survey__questions--wrapper {
  padding: 10px 0;
  margin: 10px 0;
  border-top: 1px solid #696a6985;
}

.survey__question--wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.survey__question--bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid #696a6985;
}

.survey__question--bottom .v-input,
.survey__question--bottom .v-input--horizontal {
  display: flex !important;
  width: 25% !important;
  flex: none !important;
}

.survey__question--option {
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
}

.survey__icon {
  height: 40px;
  width: 40px;
  border: 1px solid rgb(97, 97, 204);
  font-size: 25px;
  border-radius: 50%;
  margin: 0 10px;
}

.del__icon {
  border: 1px solid rgb(243, 9, 9);
}

.align__icon {
  margin: -25px 0px 0 20px;
}

@media screen and (max-width: 850px) {
  .add__question {
    width: 90%;
  }
  .survey__question--wrapper {
    grid-template-columns: 1fr;
  }
}
</style>