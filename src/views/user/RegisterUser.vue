<template>
  <div class="wrapper">
    <div class="register">
      <div class="register-wrapper">
        <div class="register-headings">
          <h1>Create Account For User</h1>
          <h5 class="error"  v-show="message">{{ message }}</h5>
        </div>
        <v-form class="register-form">
          <v-text-field v-model="registerForm.email" label="Email*"></v-text-field>
          <v-text-field v-model="registerForm.userName" label="User Name*"></v-text-field>
          <v-text-field v-model="registerForm.organization" label="Organization"></v-text-field>
          <v-text-field v-model="registerForm.password" label="Password*" type="password"></v-text-field>
          <v-text-field v-model="registerForm.confirmPassword" label="Confirm Password*" type="password"></v-text-field>
          <button @click="handleRegister" class="black-button width-100">
            CREATE USER
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import UserDataService from "../../services/UserDataService";
export default {
  name: "RegisterUsers",
  data() {
    return {
      message: "",
      registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        organization: "",
      },
    };
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      if (
        !this.registerForm.email ||
        !this.registerForm.userName ||
        !this.registerForm.password ||
        !this.registerForm.confirmPassword
      ) {
        this.message = "Fields Required !";
        return;
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.message = "Password not match !";
        return;
      }
      const registerForm = {
        email: this.registerForm.email,
        user_name: this.registerForm.userName,
        password: this.registerForm.password,
        organization: this.registerForm.organization,
        user_type: "user",
      };
      UserDataService.createUser(registerForm)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "usersList" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
 
<style>
.register {
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;
}

.register-wrapper {
  backdrop-filter: blur(8px);
  color: var(--colorBlack);
  width: 50%;
  padding: 10px 30px 20px 30px;
  border-radius: 15px;
  border: 1px solid var(--colorLightGrey);
  box-shadow: 0px 10px 25px #2b2b2b7a;
}

@media(max-width: 900px) {
  .register-wrapper {
    width: 90%;
  }
}
</style>