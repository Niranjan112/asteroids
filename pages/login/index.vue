<template>
  <v-card class="text-center px-4 py-3 mx-auto" style="max-width: 600px">
    <v-card-subtitle class="text-subtitle-1">
      <h1 class="text-h4">Log In</h1>
    </v-card-subtitle>
    <div>
      <v-form
        ref="loginForm"
        v-model="isLoginFormValid"
        class="mt-4"
        @submit.prevent="login"
      >
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          :rules="emailRules"
          validate-on-blur
          color="secondary"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :rules="[(v) => !!v || 'Password is required']"
          color="secondary"
          outlined
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn color="secondary" :disabled="!isLoginFormValid" type="submit"
          >Log In</v-btn
        >
        <br />

        <div class="mt-7">
          <p>
            Don't have a account?
            <nuxt-link
              to="/signup"
              class="secondary--text"
              :style="{ textDecoration: 'none' }"
              >Create new account</nuxt-link
            >
          </p>
        </div>
      </v-form>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      disable: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail is not valid',
      ],
      showPassword: false,
      isLoginFormValid: false,
    }
  },
}
</script>
