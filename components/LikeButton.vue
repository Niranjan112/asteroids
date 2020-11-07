<template>
  <div>
    <v-btn
      v-if="user"
      icon
      color="red"
      :title="
        userFavourites.includes(id)
          ? 'Remove from favourites'
          : 'Add to favourites'
      "
      @click="addOrRemoveFavourites()"
    >
      <v-icon>
        {{ userFavourites.includes(id) ? 'mdi-heart' : 'mdi-heart-outline' }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { timestamp } from '~/plugins/firebase'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    userFavourites() {
      return this.$store.getters.getUserFavourites.map(
        (asteroid) => asteroid.asteroidId
      )
    },
  },
  methods: {
    addOrRemoveFavourites() {
      if (!this.userFavourites.includes(this.id)) {
        this.$store.dispatch('addToFavourites', {
          asteroidId: this.id,
          userId: this.user.uid,
          createdAt: timestamp.fromDate(new Date()),
        })
      } else {
        const { documentId } = this.$store.getters.getUserFavourites.find(
          (asteroid) => asteroid.asteroidId === this.id
        )
        this.$store.dispatch('removeFromFavourites', documentId)
      }
    },
  },
}
</script>
