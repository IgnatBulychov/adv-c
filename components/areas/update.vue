<template> 
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"    
        lazy-validation
        class="create-form py-2"
      >

    <v-tooltip left max-width="150">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-bind="attrs"
          v-on="on"
          outlined
          label="Название"
          v-model="form.title"
          :rules="titleRules"
          required
          color="teal"
          prepend-icon="mdi-card-text-outline"
        />
      </template>
      <span>Название вашего сайта, блога, сообщества или канала</span>
    </v-tooltip>

<div class="pl-8 text-center ">
      Где размещен ваш блог, сообщество, канал и т.п.
</div>
      <v-item-group
        v-model="networkKey"
        mandatory
        class="py-4 pl-8 "
      >
        <v-row>
          <v-col
            v-for="network in networks" :key="network.id"
            cols="3"
          >
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'teal lighten-2' : 'white'"
                class="d-flex flex-column align-center py-4 px-2"
                :dark="active ? true : false"
                @click="toggle"
              >
                <v-img
                  :src="network.poster"
                  @click="toggle"
                  width="60"
                ></v-img>
                {{ network.title }}
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>

    
      <v-tooltip left max-width="150">
        <template v-slot:activator="{ on }">          
          <v-file-input
            @mouseenter.native='on.mouseenter'
            @mouseleave.native='on.mouseleave'
            color="teal"
            label="Постер"
            outlined
            dense
            v-model="file"
          ></v-file-input>
        </template>
        <span>Добавьте узнаваемый постер к вашей площадке</span>
      </v-tooltip>

  
    <avatar-cropper
      :output-options="{width: 350, height: 350}"
      :file="file"
      :cropper-options="{
                          aspectRatio: 1 / 1,
                          autoCropArea: 1,
                          viewMode: 1,
                          movable: true,
                          minCropBoxHeight: 100,
                          minCropBoxWidth: 100,
                          minCropBoxHeight: 100,
                          minCropBoxWidth: 100,
                          minContainerWidth: 400,
                          minContainerHeight: 300,
                          zoomable: false,
                        }"
      :labels="{submit: 'Сохранить', cancel: 'Отмена'}"
      :upload-handler="cropperHandler"
      v-model="openCrop"/>


<v-tooltip left max-width="150">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind="attrs"
              v-on="on"
              outlined
              label="Ссылка на вашу площадку"
              v-model="form.url"
              required
              color="teal"
              prepend-icon="mdi-link"
            />
          </template>
          <span>Вставьте ссылку на ваш сайт, блог, сообщество или канал</span>
        </v-tooltip>

              <v-tooltip left max-width="150">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      label="Количество подписчиков"
                      outlined
                      type="number"
                      color="teal"
                      prepend-icon="mdi-account-multiple-outline"
                      v-model="form.numberOfFollowers"/>
                  </template>
                  <span>Сколько подписчиков на вашем канале, блоге, группе</span>
                </v-tooltip>


    

    <v-tooltip left max-width="150">
      <template v-slot:activator="{ on, attrs }">
         <v-textarea
          v-bind="attrs"
          v-on="on"
          outlined
          ref="description"
          v-model="form.description"
          label="Описание"
          color="teal"
          prepend-icon="mdi-emoticon-outline"
          @keydown="saveCursor"
          @click="saveCursor"
          @click:prepend="()=>{showEmoj ? showEmoj = 0 : showEmoj = 200 }"
        ></v-textarea>
      </template>
      <span>Расскажите подробнее о чем ваш сайт или блог. Какие интересы объединяют ваше сообщество или канал. Можно использовать эмодзи.</span>
    </v-tooltip>
    
 <picker      
 v-if="showEmoj"    
          :style="{ 
            width: '100%', 
            height: showEmoj+'px', 
            transition: 'all .3s' , 
            opacity: showEmoj ? 1 : 0, 
            overflow: 'hidden',
            'margin-left': 'auto',
            width: '700px',
          }"
          color="#009688"
          :showPreview="false"
          class="mb-4"
          @select="addEmoji"/>
       
       
  <v-tooltip left max-width="150">
                  <template v-slot:activator="{ on, attrs }">
                     <v-select
                      v-bind="attrs"
                      v-on="on"
                    v-model="form.categories"
                    :items="categories"
                     item-text="title"
                     item-value="id"
                    chips
                    label="Категории"
                    multiple
                    outlined
                    color="teal"
                    item-color="teal"
                    class="pl-8"
                  ></v-select>
                  </template>
      <span>
        Подберите подходящие тематические теги, чтобы вашу площадку было легче найти
      </span>
    </v-tooltip>



    
 <v-tooltip left max-width="150">
          <template v-slot:activator="{ on, attrs }">
        <v-combobox
          v-bind="attrs"
          v-on="on"
          :items="adressResults"
          item-text="locality"
          item-value="fiasCode"
          v-model="form.locations"
          @input="handleInputAdress"
          multiple
          chips
          small-chips
          outlined
          dense
          clearable
          label="Местоположение (город, область)"
          placeholder="Вся Россия"
          :loading="isLoadingAdress"
          :search-input.sync="searchValueAdress"
          color="teal"
          item-color="teal"
          class="pl-8"
        ></v-combobox>
  </template>
        <span>Укажите где в основном находится ваша аудитория</span>
      </v-tooltip>
     

    
         <v-text-field
                      label="Цена за клик по рекламе"
                      outlined
                      type="number"
                      color="teal"
                      prepend-icon="₽"
                      v-model="form.cpc"/>

       


       
        
          
      </v-form>
    </v-card-text>
    <v-card-actions>       
      <v-btn
        color="gray darken-1"
        text
        @click="$emit('close')"
      >
        Отмена
      </v-btn>
        <v-spacer></v-spacer>
      <v-btn
        color="teal"
        text
        @click="update()"
      >
        Изменить
      </v-btn>
    </v-card-actions>




  </v-card>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
import ServicesPicker from '~/components/areas/ServicesPicker'
import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  name: 'UpdateArea',
  props: ['enterData'],
  components: {
    Picker, ServicesPicker
  },
  data: () => ({
    networks: [],
    showEmoj: 0,
    symbols: 0,
    cursorPosition: 0,
    networkKey: 0,
    categories:[],
    searchValueAdress: '',
    adressResults: [],
    isLoadingAdress:false,
    responser: false,
    form: {
      title: '',
      description: '',
      poster: null,
      //services: [],
      url: '',
      locations: [],
      categories: [],
      cpc: null
    },
    isPosterChanges: false,
    file: null,    
    openCrop: false,
    
    titleRules: [
      v => !!v || 'Введите название',
    ],
  }),
  watch: {
    enterData() {      
      this.form = this.enterData
    },
    file() {
      this.openCrop = true
      if (!this.file) {
        this.isPosterChanges = false
      }
    },
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    async searchValueAdress() {
      if (this.responser) {
        return
      }
      this.responser = true
      setTimeout(async ()=>{
        this.isLoadingAdress = true
        let suggestions = await this.$getAdressSuggestion(this.searchValueAdress)    

        this.adressResults = suggestions
        this.isLoadingAdress = false
        this.responser = false
      }, 1000)      
    }
  },  
  methods: {
    async update() {
      if (!this.$refs.form.validate()) {
        return
      }
      console.log(this.form) // проблема при ред и города и категории

    //  this.form.categories.map(cat)

      await this.$axios.put(`/areas/${this.enterData.id}`, {
        ...this.form,
        isPosterChanges: this.isPosterChanges,
        networkId: this.networks[this.networkKey].id,
      })
     /* this.form = {
        title: '',
        description: '',
        poster: null,
        categories: []
      }*/
      this.$emit('close')
    },
    saveCursor(){
      this.$refs.description.focus()
      setTimeout(()=>{
        this.cursorPosition = this.$refs.description.$el.querySelector("textarea").selectionStart
      },10)      
    },
    addEmoji(em) {
      let textArea = this.$refs.description.$el.querySelector("textarea")
      this.$refs.description.focus()

      setTimeout(() => {
        textArea.selectionEnd = this.cursorPosition
      },10)
                
      if (this.cursorPosition == 0 && this.form.description.length == 0) {
        this.form.description = em.native
        this.cursorPosition = em.native.length
      } else {
        let start = this.form.description.substr(0, this.cursorPosition)
        let end = this.form.description.substr(this.cursorPosition, this.form.description.length - 1)
        this.form.description = start + em.native + end
        this.cursorPosition = this.cursorPosition + em.native.length
      }      
    },
     async cropperHandler(cropper) {
      this.form.poster = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)
      this.isPosterChanges = true
      this.openCrop = false
    }, 
    handleInputAdress(elements) {
      this.form.locations = elements
    }
  },
  async mounted() {
    let res = await Promise.all([
      this.$axios.get(`/networks`),
      this.$axios.get(`/categories`)
    ])
    this.networks = res[0].data
    this.categories = res[1].data
    this.form = this.enterData
  }
}
</script>

<style>
.network-poster {
  width: 35px;
  height: 35px;
  object-fit: cover;
}

.avatar-cropper-btn:first-of-type {
  color: #000 !important;
}
.avatar-cropper-btn:last-of-type {
  color: #fff !important;
  background-color: #4db6ac !important
}

.avatar-cropper-btn:first-of-type:hover {
  background-color: #ffffff !important
}
.avatar-cropper-btn:last-of-type:hover {
  background-color: #54c5ba !important
}

.cropper-point {
  background-color: #4db6ac
}
</style>