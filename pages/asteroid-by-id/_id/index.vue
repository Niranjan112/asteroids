<template>
  <v-container>
    <AlertBox />
    <v-card width="600" class="mx-auto">
      <v-card-title class="info-text text-h5">
        {{ asteroid.name }}
        <v-spacer></v-spacer>
        <LikeButton :id="asteroid.id" />
      </v-card-title>
      <v-card-subtitle class="ml-1"> ID: {{ asteroid.id }} </v-card-subtitle>
      <v-card-text class="text-body-1 info--text">
        <h6 class="text-h6 info--text">Orbital Data</h6>
        <p>
          Aphelion Distance: {{ asteroid.orbital_data.aphelion_distance }}
          <br />
          Arc in Days: {{ asteroid.orbital_data.data_arc_in_days }}
          <br />
          Mean Anomaly: {{ asteroid.orbital_data.mean_anomaly }}
          <br />
          Mean Motion: {{ asteroid.orbital_data.mean_motion }}
          <br />
          Minimum Orbit Intersection:
          {{ asteroid.orbital_data.minimum_orbit_intersection }}
        </p>
      </v-card-text>
    </v-card>
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
  async asyncData({ app, params, env }) {
    const asteroid = await app.$axios.$get(
      `https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${env.neoWsApiKey}`
    )
    return { asteroid }
  },
  data() {
    return {
      liked: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    userFavourites() {
      return this.$store.getters.getUserFavourites.map((asteroid) => {
        return {
          documentId: asteroid.documentId,
          asteroidId: asteroid.asteroidId,
        }
      })
    },
  },
  methods: {
    addOrRemoveFavourites(id) {},
  },
}
</script>
