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
              <v-card v-for="driver in availableDrivers" :key="driver"
                class="mx-auto my-3" :class="{ active : activeDriver == driver.id }" color="#46BDF2" light max-width="200" @click="selectDriver(driver)">
                  <v-card-title class="title font-weight-bold">
                    {{ driver.username }}
                  </v-card-title>
                  <v-card-title> {{ driver.amount }} GEL </v-card-title>
              </v-card>
            </div>
            <div class="col-md-2 col-sm-12" >
              Out Drivers
              <v-card v-for="driver in outDrivers" :key="driver" 
                class="mx-auto my-3" :class="{ active : activeDriver == driver.id }" color="#A6A2B0" light max-width="200" @click="selectDriver(driver)">
                  <v-card-title class="title font-weight-bold">
                    {{ driver.username }}
                  </v-card-title>
                  <v-card-title> {{ driver.amount }} GEL </v-card-title>
              </v-card>
            </div>
            
        </v-row>
        <v-row>
          <div class="bottomRight">
            <v-btn large color="red" @click="driverIn()">IN <=</v-btn>
            <v-btn large color="red" @click="driverOut()">OUT =></v-btn>
          </div>
        </v-row>
    </v-container>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import router from 'vue-router'
import axios from "axios";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      absolute: false,
      opacity: 0.46,
      overlay: false,
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
  methods: {
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
          this.getOrders();
          this.getDrivers();
          setTimeout(() => {
            this.overlay = false;
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
