<script>
/* eslint-disable */
</script>
<template>
  <v-container data-app>
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="overlay"
      :z-index="zIndex"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        v-model="overlay"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
        <v-row>
            <v-card class="col-md-8 col-sm-12">
                <v-tabs
                v-model="tab"
                fixed-tabs
                background-color="primary"
                dark      
                >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                    @click="getTab(item.content)"
                >
                    {{ item.tab }}
                </v-tab>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-data-table
                            v-model="selectedOrders"
                            :search="search"
                            :headers="headers"
                            :items="filteredOrders"
                            :items-per-page="itemsPerPage"
                            item-key="order_id"
                            :loading="loading"
                            show-select
                            class="elevation-1"
                            @page-count="pageCount = $event"
                            @click:row="onButtonClick"
                        >
                            <!-- BLA -->
                            <!-- <template v-slot:item="row">
                                <tr @click="onButtonClick(row.item)" :class="{ active : activeRow == row.item.id}">
                                    <td>{{row.item.order_data.deliveryMethod}}</td>
                                    <td>{{row.item.order_data.adress}}</td>
                                    <td>{{row.item.order_data.customer.name}}</td>
                                    <td>{{row.item.order_data.customer.tel}}</td>
                                    <td>{{row.item.order_data.items[0].name}}</td>
                                </tr>
                            </template> -->
                    </v-data-table>
                    </v-tab-item>
            </v-tabs-items>
            </v-tabs>
            </v-card>
            <div class="col-md-2 col-sm-12" >
              In Drivers
              <v-card v-for="driver in availableDrivers" :key="driver.id"
                class="mx-auto my-3" :class="{ active : activeDriver == driver.id }" color="#46BDF2" light max-width="200" @click="selectDriver(driver)">
                  <v-card-title class="title font-weight-bold">
                    {{ driver.username }}
                  </v-card-title>
                  <v-card-title> {{ driver.amount }} GEL </v-card-title>
              </v-card>
            </div>
            <div class="col-md-2 col-sm-12" >
              Out Drivers
              <v-card v-for="driver in outDrivers" :key="driver.id" 
                class="mx-auto my-3" :class="{ active : activeDriver == driver.id }" color="#A6A2B0" light max-width="200" @click="selectDriverDialog(driver)">
                  <v-card-title class="title font-weight-bold">
                    {{ driver.username }}
                  </v-card-title>
                  <v-card-title> {{ driver.amount }} GEL </v-card-title>
              </v-card>
            </div>
            
        </v-row>
        <v-row>
          <div class="bottomRight">
            <v-btn large color="red" @click="driverOut()">OUT =></v-btn>
          </div>
        </v-row>

        <v-dialog
          v-model="driverOrderDialog"
          width="600"
        >
          <v-card>

            <v-card-text>
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
                      v-model="driverDate"
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
                        v-for="order in filteredDriverOrders"
                        :key="order.id"
                        @click="selectOrder(order)"
                        >
                        <td>{{ order.id }}</td>
                        <td>{{ order.order_data.customer.address }}</td>
                        <td>{{ order.order_data.customer.name }}</td>
                        <td>{{ Number(order.order_data.totalPrice).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>

            <v-divider></v-divider>

          </v-card>
        </v-dialog>

        <v-dialog
          v-model="selectedItemDialog"
          v-if="selectedItemDialog"
          width="600"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
               {{ selectedItem.id }} 
                <br>
                Delivery Fee: {{ selectedItem.order_data.deliveryFee }}
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
                {{ selectedItem.order_data.comment2 }}
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
                    :key="item.id"
                    >
                    <td style="font-size: 18px !important;">{{ item.qty }}</td>
                    <td style="font-size: 18px !important;">{{ item.name }}</td>
                    <td style="font-size: 18px !important;">{{ item.totalPrice }}</td>
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
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import axios from "axios";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      menu: false,
      driverDate: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      isOrders: false,
      driverOrders: [],
      selectedItem: {order_data: {customer: {}}},
      absolute: false,
      selectedItemDialog: false,
      opacity: 0.46,
      overlay: false,
      driverOrderDialog: false,
      zIndex: 5,
      activeRow: -1,
      loggedUser: {},
      activeDriver: -1,
      orders: [],
      deliveryOrders: [],
      dialog: false,
      singleSelect: true,
      loading: true,
      driverLoad: true,
      selectedDriver: null,
      selectedOrder: {},
      selectedOrders: [],
      selectedDelivery: {},
      driverIndex: -1,
      driverList: [],
      driver: [],
      search: '',
      branch: 'saburtalo',
      status: '1,2,3,4,5,6,7',
      deliveryStatus: 6,
      page: 0,
      tab: 0,
      filteredOrders: [],
      filteredDriverOrders: [],
      pageCount: 0,
      itemsPerPage: 5,
      items: [
            { tab: 'Finished Orders', content: 'finished' },
            { tab: 'On Delivery', content: 'ongoing' },
            { tab: 'Pending', content: 'pending' },
            ],
            headers: [
            {
                text: "ORDER ID",
                align: "start",
                sortable: false,
                value: "order_id",
            },
            { text: "Delivery Adress", value: "order_data.adress" },
            { text: "Customer Name", value: "order_data.customer.name" },
            { text: "Customer Phone", value: "order_data.customer.tel" },
            { text: "Order Items", value: "order_data.items[0].name" },
        ],
      headersDialog: [
        {
          text: "ORDER ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Branch", value: "branch" },
        { text: "Order Type", value: "order_data.deliveryMethod" },
        { text: "Delivery Adress", value: "order_data.adress" },
        { text: "Customer Name", value: "order_data.customer.name" },
        { text: "Customer Phone", value: "order_data.customer.tel" },
        { text: "Start Delivery", value: "start_delivery" },
      ],  
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
       if (vm.$store.state.auth.user.data.role == "admin" || vm.$store.state.auth.user.data.role == "posaccess" || vm.$store.state.auth.user.data.role == "driver") {
         vm.$router.push({name: "driverdispatch"});
       }
       else {
         vm.$router.push({name: "dashboard"});
       }
    });
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.loggedUser = this.$store.state.auth.user.data;

    this.getOrders();
    this.getDrivers();
    
  },
  computed: {
    availableDrivers(){
      return this.driverList.filter(x => x.in_way === false);
    },
    outDrivers(){
      return this.driverList.filter(x => x.in_way === true);
    }

  },
  watch: {
      date(val){
        this.updateDriverOrders(val);
      },
  },
  methods: {
    payOrder(type){
        
        this.selectedOrder = this.selectedItem.order_data;
        this.selectedOrder.id = this.selectedItem.id;
        this.selectedOrder.paymentType = type;
        this.selectedOrder.driverComment = this.orderComment;

        var bodyFormData=new FormData();
        bodyFormData.set("driver_id", this.selectedDriver.id);
        bodyFormData.set("order_id", this.selectedItem.id);
        bodyFormData.set("payment_method", type);

        const TOKEN = this.loggedUser.token;
        axios.request({
            method: 'post',
            url: this.$hostname + 'driver/finish-order',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            },
            data: bodyFormData,
          })
          .then(response => {
            console.log('paid order: ', response);
            if(response.status === 200 ){
              this.updateStatus('finished', this.selectedOrder.id);
            } 
            
        });
    },
    updateStatus(status, orderId){
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        bodyFormData.set("order_status", status);
        bodyFormData.set("id", orderId);
        axios
            .request({
            method: "post",
            url:
                this.$hostname + "orders/change-status",
            headers: {
                Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
            })
            .then((response) => {
            console.log("Order Status Changed!", response);
            this.selectedItemDialog = false;
            this.getOrders();
            this.getDrivers();
            this.$forceUpdate();
            });
    },
    updateDriverOrders(date, driver) {
        console.log("Selected Driver: ", driver);
        const TOKEN = this.loggedUser.token;
        var dateString = date + ' to '+ date;
        var bodyFormData=new FormData();
        bodyFormData.set("driver_id", this.selectedDriver.id);
        bodyFormData.set("day", dateString);

        axios.request( {
                method: "post",
                url: this.$hostname + "driver/orders-by-driver",
                headers: {
                  Authorization: "Bearer " + TOKEN,
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
                  this.filteredDriverOrders = this.driverOrders.filter((x) => x.status == '6');
                  this.isOrders = true;
                }
                else {
                    console.log('No driver data: ', response);
                    this.filteredDriverOrders = [];
                }

            }

        );
        this.$forceUpdate();
    },
    selectDriverOrders(driver){
        this.driverOrderDialog = true;
        this.updateDriverOrders(this.date, driver);

    },
    selectOrder(item){
        this.selectedItem = item;
        //this.driverOrderDialog = false;
        this.selectedItemDialog = true;

    },
    getOrders(){
      const TOKEN = this.loggedUser.token;
      var bodyFormData = new FormData();
      // bodyFormData.set("branch", this.branch);
      bodyFormData.set("status_key", this.status);

      axios
      .request({
          method: "post",
          url:
          this.$hostname + "orders/list",
          headers: {
          Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
      })
      .then((response) => {
          console.log("response: ", response);
          this.orders = response.data.data;
          this.orders = this.orders.filter((x) =>  x.order_data.deliveryType === "delivery" )
          // this.orders.forEach(x => {
          //     x.order_data = JSON.parse(x.order_data);
          // });
          this.filteredOrders = this.orders.filter((x) => x.status === '5');
          console.log("orders data: ", response.data.data);
      });
    },
    getDrivers(){
      const TOKEN = this.loggedUser.token;
      var bodyFormDriver = new FormData();
      bodyFormDriver.set("branch", 'digomi');

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "driver/clockedin-drivers",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormDriver,
        })
        .then((response) => {
          this.driverList = response.data.data;
          console.log("Drivers List: ", this.driverList);
        });
    },
    selectDriver(driver){
      this.activeDriver = driver.id;
      this.selectedDriver = driver;
    },
    selectDriverDialog(driver){
      this.activeDriver = driver.id;
      this.selectedDriver = driver;
      this.selectDriverOrders(driver);
    },
    driverIn(){
      
      const TOKEN = this.loggedUser.token;
      var bodyFormData = new FormData();
      bodyFormData.set("driver_id", this.selectedDriver.id);

      axios
      .request({
          method: "post",
          url:
          this.$hostname + "driver/finish-order",
          //  Combine order and driver LINK HERE!!!!,
          headers: {
          Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
      })
      .then((response) => {
          console.log("Driver in: ", response.data.data);
          this.getOrders();
          this.getDrivers();
          this.$forceUpdate();
      });
      
    },
        onButtonClick(item) {
            this.activeRow = item.id;
            this.order = item;
            this.selectedOrder = item;
            this.selectedOrders.push(item);

            console.log("Selected Item: ", this.selectedOrder);
        },
        getTab(tab){
            if(tab === 'finished') {
                this.filteredOrders = this.orders.filter((x) => x.status === '5');
            }
            else if(tab === 'ongoing') {
                this.filteredOrders = this.orders.filter((x) => x.status === '6');
            }
            else if(tab === 'pending') {
                this.filteredOrders = this.orders.filter((x) => x.status === '1' || x.status === '2' || x.status === '3' || x.status === '4');
            }
            this.$forceUpdate();
        },
        driverOut(){
          if(this.selectedOrder.status == '5' && this.selectedDriver.in_way === false){
            this,this.overlay = true;
            var orderIDs = [];
            this.selectedOrders.forEach(x => {
               orderIDs.push(x.id);
            })
            console.log("aaaa: ", orderIDs);
            const TOKEN = this.loggedUser.token;
            var bodyFormData = new FormData();
            bodyFormData.set("order_id", orderIDs);
            bodyFormData.set("driver_id", this.selectedDriver.id);

            axios
            .request({
                method: "post",
                url:
                this.$hostname + "manager/attach-order-to-driver",
                //  Combine order and driver LINK HERE!!!!,
                headers: {
                Authorization: "Bearer " + TOKEN,
                },
                data: bodyFormData,
            })
            .then((response) => {
              if(response.is_error){
                  console.log(response.error_message);
              }
                this.orders = response.data.data;
                console.log("orders data: ", response.data.data);
            });

            var statusFormData = new FormData();
            statusFormData.set("order_status", '6');
            statusFormData.set("id", this.selectedOrder.id);

            axios
              .request({
                method: "post",
                url:
                  this.$hostname + "orders/change-status",
                headers: {
                  Authorization: "Bearer " + TOKEN,
                },
                data: bodyFormData,
              })
              .then((response) => {
                if(response.data.is_error){
                  console.log('Status Change Error: ', response.data.is_error);
                  
                }
                else{
                  console.log("Order Status Changed Correctly: ", response.data);
                }
            });
            
          }
          else{
            alert('This order is not ready to go or driver is out!');
          }
          // this.getOrders();
          // this.getDrivers();
          setTimeout(() => {
            this.overlay = false;
            this.getOrders();
            this.getDrivers();
        }, 1500)
          this.$forceUpdate();
    },

    deliveryProcess(){
        this.dialog = true;
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        bodyFormData.set("branch", this.branch);
        bodyFormData.set("status", this.deliveryStatus);

        axios
        .request({
            method: "post",
            url:
            this.$hostname + "manager/get-current-orders",
            headers: {
            Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
        })
        .then((response) => {
          if(response.is_error){
              alert(response.error_message);
          }
            this.deliveryOrders = response.data.data;
            this.deliveryOrders.forEach(x => {
                x.order_data = JSON.parse(x.order_data);
            }); 

            console.log("orders data: ", response.data.data);
        });
    },

    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    },
  },
};
</script>
