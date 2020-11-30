<script>
/* eslint-disable */
</script>
<template>

        <b-container class="bv-example-row">
            <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
                <b-col>Order ID</b-col>
                <b-col>Branch</b-col>
                <b-col>Created At</b-col>
                <b-col>Finished At</b-col>
                <b-col>Orders Count</b-col>
                <b-col>Column</b-col>
            </b-row>
            <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6" @click="orderSelect(order)" v-for="order in orders" :key="order.id">
                <b-col>{{ order.order_id }}</b-col>
                <b-col>{{ order.branch }}</b-col>
                <b-col>{{ order.created_at }}</b-col>
                <b-col>{{ order.finish_date }}</b-col>
                <b-col>{{ order.order_data.items.length }}</b-col>
                <b-col>{{ order.order_id }}</b-col>

            </b-row>
        </b-container>
        
</template>

<script>
// @ is an alias to /src

//import Helloworld from '../components/HelloWorld'

import axios from 'axios';

export default {
  name: 'Orders',
  props: {
      customerPhone: {
          type: Number,
          default: 0
      }
  },
  data(){
    return {
      orders: [],
      items: [],
    }
  },
  mounted() {
          const TOKEN = localStorage.getItem('TOKEN');
          var bodyFormData = new FormData();
          bodyFormData.set("phone", this.customerPhone);
          
          axios
            .request({
              method: "post",
              url:
                "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/customers/get-all-orders-by-phone",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
          .then(response => {
            this.orders = response.data.data;
            //console.log('orders data: ',response.data.data)
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
    },
    orderSelect(item){
        this.items = item.order_data;
        this.$emit('onSelectedOrder', this.items);
        //console.log('Selected Order Items: ',this.items);
    },
  }
}
</script>
