<template>
  <div id="app">
    <div>
      <div>
        <table>
          <tr class="table__row">
            <th class="table__heading">Имя<span class="table__arrow" id="name" @click="sortTable"></span></th>
            <th class="table__heading">Телефон<span class="table__arrow" id="phone" @click="sortTable"></span></th>
          </tr>
          <tr class="table__row" v-if="list.length === 0">
            <td class="table__cell table__cell_main">Тут появится имя</td>
            <td class="table__cell table__cell_main">Тут появится номер</td>
          </tr>
          <tbody class="table__row" v-for="(item, idx) in list" :key="idx">
            <tr>
              <td class="table__cell table__cell_main"><span class="table__plus" v-if="item.children.length > 0" @click="showChildren">+</span>{{ item.name }}</td>
              <td class="table__cell table__cell_main">{{ item.phone }}</td>
            </tr>
              <tr class="table__row" v-for="(child, i) in item.children" :key="i">
                <td div v-if="shownChildren" class="table__cell table__cell_second">{{ child.name }}</td>
                <td div v-if="shownChildren" class="table__cell table__cell_second">{{ child.phone }}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="button" @click="toggleForm">Добавить</button>
    <div>
      <form class="form" v-if="isFormShown" @submit.prevent="addItems">
      <label class="form__element" for="name"><input id="name" v-model="name" required/>Имя</label>
      <label class="form__element" for="phone"><input id="phone" v-model="phone" required/>Телефон</label>
      <label class="form__element" for="boss">
        <select id="boss" v-model="boss">
          <option selected></option>
          <option v-for="(boss, idx) in items" :key="idx">{{ boss.name }}</option>
        </select>
        Начальник</label>
      <button class="button" type="submit">Сохранить</button>
      <p class="form__error" v-if="nameExists">Такое имя уже есть в записной книжке</p>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      list: [],
      sortKey: 'name',
      sortReverse: false,
      name: '',
      phone: '',
      boss: '',
      children: []
    }
  },
  computed: {
    isFormShown () {
      return this.$store.getters.isFormShown
    },
    items () {
      return this.$store.getters.getItems
    },
    nameExists () {
      return this.$store.getters.nameExists
    },
    shownChildren () {
      return this.$store.getters.shownChildren
    }
  },
  mounted () {
    this.list = this.items
  },
  methods: {
    sortTable (event) {
      this.$store.commit('sortTable', event.target)
      this.list = this.$store.getters.items
    },
    showChildren () {
      this.$store.commit('showChildren')
    },
    addItems () {
      const payload = {
        name: this.name,
        phone: this.phone,
        boss: this.boss,
        children: this.children
      }
      this.$store.commit('addItems', payload)
      this.name = ''
      this.phone = ''
      this.boss = ''
      this.children = []
      this.list = this.$store.getters.items
    },
    toggleForm () {
      this.$store.commit('toggleForm')
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 200px;
  gap: 20px;
  padding: 20px;
}
.button {
  font-size: 16px;
  padding: 10px;
  height: 40px;
  max-width: 100px;
}
.table__heading {
  font-weight: bold;
  padding: 5px;
  border: 1px solid #aaa;
  position: relative;
  min-width: 150px;
}
.table__arrow {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  width: 10px;
  height: 10px;
  border-right: 2px solid #aaa;
  border-bottom: 2px solid #aaa;
  transition: transform 0.5s;
  transform: rotate(45deg);
}
.table__plus {
  cursor: pointer;
  padding: 5px;
}
.table__arrow_active {
  transform: rotate(225deg);
}
.table__cell {
  padding: 5px;
}
.table__cell_main {
  border: 1px solid #aaa;
  font-weight: bold;
}
.table__cell_second {
  background-color: #eee;
}
.form {
  display: flex;
  flex-direction: column;
}
.form__element {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}
.form__element input,
.form__element select {
  min-width: 200px;
  padding: 2px;
}
.form__element input:focus, .form__element select:focus {
  outline-color: #121212;
}
.form__error {
  color: rgb(207, 26, 26);
  margin: 20px 0;
  text-align: left;
  font-size: 14px;
}
@media screen and (max-width: 1024px) {
  #app {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
