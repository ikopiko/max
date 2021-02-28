<script>
/* eslint-disable */
</script>
<template>
  <v-container data-app>
    <template>
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Select Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker
            v-model="date"
            @input="menu = false"
            ></v-date-picker>
        </v-menu>
        <v-tabs
              v-model="tab"
              fixed-tabs
            background-color="primary"
              dark      
            >
              <v-tab
                  v-for="content in tabItems"
                  :key="content.tab"
                  @click="getTab(content)"
              >
                  {{ content.tab }}
              </v-tab>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="content in tabItems"
                :key="content.tab"
            >
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                Order ID
                            </th>
                            <th class="text-left">
                                Address
                            </th>
                            <th class="text-left">
                                Customer
                            </th>
                            <th class="text-left">
                                Total
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="order in filteredOrders"
                            :key="order.id"
                            @click="selectOrder(order)"
                            >
                            <td>{{ order.id }}</td>
                            <td>{{ order.order_data.customer.address }}</td>
                            <td>{{ order.order_data.customer.name }}</td>
                            <td>{{ order.order_data.totalPrice }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
          </v-tab-item>
          </v-tabs-items>
          </v-tabs>
    </template>
    <v-dialog
      v-model="dialog"
      width="500"
      v-if="isOrders"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ selectedItem.id }} 
          <br>
            Total : {{ selectedItem.order_data.totalPrice }}
        </v-card-title>

        <v-card-text>
            {{ selectedItem.order_data.customer.name }}
            <br>
            {{ selectedItem.order_data.customer.address }}
            <br>
            {{ selectedItem.order_data.customer.phone }}
            <br>
          <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    QTY
                </th>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Total Price
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in selectedItem.order_data.items"
                :key="item"
                >
                <td>{{ item.qty }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.totalPrice }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="green mx-2"
            large
            text
            @click="payOrder('cash')"
          >
            Cash
          </v-btn>
          <v-btn
            class="blue mx-2"
            large
            text
            @click="payOrder('card')"
          >
            Card
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "Home",
  components: {},
  data () {
      return {
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        customer: {'name': '', 'address' : '', 'phone' : ''},
        isOrders: false,
        dialog: false,
        today: null,
        selectedItem: {},
        selectedOrder: {},
        driverOrders: [],
        filteredOrders: [],
        tab: 0,
        tabItems: [
          { tab: 'Ongoing Delivery', content: 'delivery' },
          { tab: 'Finished Orders', content: 'finished' },
        ],
      }
    },
    computed: {
        // filteredOrdersComputed() {
        //     this.driverOrders.forEach(x => {
        //         x.order_data = JSON.parse(x.order_data);
        //     });
        //     this.filteredOrders.forEach(x => {
        //         x.order_data = JSON.parse(x.order_data);
        //     });
        // }
    },
  mounted() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd + ' to '+ yyyy + '-' + mm + '-' + dd;
        this.updateDriverOrders(this.date);
  },
  watch: {
    date(val){
      this.updateDriverOrders(val);
    },
  },
  methods: {
    selectOrder(item){
        this.selectedItem = item;
        this.dialog = true;
    },
    getTab(tab){
        if(tab.content === 'delivery') {
            this.filteredOrders = this.driverOrders.filter((x) => x.status == '6');
        }
        else if(tab.content === 'finished') {
            this.filteredOrders = this.driverOrders.filter((x) => x.status == '7');
        }
        this.$forceUpdate();
    },
    payOrder(type){
        
        this.selectedOrder = this.selectedItem.order_data;
        this.selectedOrder.id = this.selectedItem.id;
        this.selectedOrder.paymentType = type;

        const TOKEN = localStorage.getItem("TOKEN");
        axios.request({
            method: 'post',
            url: 'http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/paid',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            },
            data: { order: this.selectedOrder },
          })
          .then(response => {
            console.log('paid order: ', response);
            if(response.status === 200 ){
              this.updateStatus('finished', this.selectedOrder.id);
            } 
            
          });
    },
    updateDriverOrders(date) {
        var dateString = date + ' to '+ date;
        var bodyFormData=new FormData();
        bodyFormData.set("driver_id", '23');
        bodyFormData.set("day", dateString);

        axios.request( {
                method: "post",
                url: "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/driver/orders-by-driver",
                headers: {
                  Authorization: "Bearer TodKtEjTTqj8HBVGmQPE3gW5TFY",
                },
                data: bodyFormData,
            }

        ) .then((response)=> {
                if(!response.data.is_error) {
                  console.log('Driver Data: ', response);
                  this.driverOrders = response.data.data;
                  this.driverOrders.forEach(x => {
                    x.order_data = JSON.parse(x.order_data);
                });
                  this.filteredOrders = this.driverOrders.filter((x) => x.status == '6');
                  this.isOrders = true;
                }
                else {
                    console.log('No driver data: ', response);
                }

            }

        );
        this.$forceUpdate();
    },
    updateStatus(status, orderId){
        const TOKEN = localStorage.getItem("TOKEN");
        var bodyFormData = new FormData();
        bodyFormData.set("order_status", status);
        bodyFormData.set("id", orderId);
        axios
            .request({
            method: "post",
            url:
                "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/change-status",
            headers: {
                Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
            })
            .then((response) => {
            console.log("Order Status Changed!", response);
            this.updateDriverOrders(this.date);
            this.$forceUpdate();
            this.dialog = false;
            });
    },
  },
};
</script>
