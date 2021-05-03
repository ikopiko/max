<script>
/* eslint-disable */
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      

      <div class="container">
        <div class="row">
          <v-btn @click="banksDetail = true, updateDetails(date)">Banks History</v-btn>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-4">
                    
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:50%">
                                    <h3>Safe</h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <v-card v-for="safe in safes" :key="safe.id" @click="closeSafe()"
                        class="mx-auto my-3" color="#BAE1BE" light max-width="200">
                        <v-card-title>
                            <span class="title font-weight-bold">{{ safe.amount }} GEL</span>
                        </v-card-title>

                        <v-card-actions>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <i class="material-icons md-36" >
                                        face
                                    </i>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{ safe.branch }}</v-list-item-title>
                                </v-list-item-content>
                                <!-- <v-row align="center" justify="end">
                                    <i class="material-icons md-36">
                                        alarm
                                    </i>
                                    <span class="subheading mr-2">21:55</span>
                                </v-row> -->
                            </v-list-item>
                        </v-card-actions>

                      <v-expand-transition>
                        <v-card v-if="safeFormDialog">
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
                                    v-model="posAmount"
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
                      </v-expand-transition>
                    </v-card>
            </div>
            <!-- End of safe -->
            <div class="col-lg-4 col-md-4">
                     <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:50%">
                                    <h3>POS</h3>
                                </td>
                                <td style="width:50%; text-align:right" v-if="tillsCount == 0">
                                  <i class="material-icons md-36" @click="addTill()">add</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <v-card v-for="till in tills.current" :key="till.id"  
                        class=" my-3 cols" color="#FE9A53" light max-width="250" @click="tillInfo(till)">
                        <v-card-title>
                            <span class="title font-weight-bold" v-if="Number(till.cash) + Number(till.glovo_cash) < 650">{{ (Number(till.cash) + Number(till.card) + Number(till.glovo_cash)).toFixed(2) }} Gel - {{ till.name }}</span>
                            <span class="title font-weight-bold" v-if="Number(till.cash) + Number(till.glovo_cash) >= 650"><span style="color: red;">DROP NEEDED {{ (Number(till.cash) + Number(till.card) + Number(till.glovo_cash)).toFixed(2) }} Gel </span>  - {{ till.name }}</span>
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
                            </v-list-item>
                        </v-card-actions>
                    </v-card>

                    <v-card v-for="till in tills.unclose" :key="till.id"  
                        class=" my-3 cols" color="#FE3853" light max-width="250" @click="tillInfo(till)">
                        <v-card-title>
                            <span class="title font-weight-bold" v-if="Number(till.cash) + Number(till.glovo_cash) < 650">{{ (Number(till.cash) + Number(till.card) + Number(till.glovo_cash)).toFixed(2) }} Gel - {{ till.name }}</span>
                            <span class="title font-weight-bold" v-if="Number(till.cash) + Number(till.glovo_cash) >= 650"><span style="color: red;">DROP NEEDED {{ (Number(till.cash) + Number(till.card) + Number(till.glovo_cash)).toFixed(2) }} Gel </span>  - {{ till.name }}</span>
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
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </div>
                <!-- End of Tills -->
                <div class="col-lg-4 col-md-4">
                    <table style="width:100%">
                        <tbody>
                            <tr>
                                <td style="width:50%">
                                    <h3>Drivers</h3>
                                </td>
                                <td style="width:50%; text-align:right">
                                    <span class="mdi mdi-plus-thick"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span v-for="drv in drivers" :key="drv.id">
                      <v-card v-if="drv.closed == null" class="mx-auto my-3" color="#46BDF2" light max-width="250" @click="driverInfo(drv)">
                          <v-card-title>
                              <span class="title font-weight-bold" v-if="drv.amount < 200">{{ (Number(drv.amount) + Number(drv.card)).toFixed(2)  }}  - {{ drv.username }}</span>
                              <span class="title font-weight-bold" v-if="drv.amount >= 200"><span style="color: red;" >DROP NEEDED {{ (Number(drv.amount) + Number(drv.card)).toFixed(2) }} </span>  - {{ drv.username }}</span>
                          </v-card-title>

                          <v-card-actions>
                              <v-list-item class="grow">
                                
                                  <v-list-item-avatar color="grey darken-3">
                                      <i class="material-icons md-36">
                                          face
                                      </i>
                                  </v-list-item-avatar>
                                
                                  <!-- <v-row align="center" justify="end">
                                      <i class="material-icons md-36">
                                          alarm
                                      </i>
                                      <span class="subheading mr-2">21:55</span>
                                  </v-row> -->
                              </v-list-item>
                          </v-card-actions>

                          <v-expand-transition v-if="driverID === drv.id">
                              <v-card
                                v-if="driverFormDialog"
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
                                          v-model="driverAmount"
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
                                          @click="driverFormDialog = false"
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
                                          @click="addToDriver()"
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
                                          @click="dropFromDriver()"
                                        >DROP</v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                              </v-card>
                            </v-expand-transition>
                      </v-card>
                      <v-card v-if="drv.closed != null" class="mx-auto my-3" color="#EAE4D2" light max-width="250" @click="driverInfo(drv)">
                          <v-card-title>
                              <span class="title font-weight-bold" v-if="drv.amount < 200">{{ drv.amount }}  - {{ drv.username }}</span>
                              <span class="title font-weight-bold" v-if="drv.amount >= 200"><span style="color: red;" >DROP NEEDED {{ drv.amount }} </span>  - {{ till.name }}</span>
                          </v-card-title>

                          <v-card-actions>
                              <v-list-item class="grow">
                                
                                  <v-list-item-avatar color="grey darken-3">
                                      <i class="material-icons md-36">
                                          face
                                      </i>
                                  </v-list-item-avatar>
                                
                                  <!-- <v-row align="center" justify="end">
                                      <i class="material-icons md-36">
                                          alarm
                                      </i>
                                      <span class="subheading mr-2">21:55</span>
                                  </v-row> -->
                              </v-list-item>
                          </v-card-actions>

                          <v-expand-transition v-if="driverID === drv.id">
                              <v-card
                                v-if="driverFormDialog"
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
                                          v-model="driverAmount"
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
                                          @click="driverFormDialog = false"
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
                                          @click="addToDriver()"
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
                                          @click="dropFromDriver()"
                                        >DROP</v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                              </v-card>
                            </v-expand-transition>
                      </v-card>
                    </span>

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
        v-model="tillDialog"
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">ADD POS</span>
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
                    @click="addPos()"
                  >ADD</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
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

      <v-dialog
        v-model="safeCloseDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Close Day - Safe - {{ safes[0].amount }} GEL</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <span class="headline">Working Cash - {{ safes[0].default_amount }} GEL</span>
              </v-row>
              <v-row>
               <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Amount"
                  v-model="safeAmount"
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
              <v-row>
                <v-col
                  v-for="bank in banks"
                  :key="bank.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    x-large
                    class="white--text mx-5"
                    color="green"
                    @click="addToSafe(bank)"
                  >ADD FROM {{ bank.name }}</v-btn>
                </v-col>
              </v-row>

              <v-row class="my-5">
                <v-col
                  v-for="bank in banks"
                  :key="bank.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text mx-5"
                    @click="dropFromSafe(bank)"
                  >DROP TO {{ bank.name }}</v-btn>
                </v-col>
              </v-row>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="tillCloseDialog"
        max-width="700px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Close Day - {{ selectedPos.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="2" class="justify-end">&nbsp;</v-col>
                <v-col cols="4 h4">Cash: {{ (Number(selectedPos.cash) + Number(selectedPos.glovo_cash)).toFixed(2) }}</v-col>
                <v-col cols="6"><v-text-field label="Cash Amount * " v-model="cashActual"></v-text-field></v-col>
              </v-row>

              <v-row>
                <v-col cols="2">&nbsp;</v-col>
                <v-col cols="4 h4">Card: {{ (Number(selectedPos.card) + Number(selectedPos.glovo_card)).toFixed(2) }}</v-col>
                <v-col cols="6"><v-text-field label="Card Amount * " v-model="cardActual"></v-text-field></v-col>
              </v-row>  
              <v-row>
                <v-col cols="2">&nbsp;</v-col>
                <v-col cols="4 h4">Total: {{ (Number(selectedPos.card) + Number(selectedPos.cash) + Number(selectedPos.glovo_card) + Number(selectedPos.glovo_cash)).toFixed(2) }}</v-col>
                <v-col cols="6 h4">{{ Number(cashActual) + Number(cardActual) }}</v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col cols="2">&nbsp;</v-col>
                <v-col cols="4 h4">Glovo: {{ selectedPos.glovo }}</v-col>
                <v-col cols="6">&nbsp;</v-col>
              </v-row>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="4 h4">Glovo Cash: {{ selectedPos.glovo_cash }}</v-col>
                <v-col cols="6">&nbsp;</v-col>
              </v-row>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="4 h4">Glovo Card: {{ selectedPos.glovo_card }}</v-col>
                <v-col cols="6">&nbsp;</v-col>
              </v-row>
              <v-row>
                <v-col cols="2">&nbsp;</v-col>
                <v-col cols="4 h4">Wolt: {{ selectedPos.wolt_card }}</v-col>
                <v-col cols="6">&nbsp;</v-col>
              </v-row>
              <v-row>
                <v-col cols="2">&nbsp;</v-col>
                <v-col cols="4 h4">Daily Sales: {{ (Number(selectedPos.card) + Number(selectedPos.cash) + Number(selectedPos.glovo_card) + Number(selectedPos.glovo) + Number(selectedPos.wolt_card) + Number(selectedPos.glovo_cash)).toFixed(2) }}</v-col>
                <v-col cols="6">&nbsp;</v-col>
              </v-row>
              <v-row>
                <v-col cols="2">&nbsp;</v-col>
                <v-col cols="10">
                  <v-text-field label="Note if short or over" v-model="safeCloseComment"></v-text-field>
                </v-col>
              </v-row>
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
                    @click="reconcilePos()"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    v-if="tillsCount == 0"
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                    @click="addToPos()"
                  >ADD</v-btn>
                  <v-btn
                    v-if="tillsCount != 0"
                    disabled
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
                    v-if="tillsCount == 0"
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                    @click="dropFromPos()"
                  >DROP</v-btn>
                  <v-btn
                    v-if="tillsCount != 0"
                    disabled
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
        v-model="driverCloseDialog"
        max-width="700px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Close Day - {{ selectedDriver.username }}</span>
            <v-btn class="mx-5" @click="driverDetailsModal()"> Driver Details </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3" class="justify-end">&nbsp;</v-col>
                <v-col cols="3 h4">Cash: {{ selectedDriver.amount }}</v-col>
                <v-col cols="6"><v-text-field label="Cash Amount" v-model="driverCashActual"></v-text-field></v-col>
              </v-row>

              <v-row>
                <v-col cols="3">&nbsp;</v-col>
                <v-col cols="3 h4">Card: {{ selectedDriver.card }}</v-col>
                <v-col cols="6"><v-text-field label="Card Amount" v-model="driverCardActual"></v-text-field></v-col>
              </v-row>  
              <v-row>
                <v-col cols="3">&nbsp;</v-col>
                <v-col cols="3 h4">Total: {{ (Number(selectedDriver.amount) + Number(selectedDriver.card)).toFixed(2) }}</v-col>
                <v-col cols="6 h4">{{ Number(driverCashActual) + Number(driverCardActual) }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">&nbsp;</v-col>
                <v-col cols="9">
                  <v-text-field label="Note if short or over" v-model="driverCloseComment"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="driverAmount"
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
                    v-if="selectedDriver.closed == null"
                    elevation="2"
                    x-large
                    color="grey"
                    class="white--text"
                    @click="reconcileDriver()"
                  >Close</v-btn>
                  <v-btn
                    v-if="selectedDriver.closed != null"
                    elevation="2"
                    x-large
                    disabled
                    color="grey"
                    class="white--text"
                    @click="reconcileDriver()"
                  >Close</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    v-if="selectedDriver.closed == null"
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                    @click="addToDriver()"
                  >ADD</v-btn>
                  <v-btn
                    v-if="selectedDriver.closed != null"
                    disabled
                    elevation="2"
                    x-large
                    class="white--text"
                    color="green"
                    @click="addToDriver()"
                  >ADD</v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    v-if="selectedDriver.closed == null"
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                    @click="dropFromDriver()"
                  >DROP</v-btn>
                  <v-btn
                    v-if="selectedDriver.closed != null"
                    disabled
                    elevation="2"
                    color="blue"
                    x-large
                    class="white--text"
                    @click="dropFromDriver()"
                  >DROP</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="banksDetail"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Banks Details</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2">
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
                      v-model="date"
                      label="Select Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="8">

                <v-tabs
                  v-model="tab"
                  fixed-tabs
                  background-color="black"
                  dark      
                >
                  <v-tab
                      v-for="item in items"
                      :key="item.tab"
                      @click="getTab(item)"
                  >
                      {{ item.tab }}
                  </v-tab>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <export-excel
                      :data = "detailedInfo"
                      :name = "'closeDetails.xls'" >
                      Download Data
                      <span class="material-icons">
                        get_app
                      </span>
                  </export-excel>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            Difference
                          </th>
                          <th class="text-left">
                            Comment
                          </th>
                          <th class="text-left">
                            Close Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in detailedInfo"
                          :key="item.id"
                        >
                          <td v-if="item.driver_id == 0">{{ item.pos_name }}</td>
                          <td v-if="item.pos_id == null">{{ item.username }}</td>
                          <td>{{ item.difference }}</td>
                          <td>{{ item.comment }}</td>
                          <td>{{ item.created_time }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-tab-item>

                <v-tab-item>
                  <export-excel
                      :data = "detailedInfo"
                      :name = "'posDetails.xls'" >
                      Download Data
                      <span class="material-icons">
                        get_app
                      </span>
                  </export-excel>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            POS
                          </th>
                          <th class="text-left">
                            Method
                          </th>
                          <th class="text-left">
                            Action
                          </th>
                          <th class="text-left">
                            Amount
                          </th>
                          <th class="text-left">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in detailedInfo"
                          :key="item.id"
                        >
                          <td>{{ item.name }}</td>
                          <td>{{ item.payment_method }}</td>
                          <td>{{ item.action }}</td>
                          <td>{{ item.amount }}</td>
                          <td>{{ item.created_time }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-tab-item>

                <v-tab-item>
                  <export-excel
                      :data = "detailedInfo"
                      :name = "'safeDetails.xls'" >
                      Download Data
                      <span class="material-icons">
                        get_app
                      </span>
                  </export-excel>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Action
                          </th>
                          <th class="text-left">
                            Amount
                          </th>
                          <th class="text-left">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in detailedInfo"
                          :key="item.id"
                        >
                          <td>{{ item.payment }}</td>
                          <td>{{ item.amount }}</td>
                          <td>{{ item.created_time }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-tab-item>
              </v-tabs-items>
              </v-tabs>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      
      </v-dialog>
      <v-dialog
        v-model="driverDetail"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ selectedDriver.usenrname }} Details</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateDriver"
                      label="Select Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateDriver"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="8">
                  <export-excel
                      :data = "detailedInfo"
                      :name = "'driverDetails.xls'" >
                      Download Data
                      <span class="material-icons">
                        get_app
                      </span>
                  </export-excel>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            Action
                          </th>
                          <th class="text-left">
                            Amount
                          </th>
                          <th class="text-left">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in detailedInfo"
                          :key="item.id"
                        >
                          <td>{{ item.name }}</td>
                          <td>{{ item.action }}</td>
                          <td>{{ item.amount }}</td>
                          <td>{{ item.created_at }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>

              </v-col>
            </v-row>
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
import Vue from 'vue'
import excel from 'vue-excel-export'
 
Vue.use(excel)

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      items: [
          { tab: 'Closed', content: 'close' },
          { tab: 'POS Details', content: 'pos' },
          { tab: 'Safe Details', content: 'safe' },
          // { tab: 'Driver Details', content: 'driver' },
      ],
      tab: 0,
      date: new Date().toISOString().substr(0, 10),
      dateDriver: new Date().toISOString().substr(0, 10),
      detailedInfo: [],
      menu: false,
      menu2: false,
      posID: '',
      driverID: '',
      selectedPos: [],
      banksDetail: false,
      driverDetail: false,
      pickedDate: null,
      selectedDriver: {},
      safeCash: 0,
      safeCard: 0,
      safeGlovo: 0,
      safeWolt: 0,
      safeTotal: null,
      cashActual: null,
      cardActual: null,
      driverCashActual: null,
      driverCardActual: null,
      totalActual: null,
      posAmount: 150,
      driverAmount: 85,
      safeAmount: null,
      posComment: '',
      safeCloseComment: '',
      driverCloseComment: '',
      safeCloseDialog: false,
      safeFormDialog: false,
      tillCloseDialog: false,
      tillFormDialog: false,
      driverFormDialog: false,
      driverCloseDialog: false,
      openedTill: {},
      safes: [],
      tills: [],
      tillsCount: null,
      allPoses: [],
      banks: [],
      drivers: [],
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
       if (vm.$store.state.auth.user.data.role.toLowerCase() == "admin" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "vicemanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "globalmanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "branchmanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "weiser") {
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

    this.loggedUser = JSON.parse(localStorage.getItem("loggedUserData"));

      const TOKEN = this.loggedUser.token;
      this.getSafes();

      this.getPoses();

      this.getDrivers();

      this.getBanks();

      this.updateDetails(this.date);

      var bodyFormPosAll = new FormData();
      bodyFormPosAll.set("branch_id", this.branchId);

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "poses/list-by-branch",
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
  created () {
        this.timer = setInterval(this.getPoses, 5000)
    },
  watch: {
    date(val){
      if(this.tab == 0){
        this.updateDetails(val);
      }
      else if(this.tab == 1){
        this.posDetails(val);
      }
      else if(this.tab == 2){
        this.safeDetails(val);
      }
    },
    dateDriver(val) {
      this.driverDetails(val);
    }
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
    getTab(tab){
        if(tab.content === 'close') {
          this.updateDetails(this.date);
        }
        else if(tab.content === 'pos') {
          this.posDetails(this.date);
        }
        else if(tab.content === 'safe') {
          this.safeDetails(this.date);
        }
        else if(tab.content === 'driver'){
          alert('Driver Details');
          this.updateDetails(this.date);
        }
        this.$forceUpdate();
    },
    updateDetails(date){
      const TOKEN = this.loggedUser.token;
      var bodyUpdate = new FormData();
      bodyUpdate.set("day", date);

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "manager/get-close-day",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
            this.detailedInfo = response.data.data;

            this.detailedInfo.forEach(x => {
              const date = new Date(x.created_at);
              x.created_time = date.getHours() + ":" + date.getMinutes();
            })
        });
    },
    posDetails(date){
      const TOKEN = this.loggedUser.token;
      var bodyUpdate = new FormData();
      bodyUpdate.set("day", date);
      bodyUpdate.set("pos_id", '2');

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "poses/poses-detail",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
            this.detailedInfo = response.data.data;
            this.detailedInfo.forEach(x => {
              const date = new Date(x.created_at);
              x.created_time = date.getHours() + ":" + date.getMinutes();

              if(x.amount < 0 && x.action != 'New order'){
                x.payment_method = 'Drop balance';
              }
            })
        });
    },
    safeDetails(date){
      const TOKEN = this.loggedUser.token;
      var bodyUpdate = new FormData();
      bodyUpdate.set("day", date);
      bodyUpdate.set("safe_id", this.safes[0].id);

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "poses/safe-detail",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
            this.detailedInfo = response.data.data;
            this.detailedInfo.forEach(x => {
              const date = new Date(x.created_at);
              x.created_time = date.getHours() + ":" + date.getMinutes();

                if(x.driver_id == 0 && x.amount < 0) {
                  // x.payment = 'Drop to ' + x.bank_name;
                  x.payment = 'Add from Bank';
                }
                else if(x.driver_id == 0 && x.amount >= 0) {
                  x.payment = 'Add from Bank';
                }
            })
        });
    },
    driverDetailsModal() {
      this.driverDetails(this.dateDriver);
      this.driverDetail = true;
      this.driverCloseDialog = false;
    },
    driverDetails(date){
      const TOKEN = this.loggedUser.token;
      var bodyUpdate = new FormData();
      bodyUpdate.set("day", date);
      bodyUpdate.set("driver_id", this.selectedDriver.id);

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "driver/detail",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
          console.log('BLA ', response);
            this.detailedInfo = response.data.data;
        });
    },
    
    reconcilePos(){
      var totalPosCash = (Number(this.selectedPos.cash) + Number(this.selectedPos.glovo_cash));
      var totalPosCard = (Number(this.selectedPos.card) + Number(this.selectedPos.glovo_card));
      if(this.cashActual == null || this.cardActual == null){
        alert('Enter Cash actual and Card actual before closing POS!');
      }
      // else if(totalPosCash != this.cashActual || totalPosCard != this.cardActual && this.safeCloseComment == ''){
      //   alert('POS Total and POS actual are not equal, please enter comment!');
      // }
      else {
        var r = confirm("Close POS for a day?");
        if(r == true){
          var diff_cash = (this.cashActual- totalPosCash).toFixed(2);
          var diff_card = (this.cardActual -totalPosCard).toFixed(2);
          const TOKEN = this.loggedUser.token;
          var reconcilePosForm = new FormData();
          reconcilePosForm.set("driver_id", 0);
          reconcilePosForm.set("pos_id", this.selectedPos.poses_id);
          reconcilePosForm.set("comment", this.safeCloseComment);
          reconcilePosForm.set("diff_cash", diff_cash);
          reconcilePosForm.set("diff_card", diff_card);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "manager/close-day",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: reconcilePosForm,
            })
            .then((response) => {
              console.log('Reconcile Pos: ', response);
              this.safeCloseComment = '';
              this.cashActual = '';
              this.cardActual = '';
              this.totalActual = '';
              this.tillCloseDialog = false;
              this.getSafes();
            });
        }
      }
    },
    reconcileDriver(){
      var r = confirm("Close Driver for a day?");
      if(r == true){
        var diff_card = (this.driverCardActual - this.selectedDriver.card).toFixed(2);
        var diff_cash = (this.driverCashActual - this.selectedDriver.amount).toFixed(2);
        const TOKEN = this.loggedUser.token;
        var reconcileDriverForm = new FormData();
        reconcileDriverForm.set("driver_id", this.selectedDriver.id);
        reconcileDriverForm.set("pos_id", 0);
        reconcileDriverForm.set("comment", this.driverCloseComment);
        reconcileDriverForm.set("diff_card", diff_card);
        reconcileDriverForm.set("diff_cash", diff_cash);

        axios
          .request({
            method: "post",
            url:
              this.$hostname + "manager/close-day",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: reconcileDriverForm,
          })
          .then((response) => {
            console.log('Reconcile Driver: ', response);
            this.driverCloseComment = '';
            this.driverCashActual = '';
            this.driverCardActual = '';
            this.totalActual = '';
            this.driverCloseDialog = false;
            this.getSafes();
          });
      }
      else {

      }
    },
    getSafes(){
      const TOKEN = this.loggedUser.token;
      var bodyFormSafe = new FormData();
      bodyFormSafe.set("branch_id", this.branchId);
      bodyFormSafe.set("day", this.today);

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "poses/get-safes",
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
            this.$hostname + "poses/get-poses",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormPos,
        })
        .then((response) => {
          this.tills = response.data.data;

          this.tills.unclose.forEach(x => {
            x.card = Number(x.card);
            x.cash = Number(x.cash);
          });
          this.tills.current.forEach(x => {
            x.card = Number(x.card);
            x.cash = Number(x.cash);
          });

          this.tillsCount = this.tills.unclose.length;
          // this.tillsCount = 1;


          console.log("POS List: ", this.tills);
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
          this.drivers = response.data.data;
          console.log("Drivers List: ", this.drivers);
        });
    },
    
    getBanks(){
      const TOKEN = this.loggedUser.token;
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "poses/bank-list",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
        })
        .then((response) => {
          this.banks = response.data.data;
          console.log("Banks List: ", response);
        });
    },
    addPos(){
      const TOKEN = this.loggedUser.token;
      var bodyAddPos = new FormData();
      bodyAddPos.set("pos_id", this.selectedPos);
      bodyAddPos.set("amount", this.posAmount);
      bodyAddPos.set("safe_id", this.safes[0].id);

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "poses/edit-balance",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyAddPos,
        })
        .then((response) => {
          
          console.log("Balance Change Response:  ", response);
          this.tillDialog = false;
          this.tillCloseDialog = false;
          this.getSafes();
          this.getPoses();
          this.getDrivers();
          this.posAmount = 0;
        });
    },
    addToPos(){
      var r = confirm("Add to POS?");
      if(r == true){
        const TOKEN = this.loggedUser.token;
        var bodyAddPosBalance = new FormData();
        bodyAddPosBalance.set("pos_id", this.posID);
        bodyAddPosBalance.set("amount", this.posAmount);
        bodyAddPosBalance.set("safe_id", this.safes[0].id);

        axios
          .request({
            method: "post",
            url:
              this.$hostname + "poses/edit-balance",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyAddPosBalance,
          })
          .then((response) => {
            
            console.log("Balance Change Response:  ", response);
            this.tillFormDialog = false;
            this.tillCloseDialog = false;
            this.getSafes();
            this.getPoses();
            this.getDrivers();
            this.posDetails(this.date);
            this.posAmount = 0;
          });
      }
    },
    dropFromPos(){
      
      if(Number(this.selectedPos.cash) + Number(this.selectedPos.glovo_cash) < this.posAmount){
          alert('There is not that amount of money in POS');
      }
      else {
        var r = confirm("Drop from POS?");
        if(r == true){
          const TOKEN = this.loggedUser.token;
          var bodyDropSafe = new FormData();
          bodyDropSafe.set("pos_id", this.posID);
          bodyDropSafe.set("amount", -this.posAmount);
          bodyDropSafe.set("safe_id", this.safes[0].id);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "poses/edit-balance",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyDropSafe,
            })
            .then((response) => {
              
              console.log("Balance Change Response:  ", response);
              this.tillFormDialog = false;
              this.tillCloseDialog = false;
              this.getSafes();
              this.getPoses();
              this.getDrivers();
              this.posDetails(this.date);
              this.posAmount = 0;
            });
        }
      }

    },
    addToSafe(bank){
      
      const TOKEN = this.loggedUser.token;
      var bodyAddSafeBalance = new FormData();
      bodyAddSafeBalance.set("amount", this.safeAmount);
      bodyAddSafeBalance.set("safe_id", this.safes[0].id);
      bodyAddSafeBalance.set("bank_id", bank.id)

      axios
        .request({
          method: "post",
          url:
            this.$hostname + "poses/drop-safe-balance",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyAddSafeBalance,
        })
        .then((response) => {
          
          console.log("Balance Change Response:  ", response);
          this.safeCloseDialog = false;
          this.getSafes();
          this.getPoses();
          this.getDrivers();
          this.safeDetails(this.date);
          this.safeAmount = null;
        });

    },
    dropFromSafe(bank){
      
      if(this.safeAmount <= Number(this.safes[0].amount) - Number(this.safes[0].default_amount)){
        const TOKEN = this.loggedUser.token;
        var bodyDropSafeBalance = new FormData();
        bodyDropSafeBalance.set("amount", - this.safeAmount);
        bodyDropSafeBalance.set("safe_id", this.safes[0].id);
        bodyDropSafeBalance.set("bank_id", bank.id);

        axios
          .request({
            method: "post",
            url:
              this.$hostname + "poses/drop-safe-balance",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyDropSafeBalance,
          })
          .then((response) => {
            
            console.log("Balance Change Response:  ", response);
            this.safeCloseDialog = false;
            this.getSafes();
            this.getPoses();
            this.getDrivers();
            this.safeDetails(this.date);
            this.safeAmount = null;
          });
      }
      else {
        alert('Working Cash - ' + this.safes[0].default_amount + ' should stay in safe');
      }
    },
    addToDriver(){
      var r = confirm("Add To "+this.selectedDriver.username+"?");
      if(r == true){
        const TOKEN = this.loggedUser.token;
        var bodyAddDriverBalance = new FormData();
        bodyAddDriverBalance.set("amount", this.driverAmount);
        bodyAddDriverBalance.set("driver_id", this.selectedDriver.id);

        axios
          .request({
            method: "post",
            url:
              this.$hostname + "driver/edit-balance",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyAddDriverBalance,
          })
          .then((response) => {
            
            console.log("Balance Change Response:  ", response);
            this.driverCloseDialog = false;
            this.getSafes();
            this.getPoses();
            this.getDrivers();
            this.driverAmount = 0;
          });
      }
    },
    dropFromDriver(){
      
      if(this.driverAmount <= this.selectedDriver.amount){
        var r = confirm("Drop From "+this.selectedDriver.username+"?");
        if(r == true){
          const TOKEN = this.loggedUser.token;
          var bodyAddDriverBalance = new FormData();
          bodyAddDriverBalance.set("amount", - this.driverAmount);
          bodyAddDriverBalance.set("driver_id", this.selectedDriver.id);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "driver/edit-balance",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyAddDriverBalance,
            })
            .then((response) => {
              
              console.log("Balance Change Response:  ", response);
              this.driverFormDialog = false;
              this.getSafes();
              this.getPoses();
              this.getDrivers();
              this.driverAmount = 0;
            });
          this.driverCloseDialog = false;
        }
      }
      else {
        alert('You Cant drop more than driver cash amount!');
      }
    },
    addSafe() {
      this.safeDialog = true;
      // this.safes.push(this.safe);
    },
    closeSafe(){

      this.safeAmount = (Number(this.safes[0].amount) - Number(this.safes[0].default_amount)).toFixed(2);

      this.safeCloseDialog = true;
      
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
    tillInfo(pos){
      this.selectedPos = pos;
      this.tillCloseDialog = true;
      this.posID = pos.poses_id;
    },
    driverInfo(driver){
      this.selectedDriver = driver;
      this.driverCloseDialog = true;
    },
    driverFoo(driver){
      this.driverFormDialog = true;
      this.driverID = driver.id;
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
      return parseInt(event.target.getAttribute("`data-tab`"));
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
              "http://188.169.16.186:8082/ronny/ronny/rest/web/index.php?r=v1/manager/add-balance-to-driver",
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
