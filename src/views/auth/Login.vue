<template>
  <div class="login">
    <img :src="loginBgImg" alt="" />
    <div class="login-wrapper">
      <div class="login-headings">
        <h1>LOGIN</h1>
        <h5 class="error" v-show="message">{{ message }}</h5>
      </div>
      <v-form class="login-form">
        <v-text-field v-model="loginForm.email" label="Email" outlined shaped></v-text-field>
        <v-text-field v-model="loginForm.password" label="Password" type="password" outlined></v-text-field>
        <button @click="handleLogin" class="border-button">LOGIN</button>
      </v-form>
    </div>
  </div>
</template>
<script>
import loginBgImg from "../../assets/survey.jpg";
import AuthDataService from "../../services/AuthDataService";
export default {
  name: "Login",
  data() {
    return {
      message: "",
      loginForm: {
        email: "",
        password: "",
      },
      loginBgImg,
    };
  },
  methods: {
    handleLogin() {
      if (!this.loginForm.email || !this.loginForm.password) {
        this.message = "Email & Password Required !";
        return;
      }
      const formData = {
        email: this.loginForm.email,
        password: this.loginForm.password,
      };
      AuthDataService.login(formData)
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem("authToken", response.data.accessToken);
            sessionStorage.setItem("userId", response.data.id);
            sessionStorage.setItem("userType", response.data.user_type);
            if (response.data.user_type === "admin") {
              this.$router.push({ name: "usersList" });
            } else if (response.data.user_type === "user") {
              this.$router.push({ name: "surveysList" });
            }
          }
        })
        .catch((e) => {
          console.log("error?", e);
          this.message = e.response.data.message;
        });
    },
  },
};
</script>

<style>
.login {
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;
}

.login img {
  position: absolute;
  inset: 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
  filter: brightness(0.5);
}

.login-wrapper {
  backdrop-filter: blur(8px);
  color: var(--colorWhite);
  width: 40%;
  padding: 10px 30px 30px 30px;
  border-radius: 15px;
  border: 1px solid var(--colorLightGrey);
  box-shadow: 0px 10px 25px #2b2b2b7a;
}

.login-headings {
  margin: 15px 0;
  font-weight: 600;
  font-size: 18px;
}

.login-headings h1 {
  font-size: 50px;
  text-align: center;
  margin: 10px 0;
  font-weight: 800;
}

.border-button {
  border: 1px solid var(--colorWhite);
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  transition: 0.4s ease-in;
}

.border-button:hover {
  background: var(--colorWhite);
  color: var(--colorBlack);
}

@media(max-width: 900px) {
  .login-wrapper {
    width: 90%;
  }

  .login-headings h1 {
    font-size: 35px;
  }
}
</style>