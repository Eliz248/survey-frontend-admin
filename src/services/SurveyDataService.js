import http from "../http-common";

class SurveyDataService {
  getAllSurveys() {
    return http.get("/survey/list", {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  getUserSurveys(userId) {
    return http.get(`/survey/list?user=${userId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  getSurvey(id) {
    return http.get(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  createSurvey(surveyData) {
    return http.post("/create/survey", surveyData, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  editSurvey(surveyData, surveyId) {
    return http.put(`/survey/${surveyId}`, surveyData, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  deleteSurvey(id) {
    return http.delete(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  publishSurvey(surveyData) {
    return http.put(`/survey/${surveyData.id}?isPublished=${surveyData.isPublished}`, {}, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  sendSurveyLink(linkData) {
    return http.post(`/survey/sendemail`, linkData, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  fetchSurveyReportDetails(surveyId) {
    return http.get(`/survey/report?surveyId=${surveyId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new SurveyDataService();