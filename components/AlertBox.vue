<template>
  <v-alert
    :type="alertType ? alertType : 'info'"
    :value="alertShow"
    dismissible
    @input="clearAlert"
  >
    {{ alertText }}
  </v-alert>
</template>

<script>
export default {
  name: 'AlertBox',
  computed: {
    alertShow() {
      return this.$store.getters.getAlertShowStatus
    },
    alertType() {
      return this.$store.getters.getAlertType
    },
    alertText() {
      return this.$store.getters.getAlertText
    },
  },
  methods: {
    clearAlert() {
      this.$store.dispatch('clearAlert')
    },
  },
}
</script>
