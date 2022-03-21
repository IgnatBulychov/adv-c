<template>
  <v-card>
    <v-card-title>
      Создание заказа
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"    
        lazy-validation
        class="create-form py-2"
      >
      <v-alert
        outlined
        color="teal"
        text
        icon="mdi-account-group-outline"
      >
        Площадка: {{ selectedArea.title }}
      </v-alert>
      <v-alert
        outlined
        color="teal"
        text
        icon="mdi-web"
      >
        Сеть: {{ selectedArea.network.title }}
      </v-alert>

      <div class="d-flex">

      <v-text-field
        label="Цена за переход"
        outlined
        type="number"
        color="teal"
        readonly
        prepend-icon="₽"
        v-model="selectedArea.cpc"/>

      <v-text-field
        label="Укажите количество кликов"
        outlined
        type="number"
        color="teal"
        class="pl-2"
        prepend-icon="mdi-cursor-default-click-outline"
        v-model="form.quantity"/>
    </div>

    <v-text-field
      label="Итог"
      outlined
      type="number"
      color="teal"
      readonly
      prepend-icon="mdi-cash"
      :value="form.quantity * selectedArea.cpc"/>
    
    <v-text-field
      label="Ссылка в вашем объявлении"
      outlined
      color="teal"
      prepend-icon="mdi-link"
      v-model="form.link"/>

    <v-text-field
      label="Заголовок объявления"
      outlined
      color="teal"
      prepend-icon="mdi-format-title"
      v-model="form.title"/>


    <v-tooltip left max-width="150">
      <template v-slot:activator="{ on, attrs }">
         <v-textarea
          v-bind="attrs"
          v-on="on"
          outlined
          ref="text"
          v-model="form.text"
          label="Текст вашей рекламы"
          color="teal"
          prepend-icon="mdi-emoticon-outline"
          @keydown="saveCursor"
          @click="saveCursor"
          @click:prepend="()=>{showEmoj ? showEmoj = 0 : showEmoj = 200 }"
        ></v-textarea>
      </template>
      <span>Напишите текст вашей рекламы, чтобы заинтересовать ваших будущих клиентов. Можно использовать эмодзи.</span>
    </v-tooltip>

    <picker          
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

      <v-textarea
        outlined
        v-model="form.comment"
        label="Сообщение для продавца (не обязательно)"
        color="teal"
        prepend-icon="mdi-android-messages"        
      ></v-textarea>
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
      @click="create()"
    >
      Создать заказ
    </v-btn>
  </v-card-actions>

  <v-snackbar
    v-model="success"
    :timeout="3000"
    :top="true"
    color="success">
    Ваш заказ успешно создан

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text icon
        v-bind="attrs"
        @click="success = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>

  <v-snackbar
    v-model="errorsFromServer"
    :timeout="3000"
    :top="true"
    color="error">
    {{ errorMessage }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text icon
        v-bind="attrs"
        @click="errorsFromServer = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
  </v-card>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
export default {
  props: {
    selectedArea: {
      type: Object
    }
  },
  components: {
    Picker
  },
  data: ()=>({
    form: {
      quantity: 10,
      link:'',
      text:'',
      image:null,
      comment: '',
      status: 'created'
    },
    file: null,    
    openCrop: false,
    showEmoj: 0,
    cursorPosition: 0,
    success:false,
    errorsFromServer: false,
    errorMessage: ''
  }), 
   watch: {
    file() {
      this.openCrop = true
    },
   }, 
  methods: {
    async create() {
      try {
        await this.$axios.post(`/offer`, {
          ...this.form,
          areaId: this.selectedArea.id
        })
        this.success = true
        this.$router.push('/dashboard/offers/my')
      } catch(e) {
        this.errorsFromServer = true
        this.errorMessage = e.response.data
      }
    },
    saveCursor(){
      this.$refs.text.focus()
      setTimeout(()=>{
        this.cursorPosition = this.$refs.text.$el.querySelector("textarea").selectionStart
      },10)      
    },
    addEmoji(em) {
      let textArea = this.$refs.text.$el.querySelector("textarea")
      this.$refs.text.focus()

      setTimeout(() => {
        textArea.selectionEnd = this.cursorPosition
      },10)
                
      if (this.cursorPosition == 0 && this.form.text.length == 0) {
        this.form.text = em.native
        this.cursorPosition = em.native.length
      } else {
        let start = this.form.text.substr(0, this.cursorPosition)
        let end = this.form.text.substr(this.cursorPosition, this.form.text.length - 1)
        this.form.text = start + em.native + end
        this.cursorPosition = this.cursorPosition + em.native.length
      }      
    },
    async cropperHandler(cropper) {
      this.form.image = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)      
      this.openCrop = false
    },
  }
}
</script>