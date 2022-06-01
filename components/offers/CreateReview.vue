<template>
  <div>
    <v-card>
      <v-card-text>
        Оставьте публичный отзыв или опишите проблему:
            
        <v-textarea
          outlined
          label="Отзыв"
          color="teal"
          v-model="review.text"
        ></v-textarea>

        <div class="text-center">
          <v-btn
            :color="review.value < 0 ? 'error' : ''"
            :x-large="review.value < 0"
            class="ma-2"
            @click="setImpression('dislike')"
          >
            Отрицательный
            <v-icon
              :dark="review.value < 0"
              right
            >
              mdi-thumb-down-outline
            </v-icon>
          </v-btn>

          <v-btn
            :x-large="review.value > 0"
            :color="review.value > 0 ? 'success' : ''"
            @click="setImpression('like')"
          >
            Положительный
            <v-icon
              right
              :dark="review.value > 0"
            >
              mdi-thumb-up-outline
            </v-icon>
          </v-btn>
        </div>  
        
        <div class="d-flex justify-center">
          <v-rating
            v-if="review.value > 0"
            v-model="review.value"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            hover
            large
          ></v-rating>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="teal"
          outlined
          @click="send()"
        >
          Отправить отзыв
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CreateReview',
  props: {
    offer: {
      type: Object
    }
  },
  data: ()=>({
    review: {
      text:'',
      value: 0
    }
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    send() {
      this.$emit('closeReviewDialog')
      if (this.review.id) {
        this.$axios.put(`/reviews/${this.review.id}`, {
          ...this.review
        })  
      } else {
        this.$axios.post(`/reviews/${this.offer.id}`, {
          ...this.review
        })  
      }          
    },
    setImpression(impression) {
      if (impression == 'like') {
        if (this.review.value == 5) {
          this.review.value = 0
        } else {
          this.review.value = 5
        }       
      } else {
        if (this.review.value == -1) {
          this.review.value = 0
        } else {
          this.review.value = -1
        }  
      }
    }
  },
  async fetch() {
    let { data: { reviews } } = await this.$axios.get(`/reviews/${this.offer.id}`)
    reviews.forEach(review => {
      if (review.authorId == this.user.id) {
        this.review = {
          id: review.id,
          text: review.review,
          value: review.stars
        }
      }
    });
  }
  
}
</script>