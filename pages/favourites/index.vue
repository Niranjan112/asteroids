<template>
  <v-container>
    <AlertBox />
    <h1 v-if="$fetchState.error" class="text-h4 error--text text-center my-10">
      No Favourites Available
    </h1>
    <div v-else>
      <h1 class="text-h4 white--text text-center my-10">
        {{ filterFavourites.length !== 0 ? 'Your favourites asteroids' : '' }}
      </h1>
      <ListAsteroids
        :asteroidsList="asteroidList"
        @remove-favourite-id="removeFavourite($event)"
      />
    </div>
  </v-container>
</template>

<script>
import AlertBox from '~/components/AlertBox'
export default {
  components: {
    AlertBox,
  },
  async fetch() {
    const userFavourites = this.$store.getters.getUserFavourites.map(
      (asteroid) => asteroid.asteroidId
    )
    for (const asteroidId of userFavourites) {
      const asteroid = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${process.env.neoWsApiKey}`
      ).then((res) => res.json())
      this.asteroidList.push(asteroid)
    }
  },
  fetchOnServer: false,
  data() {
    return {
      asteroidList: [],
    }
  },
  computed: {
    filterFavourites() {
      return Array.from(new Set(this.asteroidList.map((s) => s.id))).map(
        (id) => {
          return {
            ...this.asteroidList.find((asteroid) => asteroid.id === id),
          }
        }
      )
    },
  },
  methods: {
    removeFavourite(id) {
      const index = this.asteroidList.findIndex(
        (asteroid) => asteroid.id === id
      )
      this.asteroidList.splice(index, 1)
    },
  },
}
</script>
