<script>
/* eslint-disable */
</script>
<template>
  <v-container data-app>
    <v-row>
        
        <v-card class="col-8">
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
                              <td>{{row.item.order_id}}</td>
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
              <!-- <v-btn elevation='2' dark large class="mx-2 my-2" v-for="status in orderStatuses" :key="status" @click="changeOrder(status)">
                {{ status.status_name }}
              </v-btn> -->

              <v-select
              :items="orderStatuses"
              v-on:change="changeOrder"
              item-text="status_name"
              item-value="id"
              label="Filter Order"
            ></v-select>
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
            <v-btn v-if="statusModel != null" @click="updateOrder()">Change Order: {{ statusObject[0].status_name }}</v-btn>
            <v-btn v-if="showOrderComponent && statusModel == null" @click="updateOrder()">Change Order</v-btn>
            <v-btn v-if="selectedOrder.payment_method_id == 4" @click="payOrder(selectedOrder)">Pay Order</v-btn>
        </v-card>
    </v-row>

    <v-dialog
      v-model="wasteDialog"
      scrollable
      max-width="500px"
    >
      <v-card>
        <v-card-title>Select Waste Item</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;">
            <v-checkbox
            v-for="item in selectedOrderItems"
            :key="item.id"
            v-model="selectedWaste"
            :label="item.name+' : '+item.price" 
            :value="item"
          ></v-checkbox>
          <v-divider></v-divider>
          <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Comment"
            v-model="wasteComment"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>

          <v-btn
            color="blue darken-1"
            text
            x-large
            @click="wasteDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            x-large
            text
            @click="wasteOrder()"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>
<script>
import orderList from '../components/Order';
import axios from 'axios';
  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        menu:false,
        wasteDialog: false,
        selectedWaste: [],
        orderWaste: [],
        wasteComment: '',
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
        selectedOrderItems: [],
        statusSelected: false,
        showOrderComponent: false,
        statusModel: null,
        statusObject: {},
        search: '',
        singleSelect: true,
        tab: 0,
        loggedUser: {},
        selected: [],
        loading: true,
        orders: [],
        branch: 'digomi',
        status: '1,2,3,4,5,6,7,8,9,10',
        page: 0,
        pageCount: 0,
        itemsPerPage: 5,
        items: [
          { tab: 'All Orders', content: 'all' },
          { tab: 'Unpaid Orders', content: 'unpaid' },
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
          { text: "Branch", value: "branch" },
          { text: "Source", value: "source" },
          { text: "Delivery Adress", value: "order_data.adress" },
          { text: "Customer Name", value: "order_data.customer.name" },
          { text: "Customer Phone", value: "order_data.customer.tel" },
          { text: "Order Items", value: "order_data.items[0].name" },
          { text: "Re-Open" },
        ],
      }
    },
    created() {
      this.timer = setInterval(this.$forceUpdate(), 1000)
    },
    computed: {
      filteredOrdersComputed() {
        this.orders.forEach(x => {
            x.order_data = JSON.parse(x.order_data);
        });
        return this.orders.filter((x) => x.source === "pos");
      },
      selectedStatus(){
          this.statusObject = this.orderStatuses.filter((x) => x.status_name === this.statusModel);

          return this.statusObject;
      }
    },
    mounted() {
      console.log(this.orderStatuses["Finished bake"]);
      this.loggedUser = this.$store.state.auth.user.data;

    const TOKEN = this.loggedUser.token;
    var bodyFormData = new FormData();
    //bodyFormData.set("branch", this.branch);
    bodyFormData.set("status_key", this.status);

    axios
      .request({
        method: "post",
        url:
          "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/list",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyFormData,
      })
      .then((response) => {
        this.orders = response.data.data;
        console.log("response 123: ", this.orders);
        // this.orders.forEach(x => {
        //     x.order_data = JSON.parse(x.order_data);
        // });
        this.filteredOrders = this.orders;
        console.log("orders data: ", this.filteredOrders);
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
    watch: {
    date(val){
      this.updateOrdersDate(val);
    },
  },
    methods: {
      updateOrders(){
        this.loggedUser = this.$store.state.auth.user.data;

        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        //bodyFormData.set("branch", this.branch);
        bodyFormData.set("status_key", this.status);

        axios
          .request({
            method: "post",
            url:
              "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/list",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
            this.orders = response.data.data;
            console.log("response 123: ", this.orders);
            // this.orders.forEach(x => {
            //     x.order_data = JSON.parse(x.order_data);
            // });
            this.filteredOrders = this.orders;
            console.log("orders data: ", this.filteredOrders);
          });

      },
      updateOrdersDate(date){
        var dateString = date + ' to '+ date;
        this.loggedUser = this.$store.state.auth.user.data;

        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        //bodyFormData.set("branch", this.branch);
        bodyFormData.set("status_key", this.status);
        bodyFormData.set("day", dateString);

        axios
          .request({
            method: "post",
            url:
              "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/list",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
            this.orders = response.data.data;
            console.log("response 123: ", this.orders);
            // this.orders.forEach(x => {
            //     x.order_data = JSON.parse(x.order_data);
            // });
            this.filteredOrders = this.orders;
            console.log("orders data: ", this.filteredOrders);
          });

      },
        statusRequest(status){
          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("order_status", status);
          bodyFormData.set("id", this.selectedOrder.id);

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
              if(response.data.is_error){
                alert("Status Change Error");
              }
              else{
                alert("Order Status Changed Correctly");
              }
            });
        },
        wasteOrder(){

          this.orderWaste = { items: this.selectedWaste };
          //this.orderWaste.order_data.items = this.selectedWaste;

          console.log('orderWaste: ', this.orderWaste);

          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("order", this.orderWaste);

          axios
            .request({
              method: "post",
              url:
                "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/waste",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: this.orderWaste,
            })
            .then((response) => {
              if(response.data.is_error){
                console.log("Waste order Error: ", response);
              }
              else{
                console.log("Waste Successful: ",response);
              }
            });
        },
        statusRequest(status){
          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("order_status", status);
          bodyFormData.set("id", this.selectedOrder.id);

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
              if(response.data.is_error){
                console.log("Status Change Error");
              }
              else{
                console.log("Order Status Changed Correctly");
                this.updateOrders();
              }
            });
        },
        updateOrder(){
          
          if(this.selectedStatus[0].id === 1){
            this.statusRequest("pending");
          }
          else if(this.selectedStatus[0].id === 2){
            this.statusRequest("in_kitchen");
          }
          else if(this.selectedStatus[0].id === 3){
            this.statusRequest("prepearing");
          }
          else if(this.selectedStatus[0].id === 4){
            this.statusRequest("finished_bake");
          }
          else if(this.selectedStatus[0].id === 5){
            this.statusRequest("ready");
          }
          else if(this.selectedStatus[0].id === 6){
            this.statusRequest("in_delivery");
          }
          else if(this.selectedStatus[0].id === 7){
            alert('Change order status to ' + this.selectedStatus[0].status_name);
          }
          else if(this.selectedStatus[0].id === 8){
            this.wasteDialog = true;
          }
          else if(this.selectedStatus[0].id === 9){
            this.statusRequest("refund");
          }
          else if(this.selectedStatus[0].id === 10){
            this.statusRequest("void");
          }
          else{
            alert("Update Order: "+ this.selectedOrder.id + ", status changed to: " + this.selectedStatus[0].status_name);
          }
          this.updateOrders();
        },
        changeOrder(status){
            this.filteredOrders = this.orders.filter((x) => x.status == status);
        },
        re_open(order){
            console.log('Reopen order: ', order);
            localStorage.setItem("reopenItem", JSON.stringify(order));
            this.$router.push({ path: 'pos'});
        },
        payOrder(order){
            console.log('Reopen order: ', order);
            localStorage.setItem("payItem", JSON.stringify(order));
            this.$router.push({ path: 'pos'});
        },
        driverSingle(order){
          //this.$store.state.user.data.driverSingle = order;  
          this.$router.push({ name: 'driversingle', params: {orderProp: order}});
        },
        foobar(item){
            this.itemIndex = this.orders.indexOf(item);
        },
        clearOrder(){
          this.order = [];
          this.selectedOrder = [];
          this.selectedOrderItems = [];
          this.showOrderComponent = false;
        },
        onButtonClick(item) {
            this.showOrderComponent = true;
            this.order = item;
            this.lastOrder = item;
            this.selectedOrder = item;
            this.selectedOrderItems = item.order_data.items;

            console.log("Selected Item: ", this.selectedOrder);
        },
        getTab(tab){
            if(tab.content === 'all') {
              this.filteredOrders = this.orders;
            }
            else if(tab.content === 'unpaid') {
              this.filteredOrders = this.orders.filter((x) => x.payment_method_id === '4');
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