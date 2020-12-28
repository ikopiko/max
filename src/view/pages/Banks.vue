<script>
/* eslint-disable */
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-12">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:50%">
                                    <h3>Safe</h3>
                                </td>
                                <td style="width:50%; text-align:right">
                                  <i class="material-icons md-36" @click="addSafe()" v-if="safes.length === 0">add</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <v-card v-for="safe in safes" :key="safe" @click="safeFormDialog = true;"
                        class="mx-auto my-3" color="#BAE1BE" light max-width="400">
                        <v-card-title>
                            <span class="title font-weight-bold">{{ safe.safe_balance[0].amount }} ₾</span>
                        </v-card-title>

                        <!-- <v-card-text class="headline font-weight-bold">
                            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                        </v-card-text> -->

                        <v-card-actions>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <i class="material-icons md-36">
                                        face
                                    </i>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{ safe.branch }}</v-list-item-title>
                                </v-list-item-content>
                                <v-row align="center" justify="end">
                                    <i class="material-icons md-36">
                                        alarm
                                    </i>
                                    <span class="subheading mr-2">21:55</span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
            </div>
            <!-- End of safe -->
            <div class="col-lg-4 col-md-12">
                     <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:50%">
                                    <h3>POS</h3>
                                </td>
                                <td style="width:50%; text-align:right">
                                  <i class="material-icons md-36" @click="addTill()">add</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <v-card v-for="till in tills" :key="till.id"  
                        class="mx-auto my-3" color="#FE9A53" light max-width="400">
                        <v-card-title>
                            <span class="title font-weight-bold" v-if="till.amount < 300">{{ till.amount }} ₾ - {{ till.name }}</span>
                            <span class="title font-weight-bold" v-if="till.amount >= 300"><span style="color: red;" v-if="till.amount >= 300">DROP NEEDED {{ till.amount }} ₾</span>  - {{ till.name }}</span>
                        </v-card-title>

                        <v-card-actions>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3" @click="tillFoo(till)">
                                    <i class="material-icons md-36">
                                        face
                                    </i>
                                </v-list-item-avatar>
                               
                                <v-list-item-content>
                                    <v-list-item-title>{{ till.name }} - {{ till.branch_name }}</v-list-item-title>
                                </v-list-item-content>
                                <v-row align="center" justify="end">
                                    <i class="material-icons md-36">
                                        alarm
                                    </i>
                                    <span class="subheading mr-2">21:55</span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>

                        <v-expand-transition v-if="posID === till.poses_id">
                            <v-card
                              v-if="tillFormDialog"
                              light max-width="400"
                              class="transition-fast-in-fast-out v-card--reveal"
                              style="height: 100%;"
                            >
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                      <v-text-field
                                        v-model="posAmount"
                                        label="Amount"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      sm="12"
                                      md="8"
                                    >
                                      <v-text-field
                                        label="Optional Comment"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                      <v-btn
                                        elevation="2"
                                        x-large
                                        color="grey"
                                        class="white--text"
                                        @click="tillFormDialog = false"
                                      >Close</v-btn>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                      <v-btn
                                        elevation="2"
                                        x-large
                                        class="white--text"
                                        color="green"
                                        @click="addToPos()"
                                      >ADD</v-btn>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                      <v-btn
                                        elevation="2"
                                        color="blue"
                                        x-large
                                        class="white--text"
                                        @click="dropFromPos()"
                                      >DROP</v-btn>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                            </v-card>
                          </v-expand-transition>
                    </v-card>
                </div>
                <!-- End of Tills -->
                <div class="col-lg-4 col-md-12">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:50%">
                                    <h3>Drivers</h3>
                                </td>
                                <td style="width:50%; text-align:right">
                                    <i class="material-icons md-36" @click="addDriver()">add</i>
                                    <span class="mdi mdi-plus-thick"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <v-card class="mx-auto mt-30" color="#F1F1F1" light max-width="400">

                        <v-card-title>
                            <span class="title font-weight-bold">- ₾</span>
                        </v-card-title>
                        <v-card-text>
                            <!-- <v-card-title>Choose Drivers</v-card-title> -->

                            <v-form>
                                <v-select :items="safes.name" :rules="[v => !!v || 'Driver Not Selected First']" label="Select Driver First" required></v-select>

                                <v-text-field label="Enter Amount" v-model="example" :rules="exampleRules"></v-text-field>

                                <v-textarea clearable label="Comment" value="" hint="Some comment"></v-textarea>
                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                                    ADD
                                </v-btn>
                            </v-form>
                           
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-icon class="mr-1">
                                        mdi-badge-account-horizontal-outline
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Selected Driver Name</v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                            <v-list-item class="grow">
                              <v-list-item-avatar color="grey darken-3">
                                <v-icon class="mr-1">
                                    mdi-clock-time-seven-outline
                                </v-icon>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title></v-list-item-title>16:01
                              </v-list-item-content>
                              <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                                <v-chip>5:30PM</v-chip>

                                <v-chip class="back_drop">7:30PM</v-chip>

                            </v-chip-group>
                            </v-list-item>

                        </v-card-text>

                        <v-card-actions>

                        </v-card-actions>
                    </v-card>

                </div>
                <!-- End of Dirvers -->
        </div>
      </div>
      
      <v-dialog
        v-model="safeDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Manager -> Safe</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  Irakli Andguladze
                  <br />
                  127 ₾
                  <br />
                  Didid Digomi
                  <br />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="8"
                >
                <v-autocomplete
                  :items="driverList"
                  :filter="customFilter"
                  color="white"
                  item-text="username"
                  label="Manager"
                ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Amount"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                >
                  <v-text-field
                    label="Optional Comment"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    color="grey"
                    class="white--text"
                    @click="safeDialog = false"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                  >ADD</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                  >DROP</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="safeFormDialog"
        @keydown.esc="safeFormDialog = false"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Safe</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Amount"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                >
                  <v-text-field
                    label="Optional Comment"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    color="grey"
                    class="white--text"
                    @click="safeFormDialog = false"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                    @click="addToSafe()"
                  >ADD</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                    @click="dropFromSafe()"
                  >DROP</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="tillFormDialog1"
        @keydown.esc="tillFormDialog = false"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Till</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="posAmount"
                    label="Amount"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                >
                  <v-text-field
                    label="Optional Comment"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    color="grey"
                    class="white--text"
                    @click="tillFormDialog = false"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                    @click="addToPos()"
                  >ADD</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                    @click="dropFromPos()"
                  >DROP</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      
      <v-dialog
        v-model="tillDialog"
        @keydown.esc="tillDialog = false"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Till -> Cashier</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form>
                  <v-select :items="allPoses" item-text="name" item-value="id" v-model="selectedPos" :rules="[v => !!v || 'Driver Not Selected First']" label="Select POS First" required></v-select>

                  <v-text-field label="Enter Amount" v-model="posAmount" :rules="exampleRules"></v-text-field>

                  <v-text-field clearable label="Comment" v-model="posComment" value="" hint="Some comment"></v-text-field>
                </v-form>
              </v-row>

              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    color="grey"
                    class="white--text"
                    @click="tillDialog = false"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                    @click="addToPos()"
                  >ADD</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      
      <v-dialog
        v-model="tillDialog1"
        persistent
        max-width="600px"
      >
        <v-card class="mx-auto mt-30" color="#F1F1F1" light max-width="400">

                        <v-card-title>
                            <span class="title font-weight-bold">- ₾</span>
                        </v-card-title>
                        <v-card-text>
                            <!-- <v-card-title>Choose Drivers</v-card-title> -->

                            <v-form>
                                <v-select :items="items" :rules="[v => !!v || 'Driver Not Selected First']" label="Select Driver First" required></v-select>

                                <v-text-field label="Enter Amount" v-model="example" :rules="exampleRules"></v-text-field>

                                <v-textarea clearable label="Comment" value="" hint="Some comment"></v-textarea>
                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                                    ADD
                                </v-btn>
                            </v-form>
                           
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-icon class="mr-1">
                                        mdi-badge-account-horizontal-outline
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Selected Driver Name</v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-icon class="mr-1">
                                        mdi-clock-time-seven-outline
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title></v-list-item-title>16:01
                                </v-list-item-content>
 <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                                <v-chip>5:30PM</v-chip>

                                <v-chip class="back_drop">7:30PM</v-chip>

                            </v-chip-group>
                            </v-list-item>

                        </v-card-text>

                        <v-card-actions>

                        </v-card-actions>
                    </v-card>
      </v-dialog>

      <v-dialog
        v-model="driverDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Driver</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  Irakli Andguladze
                  <br />
                  127 ₾
                  <br />
                  Didi Digomi
                  <br />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="8"
                >
                <v-autocomplete
                  :items="driverList"
                  :filter="customFilter"
                  color="white"
                  item-text="username"
                  label="Manager"
                ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Amount"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                >
                  <v-text-field
                    label="Optional Comment"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    color="grey"
                    class="white--text"
                    @click="driverDialog = false"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                  >ADD</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                  >DROP</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      
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
      posID: '',
      selectedPos: [],
      posAmount: 0,
      posComment: '',
      safeAmount: 0,
      safeComment: '',
      safeFormDialog: false,
      tillFormDialog: false,
      safe: {
        name : 'Safe 1',
        manager: 'Irakli Andguladze',
        balance: 2067,
      },
      safes: [],
      till: { 
        name : 'Till 1',
        cashier: 'Irakli Andguladze',
        balance: 458 
      },
      tills: [],
      allPoses: [],
      driver: { 
        name : 'Driver 1',
        driverName: 'Irakli Andguladze',
        balance: 87
      },
      drivers: [],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        valid: true,
        name: '',
        amountRules: [
            v => !!v || 'Emount not entered',
        ],
        exampleRules: [
            v => !!v || "Emount can't be blank",
            v => (v && v >= 0) || "Loan should be above 0",
            v => (v && v <= 500) || "Max should not be above 500",
        ],
      e6: 1,
      loggedUser: {},
      orders: [],
      old: false,
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
      items1: [
        { text: 'Pos Default Balance', icon: 'fact_check' },
        { text: 'Driver Default Balance', icon: 'moped' },
      ],
      defaultBalance: [
        { balance: 'pos', amount: 150 },
        { balance: 'driver', amount: 40 },
      ],
      driverList: [],
      //driver: [],
      loading: true,
      options: {},
      branch: 'saburtalo',
      branchId: 1,
      status: 4,
      today: '', 
      safeDate: '2020-12-22',
      driverLoad: true,
      safeDialog: false,    
      tillDialog: false,    
      driverDialog: false,    
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

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    

    this.today = yyyy + '-' + mm + '-' + dd;

    this.loggedUser = this.$store.state.auth.user.data;

      const TOKEN = this.loggedUser.token;
      this.getSafes();

      this.getPoses();

      var bodyFormPosAll = new FormData();
      bodyFormPosAll.set("branch_id", this.branchId);

    axios
      .request({
        method: "post",
        url:
          "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/poses/list-by-branch",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyFormPosAll,
      })
      .then((response) => {
        this.allPoses = response.data.data;
        console.log("All POS List: ", this.allPoses);
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
    getSafes(){
      const TOKEN = this.loggedUser.token;
      var bodyFormSafe = new FormData();
      bodyFormSafe.set("branch_id", this.branchId);
      bodyFormSafe.set("day", this.today);

      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/poses/get-safes",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormSafe,
        })
        .then((response) => {
          this.safes = response.data.data;
          console.log("Safe List: ", this.safes);
        });
    },
    getPoses(){
      const TOKEN = this.loggedUser.token;
      var bodyFormPos = new FormData();
      bodyFormPos.set("branch_id", this.branchId);
      bodyFormPos.set("day", this.today);

      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/poses/get-poses",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormPos,
        })
        .then((response) => {
          this.tills = response.data.data;

          console.log("POS List: ", this.tills);
        });
    },
    addToPos(){
      console.log('Selected POS: ', this.selectedPos);
      console.log('POS Amount: ', this.posAmount);
      console.log('POS Comment: ', this.posComment);
      alert('Balance Added To POS');
    },
    dropFromPos(){

      //this.posAmount = -Math.abs(this.posAmount);
      //alert(this.posAmount)

      const TOKEN = this.loggedUser.token;
      var bodyDropSafe = new FormData();
      console.log(this.posID);
      console.log(this.safes[0].id);
      console.log(this.posAmount);
      bodyDropSafe.set("pos_id", this.posID);
      bodyDropSafe.set("amount", this.posAmount);
      bodyDropSafe.set("safe_id", this.safes[0].id);

      axios
        .request({
          method: "post",
          url:
            "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/poses/add-balance-to-safe",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyDropSafe,
        })
        .then((response) => {
          
          console.log("Balance Change Response:  ", response);
          this.tillFormDialog = false;
          this.getSafes();
          this.getPoses();
          this.posAmount = 0;
        });

    },
    addToSafe(){
      alert('Balance Added To Safe');
    },
    dropFromSafe(){
      alert("Balance Droped From Safe");
    },
    addSafe() {
      this.safeDialog = true;
      // this.safes.push(this.safe);
    },
    addTill() {
      this.tillDialog = true;
      // this.tills.push(this.till);
    },
    addDriver() {
      this.driverDialog = true;
      this.drivers.push(this.driver);
    },
    tillFoo(pos){
      this.tillFormDialog = true;
      this.posID = pos.poses_id;
    },
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
              "https://max.ronnyspizza.ge/ronny/rest/web/index.php?r=v1/manager/add-balance-to-driver",
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
