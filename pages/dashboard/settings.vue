<template>
  <div>
    Настройки профиля

    <div class="b-avatar">
      <v-img :src="avatar" width="200px" height="200px"></v-img>
    </div>

      <v-tooltip left max-width="150">
        <template v-slot:activator="{ on }">          
          <v-file-input
            @mouseenter.native='on.mouseenter'
            @mouseleave.native='on.mouseleave'
            color="teal"
            label="Аватар"
            outlined
            dense
            v-model="file"
          ></v-file-input>
        </template>
        <span>Загрузите новую аватарку</span>
      </v-tooltip>


            <v-text-field
              v-bind="attrs"
              v-on="on"
              label="Имя"
              outlined
              color="teal"
              prepend-icon="₽"
              v-model="form.firstName"/>

             <v-text-field
              v-bind="attrs"
              v-on="on"
              label="Фамилия"
              outlined
              color="teal"
              prepend-icon="₽"
              v-model="form.lastName"/>

         <v-textarea
          v-bind="attrs"
          v-on="on"
          outlined
          ref="about"
          v-model="form.about"
          label="Описание"
          color="teal"
          prepend-icon="mdi-emoticon-outline"
          @keydown="saveCursor"
          @click="saveCursor"
          @click:prepend="()=>{showEmoj ? showEmoj = 0 : showEmoj = 200 }"
        ></v-textarea>

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

  </div>
</template>

<script>


import { Picker } from 'emoji-mart-vue'
export default {
  layout: 'index',
  
  middleware: ['auth'],
  components: {
    Picker
  },
  data: () =>({
    showEmoj: 0,
    cursorPosition: 0,
    form: {
      firstName: '',
      lastName: '',
      about: '',
    },
    avatar: null,
    file: null,    
    openCrop: false,
  }),
  watch: {
    file() {
      this.openCrop = true
    },
  },
  methods:{
    async editProfile() {
      await this.$axios.put(`/profile`, {
        ...this.form
      })
    },
    changeAvatar() {

    },
     saveCursor(){
      this.$refs.about.focus()
      setTimeout(()=>{
        this.cursorPosition = this.$refs.about.$el.querySelector("textarea").selectionStart
      },10)      
    },
    addEmoji(em) {
      let textArea = this.$refs.about.$el.querySelector("textarea")
      this.$refs.about.focus()

      setTimeout(() => {
        textArea.selectionEnd = this.cursorPosition
      },10)
                
      if (this.cursorPosition == 0 && this.form.about.length == 0) {
        this.form.about = em.native
        this.cursorPosition = em.native.length
      } else {
        let start = this.form.about.substr(0, this.cursorPosition)
        let end = this.form.about.substr(this.cursorPosition, this.form.about.length - 1)
        this.form.about = start + em.native + end
        this.cursorPosition = this.cursorPosition + em.native.length
      }      
    },
    async cropperHandler(cropper) {
      await this.$axios.put(`/profile/edit-avatar`, {
        avatar:cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)
      })      

      this.openCrop = false
    },

  },
  async mounted() {
    let response = await this.$axios.get(`/profile`)
    this.form = response.data
    this.avatar = this.form.avatar
    delete this.form.avatar
  }
}
</script>