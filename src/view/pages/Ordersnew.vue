<script>
/* eslint-disable */
</script>
<template>
  <v-container data-app>
    <v-row>
        <v-card class="col-8">
          <!-- <v-card-text>
            <v-slider
              v-model="promisedTime"
              :tick-labels="ticksLabels"
              :max="11"
              step="1"
              ticks="always"
              tick-size="6"
            ></v-slider>
          </v-card-text> -->
            
            <v-tabs
              v-model="tab"
              fixed-tabs
              background-color="primary"
              dark      
            >
              <v-tab
                  v-for="item in items"
                  :key="item.tab"
                  @click="getTab(item)"
              >
                  {{ item.tab }}
              </v-tab>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item.tab"
            >
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>

                    <v-data-table
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
                    >
                        <template v-slot:item="row">
                            <tr @click="onButtonClick(row.item)">
                              <td>{{row.item.id}}</td>
                              <td>{{row.item.branch}}</td>
                              <td>{{row.item.order_data.deliveryMethod}}</td>
                              <td>{{row.item.order_data.adress}}</td>
                              <td>{{row.item.order_data.customer.name}}</td>
                              <td>{{row.item.order_data.customer.tel}}</td>
                              <td>{{row.item.order_data.items[0].name}}...</td>
                              <td>
                                <v-btn class="mx-2" fab dark small color="green" @click="re_open(row.item)">
                                    <v-icon dark>open_in_new</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                        </template>
                    </v-data-table>
            </v-tab-item>
            </v-tabs-items>
            </v-tabs>
            <v-row>
              <v-btn elevation='2' dark large class="mx-2 my-2" v-for="status in orderStatuses" :key="status" @click="changeOrder(status)">
                {{ status.status_name }}
              </v-btn>
            </v-row>
        </v-card>
        <v-card class="col-4">
            <i class="material-icons md-36 topcorner" @click="clearOrder()" v-if="showOrderComponent">close</i>
            <orderList :orderProp="order" v-if="showOrderComponent" />
            <v-select
                v-if="showOrderComponent"
                :items="orderStatuses"
                v-model="statusModel"
                item-text="status_name"
                label="Function"
              ></v-select>
        </v-card>
    </v-row>
  </v-container>

</template>
<script>
import orderList from '../components/Order';
import axios from 'axios';
  export default {
    data () {
      return {
        promisedTime: 15,
        ticksLabels: [
          5,10,15,20,25,30,40,50,60,70,80,90
        ],
        itemIndex: -1,
        filteredOrders: [],
        order: [],
        lastOrder: [],
        orderStatuses: [],
        selectedOrder: [],
        showOrderComponent: false,
        statusModel: null,
        search: '',
        singleSelect: true,
        tab: 0,
        loggedUser: {},
        selected: [],
        loading: true,
        orders: [],
        branch: 'saburtalo',
        status: 1,
        page: 0,
        pageCount: 0,
        itemsPerPage: 5,
        items: [
          { tab: 'All Orders', content: 'all' },
          { tab: 'Walk In', content: 'walkin' },
          { tab: 'Take Out', content: 'takeout' },
          { tab: 'Delivery', content: 'ronnys' },
          { tab: 'Glovo', content: 'glovo' },
          { tab: 'Wolt', content: 'wolt' },
        ],
        orderTypes: [
          { tab: 'Completed Orders', content: 'complete'},
          { tab: 'Discarded Orders', content: 'discard'},
          { tab: 'Voided Orders', content: 'void'},
          { tab: 'Canceled Orders', content: 'cancel'},
          { tab: 'Pending Payment', content: 'pending'},
          { tab: 'Pay Later', content: 'later'},
        ],
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
      }
    },
    computed: {
      filteredOrdersComputed() {
        this.orders.forEach(x => {
            x.order_data = JSON.parse(x.order_data);
        });
        return this.orders.filter((x) => x.source === "pos");
      },
    },

    mounted() {
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
        this.orders.forEach(x => {
            x.order_data = JSON.parse(x.order_data);
        });
        this.filteredOrders = this.orders;
        console.log("orders data: ", response.data.data);
      });

      axios
      .request({
        method: "post",
        url:
          "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/poses/order-statuses",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.orderStatuses = response.data.data
      });

    },
    components: {
        orderList,
    },
    methods: {
      
        changeOrder(status){
            this.filteredOrders = this.orders.filter((x) => x.status === status.id);
        },
        re_open(order){
            console.log('Reopen order: ', order);
            localStorage.setItem("reopenItem", JSON.stringify(order));
            this.$router.push({ path: 'pos'});
        },
        foobar(item){
            this.itemIndex = this.orders.indexOf(item);
        },
        clearOrder(){
          this.order = [];
          this.selectedOrder = [];
          this.showOrderComponent = false;
        },
        onButtonClick(item) {
            this.showOrderComponent = true;
            this.order = item;
            this.lastOrder = item;
            this.selectedOrder = item;

            console.log("Selected Item: ", this.selectedOrder);
        },
        getTab(tab){
            if(tab.content === 'all') {
              this.filteredOrders = this.orders;
            }
            else if(tab.content === 'ronnys') {
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryType === "Ronnys");
            }
            else if(tab.content === 'walkin'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Walk In");
            }
            else if(tab.content === 'glovo'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Glovo");
            }
            else if(tab.content === 'wolt'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Wolt");
            }
            else if(tab.content === 'takeout'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Take Out");
            }
            this.$forceUpdate();
        },
    },
  }
</script>