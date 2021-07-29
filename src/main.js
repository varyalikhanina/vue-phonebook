import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isFormShown: true,
    shownChildren: true,
    items: [],
    nameExists: false,
    sortReverse: false,
    sortKey: 'name'
  },
  mutations: {
    addItems (state, payload) {
      const bossExists = state.items.filter(item => item.name === payload.name)
      const boss = state.items.find(item => item.name === payload.boss)

      const children = []
      state.items.forEach(item => {
        item.children.forEach(child => {
          children.push(child)
        })
      })
      const nameExists = (element) => element.name === payload.name
      const name = children.some(nameExists)

      if (bossExists.length > 0 || name) {
        state.nameExists = true
      } else {
        state.nameExists = false
        if (boss) {
          const bossIdx = state.items.indexOf(boss)
          state.items[bossIdx].children.push(payload)
        } else {
          state.items.push(payload)
        }
        localStorage.setItem('items', JSON.stringify(state.items))
      }
    },
    sortTable (state, payload) {
      if (payload.style.transform === '' || payload.style.transform === 'rotate(45deg)') {
        const elArray = document.querySelectorAll('.table__arrow')
        elArray.forEach(el => {
          el.style.transform = 'rotate(45deg)'
        })
        payload.style.transform = 'rotate(225deg)'
      } else if (payload.style.transform === 'rotate(225deg)') {
        payload.style.transform = 'rotate(45deg)'
      }
      state.sortReverse = (state.sortKey === payload.id) ? !state.sortReverse : false
      state.sortKey = payload.id
      const list = state.items
      if (state.sortKey) {
        list.sort((a, b) => {
          a = a[state.sortKey]
          b = b[state.sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * (state.sortReverse ? 1 : -1)
        })
      }
      state.items = list
    },
    toggleForm (state) {
      state.isFormShown = !state.isFormShown
    },
    showChildren (state) {
      state.shownChildren = !state.shownChildren
    }
  },
  getters: {
    getItems (state) {
      if (JSON.parse(localStorage.getItem('items'))) {
        state.items = JSON.parse(localStorage.getItem('items'))
      }
      return state.items
    },
    isFormShown (state) {
      return state.isFormShown
    },
    shownChildren (state) {
      return state.shownChildren
    },
    nameExists (state) {
      return state.nameExists
    },
    items (state) {
      return state.items
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store: store
})
