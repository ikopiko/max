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
                            item-key="id"
                            :loading="loading"
                            show-select
                            class="elevation-1"
                            @page-count="pageCount = $event"
                            @click:row="onButtonClick"
                        >
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
                class="mx-auto my-3" :class="{ active : activeDriver == driver.id }" color="#46BDF2" light max-width="200" @click="selectDriver(driver)" @dblclick="double()">
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
                  v-model="driverDate"
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
                        <td>{{ (Number(order.order_data.totalPrice) - Number(order.order_data.discPrice)).toFixed(2) }}</td>
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
                 <br>
                Total Due : {{ (Number(selectedItem.order_data.totalPrice) - Number(selectedItem.order_data.discPrice)).toFixed(2) }} 
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
                    <td style="font-size: 18px !important;"> {{ item.size.toUpperCase() }} {{ item.name }}</td>
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

        <v-dialog
          v-model="editList"
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
                  v-model="driverDate"
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
                        v-for="order in editOrderList"
                        :key="order.id"
                        @click="editOrder(order)"
                        >
                        <td>{{ order.id }}</td>
                        <td>{{ order.order_data.customer.address }}</td>
                        <td>{{ order.order_data.customer.name }}</td>
                        <td>{{ (Number(order.order_data.totalPrice) - Number(order.order_data.discPrice)).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>

            <v-divider></v-divider>

          </v-card>
        </v-dialog>

        <v-dialog
          v-model="editDialog"
          width="600"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
               EDIT ORDER: {{ selectedItem.id }} 
                <br>
                Delivery Fee: {{ selectedItem.order_data.deliveryFee }}
                <br>
                Total : {{ selectedItem.order_data.totalPrice }}
                 <br>
                Total Due : {{ (Number(selectedItem.order_data.totalPrice) - Number(selectedItem.order_data.discPrice)).toFixed(2) }} 
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
                    <td style="font-size: 18px !important;"> {{ item.size.toUpperCase() }} {{ item.name }}</td>
                    <td style="font-size: 18px !important;">{{ item.totalPrice }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer>EDIT PAYMENT TYPE</v-spacer>
              <v-btn
                v-if="!activateEdit"
                class="mx-2"
                large
                text
                @click="activateEdit = true"
              >
                EDIT PAYMENT METHOD
              </v-btn>
              <v-btn
              v-if="activateEdit"
                class="green mx-2"
                large
                text
                @click="editItem('cash')"
              >
                Cash
              </v-btn>
              <v-btn
                v-if="activateEdit"
                class="blue mx-2"
                large
                text
                @click="editItem('card')"
              >
                Card
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-bottom-sheet v-model="sheet">
          <v-sheet
            class="text-center"
            height="200px"
          >
            <v-btn
              class="mt-6"
              text
              color="red"
              @click="sheet = !sheet"
            >
              close
            </v-btn>
            <div class="py-3">
              <h1>
                {{ errorText }}
              </h1>
            </div>
          </v-sheet>
        </v-bottom-sheet>
        
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
      sheet: false,
      errorText: '',
      activateEdit: false,
      driverDate: new Date(),
      date: new Date(),
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
      editDialog: false,
      editList: false,
      orders: [],
      deliveryOrders: [],
      dialog: false,
      singleSelect: true,
      loading: true,
      driverLoad: true,
      selectedDriver: {},
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
      editOrderList: [],
      pageCount: 0,
      itemsPerPage: 5,
      items: [
            { tab: 'Finished Orders', content: 'finished' },
            { tab: 'On Delivery', content: 'ongoing' },
            { tab: 'Delivered', content: 'delivered' },
            ],
            headers: [
            {
                text: "ORDER ID",
                align: "start",
                sortable: false,
                value: "id",
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
       if (vm.$store.state.auth.user.data.role.toLowerCase() == "admin"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "vicemanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "globalmanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "branchmanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "weiser" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "cashier"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "courier" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "posaccess" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "driver") {
         vm.$router.push({name: "driverdispatch"}).catch(()=>{});
       }
       else {
         vm.$router.push({name: "dashboard"}).catch(()=>{});
       }
    });
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.loggedUser = this.$store.state.auth.user.data;

    this.date = this.formatDate(this.date);
    this.driverDate = this.formatDate(this.driverDate);
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
      driverDate(val){
        console.log(val);
        this.updateDriverOrders(val);
      },
  },
  methods: {
    double(){
      this.updateDriverOrders(this.driverDate);
      this.editList = true;
    },
    formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
      },
    editItem(type){
      var bodyFormData=new FormData();
        bodyFormData.set("driver_id", this.selectedDriver.id);
        bodyFormData.set("order_id", this.selectedItem.id);
        bodyFormData.set("payment_method", type);
        if(type == 'split'){
          bodyFormData.set("split_cash", '20');
          bodyFormData.set("split_card", '20');
        }
        else {
          bodyFormData.set("split_cash", null);
          bodyFormData.set("split_card", null);
        }

        const TOKEN = this.loggedUser.token;
        axios.request({
            method: 'post',
            url: this.$hostname + 'orders/edit-order-for-driver',
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            },
            data: bodyFormData,
          })
          .then(response => {
            console.log('Edti Order: ', response);
            if(response.data.is_error){
                this.sheet = true;
                this.errorText = response.data.data;
              }
              else{
                this.sheet = true;
                 this.errorText = response.data.data;
              }
            
        });
    },
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
              this.activeDriver = -1;
              this.selectedDriver = null;
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
                    if(x.order_data.discount == 'Diplomat'){
                      x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
                    }
                    else if(x.order_data.discount == 'Manager' && x.order_data.discountAmount == true){
                      x.order_data.discPrice = x.order_data.discount;
                    }
                    else {
                      x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
                    }
                });
                  this.filteredDriverOrders = this.driverOrders.filter((x) => x.status == '6');
                  this.editOrderList = this.driverOrders.filter((x) => x.status == '7');
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
    editOrder(item){
        this.selectedItem = item;
        //this.driverOrderDialog = false;
        this.editDialog = true;
    },
    getOrders(){
      const TOKEN = this.loggedUser.token;
      var dateString = this.date + ' to '+ this.date;
      var bodyFormData = new FormData();
      // bodyFormData.set("branch", this.branch);
      bodyFormData.set("status_key", this.status);
      bodyFormData.set("day", dateString);

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
          console.log('ITEM ITEM: ',item);
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
          if(this.selectedOrders[0].status == '5' && this.selectedDriver.in_way == false){
            this,this.overlay = true;
            var orderIDs = [];
            this.selectedOrders.forEach(x => {
               orderIDs.push(x.id);
            });
            const TOKEN = this.loggedUser.token;
            var bodyFormData = new FormData();
            bodyFormData.set("order_id", orderIDs);
            bodyFormData.set("driver_id", this.selectedDriver.id);

            axios
            .request({
                method: "post",
                url:
                this.$hostname + "manager/attach-order-to-driver",
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
            this.getOrders();
            this.getDrivers();
            this.overlay = false;
            this.$forceUpdate();
            this.selectedDriver = null;
        }, 500);
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
