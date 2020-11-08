import { db, auth } from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  alertShowStatus: false,
  alertText: '',
  alertType: '',
  user: null,
  loading: false,
  userFavourites: [],
})

export const mutations = {
  setAlertShowStatus(state, payload) {
    state.alertShowStatus = payload
  },
  setAlertText(state, payload) {
    state.alertText = payload
  },
  setAlertType(state, payload) {
    state.alertType = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setUserFavourites(state, payload) {
    state.userFavourites.push(payload)
  },
  removeUserFavourites(state, payload) {
    state.userFavourites = state.userFavourites.filter(
      (favourite) => favourite.documentId !== payload
    )
  },
  clearFavourites(state) {
    state.userFavourites = []
  },
}

export const actions = {
  async signUpUser({ commit, dispatch }, payload) {
    try {
      commit('setLoading', true)
      await auth.createUserWithEmailAndPassword(payload.email, payload.password)
      const currentUser = auth.currentUser
      currentUser.sendEmailVerification()
      dispatch('manageAlertBox', {
        alertType: 'success',
        alertText:
          'A verification e-mail link has been sent. You can login after verifying your email address',
      })
      commit('setLoading', false)
      return true
    } catch (error) {
      dispatch('manageAlertBox', {
        alertType: 'error',
        alertText: error.message,
      })
      commit('setLoading', false)
      return false
    }
  },
  async logInUser({ commit, dispatch }, payload) {
    try {
      commit('setLoading', true)
      await auth.signInWithEmailAndPassword(payload.email, payload.password)
      const currentUser = auth.currentUser
      if (currentUser.emailVerified) {
        commit('setUser', currentUser)
        this.$router.push({
          name: 'index',
        })
        commit('setLoading', false)
        return true
      }
      dispatch('manageAlertBox', {
        alertType: 'error',
        alertText: 'Your account is not verified',
      })
      commit('setLoading', false)
    } catch (error) {
      dispatch('manageAlertBox', {
        alertType: 'error',
        alertText: error.message,
      })
      commit('setLoading', false)
    }
  },
  autoLogIn({ dispatch, commit, getters }) {
    auth.onAuthStateChanged((user) => {
      if (user.emailVerified) {
        commit('setUser', user)
        if (!getters.userFavourites) {
          dispatch('loadFavourites', user.uid)
        }
      }
    })
  },
  async resetPassword({ dispatch }, payload) {
    try {
      await auth.sendPasswordResetEmail(payload)
      dispatch('manageAlertBox', {
        alertType: 'success',
        alertText: 'Recovery Mail has been sent',
      })
    } catch (error) {
      dispatch('manageAlertBox', {
        alertType: 'error',
        alertText: error.message,
      })
    }
  },
  logOut({ commit }) {
    auth.signOut()
    commit('setUser', null)
    commit('clearFavourites')
    this.$router.push({
      name: 'login',
    })
  },
  manageAlertBox({ commit }, payload) {
    commit('setAlertType', payload.alertType)
    commit('setAlertText', payload.alertText)
    commit('setAlertShowStatus', true)
    commit('setLoading', false)
  },
  clearAlert({ commit }) {
    commit('setAlertShowStatus', false)
    commit('setAlertType', '')
    commit('setAlertText', '')
  },
  async addToFavourites({ dispatch }, payload) {
    try {
      await db.collection('favourites').add(payload)
    } catch (error) {
      dispatch('manageAlertBox', {
        alertType: 'error',
        alertText: error.message,
      })
    }
  },
  loadFavourites({ commit }, payload) {
    if (payload) {
      db.collection('favourites')
        .where('userId', '==', payload)
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          const changes = snapshot.docChanges()
          changes.forEach((change) => {
            if (change.type === 'added') {
              const document = {
                documentId: change.doc.id,
                ...change.doc.data(),
              }
              commit('setUserFavourites', document)
            }
            if (change.type === 'removed') {
              commit('removeUserFavourites', change.doc.id)
            }
          })
        })
    }
  },
  async removeFromFavourites({ dispatch }, payload) {
    try {
      await db.collection('favourites').doc(payload).delete()
      return true
    } catch (error) {
      dispatch('manageAlertBox', {
        alertType: 'error',
        alertText: error.message,
      })
      return false
    }
  },
}

export const getters = {
  getAlertShowStatus(state) {
    return state.alertShowStatus
  },
  getAlertText(state) {
    return state.alertText
  },
  getAlertType(state) {
    return state.alertType
  },
  getUser(state) {
    return state.user
  },
  getLoading(state) {
    return state.loading
  },
  getUserFavourites(state) {
    return state.userFavourites
  },
}
