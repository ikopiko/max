<script>
/* eslint-disable */
</script>

<template>
    <div>
        <v-btn
            class="ma-3"
            dark
            @click="goBack()"
        >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
        </v-btn>
        
        <span v-if="order.source === 'pos'">    
            <v-card
            class="my-3 mx-3 cardStyle"
            max-width="344"
            outlined
            >
            <v-list-item three-line>
                <v-list-item-content>
                <div class="overline mb-4">
                    # {{ order.orderId }}
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
    </div>

</template>

<script>
export default {
    name: 'Single Order',
    data(){
        return {
            order: [],
        }
    },
    props: {
      orderProp: {
          type: Object,
      },

  },
    mounted() {
        console.log('Single Order: ', this.orderProp);
        this.order = this.orderProp;
    },
    methods: {
        goBack(){
             this.$router.go(-1);
        },
    },
}
</script>