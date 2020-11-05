<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item
              v-for="navigationButton in navigationButtons"
              :key="navigationButton.name"
              :to="navigationButton.path"
            >
              <v-list-item-icon>
                <v-icon>{{ navigationButton.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ navigationButton.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar flat>
        <v-app-bar-nav-icon
          class="hidden-sm-and-up"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="primary--text font-weight-bold text-h5">
          <NuxtLink to="/" :style="{ textDecoration: 'none' }"
            >Asteroids</NuxtLink
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-for="navigationButton in navigationButtons"
          :key="navigationButton.name"
          class="hidden-xs-only mx-2"
          color="secondary"
          nuxt
          :to="navigationButton.path"
        >
          <v-icon left>{{ navigationButton.icon }}</v-icon>
          {{ navigationButton.name }}
        </v-btn>
      </v-app-bar>
    </div>
    <v-main class="primary d-flex justify-center align-center">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    navigationButtons() {
      const items = [
        {
          name: 'Log In',
          icon: 'mdi-login',
          path: '/login',
        },
        {
          name: 'Sign Up',
          icon: 'mdi-account-plus',
          path: 'signup',
        },
      ]
      return items
    },
  },
}
</script>
