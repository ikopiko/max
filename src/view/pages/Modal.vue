<script>
/* eslint-disable */
</script>
<template>
<div class="container" data-app>
    <!-- FIRST ROW -->
    <div class="row">
        <div class="col-6 bg-light">
            <div class="row">
                <div class="row">
                    <div class="col-12">
                        {{ dates[0] }} - {{ dates[1] }}
                    </div>
                </div>

                <div class="col-12">
                    <v-date-picker v-model="dates" range></v-date-picker>
                </div>
            </div>

        </div>
        <div class="col-6">
            <div class="row">
                <div class="col-12 mt-5">
                    <v-autocomplete v-model="values" :items="items" outlined dense chips small-chips label="Outlined" multiple></v-autocomplete>
                </div>
            </div>

            <div class="row">
                <div class="col-12 my-5">
                    <v-list flat subheader three-line>
                        <v-subheader>Filters</v-subheader>

                        <v-list-item-group v-model="settings" multiple active-class="">
                            <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                        <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>Order Number</v-list-item-title>
                                        <v-list-item-subtitle>Filter By Order Number</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                        <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>Customer</v-list-item-title>
                                        <v-list-item-subtitle>Filter By Customer Name, Phne Number and Email</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                        <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-autocomplete v-model="selectBranches" :items="branches" label="Branches" multiple>
                                    </v-autocomplete>
                                </template>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                </div>
            </div>
        </div>

    </div>

    <v-footer padless>
        <v-row justify="center" no-gutters>

            <div class="mx-2">
                <v-btn color="error" dark x-large>
                    Open
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn color="error" dark x-large>
                    Pending Payments
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn color="error" dark x-large>
                    Open And Pending
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn color="error" dark x-large>
                    Future
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn color="error" dark x-large>
                    Voids
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn color="error" dark x-large>
                    Discards
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn color="success" dark x-large @click="sendData">
                    OK
                </v-btn>
            </div>

        </v-row>
    </v-footer>
</div>
</template>

<script>
  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
  import Vue from "vue";

  Vue.use(BootstrapVue);
  Vue.use(IconsPlugin);

  export default {
    name: 'SearchFilters',
    props: {
      ordersProp: {
          type: Array,
          default: []
      },

  },
    data() {
      return {
        items: ['Irakli Andguladze', 'Levan Andguladze', 'Levan Gobronidze', 'Eric Binder'],
        values: [],
        value: null,
        dates: [],
        fromDate: Date,
        filteredOrders: [],
        ordersFromAPI: [],
        branchFilterActive: false,
        toDate: Date,
        settings: [],
        branches: [
            'saburtalo',
            'vake',
            'digomi',
            'gldani'
        ],
        selectBranches: [],
    }
  },
  methods: {
        sendData(){
          if(this.settings.includes(2)) {
             this.dateFilter();
          }

          if(this.dates.length === 1){
              alert('Dates Filter Single');
          }

        if(this.dates.length === 2){
            this.dateFilter();
        }

          this.$emit('filteredData', this.filteredOrders);
          this.$emit('closeModal');
      },

        dateFilter () {
                const dates = this.dates.map(x => new Date(x).getTime());
                this.filteredOrders = this.ordersFromAPI.filter((x) => {
                const orderDate = new Date(x.created_at.substr(0, 10)).getTime();
                return (orderDate > dates[0] && orderDate < dates[1]);
            });   
        },
        branchFilter() {
            this.filteredOrders = this.ordersFromAPI.filter((x) => this.selectBranches.includes(x.branch));
        },
  },
  mounted() {
      this.ordersProp.forEach(x => {
        //   x.created_at = Date(x.created_at);
      });
      this.dates.forEach(x => {
          x = Date(x);
      });
      this.ordersFromAPI = this.ordersProp;
  },
  computed: {
      dateRangeText() {
        this.fromDate = new Date(this.dates[0]);
        this.toDate = new Date(this.dates[1]);
        return this.dates.join(' ~ ')
      },

      dataCheck(){
          if(this.ordersFromAPI.length === 0) {
              this.ordersFromAPI = this.ordersProp;
          }
      },  

      customerFilter(){
        return this.ordersProp.filter((x) => x.created_at.getTime() >= this.fromDate);
      },
    },
}
</script>
