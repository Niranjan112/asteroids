<template>
  <v-container>
    <AlertBox />
    <div v-for="date in sortedClosetApproachDates" :key="date" class="my-5">
      <h1 class="text-h5 text-sm-h4 white--text text-center my-5">
        {{ date }}
      </h1>
      <v-row>
        <v-col
          v-for="asteroid in asteroids.near_earth_objects[date].slice(0, 10)"
          :key="asteroid.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card>
            <v-card-title
              >{{ asteroid.name }}
              <v-spacer></v-spacer>
              <LikeButton :id="asteroid.id" />
              <v-btn
                icon
                color="secondary"
                title="Open"
                @click="openAsteroid(asteroid.id)"
              >
                <v-icon> mdi-arrow-right-thick </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle>{{ asteroid.id }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import AlertBox from '~/components/AlertBox'
import LikeButton from '~/components/LikeButton'
export default {
  components: {
    AlertBox,
    LikeButton,
  },
  async asyncData({ app, query, env, store }) {
    const asteroids = await app.$axios.$get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${query.startDate}&end_date=${query.endDate}&detailed=true&api_key=${env.neoWsApiKey}`
    )
    return { asteroids }
  },
  computed: {
    sortedClosetApproachDates() {
      return Object.keys(this.asteroids.near_earth_objects).sort(
        (date1, date2) => {
          return new Date(date2) - new Date(date1)
        }
      )
    },
  },
  methods: {
    openAsteroid(id) {
      this.$router.push({
        name: 'asteroid-by-id-id',
        params: {
          id,
        },
      })
    },
  },
}
</script>
