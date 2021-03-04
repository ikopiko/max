<script>
/* eslint-disable */
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      
      <v-card>
        <v-card-title>
          Orders
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table v-if="!dataRecived"
          v-model="selected"
          :search="search"
          :headers="headers"
          :items="filteredOrdersPos"
          :items-per-page="itemsPerPage"
          item-key="order_id"
          :loading="loading"
          :single-select="singleSelect"
          show-select
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="row">
              <tr>
                <td>
                  <v-simple-checkbox color="green" v-bind="selectedOrder" v-on="selectedOrder">
                  </v-simple-checkbox>
                </td>
                <td>{{row.item.id}}</td>
                <td>{{row.item.branch}}</td>
                <td>{{row.item.order_data.deliveryMethod}}</td>
                <td>{{row.item.order_data.adress}}</td>
                <td>{{row.item.order_data.customer.name}}</td>
                <td>{{row.item.order_data.customer.tel}}</td>
                <td>{{row.item.order_data.items[0].name}}...</td>
                <td>
                  <v-btn class="mx-2" fab dark small color="green" @click="onButtonClick(row.item)">
                      <v-icon dark>read_more</v-icon>
                  </v-btn>
                </td>
              </tr>
          </template>
        </v-data-table>

        <v-data-table v-if="dataRecived"
          v-model="selected"
          :search="search"
          :headers="headers"
          :items="filteredOrders"
          :items-per-page="itemsPerPage"
          item-key="order_id"
          :loading="loading"
          :single-select="singleSelect"
          show-select
          class="elevation-1"
          @page-count="pageCount = $event"
        ></v-data-table>
      </v-card>

      <!-- Order Search Modal  -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition" 
        scrollable
      >
        <v-card>
          <v-card-title>
            <span>Search Filters</span>
            <v-spacer></v-spacer>
          </v-card-title>  
            
          <orderModal
            @filteredData="getFilteredData" 
            @closeModal="closeModal"
            :ordersProp="filteredOrdersPos" /> 

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="closeModal()"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="singleOrderDialog"
      >
        <v-card>
          <v-row style="margin-left: 128px;">
            <span v-if="order.source === 'pos'">    
              <v-card
              class="my-3 mx-3 cardStyle"
              outlined
              max-width="344"
              >
              <v-list-item three-line>
                  <v-list-item-content>
                  <div class="overline mb-4">
                      # {{ order.orderId }}
                      <div style="float: right; text-align: right">
                      {{ order.date }}
                      </div>
                  </div>
                  <v-list-item-title class="headline cardStyle mb-1">{{
                      order.order_data.customer.name
                  }}</v-list-item-title>
                  <v-list-item-title class="headline mb-1">{{
                      order.order_data.customer.email
                  }}</v-list-item-title>
                  <v-list-item-title class="headline mb-1"
                      >{{ order.order_data.customer.tel }}
                      {{ order.order_data.customer.adress }}</v-list-item-title
                  >
                  <v-list-item-title class="headline mb-1 delivery"
                      >{{ order.order_data.deliveryType }} Delivery</v-list-item-title
                  >
                  <div
                      class="row"
                      v-for="item in order.order_data.items"
                      :key="item.id"
                  >
                      <div class="col-12" v-if="item.custom == 'no'">
                      <div class="d-flex justify-content-between">
                          <span class="orderDisplay" @click="foobar(item)">
                          <strong
                              >{{ item.qty }} {{ item.size.toUpperCase() }}
                              {{ item.name }}</strong
                          >
                          <strong v-if="item.cuts"> 16 Cut</strong>
                          </span>
                          <span>
                          {{ (item.totalPrice * item.qty).toFixed(2) }}
                          </span>
                      </div>

                      <div class="pl-4" style="font-size: 14px">
                          <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.crust == 'thin'"
                          >
                          <span>{{ item.crust }} Crust</span>
                          <span>0.00</span>
                          </div>
                          <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.sauce != 'sauce'"
                          >
                          <span>{{ item.sauce }}</span>
                          <span>0.00</span>
                          </div>
                          <div
                          class="d-flex justify-content-between"
                          v-for="defTopping in item.defaultToppings"
                          :key="defTopping.id"
                          >
                          <span
                              v-if="defTopping.isDeleted"
                              :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                              >{{ defTopping.name }}</span
                          >
                          <span
                              :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                              v-if="defTopping.isDeleted"
                              >0.00</span
                          >
                          </div>
                          <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.toppings"
                          :key="topping.id"
                          >
                          <span v-if="topping.count == 1"
                              >+ {{ topping.name }}</span
                          >
                          <span v-if="topping.count != 1"
                              >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                              (topping.price * topping.count).toFixed(2)
                          }}</span>
                          </div>

                          <span v-if="item.half1.toppings.length > 0">A</span>

                          <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.half1.toppings"
                          :key="topping.id"
                          >
                          <span v-if="topping.count == 1"
                              >+ {{ topping.name }}</span
                          >
                          <span v-if="topping.count != 1"
                              >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                              (topping.price * topping.count).toFixed(2)
                          }}</span>
                          </div>
                          <span v-if="item.half2.toppings.length > 0">B</span>

                          <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.half2.toppings"
                          :key="topping.id"
                          >
                          <span v-if="topping.count == 1"
                              >+ {{ topping.name }}</span
                          >
                          <span v-if="topping.count != 1"
                              >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                              (topping.price * topping.count).toFixed(2)
                          }}</span>
                          </div>
                      </div>
                      </div>
                      <!-- Other Products rendering -->
                      <div class="col-12" v-if="item.custom == 'other'">
                      <div class="d-flex justify-content-between">
                          <span class="orderDisplay" @click="foobar(item)">
                          <strong>{{ item.qty }} {{ item.name }}</strong>
                          <strong v-if="item.cuts"> 16 Cut</strong>
                          </span>
                          <span>
                          {{ (item.totalPrice * item.qty).toFixed(2) }}
                          </span>
                      </div>
                      </div>
                      <!-- Sticks Rendering -->
                      <div class="col-12" v-if="item.custom == 'sticks'">
                      <div class="d-flex justify-content-between">
                          <span class="orderDisplay" @click="foobar(item)">
                          <strong>{{ item.qty }} {{ item.name }}</strong>
                          <strong v-if="item.cuts"> 16 Cut</strong>
                          </span>
                          <span>
                          {{ (item.totalPrice * item.qty).toFixed(2) }}
                          </span>
                      </div>

                      <div class="pl-4" style="font-size: 14px">
                          <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.toppings"
                          :key="topping.id"
                          >
                          <span v-if="topping.count == 1"
                              >+ {{ topping.name }}</span
                          >
                          <span v-if="topping.count != 1"
                              >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                              (topping.price * topping.count).toFixed(2)
                          }}</span>
                          </div>
                      </div>
                      </div>
                      <!-- Half and Half Pizza View -->

                      <div
                      class="col-12"
                      v-if="item.custom == 'yes'"
                      @click="foobar(item)"
                      >
                      <div class="d-flex justify-content-between">
                          <span class="orderDisplay" @click="foobar(item)">
                          <strong
                              >{{ item.qty }}
                              {{ item.size.toUpperCase() }} A/B</strong
                          >
                          <strong v-if="item.cuts"> 16 Cut</strong>
                          </span>
                          <span>
                          {{ (item.totalPrice * item.qty).toFixed(2) }}
                          </span>
                      </div>
                      <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.toppings"
                          :key="topping.id"
                      >
                          <span v-if="topping.count == 1">+ {{ topping.name }}</span>
                          <span v-if="topping.count != 1"
                          >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                          (topping.price * topping.count).toFixed(2)
                          }}</span>
                      </div>

                      <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.crust == 'thin'"
                      >
                          <span>{{ item.crust }} Crust</span>
                          <span>0.00</span>
                      </div>
                      <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.sauce != 'sauce'"
                      >
                          <span>{{ item.sauce }}</span>
                          <span>0.00</span>
                      </div>

                      <div class="orderDisplay" @click="foobar(item)">
                          <strong>A {{ item.half1.name }}</strong>
                      </div>
                      <div class="pl-4" style="font-size: 14px">
                          <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.half1.crust == 'thin'"
                          >
                          <span>{{ item.half1.crust }} Crust</span>
                          <span>0.00</span>
                          </div>
                          <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.half1.sauce != 'sauce'"
                          >
                          <span>{{ item.half1.sauce }} Sauce</span>
                          <span>0.00</span>
                          </div>
                          <div
                          class="d-flex justify-content-between"
                          v-for="defTopping in item.half1.defaultToppings"
                          :key="defTopping.id"
                          >
                          <span
                              v-if="defTopping.isDeleted"
                              :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                              >{{ defTopping.name }}</span
                          >
                          <span
                              :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                              v-if="defTopping.isDeleted"
                              >0.00</span
                          >
                          </div>
                          <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.half1.toppings"
                          :key="topping.id"
                          >
                          <span v-if="topping.count == 1"
                              >+ {{ topping.name }}</span
                          >
                          <span v-if="topping.count != 1"
                              >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                              (topping.price * topping.count).toFixed(2)
                          }}</span>
                          </div>
                      </div>
                      <div class="orderDisplay" @click="foobar(item)">
                          <strong>B {{ item.half2.name }}</strong>
                      </div>
                      <div class="pl-4" style="font-size: 14px">
                          <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.half2.crust == 'thin'"
                          >
                          <span>{{ item.half2.crust }} Crust</span>
                          <span>0.00</span>
                          </div>
                          <div
                          class="d-flex justify-content-between deletedTopping"
                          v-if="item.half2.sauce != 'sauce'"
                          >
                          <span>{{ item.half2.sauce }} Sauce</span>
                          <span>0.00</span>
                          </div>
                          <div
                          class="d-flex justify-content-between"
                          v-for="defTopping in item.half2.defaultToppings"
                          :key="defTopping.id"
                          >
                          <span
                              v-if="defTopping.isDeleted"
                              :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                              >{{ defTopping.name }}</span
                          >
                          <span
                              :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                              v-if="defTopping.isDeleted"
                              >0.00</span
                          >
                          </div>
                          <div
                          class="d-flex justify-content-between orderDisplay"
                          v-for="topping in item.half2.toppings"
                          :key="topping.id"
                          >
                          <span v-if="topping.count == 1"
                              >+ {{ topping.name }}</span
                          >
                          <span v-if="topping.count != 1"
                              >+ {{ topping.count }} {{ topping.name }}</span
                          >
                          <span>{{
                              (topping.price * topping.count).toFixed(2)
                          }}</span>
                          </div>
                      </div>
                      </div>
                      <!-- End Of Half and Half Pizza View -->
                  </div>
                  <div class="cardPrice">
                      <strong>{{ order.order_data.totalPrice }}</strong>
                  </div>
                  <v-list-item-title class="headline cardStyle mb-1">{{
                      order.order_data.customer.adress
                  }}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-card-actions v-if="statusIndex === 1">
                  <v-btn
                  color="orange lighten-2"
                  text
                  >
                  Waiting For Baker 1
                  </v-btn>

                  <v-spacer></v-spacer>

                  <b-button variant="success" @click="baker1Done(order)">Ready</b-button>
              </v-card-actions>

              <v-card-actions v-if="statusIndex === 2">
                  <v-btn
                  color="orange lighten-2"
                  text
                  >
                  Waiting For Baker 2
                  </v-btn>

                  <v-spacer></v-spacer>

                  <b-button variant="success" @click="baker2Done(order)">Ready</b-button>
              </v-card-actions>

              <v-card-actions v-if="statusIndex === 3">
                  <v-btn
                  color="orange lighten-2"
                  text
                  >
                  Pizza In Oven
                  </v-btn>

                  <v-spacer></v-spacer>

                  <b-button variant="success" @click="boxPizza(order)">BOX</b-button>
              </v-card-actions>

              <v-card-actions v-if="statusIndex === 4">
                  <v-btn
                  color="orange lighten-2"
                  text
                  >
                  Waiting For Customer
                  </v-btn>

                  <v-spacer></v-spacer>

                  <b-button variant="success" @click="customerDelivery(order)">Ready</b-button>
              </v-card-actions>
              </v-card>
            
            </span>
          </v-row>
          <v-row class="my-3" style="margin-left: 128px;"> 
            <v-btn
              class="mx-3"
              elevation="2"
              x-large
            >
              Re-Print
            </v-btn> 
            <v-btn
              class="mx-3"
              elevation="2"
              x-large
            >
              Re-Open
            </v-btn> 
          </v-row>

          <v-card-actions class="justify-end">
              <v-btn
                text
                @click="singleOrderDialog = false"
              >Close</v-btn>
            </v-card-actions>

        </v-card>  
      </v-dialog>

      <!-- End of Order Search Modal  -->

      
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import orderModal from  "../pages/Modal";
import axios from "axios";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      loggedUser: {},
      orders: [],
      filteredOrders: [],
      singleSelect: true,
      selected: [],
      search: '',
      loading: true,
      options: {},
      branch: 'saburtalo',
      status: 1,
      singleOrderDialog: false,
      order: [],
      dialog: false,
      dialog2: false,
      dialog3: false,
      notifications: false,
      dataRecived: false,
      sound: true,
      widgets: false,
      page: 0,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        {
          text: "ORDER ID",
          align: "start",
          sortable: false,
          value: "order_id",
        },
        { text: "Branch", value: "branch" },
        { text: "Source", value: "source" },
        { text: "Delivery Adress", value: "order_data.adress" },
        { text: "Customer Name", value: "order_data.customer.name" },
        { text: "Customer Phone", value: "order_data.customer.tel" },
        { text: "Order Items", value: "order_data.items[0].name" },
      ],
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
       if (vm.$store.state.auth.user.data.role !== "admin" || vm.$store.state.auth.user.data.role !== "posaccess") {
         vm.$router.push({name: "order"});
       }
       else {
         vm.$router.push({name: "dashboard"});
       }
    });
  },
  components: {
    orderModal
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
          "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/manager/get-current-orders",
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
  },
  computed: {
      filteredOrdersPos() {
      this.orders.forEach(x => {
          x.order_data = JSON.parse(x.order_data);
      });
      return this.orders.filter((x) => x.source === "pos");
    },
      filteredOrdersLegacy() {
      return this.orders.filter((x) => x.source === "Legacy");
    },
  },
  methods: {
    onButtonClick(item) {
      //alert("BLA");
      this.singleOrderDialog = true;
      this.order = item;
      // this.$router.push({name: 'singleorder', params: {orderProp: item} });
    },
    closeModal(){
      this.dialog = false;
    },
    getFilteredData(data) {
      this.dataRecived = true;
      setTimeout(() => this.filteredOrders = data, 100)
      console.log('returned data from component', this.filteredOrders);
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

    datesFilter(){

    },
  },
};
</script>
