<script>
/* eslint-disable */
</script>
<template>
<v-container data-app>
    <v-alert v-model="printError" color="pink" dark border="top" transition="scale-transition" dismissible>
        Was unable to print!
    </v-alert>
    <v-row no-gutters>
        <v-col cols="12" sm="6" md="4"  class="vCard100">
            <v-card class="pa-2" outlined >
                <i class="material-icons md-36 topcorner" @click="clearOrder()" v-if="showOrderComponent">close</i>
                <ul class="inner">
                    <li>
                        <orderList :orderProp="order" v-if="showOrderComponent" />
                    </li>
                    <li class="selecti" v-if="!limited">
                        <v-select v-if="showOrderComponent" :items="orderStatuses" v-model="statusModel" item-text="status_name" label="Change Status"></v-select>
                    </li>
                </ul>
                <ul class="bottomInner">
                    <li>
                        <!-- <v-btn v-if="statusModel != null" @click="updateOrder()">Change: {{ statusObject[0].status_name }}</v-btn> -->
                        <v-btn v-if="showOrderComponent && !limited" @click="updateOrder()">Change </v-btn>
                    </li>
                </ul>
                <ul class="bottomInner">
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

                            <v-data-table v-model="selected" :search="search" :headers="headers" :items="filteredOrders" :items-per-page="itemsPerPage" item-key="order_id"  class="elevation-1" @page-count="pageCount = $event">
                                <template v-slot:item="row">
                                    <tr @click="onButtonClick(row.item)">
                                        <td>{{Number(row.item.id)}}</td>
                                        <td>{{row.item.order_data.pos_id }}</td>
                                        <td>{{row.item.order_data.deliveryMethod}}</td>
                                        <td>{{row.item.order_data.customer.code}}</td>
                                        <td>{{row.item.order_data.paymentType}}</td>
                                        <td>{{row.item.order_data.adress}}</td>
                                        <td>{{row.item.order_data.customer.name}}</td>
                                        <td>{{row.item.order_data.customer.phone}}</td>
                                        <!-- <td>{{ Number(row.item.order_data.discPrice).toFixed(2) }}</td> -->
                                        <td>{{ (Number(row.item.order_data.totalPrice) - Number(row.item.order_data.discPrice)).toFixed(2) }}</td>
                                        <td>{{ row.item.createTime }}</td>
                                        <!-- <td v-if="!row.item.order_data.discountAmount">{{ (Number(row.item.order_data.totalPrice) - (Number(row.item.order_data.discPrice)/ 100 * Number(row.item.order_data.discount))).toFixed(2) }}</td> -->
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
.vCard100 {
    width: 100%;
}
.v-sheet.v-card
{
  height: 100%;
}
ul.inner li,
ul.bottomInner li {
    list-style: none;
    float: left;
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
}

li.selecti {
    width: 100%;
}
</style>
<script>
import orderList from '../components/Order';
import axios from 'axios';
  export default {
    data () {
      return {
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
        order: {},
        lastOrder: [],
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
        itemsPerPage: 5,
        items: [
          { tab: 'All Orders', content: 'all' },
          { tab: 'Unpaid Orders', content: 'unpaid' },
          { tab: 'Walk In', content: 'walkin' },
          { tab: 'Take Out', content: 'takeout' },
          { tab: 'Delivery', content: 'ronnys' },
          { tab: 'Glovo', content: 'glovo' },
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
          { text: "POS ID", value: "order_data.pos_id" },
          { text: "Source", value: "source" },
          { text: "Glovo/Wolt #", value: "order_data.customer.code" },
          { text: "Payment Type", value: "order_data.paymentType" },
          { text: "Delivery Adress", value: "order_data.adress"},
          { text: "Customer Name", value: "order_data.customer.name" },
          { text: "Customer Phone", value: "order_data.customer.phone" },
          { text: "Total Due", value: "order_data.totalPrice" },
          { text: "Time", value: "createTime" },
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
          console.log("COMPUTED: ", this.statusObject);

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
          if(x.order_data.discountName == 'Diplomat'){
              x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
            }
            else if(x.order_data.discountName == 'Manager' && x.order_data.discountAmount == true){
              x.order_data.discPrice = x.order_data.discount;
            }
            else {
              x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
            }
            var date = new Date(x.created_at);
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            
            if (minutes.length < 2) 
              minutes = '0' + minutes;
            
            x.createTime = hours + ":" + minutes;

        });
        this.filteredOrders = this.orders.filter((x) => !(x.status == 10 || x.status == 9) );
        // this.filteredOrders = this.orders.filter((x) => x.status != 10);
        // this.filteredOrders.forEach((y) => {
          // console.log('asdasdasd: ',y.status);
          // var date = new Date(y.created_at);
          // y.createTime = date.getHours() + ":" + date.getMinutes();
          // alert(y.createTime);
        // });
        // this.filteredOrders = this.orders;
        // this.orders.filter((x) => x.payment_method_id === '4')
        console.log("orders data: ", this.filteredOrders);
      });

    },
    components: {
        orderList,
    },
    watch: {
    date(val){
      this.updateOrdersDate(val);
    },
    statusModel(val){
      this.statusObject = this.orderStatuses.filter((x) => x.status_name === this.statusModel);
    },
  },
    methods: {
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
            this.$hostname + "orders/print",
            // "http://192.168.1.124/ronny/rest/web/index.php?r=v1/orders/print",
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
          if(x.order_data.discountName == 'Diplomat'){
              x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
            }
            else if(x.order_data.discountName == 'Manager' && x.order_data.discountAmount == true){
              x.order_data.discPrice = x.order_data.discount;
            }
            else {
              x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
            }
        });
        this.filteredOrders = this.orders.filter((x) => !(x.status == 10 || x.status == 9) );
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
              if(x.order_data.discountName == 'Diplomat'){
                  x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
                }
                else if(x.order_data.discountName == 'Manager' && x.order_data.discountAmount == true){
                  x.order_data.discPrice = x.order_data.discount;
                }
                else {
                  x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
                }
            });
            this.filteredOrders = this.orders;
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
              this.filteredOrders = this.orders.filter((x) => x.status != 10);
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
            this.showOrderComponent = true;
            this.order = item;
            this.lastOrder = item;
            this.selectedOrder = item;
            this.selectedOrderItems = item.order_data.items;
            // console.log("orderstatuses: ",this.orderStatuses);
            for(var i = 0; i <= this.orderStatuses.length; i++){
                if(i == item.status){
                  console.log(this.orderStatuses[i-1])
                  this.statusModel = this.orderStatuses[i-1].status_name;
                  this.statusObject = this.orderStatuses[i-1];
                }
            }
            // console.log("STATUSOBJECT: ",this.statusObject);
            // console.log("Status Model: ", this.statusModel);

            // console.log("Selected Item: ", this.selectedOrder);
        },
        getTab(tab){
            if(tab.content === 'all') {
              this.filteredOrders = this.orders.filter((x) => x.status != 10)
              // this.orders.filter((x) => x.status != 10)
            }
            else if(tab.content === 'unpaid') {
              this.filteredOrders = this.orders.filter((x) => x.payment_method_id === '4' && x.status <= '6' && x.status != 10);
            }
            else if(tab.content === 'ronnys') {
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryType === "delivery" && x.status != 10);
            }
            else if(tab.content === 'walkin'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Walk_In" && x.status != 10);
            }
            else if(tab.content === 'glovo'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryType === "Glovo" && x.status != 10);
            }
            else if(tab.content === 'wolt'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Wolt" && x.status != 10);
            }
            else if(tab.content === 'future'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.isFuture && x.status != 10);
            }
            else if(tab.content === 'takeout'){
              this.filteredOrders = this.orders.filter((x) => x.order_data.deliveryMethod === "Take Out" && x.status != 10);
            }
            this.$forceUpdate();
        },
    },
  }
</script>
