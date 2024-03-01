<template>
  <div class="wrapper">
    <div class="register-headings">
      <h1>Users List</h1>
      <h4 class="highlight__text">{{ message }}</h4>
    </div>
    <div v-if="users.length > 0">
      <v-row class="albums__list--table">
        <v-col cols="9" sm="2">
          <span>User Name</span>
        </v-col>
        <v-col cols="9" sm="2">
          <span>Organization</span>
        </v-col>
        <v-col cols="4" sm="2">
          <span>Email</span>
        </v-col>
        <v-col cols="9" sm="1">
          <span>View</span>
        </v-col>
        <v-col cols="9" sm="1">
          <span>Delete</span>
        </v-col>
        <div class="album__item--wrapper">
          <UserListItem
            v-for="user in users"
            :key="user.id"
            :user="user"
            @deleteUser="deleteUser(user.id)"
            @viewUser="goView(user)"
          />
        </div>
      </v-row>
    </div>
    <h2
      v-else-if="users.length < 1"
      class="highlight__text"
      style="text-align: center"
    >
      NO USERS FOUND
    </h2>
  </div>
</template>
<script>
import UserDataService from "../../services/UserDataService";
import UserListItem from "@/components/UserListItem.vue";
export default {
  name: "users-list",
  data() {
    return {
      users: [
        {
          username: "test",
          email: "test@email.com",
          organization: "google",
          password: "",
        },
      ],
      message: "View or Delete users",
    };
  },
  components: {
    UserListItem,
  },
  methods: {
    goView(user) {
      this.$router.push({ name: "userSurveysList", params: { id: user.id } });
    },
    deleteUser(id) {
      UserDataService.deleteUser(id)
        .then(() => {
          this.retreiveUsers();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retreiveUsers() {
      UserDataService.getAllUsers()
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retreiveUsers();
  },
};
</script>
<style>
</style>
