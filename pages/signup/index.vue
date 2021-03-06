<template>
  <v-container>
    <AlertBox />
    <v-card class="mx-auto text-center pb-1" flat max-width="600">
      <v-card-subtitle class="justify-center">
        <h1 class="text-h4">Sign Up</h1>
      </v-card-subtitle>

      <v-card-text class="mt-4">
        <v-form
          ref="signUpForm"
          v-model="isSignUpFormValid"
          @submit.prevent="registerUser"
        >
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                outlined
                label="E-mail"
                type="email"
                :rules="emailRules"
                validate-on-blur
                color="secondary"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="password"
                outlined
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                color="secondary"
                :rules="[
                  passwordRules.requirePassword,
                  passwordRules.minimumCharacter,
                  passwordRules.atleastOneLowerCaseCharacter,
                  passwordRules.atleastOneUpperCaseCharacter,
                  passwordRules.atleastOneDigit,
                  passwordRules.atleastOneSymbol,
                ]"
                @click:append="showPassword = !showPassword"
                @click="showPasswordHint = true"
                @blur="showPasswordHint = false"
              >
              </v-text-field>
              <ul v-if="showPasswordHint" class="text-left caption">
                <li>Password must contain at least 10 characters</li>
                <li>
                  And at least one uppercase letter, lowercase letter, digit and
                  special symbol
                </li>
              </ul>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="confirmPassword"
                outlined
                label="Confirm Password"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                color="secondary"
                :rules="[
                  passwordRules.requirePassword,
                  passwordRules.comparePasswords,
                ]"
                @click:append="showConfirmPassword = !showConfirmPassword"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-card-actions class="justify-center mb-7">
            <v-btn
              color="secondary"
              min-width="150px"
              :disabled="!isSignUpFormValid"
              :loading="loadingStatus"
              type="submit"
            >
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
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
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      isSignUpFormValid: false,
      showPasswordHint: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail is not valid',
      ],
      passwordRules: {
        comparePasswords: (value) =>
          value === this.password || 'Password did not match',
        requirePassword: (value) => !!value || 'Password is required',
        minimumCharacter: (value) =>
          (value && value.length >= 10) || 'Minimum 10 characters needed',
        atleastOneLowerCaseCharacter: (value) =>
          /(?=.*[a-z])/.test(value) || 'Atleast one lowercase letter needed',
        atleastOneUpperCaseCharacter: (value) =>
          /(?=.*[A-Z])/.test(value) || 'Atleast one uppercase letter needed',
        atleastOneDigit: (value) =>
          /(?=.*[0-9])/.test(value) || 'Atleast one digit needed',
        atleastOneSymbol: (value) =>
          /(?=.*\W)/.test(value) || 'Atleast one symbol needed',
      },
    }
  },
  computed: {
    loadingStatus() {
      return this.$store.getters.getLoading
    },
  },
  methods: {
    async registerUser() {
      if (this.$refs.signUpForm.validate()) {
        await this.$store.dispatch('signUpUser', {
          email: this.email,
          password: this.password,
        })
        this.$refs.signUpForm.reset()
        window.scrollTo(0, 0)
      }
    },
  },
}
</script>
