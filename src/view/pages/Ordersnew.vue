<script>
/* eslint-disable */
</script>
<template>
    <v-container data-app>
        <v-alert v-model="printError" color="pink" dark border="top" transition="scale-transition" dismissible>
            Was unable to print!
        </v-alert>
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="4"  class="vCard100 ">
                <v-card class="pa-2 orderScroll" outlined v-if="showOrderComponent">
                    <i class="material-icons md-36 topcorner" @click="clearOrder()" v-if="showOrderComponent">close</i>
                    <ul class="inner">
                        <li>
                            <orderList :orderProp="order" :key="orderChange"/>
                        </li>
                        <li class="selecti" v-if="!limited">
                            <v-select v-if="showOrderComponent" :items="orderStatuses" v-model="statusModel" item-text="status_name" label="Change Status"></v-select>
                        </li>
                    </ul>
                    <ul class="inner">
                        <li>
                            <v-btn v-if="showOrderComponent && !limited" @click="updateOrder()">Change </v-btn>
                        </li>
                    </ul>
                    <ul class="inner">
                        <li>
                            <v-btn v-if="showOrderComponent" class="mx-2" fab dark small color="green" @click="re_open(selectedOrder)">
                                <v-icon dark>open_in_new</v-icon>
                            </v-btn>
                            <v-btn v-if="showOrderComponent" class="mx-2" fab dark small color="green" @click="rePrint(selectedOrder)">
                                    <v-icon dark>print</v-icon>
                                </v-btn>
                            <!-- <v-btn v-if="selectedOrder.payment_method_id == 4" @click="payOrder(selectedOrder)">Pay Order</v-btn> -->
                        </li>
                    </ul>

                </v-card>
            </v-col>
            <v-col cols="6" md="8" class="vCard100">
                <v-card class="pa-2" outlined tile>
                    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Select Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                    </v-menu>
                    <v-tabs v-model="tab" fixed-tabs background-color="primary" dark>
                        <v-tab v-for="(item, index) in items" :key="index" @click="getTab(item)">
                            {{ item.tab }}
                        </v-tab>

                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="(item, index) in items" :key="index">
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                <export-excel
                                  class="btn btn-success"
                                  :data="json_data"
                                  :fields="json_fields"
                                  worksheet="Worksheet"
                                >
                                  <i class="mdi mdi-download"> Excel Export </i>
                                </export-excel>

                                <v-data-table dense v-model="selected" :search="search" :headers="headers" :page.sync="page" hide-default-footer :items="filteredOrders" :items-per-page="itemsPerPage" item-key="order_id" @page-count="pageCount = $event">
                                    <template v-slot:item="row">
                                        <tr @click="onButtonClick(row.item)" :class="{selectedRow : row.item.id == selectedOrder.id}">
                                            <td>{{Number(row.item.id)}}</td>
                                            <td>{{row.item.paymentType}}</td>
                                            <td>{{row.item.opay_status}}</td>
                                            <td>{{ row.item.totalDue }}</td>
                                            <td>{{ row.item.created_hour }}</td>
                                            <td>{{row.item.deliveryMethod}}</td>
                                            <td>{{row.item.pos_id }}</td>
                                            <td>{{row.item.customer.code}}</td>
                                            <td>{{row.item.customer.address}}</td>
                                            <td>{{row.item.customer.enterance}}</td>
                                            <td>{{row.item.customer.security}}</td>
                                            <td>{{row.item.customer.floor}}</td>
                                            <td>{{row.item.customer.appartment}}</td>
                                            <td>{{row.item.customer.name}}</td>
                                            <td>{{row.item.customer.phone}}</td>
                                            <!-- <td>{{ Number(row.item.order_data.discPrice).toFixed(2) }}</td> -->
                                            <!-- <td v-if="!row.item.order_data.discountAmount">{{ (Number(row.item.order_data.totalPrice) - (Number(row.item.order_data.discPrice)/ 100 * Number(row.item.order_data.discount))).toFixed(2) }}</td> -->
                                        </tr>
                                    </template>
                                </v-data-table>
                                <v-pagination
                                  v-model="page"
                                  :length="pageCount"
                                ></v-pagination>
                                <v-text-field
                                :value="itemsPerPage"
                                :label="(`Items per page. Items Count: ` + filteredOrders.length)"
                                type="number"
                                min="1"
                                max="20"
                                @input="checkIPP($event)"
                                ></v-text-field>
                                <!-- <v-select
                                :items="selectItems"
                                :value="itemsPerPage"
                                :menu-props="{ top: true, offsetY: true }"
                                :label="(`Items per page. Items Count: ` + filteredOrders.length)"
                                type="number"
                                min="1"
                                max="20"
                                @input="checkIPP($event)"
                              ></v-select> -->
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                    <v-row>
                        <!-- <v-btn elevation='2' dark large class="mx-2 my-2" v-for="status in orderStatuses" :key="status" @click="changeOrder(status)">
                          {{ status.status_name }}
                        </v-btn> -->
                        <v-select :items="orderStatuses" v-on:change="changeOrder" item-text="status_name" item-value="id" clearable label="Filter Order"></v-select>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

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

        <v-alert
          v-model="alertSuccess"
          dense
          text
          type="success"
        >
          <!-- <h1>{{ errorText }}</h1> -->
          {{ errorText }}
        </v-alert>
        <v-alert
          v-model="alertError"
          dense
          border="left"
          type="warning"
        >
          {{ errorText }}
        </v-alert>

        <v-dialog v-model="wasteDialog" scrollable max-width="500px">
            <v-card>
                <v-card-title>Select Waste Item</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 400px;">
                    <v-checkbox v-for="(item, index) in selectedOrderItems" :key="index" v-model="selectedWaste" :label="item.name+' : '+item.price" :value="item"></v-checkbox>
                    <v-divider></v-divider>
                    <v-textarea clearable clear-icon="mdi-close-circle" label="Comment" v-model="wasteComment"></v-textarea>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" text x-large @click="wasteDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" x-large text @click="wasteOrder()">
                        Done
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped>
.selectedRow {
  /* background-color:yellow; */
  font-weight: bold;
}
.vCard100 {
  width: 100%;
}
.orderScroll {
  /* position: fixed; */
  overflow: scroll;
}
.v-sheet.v-card
{
  /* height: 100%; */
}
ul.inner li,
ul.bottomInner li {
    list-style: none;
    float: left;
    margin-bottom: 40px;
    padding: 0 10px;
}
li.selecti {
    width: 100%;
}
</style>
<script>
import orderList from '../components/Order';
import Vue from "vue";
import excel from "vue-excel-export";
import axios from 'axios';

Vue.use(excel);

  export default {
    data () {
      return {
        
        selectItems: [5, 10, 15, 20],
        orderChange: 0,
        orderFunctions : ['Reopen'],
        date: new Date(),
        menu:false,
        wasteDialog: false,
        selectedWaste: [],
        orderWaste: [],
        wasteComment: '',
        promisedTime: 15,
        sheet: false,
        alertSuccess: false,
        alertError: false,
        errorText: '',
        ticksLabels: [
          5,10,15,20,25,30,40,50,60,70,80,90
        ],
        itemIndex: -1,
        filteredOrders: [],
        json_data: [],
        json_fields: {
            "Order ID": "id",
            "delivery": "deliveryMethod",
            "Customer Name": "customer.name",
            "Total price": "total_price",
            "Type":"discountName",
            "Amount": "newdiscount",
            "Split cash": "splitCash",
            "Split card": "splitCard",
            "Total due": "totalDue",
            "Method":"paymentType",
            "Wolt Code":"customer.code",
            "Branch": "branch",
            "status": "statusName",
            "Date": "finish_date",
        },
        order: {},
        limited: false,
        orderStatuses: [],
        selectedOrder: [],
        selectedOrderItems: [],
        statusSelected: false,
        showOrderComponent: false,
        statusModel: null,
        statusName: "",
        statusObject: {},
        printError: false,
        search: '',
        singleSelect: true,
        tab: 0,
        loggedUser: {},
        loggedUserFull: {},
        selected: [],
        loading: true,
        orders: [],
        branch: 'digomi',
        status: '1,2,3,4,5,6,7,8,9,10',
        page: 0,
        pageCount: 0,
        itemsPerPage: 10,
        items: [
          { tab: 'All Orders', content: 'all' },
          { tab: 'Unpaid Orders', content: 'unpaid' },
          { tab: 'Walk In', content: 'walkin' },
          { tab: 'Take Out', content: 'takeout' },
          { tab: 'Delivery', content: 'ronnys' },
          { tab: 'Wolt', content: 'wolt' },
          { tab: 'Future', content: 'future' },
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
          { text: "ID", value: "id" },
          { text: "Payment Type", value: "paymentType" },
          { text: "Opay Status", value: "opay_status" },
          { text: "Total Due", value: "total_price" },
          { text: "Time", value: "createTime" },
          { text: "Source", value: "source" },
          { text: "POS ID", value: "pos_id" },
          { text: "Wolt #", value: "customer.code" },
          { text: "Delivery Adress", value: "customer.address" },
          { text: "Enterance", value: "customer.enterance" },
          { text: "Security", value: "customer.security" },
          { text: "Floor", value: "customer.floor" },
          { text: "Appartment", value: "customer.appartment" },
          { text: "Customer Name", value: "customer.name" },
          { text: "Customer Phone", value: "customer.phone" },
        ],
      }
    },
    created() {
      this.timer = setInterval(this.$forceUpdate(), 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    computed: {
      localApiIP() {
        return this.$store.getters.getLocalApiURL;
      },
      filteredOrdersComputed() {
        this.orders.forEach(x => {
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
        return this.orders.filter((x) => x.source === "pos");
      },
      selectedStatus(){
          this.statusObject = this.orderStatuses.filter((x) => x.status_name === this.statusModel);

          return this.statusObject;
      }
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
         vm.$router.push({name: "orders"}).catch(()=>{});
       }
       else {
         vm.$router.push({name: "dashboard"}).catch(()=>{});
       }
    });
  },
    mounted() {
      console.log(this.orderStatuses["Finished bake"]);
      this.date = this.formatDate(this.date);
      this.loggedUser = this.$store.state.auth.user.data;
      this.loggedUserFull = JSON.parse(localStorage.getItem("loggedUserData"));
      const TOKEN = this.loggedUser.token;

      if(this.loggedUser.role.toLowerCase() == "posaccess" || this.loggedUser.role.toLowerCase() == "cashier" || this.loggedUser.role.toLowerCase() == "courier" ){
        this.limited = true;
      }

       axios
      .request({
        method: "post",
        url:
          this.$hostname + "poses/order-statuses",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.orderStatuses = response.data.data
      });

        var dateString = this.date + ' to '+ this.date;
        var bodyFormData = new FormData();
        //bodyFormData.set("branch", this.branch);
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
        this.orders = response.data.data;
        this.orders.reverse();
        // this.orders.forEach(x => {
        //     x.order_data = JSON.parse(x.order_data);
        // });
        this.orders.forEach(x => {
          x.id = Number(x.id);
        //   if(x.order_data.discount > 0){
        //     if(x.order_data.discountName == 'Diplomat'){
        //         x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
        //       }
        //       else if(x.order_data.discountName == 'Manager' && x.order_data.discountAmount == true){
        //         x.order_data.discPrice = x.order_data.discount;
        //       }
        //       else {
        //         x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
        //       }
        //   }
        //   else {
        //     x.order_data.discPrice = 0;
        //   }
            var date = new Date(x.created_at);
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            
            if (minutes.length < 2) 
              minutes = '0' + minutes;
            
            x.createTime = hours + ":" + minutes;

        });

        this.filteredOrders = this.orders.filter((x) => x.status != "10" || x.status != "9");

        console.log("orders data: ", this.filteredOrders);
      });

    },
    components: {
        orderList,
    },
    watch: {
    itemsPerPage(val){
      console.log(val.length());
      if(val === null){
        alert('BLA');
      }
    },
    date(val){
      this.updateOrdersDate(val);
    },
    statusModel(val){
      this.statusObject = this.orderStatuses.filter((x) => x.status_name === this.statusModel);
    },
    filteredOrders(val){
      this.json_data = val;
    },
  },
    methods: {
      checkIPP(event){
        this.itemsPerPage = parseInt(event, 10);
        if(isNaN(this.itemsPerPage)){
          this.itemsPerPage = 0;
        }
      },
      addZeroes(num) {
      return num.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
      })
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

      rePrint(orderID){
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        bodyFormData.set("id", orderID.id);
        axios.request({
          method: "post",
          url:
            // this.$hostname + "orders/print",
            // "http://192.168.1.124/ronny/rest/web/index.php?r=v1/orders/print",
            this.localApiIP + "orders/print",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
        }).then((response) => {
            if(response.data.is_error){
              this.printError = true;
            }
            else{
              this.printError = false;
            }
        });
    },
      updateOrders(){
        this.loggedUser = this.$store.state.auth.user.data;
        this.loggedUserFull = JSON.parse(localStorage.getItem("loggedUserData"));

        var dateString = this.date + ' to '+ this.date;
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        //bodyFormData.set("branch", this.branch);
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
        this.orders = response.data.data;
        this.orders.reverse();
        // this.orders.forEach(x => {
        //     x.order_data = JSON.parse(x.order_data);
        // });
        this.orders.forEach(x => {
          if(x.order_data.discount > 0){
            if(x.order_data.discountName == 'Diplomat'){
                x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
              }
              else if(x.order_data.discountName == 'Manager' && x.order_data.discountAmount == true){
                x.order_data.discPrice = x.order_data.discount;
              }
              else {
                x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
              }
          }
          else {
            x.order_data.discPrice = 0;
          }
        });
        this.filteredOrders = this.orders.filter((x) => !(x.status == 10 && x.status == 9) );
        this.statusObject = {};
      });
      },
      updateOrdersDate(date){
        var dateString = date + ' to '+ date;
        this.loggedUser = this.$store.state.auth.user.data;

        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
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
            this.orders = response.data.data;
            // this.orders.forEach(x => {
            //     x.order_data = JSON.parse(x.order_data);
            // });

            this.orders.forEach(x => {
            x.id = Number(x.id);
            var date = new Date(x.created_at);
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            
            if (minutes.length < 2) 
              minutes = '0' + minutes;
            
            x.createTime = hours + ":" + minutes;

        });
           
            this.filteredOrders = this.orders.filter((x) => x.status != 10 && x.status != 9 );

            this.$forceUpdate();
          });
      },
        wasteOrder(){

          this.orderWaste = this.selectedOrder.order_data;
          this.orderWaste.items = this.selectedWaste;


          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("order", this.orderWaste);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "orders/waste",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: { order: this.orderWaste },
            })
            .then((response) => {
              if(response.data.is_error){
                console.log("Waste order Error: ", response);
              }
              else{
                console.log("Waste Successful: ",response);
                this.wasteDialog = false;
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
                this.$hostname + "orders/change-status",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              if(response.data.is_error){
                console.log("Status Change Error",  response);
                this.sheet = true;
                //this.alertError = true;
                this.errorText = response.data.error_message;
              }
              else{
                console.log("Order Status Changed Correctly");
                this.sheet = true;
                //this.alertSuccess = true;
                this.errorText = 'Order Status Changed Correctly!';
                this.updateOrders();
              }
            });
        },
        updateOrder(){
          console.log('SELECTED STATUS: ', this.statusObject[0]);
          if(this.statusObject[0].id === 1){
            this.statusRequest("pending");
          }
          else if(this.statusObject[0].id === 2){
            this.statusRequest("in_kitchen");
          }
          else if(this.statusObject[0].id === 3){
            this.statusRequest("prepearing");
          }
          else if(this.statusObject[0].id === 4){
            this.statusRequest("finished_bake");
          }
          else if(this.statusObject[0].id === 5){
            this.statusRequest("ready");
          }
          else if(this.statusObject[0].id === 6){
            this.statusRequest("in_delivery");
          }
          else if(this.statusObject[0].id === 7){
            this.statusRequest("Finished");
          }
          else if(this.statusObject[0].id === 8){
            this.wasteDialog = true;
          }
          else if(this.statusObject[0].id === 9){
            this.refundOrder();
          }
          else if(this.statusObject[0].id === 10){
            this.voidOrder();
          }
          else{
            alert("Update Order: "+ this.selectedOrder.id + ", status changed to: " + this.statusObject[0].status_name);
          }
          this.updateOrders();
        },
        changeOrder(status){
            console.log('status: ', status);
            if(status == null){
              this.filteredOrders = this.orders.filter((x) => x.status != '10' && x.status != '9');
            }
            else{
              this.filteredOrders = this.orders.filter((x) => x.status == status);
            }
        },
        voidOrder(){

          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("pos_id", this.loggedUserFull.pos_id);
          bodyFormData.set("id", this.selectedOrder.id);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "orders/void",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              if(response.data.data != 0){
                console.log("Status Change Error", response);
                this.sheet = true;
                //this.alertError = true;
                this.errorText = response.data.data;
              }
              else{
                console.log("Order Status Changed Correctly", response);
                this.updateOrders();
                this.sheet = true;
                //this.alertError = true;
                this.errorText = "Order Voided";
              }
          });
        },
        refundOrder(){
          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("pos_id", this.loggedUserFull.pos_id);
          bodyFormData.set("id", this.selectedOrder.id);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "orders/refund",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              console.log('refund response: ', response);
              if(response.data.is_error){
                console.log("Status Change Error",  response);
                this.sheet = true;
                //this.alertError = true;
                this.errorText = response.data.error_message;
              }
              else{
                console.log("Order Status Changed Correctly");
                this.sheet = true;
                //this.alertSuccess = true;
                this.errorText = 'Order Status Changed Correctly!';
                this.updateOrders();
              }
          });
        },
        re_open(order){
            console.log('Reopen order: ', order);
            localStorage.setItem("reopenItem", JSON.stringify(order));
            this.$router.push({ path: 'pos'}).catch(()=>{});
        },
        payOrder(order){
            console.log('Reopen order: ', order);
            localStorage.setItem("payItem", JSON.stringify(order));
            this.$router.push({ path: 'pos'}).catch(()=>{});
        },
        driverSingle(order){
          this.$router.push({ name: 'driversingle', params: {orderProp: order}}).catch(()=>{});
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

          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("order_id", item.id);

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "orders/get-order-data-by-id",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
            data: bodyFormData,
          })
          .then((response) => {
            this.selectedOrder = response.data.data;
            this.order = item;
            this.order.order_data = this.selectedOrder;
            this.selectedOrderItems = this.selectedOrder.items;
          

          this.orderChange++;
          // alert(item);
          if(item == undefined) {return}
            this.showOrderComponent = true;
            this.order = item;
            this.selectedOrder = item;
            this.selectedOrderItems = item.order_data.items;
            console.log("orderstatuses: ",this.orderStatuses);
            for(var i = 0; i <= this.orderStatuses.length; i++){
                if(i == item.status){
                  // console.log(this.orderStatuses[i-1])
                  this.statusModel = this.orderStatuses[i-1].status_name;
                  this.statusObject = this.orderStatuses[i-1];
                }
            }
            // console.log("STATUSOBJECT: ",this.statusObject);
            // console.log("Status Model: ", this.statusModel);

            // console.log("Selected Item: ", this.selectedOrder);
          });
        },
        getTab(tab){
            if(tab.content === 'all') {
              this.filteredOrders = this.orders.filter((x) => x.status != "10" && x.status != "9");
              // this.orders.filter((x) => x.status != 10)
            }
            else if(tab.content === 'unpaid') {
              this.filteredOrders = this.orders.filter((x) => x.payment_method_id === '4' && x.status <= '6' && x.status != 10);
            }
            else if(tab.content === 'ronnys') {
              this.filteredOrders = this.orders.filter((x) => x.deliveryMethod === "delivery" && x.status != 10);
            }
            else if(tab.content === 'walkin'){
              this.filteredOrders = this.orders.filter((x) => x.deliveryMethod === "Walk_In" || x.deliveryMethod === "walk_in" && x.status != 10);
            }
            else if(tab.content === 'glovo'){
              this.filteredOrders = this.orders.filter((x) => x.deliveryMethod === "Glovo" && x.status != 10);
            }
            else if(tab.content === 'wolt'){
              this.filteredOrders = this.orders.filter((x) => x.deliveryMethod === "Wolt" && x.status != 10);
            }
            else if(tab.content === 'future'){
              this.filteredOrders = this.orders.filter((x) => x.isFuture && x.status != 10);
            }
            else if(tab.content === 'takeout'){
              this.filteredOrders = this.orders.filter((x) => x.deliveryMethod === "Take Out" || x.deliveryMethod == "take_out" && x.status != 10);
            }
            this.$forceUpdate();
        },
    },
  }
</script>
