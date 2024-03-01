<template>
  <v-row class="user__list-item">
    <v-col cols="9" sm="2">
      <span>{{ user.user_name }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span> {{ user.organization }}</span>
    </v-col>
    <v-col cols="4" sm="2">
      <span> {{ user.email }}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewUser"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteUser" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteUser() {
      this.$emit("deleteUser");
    },
    viewUser() {
      this.$emit("viewUser");
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
</style>
