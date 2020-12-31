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
          "http://188.169.16.186:8082//ronny/rest/web/index.php?r=v1/manager/get-current-orders",
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
      this.$router.push({name: 'singleorder', params: {orderProp: item} });
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
