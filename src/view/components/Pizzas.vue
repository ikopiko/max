<script>
/* eslint-disable */
</script>
<template>
                      <!-- Display All Piizzas -->
                        <div class="row pizza p_binder">
                               <div class=" col-md-2" style="padding-left: 0" v-for="pizza in filteredPizzas" :key="pizza.id">
                                   <div class="w-blue-1 square addPizza" @click="send(pizza)">
                                       <span class="position-relative" style="top: 5px;"><strong>{{ pizza.name }}</strong></span>
                                   </div>
                                   </div>

                       </div>

</template>

<script>
// @ is an alias to /src

//import Helloworld from '../components/HelloWorld'

import axios from 'axios';

export default {
  name: 'Home',
  props: {
      categoryId: {
          type: Number,
          default: -1
      }
  },
  data(){
    return {
      pizzas: []
    }
  },
  mounted() {
    const TOKEN = localStorage.getItem('TOKEN');
    console.log(this.categoryId)
    axios.request({
            method: 'post',
            url: this.$hostname + 'products/get-products',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            }
          })
          .then(response => {
            this.pizzas = response.data;
            console.log(response.data)
          });
          
  },
  computed: {
      filteredPizzas () {
        //   if (this.categoryId !== -1) {
        //       return this.pizzas.filter(x => x.category_name === "Pizza");
        //   } else {  
        //       return this.pizzas;
        //   }
        return this.pizzas.filter(x => x.category_name === "Pizza");
      },
  },
  methods: {
    //user_token: localStorage.getItem('TOKEN'),
    getToken() {
      var user_token = localStorage.getItem('TOKEN');
      return user_token;
    },
    send(product){
        this.$emit('onProductSelect', product);
        //alert(product.name);
    }
  }
}
</script>
