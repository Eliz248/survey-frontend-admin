<template>
  <v-app>
    <v-app-bar v-if="currentRoute !== '/login'">
      <v-img
        class="mx-2"
        :src="logo"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-app-bar-title>Manage Surveys</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="userType === 'admin'">
        <v-btn variant="text" @click="goToUsersList">Users List</v-btn>
        <v-btn variant="text" @click="goToRegisterAdmin">Register User</v-btn>
        <v-btn variant="text" @click="goToSurevysList">Surveys List</v-btn>
        <v-btn variant="text" @click="goToCreateSurvey">Create Survey</v-btn>
        <button @click="handleLogout" class="black-button">LOGOUT</button>
      </v-toolbar-items>
      <v-toolbar-items v-else-if="userType === 'user'">
        <v-btn variant="text" @click="goToSurevysList">Surveys List</v-btn>
        <v-btn variant="text" @click="goToCreateSurvey">Create Survey</v-btn>
        <button @click="handleLogout" class="black-button">LOGOUT</button>
      </v-toolbar-items>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
import logo from "./assets/oc-logo-white.png";
import AuthDataService from "./services/AuthDataService";
import "./accordian.css";
export default {
  name: "App",
  data: () => ({
    logo,
    userType: "",
    currentRoute: "",
  }),
  methods: {
    goToUsersList() {
      this.$router.push({ name: "usersList" });
    },
    goToRegisterAdmin() {
      this.$router.push({ name: "registerUser" });
    },
    goToSurevysList() {
      this.$router.push({ name: "surveysList" });
    },
    goToCreateSurvey() {
      this.$router.push({ name: "createSurvey" });
    },
    handleLogout() {
      const userId = sessionStorage.getItem("userId");
      AuthDataService.logout(userId).then((response) => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userType");
        this.$router.push({ name: "login" });
      });
    },
  },
  created() {
    const isAuth = sessionStorage.getItem("authToken");
    const userType = sessionStorage.getItem("userType");
    if (isAuth && userType === "admin") {
      this.$router.push({ name: "usersList" });
    } else if (isAuth && userType === "user") {
      this.$router.push({ name: "surveysList" });
    } else {
      this.$router.push({ name: "login" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentRoute = this.$route.path;
        this.userType = sessionStorage.getItem("userType");
      }
    );
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap");

html {
  font-family: "Montserrat", sans-serif !important;
}

:root {
  --colorBlack: #161515;
  --lightBlack: #202020;
  --colorWhite: #ffff;
  --colorLightGrey: #d6d1d19c;
  --lightGrey: #f8f2f2;
  --boxShadow: 0px 10px 25px rgba(0, 0, 0, 0.177);
}

body {
  font-family: "Montserrat", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  padding: 80px 40px 0 40px;
  background: #eae9e9;
  min-height: 100vh;
  max-height: auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 20px;
}

.width-100 {
  width: 100%;
}

.error {
  color: orangered;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 6px;
  background-color: var(--lightGrey);
  border-radius: 5px;
}

.black-button {
  background: var(--colorBlack);
  border-radius: 15px;
  padding: 10px 15px;
  transition: 0.4s ease-in;
  color: var(--colorWhite);
  margin: 10px 0;
}

.black-button:hover {
  box-shadow: 0px 10px 25px #2b2b2b7a;
}

.form {
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  margin-top: 15px;
  padding: 20px 20px;
  box-shadow: var(--boxShadow);
  background: var(--colorWhite);
}

.checkbox {
  width: max-content;
  height: 50px;
}

.highlight__text {
  color: rgb(144, 144, 187);
  font-size: 16px;
}

.v-input__details {
  display: none;
}

.v-input {
  margin: 10px 0 !important;
}

.register-headings {
  margin: 10px 0 15px 0;
  font-weight: 600;
  font-size: 18px;
}

.register-headings h1 {
  font-size: 25px;
  margin: 5px 0;
  font-weight: 800;
}

.albums__list--table {
  border: 1px solid var(--colorLightGrey);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin: 20px 0px 20px 0px !important;
  box-shadow: var(--boxShadow);
  background: var(--colorWhite);
}

.album__item--wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.survey__question {
  display: flex;
  flex-direction: column;
  border-left: 5px solid rgb(190, 201, 94);
  margin: 15px 0;
  padding: 10px 10px 5px 10px;
  box-shadow: 0px 20px 30px #33323241;
  border-radius: 5px;
}

.survey__question--heading {
  background: #e9e6e6;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .wrapper {
    padding: 10% 40px 0 40px;
  }
}
</style>