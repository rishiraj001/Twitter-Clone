<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      class="q-mb-md"
      outlined
      label="Name"
    />
    <q-input
      v-model="formData.email"
      class="q-mb-md"
      outlined
      type="email"
      label="Email"
    />
    <q-input
      v-model="formData.password"
      outlined
      class="q-mb-md"
      type="password"
      label="Password"
    />

    <div class="row">
      <q-space />
        <q-btn 
        to="/"
        color="primary" 
        type="submit"
        :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "Rahul@gmail.com",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),

    submitForm() {
      // console.log(this.formData)
      if (this.tab == "login") {
        this.loginUser(this.formData);
      }
      else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>
