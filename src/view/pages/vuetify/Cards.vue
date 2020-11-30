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
                #{{ order.orderId }}
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
                      v-if="item.sauce != 'original'"
                    >
                      <span>{{ item.sauce }} Sauce</span>
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
                    v-if="item.sauce != 'original'"
                  >
                    <span>{{ item.sauce }} Sauce</span>
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
                      v-if="item.half1.sauce != 'original'"
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
                      v-if="item.half2.sauce != 'original'"
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
      <span v-if="order.source === 'woocommerce'">
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
                  {{ order.created_at }}
                </div>
              </div>
              <v-list-item-title class="headline cardStyle mb-1"
                >{{ order.order_data.billing.first_name }}
                {{ order.order_data.billing.last_name }}</v-list-item-title
              >
              <v-list-item-title class="headline mb-1">{{
                order.order_data.billing.email
              }}</v-list-item-title>
              <v-list-item-title class="headline mb-1"
                >{{ order.order_data.billing.phone }}
                {{ order.order_data.billing.address_1 }}</v-list-item-title
              >
              <v-list-item-title class="headline mb-1 delivery"
                >Ronnys Delivery</v-list-item-title
              >
              <div
                class="row"
                v-for="(item, idx) in order.order_data.line_items"
                :key="idx"
              >
                <div class="col-12">
                  <div class="d-flex justify-content-between">
                    <span class="orderDisplay" @click="foobar(item)">
                      <strong
                        >{{ item.quantity }}
                        {{ item.name }}</strong
                      >
                    </span>
                    <span>
                      <!-- {{ (item.total.toFixed(2) * item.quantity) }}  -->
                      00.00
                      <!-- შეიძლება გააყლევოს -->
                    </span>
                  </div>
                </div>
              </div>
              <div class="cardPrice">
                <strong>{{ order.total }}</strong>
              </div>
              <v-list-item-title class="headline cardStyle mb-1">{{
                order.order_data.billing.address_1
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
      <span v-if="order.source === 'Legacy'">
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
                  {{ order.created_at }}
                </div>
              </div>
              <v-list-item-title class="headline cardStyle mb-1"
                >{{ order.order_data.client_first_name }}
                {{ order.order_data.client_last_name }}</v-list-item-title
              >
              <v-list-item-title class="headline mb-1">{{
                order.order_data.client_email
              }}</v-list-item-title>
              <v-list-item-title class="headline mb-1 break-word"
                >{{ order.order_data.client_phone }}
                {{ order.order_data.client_address }}</v-list-item-title
              >
              <v-list-item-title class="headline mb-1 delivery"
                >Ronnys Delivery</v-list-item-title
              >
              <div
                class="row"
                v-for="item in order.order_data.items"
                :key="item.id"
              >
                <div class="col-12">
                  <div class="d-flex justify-content-between">
                      <strong
                        >{{ item.quantity }} X
                        <!-- <span v-for="itemOption in item.options" :key="itemOption">
                          {{ itemOption.name }}
                        </span> -->
                        {{ item.name }}</strong
                      >
                    <span>
                      <!-- {{ (item.total.toFixed(2) * item.quantity) }}  -->
                      {{ item.total_item_price }}
                      <!-- შეიძლება გააყლევოს -->
                    </span>
                  </div>
                </div>
              </div>
              <div class="cardPrice">
                <strong>{{ order.total_price }}</strong>
              </div>
              <v-list-item-title class="headline cardStyle mb-1">{{
                order.order_data.client_address
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions v-if="statusIndex === 1">
            <v-btn
              color="orange lighten-2"
              text
            >
              Prepareing
            </v-btn>

            <v-spacer></v-spacer>

            <b-button variant="success" @click="baker1Done(order)">Ready</b-button>
          </v-card-actions>

          <v-card-actions v-if="statusIndex === 2">
            <v-btn
              color="orange lighten-2"
              text
            >
              Making
            </v-btn>

            <v-spacer></v-spacer>

            <b-button variant="success" @click="baker2Done(order)">Ready</b-button>
          </v-card-actions>

          <v-card-actions v-if="statusIndex === 3">
            <v-btn
              color="orange lighten-2"
              text
            >
              Bake
            </v-btn>

            <v-spacer></v-spacer>

            <b-button variant="success" @click="boxPizza(order)">BOX</b-button>
          </v-card-actions>

          <v-card-actions v-if="statusIndex === 4">
            <v-btn
              color="orange lighten-2"
              text
            >
              Box
            </v-btn>

            <v-spacer></v-spacer>

            <b-button variant="success" @click="customerDelivery(order)">Ready</b-button>
          </v-card-actions>
        </v-card>

      </span>

    </span>
  </div>
</template>



<script>
// import KTCodePreview from "@/view/content/CodePreview.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import axios from "axios";

export default {
  props: {
        statusIndex: {
            type: Number,
            default: -1
        },

    },
  data() {
    return {
      orders: [],
      order_raw: [],
      prepOrder: [],
      branch: "saburtalo",
      status: 1,
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
    loggedUser() {
      const user = this.$store.state.auth.user.first_name;
      return user;
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
        this.timer = setInterval(this.getOrderPrep, 20000)
    },
  methods: {
    getOrder() {
      var bodyFormData = new FormData();
      //alert(product.id);
      // alert(this.$store.getters.currentUser.data.first_name);
      // alert(this.$store.state.auth.user.data.first_name);
      bodyFormData.set("branch", this.branch);
      const TOKEN = this.TOKEN;
      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/manager/get-new-orders",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          //console.log('------', response.data.data);
          this.order_raw = response.data.data;
          this.order_raw.legacy[0].order_data = JSON.parse(
          this.order_raw.legacy[0].order_data
          );
          console.log("-------", this.order_raw.legacy[0].order_data);
        });
    },
    getOrderPrep() {
      var bodyFormData = new FormData();
      //alert(product.id);
      bodyFormData.set("branch", this.branch);
      bodyFormData.set("status", this.statusIndex);
      const TOKEN = this.TOKEN;
      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/manager/get-current-orders",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          // response.data.data[0].order_data = JSON.parse(
          //   response.data.data[0].order_data
          // );
          console.log('response', response);
          response.data.data.forEach((x, index) => {
            const first_char = response.data.data[index].order_data.charAt(0);
            const last_char = response.data.data[index].order_data.charAt(response.data.data[index].order_data.length -1);
            if(first_char === '[' && last_char === ']'){
              response.data.data[index].order_data = response.data.data[index].order_data.substring(1, response.data.data[index].order_data.length-1);  
            }
            response.data.data[index].order_data = JSON.parse(response.data.data[index].order_data);
          });
          console.log("------", response.data.data[0].order_data);

          this.prepOrder = response.data.data;
          console.log("prepOrder: ", this.prepOrder);
          //this.order_raw.legacy[0].order_data = JSON.parse(this.order_raw.legacy[0].order_data);
        });
    },

    updateStatus(status, orderId){
      var bodyFormData = new FormData();
      //alert(product.id);
      bodyFormData.set("branch", this.branch);
      bodyFormData.set("status", status);
      bodyFormData.set("order_id", orderId);
      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/manager/update-order-status",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          console.log("Order Status Changed!");
        });
    },

    baker1Done(order){
      this.updateStatus(2, order.id);
    },
    baker2Done(order){
      this.updateStatus(3, order.id);
    },
    boxPizza(order){
      this.updateStatus(4, order.id);
    },

  },
};
</script>
