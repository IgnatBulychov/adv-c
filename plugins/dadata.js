import Vue from 'vue'

const getAdressSuggestion = {
  install: (Vue, options) => {
    Vue.prototype.$getAdressSuggestion = async function (query) {
      this.$axios.setToken('75d8f2ef2e73e45d21ccc0ac3096b8364217afa8', 'Token')
      let res = await this.$axios.get('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',{
        params: {
          query,
          "from_bound": { "value": "city" },
          "to_bound": { "value": "city" } 
        }
      })
      return res.data.suggestions
      .filter(addr => !addr.data.street && !addr.data.settlement)
      .map(addr => {
        return {
          locality: addr.value,
          fiasCode: addr.data.fias_code
        }
      })
    }
  }
}

Vue.use(getAdressSuggestion)