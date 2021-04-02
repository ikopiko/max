<script>
/* eslint-disable */
</script>
<template>

      <div class="app">
        <!-- Display Products -->
        <div class="row">
               <div class=" col-md-2 paddingClear" v-for="product in filteredProducts" :key="product.id">
                    <div class="w-b-1 square" @click="send(product)" v-bind:class="[product.class_name]">
                       <span class="position-relative" ><strong>{{ product.name }}</strong></span>
                    </div>
                </div>  

                 
        </div>
        <div class="butonebi">
          <div class="row right-3" id="buttons">        
                  <div class="col paddingClear" style="padding-left: 0">
                      <div class="w-b-1 square" @click="drinksProducts()">
                        <i class="fa fa-home fa-4x iconColor"></i>
                      </div>
                    </div>
                    <div class="col paddingClear" style="padding-left: 0">
                        <div class="w-b-1 square" @click="drinksProducts()">
                          <i class="fa fa-coffee fa-4x iconColor"></i>
                        </div>                
                    </div> 
                  <div class="col paddingClear" style="padding-left: 0">
                      <div class="w-b-1 square" @click="sendAddHalf()" :class="{ active: halfActive}">
                        <!-- <span class="position-relative" style="top: 16px;"><strong>A/B</strong></span> -->
                        <i class="material-icons md-48 iconColor" style="margin-top: 4px;">tonality</i> 
                      </div>
                    </div>
                    <div class="col-md-2 paddingClear" style="padding-left: 0">
                      <div class="w-b-1 square" @click="sendFunction()">
                        <i class="fa fa-code fa-4x iconColor"></i>
                      </div>
                    </div>
                    <div class="col-md-2 paddingClear" style="padding-left: 0">
                      <div class="w-b-1 square" @click="sendSetting()">
                        <i class="fa fa-cog fa-4x iconColor"></i>
                      </div>
                    </div>
                    <div
                      class="col-md-2 paddingClear"
                      style="padding-left: 0"
                      @click="sendDoneOrder() "
                    >
                      <div class="w-b-1 square">
                        <i class="fa fa-check fa-4x iconColor"></i>
                      </div>
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
      categoryId: {
          type: Number,
          default: -1
      },
      halfProductVar: {
          type: Boolean,
          default: false
      },
      productId: {
        type: Number,
        default: -1
      }
  },
  data(){
    return {
      products: [],
      recipes: []
    }
  },
  mounted() {
    const TOKEN = localStorage.getItem("TOKEN");
    axios.request({
            method: 'post',
            url: this.$hostname + 'products/get-products',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            }
          })
          .then(response => {
            this.products = response.data;
            //this.products = this.products.reverse();
            console.log("Productd data from API: ", response.data)
          });
          
  },
  computed: {
      limitProducts() {
        return this.products.slice(0, 36);
      },

      filteredProducts () {
        //alert(this.categoryId);
          
              return this.products.filter(x => x.category_name === "Drinks");
        
      },
  },
  methods: {
    
    getToken() {
      var user_token = localStorage.getItem('TOKEN');
      return user_token;
    },
    send(product){
        this.$emit('onProductSelect', product);
    },
    sendDoneOrder(){
      this.$emit('onDoneOrder');
    },
    sendAddHalf(){
      this.$emit('onAddHalf');
    },
    sendSetting(){
      this.$emit('onSetting');
    },
    sendFunction(){
      this.$emit('onFunction');
    },
    drinksProducts(){
      this.$emit('onDrinks');
    },
    getRecipe(product){
      const TOKEN = localStorage.getItem('TOKEN');
      var bodyFormData = new FormData();
      bodyFormData.set('product_id', product.id);
      axios.request({
            method: 'post',
            url: this.$hostname + 'products/get-reciept-by-product-id',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            },
            data: bodyFormData
          })
          .then(response => {
            this.recipes = response.data;
            console.log(product.name);
            console.log('Product Recipe: ', this.recipes);
          });
        return this.recipies;
    }
  }
}
</script>
