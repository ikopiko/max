<script>
/* eslint-disable */
</script>
<template>
  <div id="app" class="container">

    <div class="row">
        <!-- Order List -->
        <div class="col-9">
            <v-app id="inspire">      
                <template>
                <v-card>
                    <v-card-title>
                    Orders
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        
                    ></v-text-field>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                      v-model="selectedOrder"
                      :search="search"
                      :headers="headers"
                      :items="filteredOrdersDelivery"
                      :items-per-page="itemsPerPage"
                      item-key="order_id"
                      :single-select="singleSelect"
                      show-select
                      :loading = "loading"
                      class="elevation-1"
                      @page-count="pageCount = $event"
                      >
                      
                      </v-data-table>
                    </v-card-text>
                    
                </v-card>
              </template>
            
            </v-app>
        </div>
        <!-- End of Order List -->
        <!-- Driver List -->
        <div class="col-3">
            <v-list
                style="max-height: 400px"
                class="overflow-y-auto"
                flat
                subheader
                three-line
                >
                <v-subheader>Avialable Drivers</v-subheader>

                <v-skeleton-loader
                  v-if="driverLoad"
                  v-bind="attrs"
                  type="card-avatar, article, actions"
                ></v-skeleton-loader>
                
                <v-list-item-group
                    v-if="!driverLoad"
                    v-model="driverIndex"
                    single
                    active-class=""
                >
                    <v-list-item v-for="driver in driverList" :key="driver.id">
                    <template v-slot:default="{ active }">
                        <v-list-item-action>
                        <v-checkbox :input-value="active" :label="driver.username" ></v-checkbox>
                        </v-list-item-action>
                    </template>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
            <div class="my-2">
                <v-btn
                color="error"
                dark
                x-large
                @click="driverOut()"
                >
                Out =>
                </v-btn>
            </div>
            <div class="my-2">
                <v-btn
                color="error"
                dark
                x-large
                @click="deliveryProcess()"
                >
                Deliveries in progress
                </v-btn>
            </div>
        </div>
        <!-- End of Driver List -->
        
    </div>


    <!-- Delivery in progress Modal  -->
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <v-card>
            <v-card-title>
              <span>Delivery In Progress</span>
              <v-spacer></v-spacer>
            </v-card-title>  
              
            <v-data-table
              v-model="selectedDelivery"
              :search="search"
              :headers="headersDialog"
              :items="deliveryOrders"
              :items-per-page="itemsPerPage"
              item-key="order_id"
              :loading="loading"
              :single-select="singleSelect"
              show-select
              class="elevation-1"
              @page-count="pageCount = $event"
            ></v-data-table>

            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- End of Delivery in progress Modal  -->

    
  </div>
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
      loggedUser: {},
      orders: [],
      deliveryOrders: [],
      dialog: false,
      singleSelect: true,
      loading: true,
      driverLoad: true,
      selectedOrder: {},
      selectedDelivery: {},
      driverIndex: -1,
      driverList: [],
      driver: [],
      search: '',
      branch: 'saburtalo',
      status: 4,
      deliveryStatus: 6,
      page: 0,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
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
       if (vm.$store.state.auth.user.data.role !== "admin" || vm.$store.state.auth.user.data.role !== "posaccess") {
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

    const TOKEN = this.loggedUser.token;
    var bodyFormData = new FormData();
    bodyFormData.set("branch", this.branch);
    bodyFormData.set("status", this.status);

    axios
      .request({
        method: "post",
        url:
          "http://max.ronnyspizza.ge/rest/web/index.php?r=v1/manager/get-current-orders",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyFormData,
      })
      .then((response) => {
        this.orders = response.data.data;
        this.loading = false;
        console.log("orders data: ", response.data.data);
      });

      var bodyFormDriver = new FormData();
      bodyFormDriver.set("branch", 'saburtalo');

      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/driver/clockedin-drivers",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormDriver,
        })
        .then((response) => {
          this.driverList = response.data.data;
          this.driverLoad = false;
          console.log("Drivers List: ", this.driverList);
        });
  },
  computed: {

      filteredOrdersDelivery() {
      this.orders.forEach( (x) => {
          x.order_data = JSON.parse(x.order_data);
      });
      return this.orders.filter((x) => x.source === "pos" && x.order_data.deliveryMethod === "Delivery");
    },
    filteredDriver() {
        return this.driverList[this.driverIndex];
    },
      filteredOrdersLegacy() {
      return this.orders.filter((x) => x.source === "Legacy");
    },
  },
  methods: {
    onButtonClick(item) {
      this.$router.push({name: 'singleorder', params: {orderProp: item} });
    },
        driverOut(){
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        this.driver = this.driverList[this.driverIndex];
        bodyFormData.set("order_id", this.selectedOrder[0].id);
        bodyFormData.set("driver_id", this.driver.id);
        alert(this.driver.id);

        axios
        .request({
            method: "post",
            url:
            "http://188.169.16.186:8082//ronny/rest/web/index.php?r=v1/manager/attach-order-to-driver",
            //  Combine order and driver LINK HERE!!!!,
            headers: {
            Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
        })
        .then((response) => {
          if(response.is_error){
              alert(response.error_message);
          }
            this.orders = response.data.data;
            console.log("orders data: ", response.data.data);
        });
        this.$router.go();
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
            "http://188.169.16.186:8082//ronny/rest/web/index.php?r=v1/manager/get-current-orders",
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
