<template>
  <v-container>
    <AlertBox />
    <v-card class="text-center px-4 py-3 mx-auto" flat style="max-width: 600px">
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
          <v-btn
            color="secondary"
            :disabled="!isLoginFormValid"
            :loading="loadingStatus"
            type="submit"
            >Log In</v-btn
          >
          <br />
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" class="mt-12" dark v-bind="attrs" v-on="on">
                Forgot Password?
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline info--text justify-center">
                Recover your Password
              </v-card-title>

              <v-card-text>
                <v-form
                  ref="resetForm"
                  v-model="resetFormValid"
                  @submit.prevent="resetPassword"
                >
                  <v-row class="mt-8" no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="resetEmail"
                        label="E-mail"
                        type="email"
                        :rules="emailRules"
                        color="secondary"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-center">
                        <v-btn
                          color="secondary"
                          :disabled="!resetFormValid"
                          type="submit"
                          >Send Reset Link</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>

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
  </v-container>
</template>

<script>
import AlertBox from '@/components/AlertBox'

export default {
  components: {
    AlertBox,
  },
  middleware: 'index-page-redirect',
  data() {
    return {
      email: null,
      password: null,
      resetEmail: null,
      dialog: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail is not valid',
      ],
      showPassword: false,
      isLoginFormValid: false,
      resetFormValid: false,
    }
  },
  computed: {
    loadingStatus() {
      return this.$store.getters.getLoading
    },
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('logInUser', {
          email: this.email,
          password: this.password,
        })
      }
    },
    resetPassword() {
      if (this.$refs.resetForm.validate()) {
        this.$store.dispatch('resetPassword', this.resetEmail)
        this.dialog = false
      }
    },
  },
}
</script>
