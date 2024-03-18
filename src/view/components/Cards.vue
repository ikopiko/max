<script>
/* eslint-disable */
</script>
<template>
  <v-app>
  <div class="row">
    <span v-for="(order, index) in prepOrder" :key="index + Math.random()">
      <span v-if="order.source === 'pos' || order.source === 'web'">    
        <v-card
          class="mx-3 cardStyle"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                #{{ order.id }}
                <div style="float: right; text-align: right">
                  {{ order.date }}
                </div>
              </div>
              <v-list-item-title class="headline cardStyle mb-1">{{ order.customer.name }}</v-list-item-title>
              <v-list-item-title class="headline mb-1">{{ order.customer.email }}</v-list-item-title>
              <v-list-item-title class="headline mb-1 redText" v-if="order.opay_status != null">{{ order.order_data.paymentType }}: {{ order.opay_status }}</v-list-item-title>
              <v-list-item-title class="headline mb-1 redText" v-else>{{ order.order_data.paymentType }}</v-list-item-title>
              <v-list-item-title class="headline mb-1 redText" v-if="order.opay_status != null && order.opay_status != 'success'" @click="checkOpayStatus(order)">
                Click To Refresh Opay Status
                <div v-if="opayCheck.status == 'success'" style="color: green !important"> {{ opayCheck.status }} </div>
                <div v-else >{{ opayCheck.status }} </div>
              </v-list-item-title>
              <v-list-item-title class="headline mb-1">
                {{ order.customer.phone }}
                <br>
                {{ order.customer.address }}
                </v-list-item-title>
              <v-list-item-title v-if="order.order_data.isFuture" class="headline mb-1 delivery">
                Future Order
                <br/>
                Promised: {{ order.order_data.date }} 
              </v-list-item-title>

              <v-list-item-title class="headline mb-1 delivery"
                >{{ order.order_data.deliveryMethod }} 
                  <span v-if="order.order_data.deliveryType === 'Ronnys' || order.order_data.deliveryType == 'delivery'"> {{ order.order_data.deliveryMethod }} </span>
              </v-list-item-title
              >
              <v-list-item-title class="headline mb-1 h4"
                v-if="order.order_data.deliveryType === 'Ronnys' || order.order_data.deliveryType == 'delivery' "
                >Delivery Fee: {{ order.order_data.deliveryFee }}</v-list-item-title
              >
              <v-list-item-title class="headline mb-1 h4"
                v-if="order.order_data.discount !== 0 "
                >Discount: {{ order.order_data.discountName }} {{ order.order_data.discount }}</v-list-item-title
              >
              <div
                class="row"
                v-for="(item, index) in order.order_data.items"
                :key="index + Math.random()"
              >
                <div class="col-12" v-if="item.custom == 'no'">
                  <div class="d-flex justify-content-between">
                    <span class="orderDisplay" @click="foobar(item)">
                      <strong
                        >{{ item.qty }} {{ item.size.toUpperCase() }}
                        {{ item.name }}</strong
                      >
                      <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
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
                      v-for="(defTopping, index) in item.defaultToppings"
                      :key="index + Math.random()"
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
                      v-for="(topping, index) in item.toppings"
                      :key="index + Math.random()"
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
                      v-for="(topping, index) in item.half1.toppings"
                      :key="index + Math.random()"
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
                      v-for="(topping, index) in item.half2.toppings"
                      :key="index + Math.random()"
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
                      <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
                    </span>
                    <span>
                      {{ (item.price * item.qty).toFixed(2) }}
                    </span>
                  </div>
                </div>
                <!-- Sticks Rendering -->
                <div class="col-12" v-if="item.custom == 'sticks'">
                  <div class="d-flex justify-content-between">
                    <span class="orderDisplay" @click="foobar(item)">
                      <strong>{{ item.qty }} {{ item.name }}</strong>
                      <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
                    </span>
                    <span>
                      {{ (item.totalPrice * item.qty).toFixed(2) }}
                    </span>
                  </div>

                  <div class="pl-4" style="font-size: 14px">
                    <div
                      class="d-flex justify-content-between orderDisplay"
                      v-for="(topping, index) in item.toppings"
                      :key="index + Math.random()"
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
                      <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
                    </span>
                    <span>
                      {{ (item.totalPrice * item.qty).toFixed(2) }}
                    </span>
                  </div>
                  <div
                    class="d-flex justify-content-between orderDisplay"
                    v-for="(topping, index) in item.toppings"
                    :key="index + Math.random()"
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
                      <span>{{ item.half1.sauce }}</span>
                      <span>0.00</span>
                    </div>
                    <div
                      class="d-flex justify-content-between"
                      v-for="(defTopping, index) in item.half1.defaultToppings"
                      :key="index + Math.random()"
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
                      v-for="(topping, index) in item.half1.toppings"
                      :key="index + Math.random()"
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
                      <span>{{ item.half2.sauce }}</span>
                      <span>0.00</span>
                    </div>
                    <div
                      class="d-flex justify-content-between"
                      v-for="(defTopping, index) in item.half2.defaultToppings"
                      :key="index + Math.random()"
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
                      v-for="(topping, index) in item.half2.toppings"
                      :key="index + Math.random()"
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
                <strong>Total Price: {{ order.order_data.totalPrice }}</strong>
              </div>
              <div class="cardPrice">
                <strong >Total Due: {{ order.totalDue }}</strong>
              </div>
              <v-list-item-title class="headline cardStyle mb-1">{{
                order.customer.address
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions v-if="order.status == 1 && order.opay_status != 'error' && order.opay_status != 'in_progress' ">
             <v-btn
              class="green mx-1"
              text
              small
              @click="acceptOrder(order, 20)"
            >
              20
            </v-btn>
             <v-btn
              class="green mx-1"
              text
              small
              @click="acceptOrder(order, 30)"
            >
              30
            </v-btn>
             <v-btn
              class="green mx-1"
              text
              small
              @click="acceptOrder(order, 40)"
            >
              40
            </v-btn>
             <v-btn
              class="green mx-1"
              text
              small
              @click="acceptOrder(order, 60)"
            >
              60
            </v-btn>
             <v-btn
              class="green mx-1"
              text
              small
              @click="acceptOrder(order, 80)"
            >
              80
            </v-btn>
          </v-card-actions>
          <span v-if="order.status == 1">
            <v-btn
              class="red"
              text
              @click="openDialog(order)"
            >
              Reject/Transfer
            </v-btn>
          </span> 
          <v-card-actions v-if="order.status == 2 || order.status == 3 || order.status == 4">

              Prepareing Kitchen

            <v-spacer></v-spacer>
            <v-btn
              class="aqua"
              text
              x-large
              @click="boxPizza(order)"
            >
              Ready
            </v-btn>
          </v-card-actions>

          <v-card-actions v-if="order.status == 5">

              Waiting For Customer

            <v-spacer></v-spacer>
            <v-btn
              class="lightGreen"
              text
              x-large
              @click="customerDelivery(order)"
            >
              Ready
            </v-btn>
          </v-card-actions>
        </v-card>
      </span>
      
    </span>
    <!-- Reject Order Dialog -->
    <v-dialog
        v-model="rejectDialog"
        max-width="1200px"
      >
      <v-tabs
      v-model="tab"
      grow
      dark
    >
      <v-tab>Reject Order</v-tab>
      <v-tab>Transfer Order</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
      >
        <v-card height="500px">
          <v-card-title>
            <span class="headline">Reject Order</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  v-for="(reject, index) in rejectCases" :key="index"
                  @click="activeCase = reject.id"
                  :class="activeCase == reject.id ? 'active' : ''"
                  cols="4"
                  sm="4"
                  md="4"
                >
                <h1>{{ reject.status_name }}</h1>
                <h3>
                  {{ reject.txt_ka }}
                  {{ reject.txt_en }}
                </h3> 
                </v-col>
                <!-- <v-col
                  @click="activeCase = 2"
                  :class="activeCase == 2 ? 'active' : ''"
                  cols="4"
                  sm="4"
                  md="4"
                >
                <h1>CASE 2</h1>
                <h3>
                  ბოდიშს გიხდით, დიდი დატვირთვის გამო ვერ შევძლებთ მომსახურებას.
                  We are sorry, but due to high demand we cannot fulfill your order at this time.
                </h3>
                </v-col> -->
                <v-col
                  @click="activeCase = 0"
                  :class="activeCase == 0 ? 'active' : ''"
                  cols="4"
                  sm="4"
                  md="4"
                > 
                <h1>CUSTOM CASE</h1>
                  <v-textarea
                    v-model="rejectCustom"
                    name="custom-case"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn
              @click="rejectOrder()"
              x-large
              red
              >
              Reject Order
              </v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
      >
        <v-card height="500px">
          <v-card-title>
            <span class="headline">Transfer Order To</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
               <v-btn
                @click="selectedBranch = 3"
                :class="selectedBranch == 3 ? 'active' : ''"
                class="mx-5"
                large
              >
                VAKE
              </v-btn>
               <v-btn
                @click="selectedBranch = 2"
                :class="selectedBranch == 2 ? 'active' : ''"
                class="mx-5"
                large
              >
                SABURTALO
              </v-btn>
               <v-btn
                @click="selectedBranch = 1"
                :class="selectedBranch == 1 ? 'active' : ''"
                class="mx-5"
                large
              >
                DIGOMI
              </v-btn>
               <v-btn
                @click="selectedBranch = 4"
                :class="selectedBranch == 4 ? 'active' : ''"
                class="mx-5"
                large
              >
                GLDANI
              </v-btn>
              </v-row>
              <v-btn @click="changeBranch()" class="my-5" large>Transfer Order</v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
      </v-dialog>

  </div>
  </v-app>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import axios from "axios";

export default {
  props: {
        orders: {
            type: Array,
            default: []
        },

    },
  data() {
    return {
      blockPrint: false,
      opayCheck: {status: ''},
      selectedBranch: null,
      activeCase: null,
      tab: null,
      rejectDialog: false,
      dialogOrder: {},
      rejectCustom: '',
      order_raw: [],
      prepOrder: [],
      TOKEN: "ntoI_TodKtEjTTqj8HBVGmQPE3gW5TFY",
      loggedUser: '',
      loggedUserFull: {},
      rejectCases:[],
    };
  },
  components: {
    // KTCodePreview
  },
  watch: {
    activeCase(val){
      // alert(val);
      console.log('active case: ' + val);
    },
  },
  mounted() {
    this.loggedUser = this.$store.state.auth.user.data;
    this.loggedUserFull = JSON.parse(localStorage.getItem("loggedUserData"));
    // alert(this.statusIndex);
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Vuetify", route: "alerts" },
      { title: "Cards" },
    ]);

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "sms/void-cases",
      })
      .then((response) => {
        this.rejectCases = response.data;
      });

    this.getOrderPrep();
  },
  computed: {
    localApiIP() {
      return this.$store.getters.getLocalApiURL;
    },
    filteredOrdersPos() {
      return this.prepOrder.filter((x) => x.source === "pos");
    },
    filteredOrdersWoo() {
      return this.prepOrder.filter((x) => x.source === "woocommerce");
    },
    filteredOrdersLegacy() {
      return this.prepOrder.filter((x) => x.source === "Legacy");
    },
  },
  created () {
        this.timer = setInterval(this.getOrderPrep, 1000)
    },
  methods: {
    openDialog(order){
      this.rejectDialog = true;
      this.dialogOrder = order;
    },
    getOrderPrep() {
      this.prepOrder = this.orders;
    },

    updateStatus(status, orderId){
      var bodyFormData = new FormData();
      bodyFormData.set("order_status", status);
      bodyFormData.set("id", orderId);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "orders/change-status",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          console.log("Order Status Changed!", response);
          this.getOrderPrep();
          this.$forceUpdate();
        });
    },

    acceptOrder(order, min){
      this.blockPrint = true;
      var bodyFormData = new FormData();
      bodyFormData.set("order_id", order.id);
      bodyFormData.set("duration", min);
      bodyFormData.set("pos_id", this.loggedUser.pos_id);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "orders/accept-order",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          console.log("Order Accepted!", response);
          this.printOrder(order.id);
        });

        // this.printOrder(order.id);
    },
    checkOpayStatus(order){
      var bodyFormData = new FormData();
      bodyFormData.set("order_id", order.opay_order_id);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "ipay/checkout-payment",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          console.log("Check Opay Status!", response);
          this.opayCheck = response.data;
        });

        // this.printOrder(order.id);
    },
    printOrder(orderID){
      // alert("BLA");
      const TOKEN = localStorage.getItem("TOKEN");
      var bodyFormData = new FormData();
      bodyFormData.set("id", orderID);
      axios.request({
        method: "post",
        url:
          this.localApiIP + "orders/print",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyFormData,
      }).then((response) => {
          if(response.data.is_error){
            alert("Error Printing Order");
            this.printError = true;
          }
          else{
            this.printError = false;
            console.log("Order Response", response);
          }
      });
    },
    rejectOrder(){
      if(this.activeCase != null) {
        var bodyFormData = new FormData();
        bodyFormData.set("order_id", this.dialogOrder.id);
        bodyFormData.set("case_id", this.activeCase);
        bodyFormData.set("text", this.rejectCustom);
        axios
          .request({
            method: "post",
            url:
              this.$hostname + "orders/void-web-order",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
            if(response.status == 200){
              this.rejectDialog = false;
              console.log("Order Rejectred!", response);
            }
          });
      } else {
        alert('Choose Rejection Case!');
      }

    },
    changeBranch(){
      var bodyFormData = new FormData();
      bodyFormData.set("order_id", this.dialogOrder.id);
      bodyFormData.set("branch_id", this.selectedBranch);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "orders/change-branch",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          if(response.status == 200){
            this.rejectDialog = false;
            console.log("Branch Changed!", response);
          }
        });
    },
    kitchenReject(order){
      if(order.opay_order_id != null){
      // alert('OPAY');
      console.log(order.opay_order_id);
      // alert(order.opay_order_id);
      var bodyFormData = new FormData();
      bodyFormData.set("order_id", order.opay_order_id);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "ipay/cancel-payment",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          console.log("Order Rejected!", response);
        });
      }

      this.voidOrder(order.id);
    },
    baker1Done(order){
      this.updateStatus('prepearing', order.id);
    },
    baker2Done(order){
      this.updateStatus('finished_bake', order.id);
    },
    boxPizza(order){
      this.updateStatus('ready', order.id);
    },
    customerDelivery(order){
      this.updateStatus('Finished', order.id);
    },
    voidOrder(id){

          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("pos_id", this.loggedUserFull.pos_id);
          bodyFormData.set("id", id);

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
              }
              else{
                console.log("Order Status Changed Correctly", response);
              }
          });

          this.getOrderPrep();
          this.$forceUpdate();
        },

  },
};
</script>
