<template>
  <v-container>
    <AlertBox />
    <div v-for="date in sortedClosetApproachDates" :key="date" class="my-5">
      <h1 class="text-h5 text-sm-h4 white--text text-center my-5">
        {{ date }}
      </h1>
      <ListAsteroids
        :asteroidsList="asteroids.near_earth_objects[date].slice(0, 10)"
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
}
</script>
