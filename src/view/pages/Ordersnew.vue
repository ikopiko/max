<script>
/* eslint-disable */
</script>
<template>
  <v-container>
    <v-row>
        <v-card class="col-8">
          <v-card-text>
            <v-slider
              v-model="promisedTime"
              :tick-labels="ticksLabels"
              :max="11"
              step="1"
              ticks="always"
              tick-size="6"
            ></v-slider>
          </v-card-text>
            <v-tabs
            v-model="tab"
            fixed-tabs
            background-color="primary"
            dark      
            >
            <v-tab
                v-for="item in items"
                :key="item.tab"
            >
                {{ item.tab }}
            </v-tab>
            </v-tabs>

            

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item.tab"
            >
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Calories
                            </th>
                            <th class="text-left">
                                Tab
                            </th>
                            <th class="text-left">
                                Order
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="desert in desserts"
                            :key="desert.name"
                            @click="foobar(desert)"
                            >
                            <td>{{ desert.name }}</td>
                            <td>{{ desert.calories }}</td>
                            <td>{{ item.tab }}</td>
                            <td>
                                <v-btn class="mx-2" fab dark small color="green" @click="onButtonClick(row.item)">
                                    <v-icon dark>read_more</v-icon>
                                </v-btn>
                            </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
            </v-tab-item>
            </v-tabs-items>
        </v-card>

        <v-card class="col-4">
            <orderList :orderProp="order" />
        </v-card>
    </v-row>
  </v-container>

</template>
<script>
import orderList from '../components/Order';
  export default {
    data () {
      return {
        promisedTime: 15,
        ticksLabels: [
          5,10,15,20,25,30,40,50,60,70,80,90
        ],
        itemIndex: -1,
        order: {"id":3338,"order_id":15,"user_id":4,"branch":"saburtalo","duration":"15","backer_id":0,"source":"pos","status":4,"order_data":{"orderId":"015","items":[{"crust":"original","sauce":"original","size":"m","price":23.200000000000003,"name":"Smokin’/Vegan","custom":"yes","toppings":[],"half1":{"name":"Smokin’","sauce":"original","defaultToppings":[{"id":"5","name":"Mozzarella","isPremium":"1","price":3.4,"isDeleted":false},{"id":"4","name":"Smoked Cheese","isPremium":"1","price":3.4,"isDeleted":false},{"id":"11","name":"Grilled Chicken","isPremium":"0","price":2.7,"isDeleted":false},{"id":"16","name":"Tomato","isPremium":"0","price":2.7,"isDeleted":false}],"toppings":[],"is_special":"0","priceBySizes":{"s":10.1,"m":23.6,"xl":42.9}},"half2":{"name":"Vegan","sauce":"original","defaultToppings":[{"id":"3","name":"Roasted Mushroom","isPremium":"0","price":2.7,"isDeleted":false},{"id":"13","name":"Mushroom","isPremium":"0","price":2.7,"isDeleted":false},{"id":"14","name":"Sweet Pepper","isPremium":"0","price":2.7,"isDeleted":false},{"id":"15","name":"Onions","isPremium":"0","price":2.7,"isDeleted":false},{"id":"16","name":"Tomato","isPremium":"0","price":2.7,"isDeleted":false},{"id":"18","name":"Black Olives","isPremium":"0","price":2.7,"isDeleted":false},{"id":"21","name":"Italian Seasoning","isPremium":"2","price":0,"isDeleted":false},{"id":"23","name":"Oil","isPremium":"2","price":0,"isDeleted":false}],"toppings":[],"is_special":"1","priceBySizes":{"s":9.4,"m":22.8,"xl":41.6}},"toppingChange":0,"qty":1,"cuts":false,"isSelected":false,"totalPrice":23.200000000000003},{"name":"Cheesy Veggie","price":22.8,"crust":"original","sauce":"original","size":"m","defaultToppings":[{"id":"5","name":"Mozzarella","isPremium":"1","price":3.4,"isDeleted":false,"count":1},{"id":"13","name":"Mushroom","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"14","name":"Sweet Pepper","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"15","name":"Onions","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"18","name":"Black Olives","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"21","name":"Italian Seasoning","isPremium":"2","price":0,"isDeleted":false,"count":1},{"id":"23","name":"Oil","isPremium":"2","price":0,"isDeleted":false,"count":1},{"id":"23","name":"Oil","isPremium":"2","price":0,"isDeleted":false,"count":1}],"toppings":[],"half1":{"toppings":[]},"half2":{"toppings":[]},"toppingChange":8,"qty":1,"priceBySizes":{"s":9.4,"m":22.8,"xl":41.6},"totalPrice":22.8,"custom":"no","id":"37","is_special":"1","cuts":false,"isSelected":false},{"name":"Classic Cheese","price":14.8,"crust":"original","sauce":"original","size":"m","defaultToppings":[{"id":"5","name":"Mozzarella","isPremium":"1","price":3.4,"isDeleted":false,"count":1}],"toppings":[],"half1":{"toppings":[]},"half2":{"toppings":[]},"toppingChange":8,"qty":1,"priceBySizes":{"s":6.4,"m":14.8,"xl":28.6},"totalPrice":14.8,"custom":"no","id":"31","is_special":"1","cuts":false,"isSelected":false},{"name":"Cheesy Veggie","price":22.8,"crust":"original","sauce":"original","size":"m","defaultToppings":[{"id":"5","name":"Mozzarella","isPremium":"1","price":3.4,"isDeleted":false,"count":1},{"id":"13","name":"Mushroom","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"14","name":"Sweet Pepper","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"15","name":"Onions","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"18","name":"Black Olives","isPremium":"0","price":2.7,"isDeleted":false,"count":1},{"id":"21","name":"Italian Seasoning","isPremium":"2","price":0,"isDeleted":false,"count":1},{"id":"23","name":"Oil","isPremium":"2","price":0,"isDeleted":false,"count":1},{"id":"23","name":"Oil","isPremium":"2","price":0,"isDeleted":false,"count":1}],"toppings":[],"half1":{"toppings":[]},"half2":{"toppings":[]},"toppingChange":0,"qty":1,"priceBySizes":{"s":9.4,"m":22.8,"xl":41.6},"totalPrice":22.8,"custom":"no","id":"37","is_special":"1","cuts":false,"isSelected":false}],"deliveryMethod":"Walk In","deliveryFee":0,"payment":0,"totalPrice":"83.60","isFuture":false,"date":"00-00-000 00:00","customer":"","discount":0,"discountName":"","coupon":0,"paymentType":"Card"},"send_to_backer_date":"2020-12-04 11:12:39","accept_date":"0000-00-00 00:00:00","finish_date":"2020-12-04 11:21:35","driver_id":0,"start_delivery":"","end_delivery":"","created_at":"2020-12-04 11:12:39"},
        tab: null,
        items: [
          { tab: 'All Orders', content: 'all' },
          { tab: 'Walk In', content: 'walkin' },
          { tab: 'Take Out', content: 'takeout' },
          { tab: 'Delivery', content: 'ronnys' },
          { tab: 'Glovo', content: 'glovo' },
          { tab: 'Wolt', content: 'wolt' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
    
    components: {
        orderList,
    },
    methods: {
        foobar(item){
            this.itemIndex = this.desserts.indexOf(item);
            alert(this.itemIndex);
        }
    },
  }
</script>