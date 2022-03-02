
export default async function ({app, req, store, redirect, route}) {
  if (!store.getters['auth/isLoggedIn']) {
    return redirect('/login')
  }
}