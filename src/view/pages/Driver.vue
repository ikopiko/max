<script>
/* eslint-disable */
</script>
<template>
  <div id="app" class="container">

    <div class="row">
        <!-- Order List -->
        <div class="col-9">    
                <template>
                <v-card>
                    <v-card-title>
                    Your Orders
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
                        <template v-slot:item="row">
                          <tr>
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
                    </v-card-text>
                    
                </v-card>
              </template>
        </div>
        <!-- End of Order List -->

        <!-- Driver Info -->
        <div class="col-3">
          <v-card>
            <v-card-title>Driver Information</v-card-title>
            
            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="my-4 subtitle-1">
                Ronny's Saburtalo
              </div>

              <div>Comments about driver</div>
            </v-card-text>

          </v-card>

        <!-- End of Driver Info -->
        <!-- Last Transactions -->
          <v-card class="my-5">
            <v-card-title>Last Transaction</v-card-title>
            
            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
                v-for="(last, index) in orders.splice(0,5)" :key="index"
              >
                <div class="grey--text ml-4">
                # {{ last.id }}
                <br>
                 + {{ last.order_data.totalPrice }} {{ last.order_data.paymentType }}
                  <v-btn class="mx-5" fab dark x-small color="green" @click="onButtonClick(last)">
                      <v-icon dark>read_more</v-icon>
                  </v-btn>
                <hr width="200">
                </div>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- End of Last Transactions -->
          
        </div>
    </div>
    
  </div>
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
      rating: 0,
      loggedUser: {},
      orders: [],
      lastOrders: [],
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
      status: 6,
      deliveryStatus: 6,
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
        { text: "Order Type", value: "order_data.deliveryMethod" },
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
         vm.$router.push({name: "driver"});
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

      filteredOrdersDelivery() {
        this.orders.forEach( (x) => {
            x.order_data = JSON.parse(x.order_data);
        });
        return this.orders.filter((x) => x.source === "pos" && x.order_data.deliveryMethod === "Delivery");
        // return this.orders;
      },
  },
  methods: {
    onButtonClick(item) {
      this.$router.push({name: 'driversingle', params: {orderProp: item} });
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
  },
};
</script>
