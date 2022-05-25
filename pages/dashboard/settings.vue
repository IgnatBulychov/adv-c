<template>
  <div class="b-wrapper">
    <div class="b-avatar">     
      <img :src="ava">
    </div> 

    <v-file-input
      color="teal"
      label="Загрузите аватарку"
      outlined
      dense
      v-model="file"/>

    <v-text-field
      label="Имя"
      outlined
      color="teal"
      class="pl-8"
      v-model="form.firstName"/>

    <v-text-field
      label="Фамилия"
      outlined
      color="teal"
      class="pl-8"
      v-model="form.lastName"/>

    <v-textarea
      outlined
      ref="about"
      v-model="form.about"
      label="Расскажите о себе"
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
       
    <client-only>
      <picker          
        :style="{ 
          width: '100%', 
          height: showEmoj+'px', 
          transition: 'all .3s' , 
          opacity: showEmoj ? 1 : 0, 
          overflow: 'hidden',
          'margin-left': 'auto',
          width: '100%',
        }"
        color="#009688"
        :showPreview="false"
        class="mb-4"
        @select="addEmoji"/>
    </client-only>
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
  computed: {
    ava() {
      return this.avatar
    }
  },
  methods:{
    async editProfile() {
      await this.$axios.put(`/profile`, {
        ...this.form
      })
    },
    changeAvatar() {
      //
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
      let response = await this.$axios.put(`/profile/change-avatar`, {
        avatar:cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)
      })
      this.avatar = response.data.avatar
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

<style scoped>
.b-wrapper {
  padding: 10px 20px
}
.b-avatar {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
}
.b-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
</style>