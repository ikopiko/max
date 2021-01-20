<script>
/* eslint-disable */
</script>
<template>
                <!-- Display All Ingredients -->
                <div class="row right-2">
                    <div class="col-md-2 p-0"> <div class="w-b-1 square" @click="sendClear()"><i class="fa fa-home fa-4x iconColor"></i></div> </div>
                    <div class="col-md-2 p-0"> <div class="w-b-1 pink font-weight-bold static" @click="sendSize('small')"><span>Small</span></div> </div>
                    <div class="col-md-2 p-0"> <div class="w-b-1 pink font-weight-bold static" @click="sendSize('original')"><span>Original</span></div> </div>

                    <div class="col-md-2 p-0" v-for="ingredient in filteredIngredients" :key="ingredient.id" >
                            <!-- <div class="w-1 font-weight-bold"  -->
                        <div class="w-b-1 font-weight-bold" @click="sendIngredient(ingredient);"
                              v-bind:class='[ingredient.class_name, highlightDefToppings(ingredient) == true || highlightToppings(ingredient) == true ? "active" : ""]'>
                              <!-- Styling topping Class -->
                                    <span>{{ ingredient.name }}  {{ mapping[ingredient.id] }}<br></span>
                                    <div v-bind:class="[ deletedDefToppings(ingredient) ? 'cross': '']"> 
                                    </div>
                        </div>   
                    </div>
                    <div class="row right-3">
                      <div class="col-md-2 p-0 paddingClear"> <div class="w-1 " @click="sendAdd()"><i class="fa fa-check fa-4x iconColor"></i></div> </div>
                    </div>
                </div>

</template>

<script>


import axios from 'axios';

export default {
  name: 'Home',
  props: {
      defaultToppings: {
        type: Array,
        default: () => []
      },
      toppings: {
        type: Array,
        default: () => []
      },
      isSticks: {
        type: Boolean,
        default: false
      },
      mapping: {
        type: Object,
        default: () => {}
      },

  },
  data(){
    return {
      ingredients: [],
      isHighlated: false,
    }
  },
  mounted() {
    const TOKEN = localStorage.getItem("TOKEN");
    console.log(this.categoryId)
    axios.request({
            method: 'post',
            url: 'http://188.169.16.186:8082//ronny/rest/web/index.php?r=v1/products/get-ingredients',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            }
          })
          .then(response => {
            this.ingredients = response.data;
            //this.ingredients.default = this.defaultToppings;

            //console.log(response.data)
            console.log('Hello', this.ingredients);
          });

          

          //this.ingredients.default= this.defaultToppings;
        // vuex
          
  },
  computed: {
      filteredIngredients () {   
      
        return this.ingredients.filter(x => x.product_category_id === 2 || x.product_category_id === 0);
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
    highlightToppings(ingredient){
      for(var k = 0; k < this.toppings.length; k++){   
          if(parseInt(this.toppings[k].id) === ingredient.id){     
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
    falseHighlated(){
      this.isHighlated = false;
    },
    sendIngredient(ingredient){
      console.log('Ingredient Name: ',ingredient.name);
        this.$emit('onAddTopping', ingredient);
    },
    sendAdd(){
      this.$emit('onShowProductsComponent');
    },
    sendClear(){
      this.$emit('onShowProductsComponent');
    },
    sendSize(size){
      this.$emit('onSticksSize', size);
    },
    deleteTopping(event, ingredient){

      event.stopPropagation();
      if (this.highlightDefToppings(ingredient)){
        this.$emit('onDeleteDefTopping', ingredient);
      }else if (this.highlightToppings(ingredient)){
        if(this.isSticks){
          this.$emit('onDeleteTopping', ingredient);
        }
        else if(this.isHalfPizza == 'yes'){
          this.$emit('onDeleteCusTopping', ingredient);
        }
        
      }
    }
  }
}
</script>