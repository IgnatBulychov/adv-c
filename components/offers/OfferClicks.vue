<template>
<div>
  Переходов заказано: <strong> {{ offer.quantity }} </strong> <br>
  Всего переходов выполнено: <strong>  {{ total }} </strong> <br>
  Уникальных переходов выполнено: <strong>  {{ countWithoutDubles }} </strong> <br>

  <v-progress-linear
    :value="Math.ceil(offer.quantity/1*countWithoutDubles)"
    height="25"
  >
    <strong>{{ Math.ceil(offer.quantity/1*countWithoutDubles) }}%</strong>
  </v-progress-linear>


  <v-data-table
    :headers="headers"
    :items="clicks"
    :loading="loading"
    disable-pagination
    disable-filtering
    disable-sort
    hide-default-footer
    :footer-props="{
      'items-per-page-options': [],
      'disable-pagination': true
    }"
    class="elevation-1"
    locale="ru-RU"
  >

    <template v-slot:top>
      <div class="d-flex justify-end">
      <v-btn
      icon
        @click="getClicks()"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      </div>
    </template>
    
    <template v-slot:item.createdAt="{ item }">        
      {{ new Date(item.createdAt).toLocaleString() }}          
    </template>
  </v-data-table>
  <v-pagination
    v-model="page"
    :length="pagesCount"
  ></v-pagination>
</div>
</template>

<script>
export default {
  name: 'OfferClicks',
  props: {
    offer: {
      type: Object
    }
  },
  data: ()=>({
    headers: [
      { text: 'Дата/время', value: 'createdAt', sortable:false },
      { text: 'Страна', value: 'ip', sortable:false },
      { text: 'Дубликат', value: 'isDuble', sortable:false }
    ],
    clicks: [],
    total: 1,
    countWithoutDubles: 0,
    page: 1,
    pagesCount: 0,
    loading: false
  }),
  watch: {
    page(){
      this.getClicks()
    }
  },
  methods: {
    async getClicks() {
      this.loading = true
      let { data } = await this.$axios.get(`clicks/${this.offer.id}`,{
        params: {
          perPage: 10,
          currentPage: this.page
        }
      })
      console.log(data)
      this.clicks = data.clicks.data
      this.countWithoutDubles = Number(data.count[0].count)
      if (data.clicks.pagination.currentPage == 1) this.pagesCount = data.clicks.pagination.lastPage
      if (data.clicks.pagination.currentPage == 1) this.total = data.clicks.pagination.total

      this.loading = false
    }
  },
  mounted() {
    this.getClicks()
  }
}
</script>