export default function (context) {
  if (!context.store.getters.getUser) {
    context.redirect('/login')
  }
}
