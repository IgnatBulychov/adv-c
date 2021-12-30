
export default async function ({app, req, store, redirect, route}) {

  const isLoggedIn = store.getters['auth/isLoggedIn']

  if (!isLoggedIn) {
    return redirect('/login')
  }
}