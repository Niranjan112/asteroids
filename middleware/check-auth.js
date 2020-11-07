export default function (context) {
  if (!context.store.getters.getUser) {
    context.store.dispatch('autoLogIn')
  }
  if (context.store.getters.alertShowStatus) {
    context.store.dispatch('clearAlert')
  }
}
