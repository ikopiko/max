<script>
/* eslint-disable */
</script>
<template>
  <div class="row">
    <span v-for="order in prepOrder" :key="order.id">

      <span v-if="order.source === 'pos'">    
        <v-card
          class="mx-3 cardStyle"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                #{{ order.order_id }}
                <div style="float: right; text-align: right">
                  {{ order.date }}
                </div>
              </div>
              <v-list-item-title class="headline cardStyle mb-1">{{ order.order_data.customer.name }}</v-list-item-title>
              <v-list-item-title class="headline mb-1">{{ order.order_data.customer.email }}</v-list-item-title>
              <v-list-item-title class="headline mb-1"
                >{{ order.order_data.customer.tel }}
                {{ order.order_data.customer.adress }}</v-list-item-title
              >
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
                      {{ (item.price * item.qty).toFixed(2) }}
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
                      <span>{{ item.half1.sauce }}</span>
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
                      <span>{{ item.half2.sauce }}</span>
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

          <v-card-actions v-if="order.status == 1">

            Waiting For Kitchen

            <v-spacer></v-spacer>
            
            <v-btn
              class="green"
              text
              x-large
              @click="kitchenDone(order)"
            >
              Ready
            </v-btn>
            <!-- <b-button variant="success" @click="kitchenDone(order)">Ready</b-button> -->
          </v-card-actions>

          <!-- <v-card-actions v-if="order.status == 2">
            
              Waiting For Baker 1

            <v-spacer></v-spacer>
            <v-btn
              class="purple"
              text
              x-large
              @click="baker1Done(order)"
            >
              Ready
            </v-btn>
            
          </v-card-actions>

          <v-card-actions v-if="order.status == 3">

              Waiting For Baker 2

            <v-spacer></v-spacer>

            <v-btn
              class="yellow"
              text
              x-large
              @click="baker2Done(order)"
            >
              Ready
            </v-btn>
          </v-card-actions> -->

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
  </div>
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
      order_raw: [],
      prepOrder: [],
      branch: "saburtalo",
      TOKEN: "ntoI_TodKtEjTTqj8HBVGmQPE3gW5TFY",
    };
  },
  components: {
    // KTCodePreview
  },
  mounted() {
    // alert(this.statusIndex);
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Vuetify", route: "alerts" },
      { title: "Cards" },
    ]);

    this.getOrderPrep();
  },
  computed: {
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
        this.timer = setInterval(this.getOrderPrep, 1500)
    },
  methods: {
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

    kitchenDone(order){
      this.updateStatus('in_kitchen', order.id);
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

  },
};
</script>
