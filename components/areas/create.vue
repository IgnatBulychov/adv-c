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

    <v-text-field
          outlined
          label="Название вашего блога, сообщества, канала и т.п."
          v-model="form.title"
          :rules="titleRules"
          required
          color="teal"
          prepend-icon="mdi-card-text-outline"
        />
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
                  :src="`/networks/${network.poster}.png`"
                  @click="toggle"
                  width="60"
                ></v-img>
                {{ network.title }}
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>

      <v-file-input
      color="teal"
    label="Постер"
    outlined
    dense
    v-model="file"
  ></v-file-input>

  
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

<!--
       <v-radio-group v-model="form.network">
        <template v-slot:label>
          <div>
            Соцсеть:
          </div>
        </template>
        <v-radio v-for="network in networks" :value="network.id" :key="network.id" color="teal">
          <template v-slot:label>
            <img :src="`/networks/${network.poster}.png`" class="network-poster">
            <div class="px-2">
              <strong class="teal--text">{{ network.title }}</strong>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
-->

    


        <v-textarea
          outlined
          ref="description"
          v-model="form.description"
          label="Описание. Расскажите подробнее о чем ваша площадка"
          color="teal"
          prepend-icon="mdi-emoticon-outline"
          @keydown="saveCursor"
          @click="saveCursor"
          @click:prepend="()=>{showEmoj ? showEmoj = 0 : showEmoj = 200 }"
        ></v-textarea>

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
          @select="addEmoji"/>

       
        
          
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
        Создать
      </v-btn>
    </v-card-actions>




  </v-card>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  name: 'CreateArea',
  components: {
    Picker
  },
  data: () => ({
    networks: [],
    showEmoj: 0,
    symbols: 0,
    cursorPosition: 0,
    networkKey: 0,
    form: {
      title: '',
      description: '',
      poster: null,
    },
    file: null,    
    openCrop: false,
    titleRules: [
      v => !!v || 'Введите название',
    ],
  }),
  watch: {
    file() {
      this.openCrop = true
      console.log(this.file)
    }
  },
  computed: {
      
  },
  methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return
      }
      await this.$axios.post(`/areas`, {
        ...this.form,
        networkId: this.networks[this.networkKey].id,

      })
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
      
      this.openCrop = false
    }
  },
  async mounted() {
    let res = await this.$axios.get(`/networks`)
    this.networks = res.data
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