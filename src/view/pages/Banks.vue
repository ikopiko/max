<script>
/* eslint-disable */
</script>
<template>
  <div id="app">
    <v-app id="inspire">

      <div class="container">
        <div class="row">
          <div class="col-3">
            <v-autocomplete
            
              :items="driverList"
              :filter="customFilter"
              color="white"
              item-text="username"
              label="Users"
            ></v-autocomplete>
            <v-list
                style="max-height: 400px"
                class="overflow-y-auto"
                flat
                subheader
                three-line
                >
                <v-subheader>Avialable Drivers</v-subheader>

                <v-skeleton-loader
                  v-if="driverLoad"
                  type="card-avatar, article, actions"
                ></v-skeleton-loader>
                
                <v-list-item-group
                    v-if="!driverLoad"
                    v-model="driverIndex"
                    single
                    active-class=""
                >
                    <v-list-item v-for="driver in driverList" :key="driver.id">
                    <template v-slot:default="{ active }">
                        <v-list-item-action>
                        <v-checkbox :input-value="active" :label="driver.username" ></v-checkbox>
                        </v-list-item-action>
                    </template>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
          </div>
          <div class="col-6">
             <v-text-field
                v-model="balance"
                @keypress="onlyNumber"
                :counter="10"
                :key="balance"
                class="col-4"
                label="Balance Ammount"
                required
              ></v-text-field>

              <template>

                  <v-list shaped max-width="300px">
                    <v-subheader>Select Default Balance</v-subheader>
                    <v-list-item-group
                      v-model="selectedItem"
                      color="primary"
                    >
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="setVal()"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
              </template>
          </div>
          <div class="col-2">
            {{ filteredDriver }} - {{ balance }}

            <div class="my-2">
                <v-btn
                color="error"
                dark
                x-large
                @click="addBalance()"
                >
                Add Balance
                </v-btn>
            </div>
          </div>
        </div>
      </div>
            

        <!-- <div class="mx-2">
          <v-btn
            color="primary"
            class="ma-2"
            dark
            @click="dialog = true"
          >
            Search Filters
          </v-btn>
        </div> -->
        

      <!-- Order Search Modal  -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card>
          <v-card-title>
            <span>Banks & Tills</span>
            <v-spacer></v-spacer>
          </v-card-title>  

            <v-list
                style="max-height: 400px"
                class="overflow-y-auto"
                flat
                subheader
                three-line
                >
                <v-subheader>Avialable Drivers</v-subheader>

                <v-skeleton-loader
                  v-if="driverLoad"
                  type="card-avatar, article, actions"
                ></v-skeleton-loader>
                
                <v-list-item-group
                    v-if="!driverLoad"
                    v-model="driverIndex"
                    single
                    active-class=""
                >
                    <v-list-item v-for="driver in driverList" :key="driver.id">
                    <template v-slot:default="{ active }">
                        <v-list-item-action>
                        <v-checkbox :input-value="active" :label="driver.username" ></v-checkbox>
                        </v-list-item-action>
                    </template>
                    </v-list-item>

                </v-list-item-group>
            </v-list>

            <v-text-field>123</v-text-field>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End of Order Search Modal  -->

      
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import orderModal from  "../pages/Modal";
import axios from "axios";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      loggedUser: {},
      orders: [],
      singleSelect: true,
      selected: [],
      search: '',
      driverIndex: -1,
      balance: '',
      // balanceRules: [
      //   v => !!v || 'Balance is required',
      //   v => (v && v.length <= 10) || 'Balance must be number',
      // ],
      selectedItem: -1,
      items: [
        { text: 'Pos Default Balance', icon: 'fact_check' },
        { text: 'Driver Default Balance', icon: 'moped' },
      ],
      defaultBalance: [
        { balance: 'pos', amount: 150 },
        { balance: 'driver', amount: 40 },
      ],
      driverList: [],
      driver: [],
      loading: true,
      options: {},
      branch: 'saburtalo',
      status: 4,
      driverLoad: true,
      dialog: false,    
      dialog2: false,
      dialog3: false,
      notifications: false,
      sound: true,
      widgets: false,
      page: 0,
      pageCount: 0,
      itemsPerPage: 5,
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
    };
  },
  components: {
    orderModal
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
       if (vm.$store.state.auth.user.data.role === "admin") {
         vm.$router.push({name: "banks"});
       }
       else {
         vm.$router.push({name: "dashboard"});
       }
    });
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
          "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/driver/list",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyFormData,
      })
      .then((response) => {
        this.driverList = response.data.data;
        this.driverLoad = false;
        console.log("Driver List: ", response.data.data);
      });
  },
  computed: {
      filteredOrdersPos() {
      this.orders.forEach(x => {
          x.order_data = JSON.parse(x.order_data);
      });
      return this.orders.filter((x) => x.source === "pos" && x.order_data.deliveryMethod === 'Delivery');
    },
      filteredOrdersLegacy() {
      return this.orders.filter((x) => x.source === "Legacy");
    },
    selectedDefault() {
      if(this.selectedItem === -1){
        return 0;
      }
      else {
        this.balance =this.defaultBalance[this.selectedItem].amount;
        return this.balance;
      }
    },

    filteredDriver() {
        return this.driverList[this.driverIndex];
    },
  },
  methods: {
    setVal() {
      setTimeout(() => this.balance = this.defaultBalance[this.selectedItem].amount, 100)
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

    customFilter (item, queryText, itemText) {
        const textOne = item.username.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
      },

      onlyNumber (evt) {
        evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();         

          } else {  
            return true;
          }
      },

      addBalance() {
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        bodyFormData.set("driver_id", this.filteredDriver.id);
        bodyFormData.set("amount", this.balance);

        axios
          .request({
            method: "post",
            url:
              "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/manager/add-balance-to-driver",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
            console.log("added to API ");
          });
      },
  },
};
</script>
