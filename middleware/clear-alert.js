export default function (context) {
  if (context.store.getters.getAlertShowStatus) {
    context.store.dispatch('clearAlert')
  }
}
