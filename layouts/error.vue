<template>
  <v-app dark class="primary text-center mt-8">
    <h1 v-if="error.statusCode === 404" class="error--text text-h4">
      {{ pageNotFound }}
    </h1>
    <h1 v-else class="error--text text-h4">
      {{ otherError }}
    </h1>
    <NuxtLink to="/" class="secondary--text text-subtitle-1">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
