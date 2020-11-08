<template>
  <div>
    <v-row justify="center" align="center">
      <v-col
        v-for="asteroid in asteroidsList"
        :key="asteroid.id"
        cols="12"
        sm="6"
      >
        <v-card class="justify-center">
          <v-card-title
            >{{ asteroid.name }}
            <v-spacer></v-spacer>
            <LikeButton
              :id="asteroid.id"
              @send-id="$emit('remove-favourite-id', $event)"
            />
            <v-btn
              icon
              color="secondary"
              title="Open"
              @click="openAsteroid(asteroid.id)"
            >
              <v-icon> mdi-arrow-right-thick </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>ID: {{ asteroid.id }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeButton from '~/components/LikeButton'
export default {
  components: {
    LikeButton,
  },
  props: {
    asteroidsList: {
      type: Array,
      required: true,
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
