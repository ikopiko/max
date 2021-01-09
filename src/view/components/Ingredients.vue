<script>
/* eslint-disable */
</script>

<template>
      <!-- Display All Ingredients -->
      <div class="row">r
          <div class="col-md-2 p-0 paddingClear"> 
            <div class="w-1-grey square" @click="sendClear()">
              <i class="fa fa-home fa-4x iconColor"></i>
            </div>
          </div>
          <div class="col-md-2 p-0 paddingClear" > <div class="w-1 pink font-weight-bold" @click="sendSauce(sauce)">{{ sauce }} Sauce</div> </div>

          <div class="col-md-2 p-0 paddingClear" v-for="ingredient in filteredIngredients" :key="ingredient.id" >
              <div class="w-1 square font-weight-bold" @click="sendIngredient(ingredient)"
                    v-bind:class='[ingredient.class_name, highlightDefToppings(ingredient) == true ? "active_default" : "",  highlightToppings(ingredient) == true ? "active" : ""]'>
                    <!-- <button class="btn" v-if="highlightDefToppings(ingredient) == true || highlightToppings(ingredient) == true">
                        <i class="fa" :class='highlightDefToppings(ingredient) == true || highlightToppings(ingredient) == true ? "fa-close fa-2x clearBtn" : ""' 
                        @click="deleteTopping($event, ingredient)"></i></button> -->
                    <!-- Styling topping Class -->
                          <span>{{ ingredient.name }}  {{ mapping[ingredient.id] }}<br></span>
                <div v-bind:class="[ deletedDefToppings(ingredient) ? 'cross': '']"> 
                </div>
              </div>   
          </div>   
      </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  props: {
      isHalfPizza: {
        type: String,
        default: 'no'
      },
      halfPizzaPart: {
        type: Number,
        default: -1
      },
      defaultToppings: {
        type: Array,
        default: () => []
      },
      toppings: {
        type: Array,
        default: () => []
      },
      mapping: {
        type: Object,
        default: () => {}
      },
      product: {
        type: Object,
        default: () => {}
      },
      sauce: {
        type: String,
        default: 'original'
      }

  },
  data(){
    return {
      ingredients: [],
      isHighlated: false,
    }
  },
  mounted() {
    // this.sauce = 'original';
    const TOKEN = localStorage.getItem("TOKEN");
    axios.request({
            method: 'post',
            url: 'http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/products/get-ingredients',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            }
          })
          .then(response => {
            this.ingredients = response.data;
            console.log('Hello', this.ingredients);
          });
          
  },
  computed: {
      filteredIngredients () {      
        return this.ingredients.filter(x => x.product_category_id === 1 || x.product_category_id === 0);
      },
  },
  methods: {
    
    getToken() {
      var user_token = localStorage.getItem('TOKEN');
      return user_token;
    },
    highlightDefToppings(ingredient){
      for(var i = 0; i < this.defaultToppings.length; i++){   
          if(parseInt(this.defaultToppings[i].id) === ingredient.id){     
              return true;
          }
      }
    },
    deletedDefToppings(ingredient){
      for(var i = 0; i < this.defaultToppings.length; i++){   
          if(parseInt(this.defaultToppings[i].id) === ingredient.id && this.defaultToppings[i].isDeleted){
            return true;
          }
      }
    },
    highlightToppings(ingredient){
      for(var k = 0; k < this.toppings.length; k++){   
          if(parseInt(this.toppings[k].id) === ingredient.id){     
              return true;
          }
      }
    },
    falseHighlated(){
      this.isHighlated = false;
    },
    sendIngredient(ingredient){
      console.log('Product Category: ',this.product.custom);
      this.$emit('onAddTopping', ingredient);
    },
    sendSauce(sauce){
        this.$emit('onSendSauce', sauce);
    },
    sendClear(){
      this.$emit('onShowProductsClear');
    },
    sendAdd(){
      this.$emit('onShowProductsComponent');
    },
    deleteTopping(event, ingredient){

      event.stopPropagation();
      if (this.highlightDefToppings(ingredient)){
        this.$emit('onDeleteDefTopping', ingredient);
      }else if (this.highlightToppings(ingredient)){
        if(this.isHalfPizza == 'no'){
          this.$emit('onDeleteTopping', ingredient);
        }
        else if(this.isHalfPizza == 'yes' && this.halfPizzaPart == 1 || this.halfPizzaPart == 2){
          this.$emit('onDeleteCusTopping', ingredient);
        }
        else if(this.isHalfPizza == 'yes' && this.halfPizzaPart == 0 ){
          this.$emit('onDeleteCusMainTopping', ingredient);
        }
      }
    }
  }
}
</script>
`