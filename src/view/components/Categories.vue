<script>
/* eslint-disable */
</script>
<template>
        <div class="row">
            <div class=" col-md-2" style="padding-left: 0" v-for="category in categories" :key="category.id">
                    <div class="w-b-1 showCat green square" @click="send(category)" >
                        <span class="position-relative" style="top: 12px;"><strong>{{ category.name }}</strong></span>
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
  data(){
    return {
      categories: []
    }
  },
  mounted() {
    const TOKEN = localStorage.getItem('TOKEN');
    axios.request({
            method: 'post',
            url: this.$hostname + 'products/get-products-category',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            }
          })
          .then(response => {
            this.categories = response.data;
            console.log(response.data)
          });
          
  },
  methods: {
    //user_token: localStorage.getItem('TOKEN'),
    getToken() {
      var user_token = localStorage.getItem('TOKEN');
      return user_token;
    },
    send(category) {
        this.$emit('onCategorySelect', category.id);
    }
  }
}
</script>
