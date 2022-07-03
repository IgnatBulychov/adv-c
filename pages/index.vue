<template>
  <div>


          <v-parallax
                        
              src='back.png'
              min-height="400px"
            >
              <v-row
                align="center"
              >
                <v-col class="text-center" cols="12" md="6">
                  <h1 class="display-2 font-weight-thin mb-4" dark >TradeStream</h1>
                  <h4 class="subheading">Получите нативную рекламу для своего бизнеса</h4>
                  <v-btn 
                    color="white"
                    @click="$vuetify.goTo('#about', { offset: -20,  easing: 'easeInOutCubic' })"
                    class="mx-3 my-4" 
                    outlined
                  >Узнать больше</v-btn> 
                  <v-btn 
                    color="teal"
                    to="/search"
                    class="mx-3 my-4" 
                    dark
                  >Найти продовца</v-btn> 
                </v-col>
              </v-row>
          </v-parallax>  




          <v-container fluid> 

              <v-row justify="center" id="about">
              <v-col cols="10" md="8">
                <h3 class="display-1 font-weight-thin my-5">
                Что такое TradeStream?
                </h3> 
                <v-divider class="my-5"></v-divider> 
              </v-col>
              <v-col cols="10" md="8">
                Этот сайт объединяет блоггеров и тех, кто хочет продвинуть свои товариы и услуги в социальных сетях.<br>
                

Нативная или естесственная реклама
                
                Продвигайтие свои товары и услуги в соцсетях!
   Платите не просто за размещение, а за реальных, заинтересованных посетителей!
  

  Ваше объявление увидит только заинтересованные пользователи

  Покупать клики дешевле и эффективнее!

  Можно попробовать небольшую покупку и нанлизировать эффеткивность совей рекламной кампании.

  Ведите переписку с закзчиком в раельном времени


  На объявления в ленте нажимают чаще чем на обьявления в боковых колонках, внизу или вверху.

Охватите людей вашей местности и направте в свой бизнес
                
                  </v-col>
            </v-row> 
       
            <v-row justify="center" id="about">
              <v-col cols="10" md="8">
                <h3 class="display-1 font-weight-thin my-5">
                Почему TradeStream?  
                </h3> 
                <v-divider class="my-5"></v-divider> 
              </v-col>
              <v-col cols="10" md="8">
                
                Продвигайтие свои товары и услуги в соцсетях!
   Платите не просто за размещение, а за реальных, заинтересованных посетителей!
  
   Купите качественную рекламу в соцсетях

  Ваше объявление увидит только заинтересованные пользователи

  Покупать клики дешевле и эффективнее!

  Можно попробовать небольшую покупку и нанлизировать эффеткивность совей рекламной кампании.

  Ведите переписку с закзчиком в раельном времени


  На объявления в ленте нажимают чаще чем на обьявления в боковых колонках, внизу или вверху.

Охватите людей вашей местности и направте в свой бизнес
                
                  </v-col>
            </v-row> 
           

    
            <v-row justify="center">
              <v-col cols="10" sm="5" md="5" lg="5"   align="center">
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10H20C20,13.32 17.32,16 14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4C14.43,4 14.86,4.05 15.27,4.14L16.88,2.54C15.96,2.18 15,2 14,2M20.59,3.58L14,10.17L11.62,7.79L10.21,9.21L14,13L22,5M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82Z" />
              </svg> <br/>
                  <span class="subtitle-1  my-5">Бесплатно и без регистрации</span> 
              </v-col>
              <v-col cols="10" sm="5" md="5" lg="5"   align="center">
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2 2H6V0H2C.9 0 0 .9 0 2V6H2V2M22 0H18V2H22V6H24V2C24 .9 23.1 0 22 0M2 18H0V22C0 23.1 .9 24 2 24H6V22H2V18M22 22H18V24H22C23.1 24 24 23.1 24 22V18H22V22M8 6V4H10V6H8M10 14V12H12V14H10M16 4H18V6H16V4M18 6H20V8H18V6M18 14H20V16H18V14M20 12H16V18H20V20H4V4H6V6H8V10H6V12H8V14H10V16H12V18H14V16H12V14H14V10H10V6H12V4H14V8H16V10H20V12M8 18V16H6V18H8Z" />
              </svg> <br/>
                  <span class="subtitle-1  my-5">Маркировка, реквизиты покупателя, агентские схемы, разные СНО</span> 
              </v-col>
              <v-col cols="10" sm="5" md="5" lg="5"   align="center">
                <svg style="width:40px;height:40px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4,6H6V18H4V6M7,6H8V18H7V6M9,6H12V18H9V6M13,6H14V18H13V6M16,6H18V18H16V6M19,6H20V18H19V6M2,4V8H0V4A2,2 0 0,1 2,2H6V4H2M22,2A2,2 0 0,1 24,4V8H22V4H18V2H22M2,16V20H6V22H2A2,2 0 0,1 0,20V16H2M22,20V16H24V20A2,2 0 0,1 22,22H18V20H22Z" />
              </svg><br/>
                  <span class="subtitle-1  my-5">Поддержка сканера ШК</span> 
              </v-col>
              <v-col cols="10" sm="5" md="5" lg="5"   align="center">
                <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2,17H22V21H2V17M6.25,7H9V6H6V3H14V6H11V7H17.8C18.8,7 19.8,8 20,9L20.5,16H3.5L4.05,9C4.05,8 5.05,7 6.25,7M13,9V11H18V9H13M6,9V10H8V9H6M9,9V10H11V9H9M6,11V12H8V11H6M9,11V12H11V11H9M6,13V14H8V13H6M9,13V14H11V13H9M7,4V5H13V4H7Z" />
              </svg><br/>
                  <span class="subtitle-1  my-5">Поддержка касс Атол и Меркурий</span> 
              </v-col>
           
            </v-row>
    
            
    
            <v-row justify="center" id="works">
              <v-col cols="10" md="8">
                <h3 class="display-1 font-weight-thin my-5">Скрины</h3> 
                  <v-divider class="my-5"></v-divider> 
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="4">
                      <v-card class="mx-auto" max-width="344">            
                        <div>
                          <div>
                            <v-img src='img/screens/rmk1.jpg' height="160px"></v-img>
                          </div>
                        </div>
                        <v-card-title>
                          <span class="d-inline-block text-truncate" style="max-width: 100%">
                            РМК
                          </span>
                        </v-card-title>
                        <v-card-subtitle>
                          <span class="d-inline-block text-truncate" style="max-width: 100%;">
                            Удобное рабочее место кассира
                          </span>
                        </v-card-subtitle>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="success "
                            text
                            @click.stop="dialogScreens1 = true"
                          >
                          Больше
                          </v-btn>
                        </v-card-actions>
                        <v-dialog
                          max-width="80%"
                          v-model="dialogScreens1"
                        >
                          <v-card>
                            <v-card-title class="headline">  
                              Удобное РМК
                              <v-spacer></v-spacer>
                              <v-btn
                                icon
                                text
                                @click="dialogScreens1 = false"
                              >
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                            </v-card-title>
    
                            <v-card-text>
                              Удобное рабочее место кассира
                            
    
                            <v-carousel
                              cycle
                              height="400px"
                              show-arrows-on-hover
                            >
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/rmk1.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/rmk2.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/rmk3.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/rmk4.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                            </v-carousel>  
                            
                          </v-card-text>                      
                          </v-card>
                        </v-dialog>   
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="4">
                      <v-card class="mx-auto" max-width="344">            
                        <div>
                          <div>
                            <v-img src='img/screens/items1.jpg' height="160px"></v-img>
                          </div>
                        </div>
                        <v-card-title>
                          <span class="d-inline-block text-truncate" style="max-width: 100%">
                            Справочники
                          </span>
                        </v-card-title>
                        <v-card-subtitle>
                          <span class="d-inline-block text-truncate" style="max-width: 100%;">
                            Справочники товаров, клиентов, поставщиков и агентских схем
                          </span>
                        </v-card-subtitle>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="success "
                            text
                            @click.stop="dialogScreens2 = true"
                          >
                          Больше
                          </v-btn>
                        </v-card-actions>
                        <v-dialog
                          max-width="80%"
                          v-model="dialogScreens2"
                        >
                          <v-card>
                            <v-card-title class="headline">  
                              Справочники
                              <v-spacer></v-spacer>
                              <v-btn
                                icon
                                text
                                @click="dialogScreens2 = false"
                              >
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                            </v-card-title>
    
                            <v-card-text>
                              Справочники товаров, клиентов, поставщиков и агентских схем
                            
    
                            <v-carousel
                              cycle
                              height="400px"
                              show-arrows-on-hover
                            >
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/items1.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/items2.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                            </v-carousel>  
                            
                          </v-card-text>                      
                          </v-card>
                        </v-dialog>   
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="4">
                      <v-card class="mx-auto" max-width="344">            
                        <div>
                          <div>
                            <v-img src='img/screens/set1.jpg' height="160px"></v-img>
                          </div>
                        </div>
                        <v-card-title>
                          <span class="d-inline-block text-truncate" style="max-width: 100%">
                            Настройка
                          </span>
                        </v-card-title>
                        <v-card-subtitle>
                          <span class="d-inline-block text-truncate" style="max-width: 100%;">
                            Настройка оборудования, пользователей, тип оплат, систем налогооблажения
                          </span>
                        </v-card-subtitle>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="success "
                            text
                            @click.stop="dialogScreens3 = true"
                          >
                          Больше
                          </v-btn>
                        </v-card-actions>
                        <v-dialog
                          max-width="80%"
                          v-model="dialogScreens3"
                        >
                          <v-card>
                            <v-card-title class="headline">  
                              Настройка
                              <v-spacer></v-spacer>
                              <v-btn
                                icon
                                text
                                @click="dialogScreens3 = false"
                              >
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                            </v-card-title>
    
                            <v-card-text>
                              Настройка оборудования, пользователей, тип оплат
                            
    
                            <v-carousel
                              cycle
                              height="400px"
                              show-arrows-on-hover
                            >
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/set1.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                              <v-carousel-item >
                                <v-sheet
                                  height="100%"
                                >
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-img src='img/screens/set2.jpg' max-height="400px" contain></v-img>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                            </v-carousel>  
                            
                          </v-card-text>                      
                          </v-card>
                        </v-dialog>   
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
                  </v-row>
                </v-col>
                
                  </v-row>
                </v-col>
                
              </v-row>

              <v-row justify="center" id="items">
                <v-col cols="10" md="8">
                  <h3 class="display-1 font-weight-thin my-5">Услуги</h3> 
                  <v-divider class="my-5"></v-divider> 
                  
                  <v-card>
                    <v-expansion-panels>
                      <v-expansion-panel v-model="panel">
                        <v-expansion-panel-header>Программа LiteRetail</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Услуга</th>
                                  <th class="text-left">Описание</th>
                                  <th class="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Установка программы LiteRetail</td>
                                  <td>
                                    Установка программы и превоначальная настройка производиться бесплатно во время пилотного тестирования.
                                    Установим как программу, так и необходимые драйвера для оборудования.
                                  </td>
                                  <td>
                                    <v-btn
                                      color="success"
                                      @click="dialogOrder = true; orderType = 'Установка программы LiteRetail'"
                                    >
                                      Заказать
                                    </v-btn>
                                  </td>
                                  
                                </tr>
                                <tr>
                                  <td>Удаленная помощь и консультация</td>
                                  <td>Различная помощь в работе с онлайн-кассой, консультирование по работе с маркированными товарами и т.д.</td>
                                  <td>
                                    <v-btn
                                      color="success"
                                      @click="dialogOrder = true; orderType = 'Удаленная помощь и консультация'"
                                    >
                                      Заказать
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Услуги по обслуживанию онлайн-касс</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Услуга</th>
                                  <th class="text-left">Описание</th>
                                  <th class="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Помощь в регистрации или перерегистрации кассы</td>
                                  <td>Установка криптопровайдера, регистрация в личном кабинете ИФНС, заполнение заявления бумажного или электронного,
                                    Внесение регистрационных данных в кассу
                                  </td>
                                  <td>
                                    <v-btn
                                      color="success"
                                      @click="dialogOrder = true; orderType = 'Помощь в регистрации или перерегистрации кассы'"
                                    >
                                      Заказать
                                    </v-btn>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Подключение кассы к ОФД</td>
                                  <td>
                                    Договор с оператором фискальных данных на 15 месяцев
                                  </td>
                                  <td>
                                    <v-btn
                                      color="success"
                                      @click="dialogOrder = true; orderType = 'Подключение кассы к ОФД'"
                                    >
                                      Заказать
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Услуги по маркировке</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Услуга</th>
                                  <th class="text-left">Описание</th>
                                  <th class="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                
                               
                                <tr>
                                  <td>Сопровождение регистрации в ГИСМТ "Честный знак" для участника розничной торговли</td>
                                  <td>Установка криптопровайдера, заполнение антекты.</td>
                                  
                                  <td><v-btn
                                    color="success"
                                    @click="dialogOrder = true; orderType = 'Сопровождение регистрации в ГИСМТ Честный знак'"
                                  >
                                    Заказать
                                  </v-btn></td>
                                  
                                </tr>
                                <tr>
                                  <td>Маркировка остатков</td>
                                  <td>Описание остатков по упрощенной схеме, заказ кодов маркировки для остатков и ввод их в оборот</td>
                              
                                  <td><v-btn
                                    color="success"
                                    @click="dialogOrder = true; orderType = 'Маркировка остатков'"
                                  >
                                    Заказать
                                  </v-btn></td>
                                </tr>
                                
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-col>
              </v-row>
    
              <v-row 
                justify="center"      
                id="order" 
              >
                
              </v-row>
    
              <v-row 
                justify="center"   
                id="contacts"   
              >
                <v-col cols="10" md="4">
                <h3 class="display-1 font-weight-thin my-5">Контакты</h3> 
                <v-divider class="my-5"></v-divider>
                      
                  <v-list-item href="mailto:lite-retial@outlook.com">
                    <v-list-item-icon>
                      <v-icon color="success ">mdi-email</v-icon>
                    </v-list-item-icon>
    
                    <v-list-item-content>
                      <v-list-item-title>lite-retial@outlook.com</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
    
                     
                  <v-list-item href="tg://resolve?domain=literetail">
                    <v-list-item-icon>
                      <v-icon color="success ">mdi-telegram</v-icon>
                    </v-list-item-icon>
    
                    <v-list-item-content>
                      <v-list-item-title>Telegram</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col cols="10" md="4" id="order"   >
                  
                </v-col>
    
                
              </v-row>
            </v-container>

  </div>
</template>

<script>
export default {
  layout: 'index',
  components: {
  },
  data: () => ({ 
    drawer: null,
  })
}
</script>

<style scoped>

</style>