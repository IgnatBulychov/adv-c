<template>
    

    <v-data-table
    :headers="headers"
    :items="services"
    sort-by="calories"
    class="elevation-1"
    :class="{
      'ml-8' : !updateForm
    }"
    hide-default-footer
    disable-pagination
  >
    <template v-slot:top>
      <v-toolbar
        flat
        height="30"
      >
        <v-dialog
          v-model="dialog"
          max-width="500px"
          
        >
          <template v-slot:activator="{ on, attrs }">
            <v-spacer></v-spacer>
            <v-btn              
              v-if="updateForm"
              color="teal"
              icon
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="teal">
                mdi-plus
              </v-icon> 
            </v-btn>  
            <v-btn
              v-else
              color="teal"
              outlined
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Добавить услугу           
            </v-btn>          
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >

                  <v-tooltip left max-width="150">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Название"
                        color="teal"
                        outlined
                        v-model="editedItem.title"/>
                    </template>
                  <span>Укажите название услуги, например: "размещение рекламного поста в сторис"</span>
                  </v-tooltip>


                  <v-tooltip left max-width="150">
                    <template v-slot:activator="{ on, attrs }">
                      <v-textarea
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        v-model="editedItem.description"
                        label="Описание."
                        color="teal"
                      ></v-textarea>
                    </template>
                    <span>Подробно опишите услугу: на какой срок размещается рекламное объявление, будет ли оно закреплено и т.д.</span>
                  </v-tooltip>


                  <v-tooltip left max-width="150">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Цена"
                        outlined
                        type="number"
                        color="teal"
                        prefix="₽"
                        v-model="editedItem.price"/>
                    </template>
                    <span>Укажите цену за одно размещение обьявления или за один клик по ссылке</span>
                  </v-tooltip>

                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="gray"
                text
                @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                color="teal"
                text
                @click="save"
              >
                {{ formOk }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы действительно желаете удалить услугу?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray" text @click="closeDelete">Отмена</v-btn>
              <v-btn color="teal" text @click="deleteItemConfirm">Да</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      Добавьте услуги
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ServicesPicker',
  props: {
    updateForm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    examples: [      
      'размещение рекламного поста',
      'клик по вашему объявлению'   
    ],
    services: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Название',
        align: 'start',
        sortable: true,
        value: 'title',
      },
      { text: 'Цена', value: 'price', sortable: false },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      title: '',
      description: '',
      price: null
    },
    defaultItem: {
      title: '',
      description: '',
      price: null
    },
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавление услуги' : 'Редактирование услуги'
    },
    formOk () {
      return this.editedIndex === -1 ? 'Добавить' : 'Обновить'
    },
  },
  methods: {
     editItem (item) {
        this.editedIndex = this.services.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$emit('servicesChanges', this.services)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.services.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        this.services.splice(this.editedIndex, 1)
        this.$emit('servicesChanges', this.services)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.services[this.editedIndex], this.editedItem)                 
        } else {
          this.services.push(this.editedItem)          
        }
        this.$emit('servicesChanges', this.services)
        this.close()
      },
  },
}
</script>