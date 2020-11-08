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

            <v-list-item v-if="isUserLoggedIn" @click="logOut">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Log Out </v-list-item-title>
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
        <p v-if="isUserLoggedIn" class="mt-4 text-sm-h6">Welcome</p>
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
        <v-btn
          v-if="isUserLoggedIn"
          class="hidden-xs-only mx-2"
          color="secondary"
          @click="logOut"
        >
          <v-icon left>mdi-logout</v-icon>
          Log out
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
  middleware: 'clear-alert',
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    navigationButtons() {
      let items = []
      items = [
        {
          name: 'Log In',
          icon: 'mdi-login',
          path: '/login',
        },
        {
          name: 'Sign Up',
          icon: 'mdi-account-plus',
          path: '/signup',
        },
      ]

      if (this.isUserLoggedIn) {
        items = [
          {
            name: 'My Favourites',
            icon: 'mdi-heart',
            path: '/favourites',
          },
        ]
      }
      return items
    },
    isUserLoggedIn() {
      return this.$store.getters.getUser
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },
  },
}
</script>
