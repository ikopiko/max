<script>
/* eslint-disable */
</script>

<template>
<v-app style="overflow:hidden">
  <div class="container container-12 posiza" >
      <v-alert v-model="printError" color="pink" dark border="top" transition="scale-transition" dismissible>
          Was unable to print!
      </v-alert>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /> -->
      <div class="row">
          <div class="col-5">
              <div class="sidebar-content">
                  <div class="left-1">
                      <div class="row" style="padding:10px 20px">
                        <v-col class="d-flex" cols="12">
                          <div class="goBack">
                              <i class="fa fa-arrow-left fa-4x iconColor " @click="goBack()"></i>
                          </div>
                          <template>
                            <v-autocomplete
                              v-model="curentCustomer"
                              :items="items"
                              item-text="address"
                              item-value="id"
                              :auto-select-first="true"
                              :search-input.sync="search"
                              class="mx-4"
                              label="Phone"
                              v-on:change="customerChecked = true"
                              no-filter
                              hide-no-data 
                              return-object
                            ></v-autocomplete>
                          </template>
                        </v-col>
                      </div>
                      <div class="row">
                            <div class="addCustomer" @click="telMsg()">
                                <i class="fa fa-pencil-square-o fa-4x iconColor "></i>
                            </div>
                          <div class="copyOrder">
                              <i class="fa fa-files-o fa-4x iconColor mx-2" @click="copyLastOrder()"></i>
                          </div>
                          <div class="adr">
                              <p>
                                  <span>{{ curentCustomer.name }}</span>
                                  <br />
                                  <span>{{ curentCustomer.address }}</span>
                                  <br />
                                  <span>{{ curentCustomer.phone }}</span>
                                  <br />
                                  <span>{{ curentCustomer.comment }}</span>
                              </p>
                              <i class="material-icons md-36 topcorner clearCustomer" v-if="customerChecked" @click="clearCustomer()">close</i>
                          </div>
                      </div>

                  </div>

                  <!-- <audio ref="audioElm" src="@assets/beep.wav"></audio> -->
                  <div class="left-2">
                      <div class="row" >

                          <div class="col-12">
                              <div class="row">
                                  <div class="titleInner d-flex justify-content-between">
                                      <div class="col-2 mb-2">
                                          <strong>Qty</strong>
                                      </div>
                                      <div class="col-8">
                                          <strong>Description</strong>
                                      </div>
                                      <div class="col-2">
                                          <i class="material-icons md-36 clearOrder" @click="clearOrder()" v-if="order.items.length != 0">close</i>
                                      </div>
                                  </div>
                              </div>
                              
                              <div class="row listIem" v-for="(item, index) in order.items" :key="index">
                                  <div class="col-1" v-if="!restrictEdit">
                                          <i class="material-icons md-24" style="font-size: 3em" @click="deleteProduct(item)">clear</i>
                                  </div>
                                  <!-- Pizza Render -->

                                  <div class="col-7" v-if="item.custom == 'no'" @click="foobar(item)">
                                      <div class="d-flex justify-content-between">
                                          <span class="orderDisplay itemName" @click="foobar(item)">
                                              <strong>{{ item.size.toUpperCase() }}
                                                  {{ item.name }}</strong>
                                              <!-- <strong v-if="item.cuts == 1"> {{ item.cutsCount }} Cut</strong> -->
                                          </span>
                                          <span class="itemPrice">
                                              <strong>{{
                                  (item.totalPrice * item.qty).toFixed(2)
                                  }}</strong>
                                          </span>
                                      </div>
                                      <div class="deletedToppingInner">
                                          <div class="d-flex justify-content-between changedSetting" v-if="item.cuts == 1">
                                              <span>{{ item.cutsCount }} Cuts</span>
                                              <span class="pading-10">0.00</span>
                                          </div>
                                          <div class="d-flex justify-content-between changedSetting" v-if="item.crust == 'thin'">
                                              <span>{{ item.crust }} Crust</span>
                                              <span class="pading-10">0.00</span>
                                          </div>
                                          <!-- <strong v-if="item.cuts == 1"> {{ item.cutsCount }} Cut</strong> -->
                                          <div class="d-flex justify-content-between changedSetting" v-if="item.sauce != 'sauce'">
                                              <span>{{ item.sauce }}</span>
                                              <span class="pading-10">0.00</span>
                                          </div>
                                      </div>
                                      <div class="toppingInner">
                                          <div class="wholeTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(topping, index) in item.toppings" :key="index">
                                                  <span v-if="topping.count == 1">+ {{ topping.name }}</span>
                                                  <span v-if="topping.count != 1">+ {{ topping.count }} {{ topping.name }}</span>
                                                  <span class="pading-10">{{
                                                          (topping.price * topping.count).toFixed(2)
                                                      }}
                                                  </span>
                                              </div>
                                          </div>
                                      </div>

                                      <div class="orderDisplay" @click="foobar(item)">
                                          <strong>&nbsp;</strong>
                                      </div>
                                      <div class="pl-4" style="font-size: 14px">
                                          <div class="wholeDefTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(defTopping, index) in item.defaultToppings" :key="index">
                                                  <span v-if="defTopping.isDeleted" :class="defTopping.isDeleted ? 'deletedTopping' : ''">{{ defTopping.name }}</span>
                                                  <span class="pading-10" :class="defTopping.isDeleted ? 'deletedTopping' : ''" v-if="
                                                      defTopping.isDeleted &&
                                                      item.is_special == 0 &&
                                                      defTopping.id != 5
                                                  ">
                                                - {{ defTopping.price }}
                                                </span>
                                              </div>
                                          </div>
                                          <div class="bSideTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(defTopping, index) in item.half1.defaultToppings" :key="index">
                                                  <span v-if="defTopping.isDeleted" :class="defTopping.isDeleted ? 'deletedTopping' : ''">A - {{ defTopping.name }}</span>
                                                  <span class="pading-10" :class="defTopping.isDeleted ? 'deletedTopping' : ''" v-if="
                                  defTopping.isDeleted &&
                                  item.is_special == 0 &&
                                  defTopping.id != 5
                              ">- {{ defTopping.price }}</span>
                                              </div>
                                          </div>
                                          <div class="bSideTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(topping, index) in item.half1.toppings" :key="index">
                                                  <span v-if="topping.count == 1">A + {{ topping.name }}</span>
                                                  <span v-if="topping.count != 1">A + {{ topping.count }} {{ topping.name }}</span>
                                                  <span>{{
                              (topping.price * topping.count).toFixed(2)
                              }}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="orderDisplay" @click="foobar(item)">
                                          <strong>&nbsp;</strong>
                                      </div>
                                      <div class="pl-4" style="font-size: 14px">
                                          <div class="bSideTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(defTopping, index) in item.half2.defaultToppings" :key="index">
                                                  <span v-if="defTopping.isDeleted" :class="defTopping.isDeleted ? 'deletedTopping' : ''">B - {{ defTopping.name }}</span>
                                                  <span class="pading-10" :class="defTopping.isDeleted ? 'deletedTopping' : ''" v-if="
                                  defTopping.isDeleted &&
                                  item.is_special == 0 &&
                                  defTopping.id != 5
                              ">- {{ defTopping.price }}</span>
                                              </div>
                                          </div>
                                          <div class="bSideTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(topping, index) in item.half2.toppings" :key="index">
                                                  <span v-if="topping.count == 1">B + {{ topping.name }}</span>
                                                  <span v-if="topping.count != 1">B + {{ topping.count }} {{ topping.name }}</span>
                                                  <span class="pading-10">{{
                              (topping.price * topping.count).toFixed(2)
                              }}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- End of Pizza Render -->

                                  <!-- Other Products rendering -->
                                  
                                  <div class="col-7" v-if="item.custom == 'other'">
                                      <div class="d-flex justify-content-between">
                                          <span class="orderDisplay itemName" @click="foobar(item)">
                                              <strong>{{ item.qty }} {{ item.name }}</strong>
                                              <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
                                          </span>
                                          <span class="itemPrice">
                                              <strong>{{
                            (item.price * item.qty).toFixed(2)
                          }}</strong>
                                          </span>
                                      </div>
                                  </div>

                                  <!-- Sticks Rendering -->
                                  <div class="col-7" v-if="item.custom == 'sticks'">
                                      <div class="d-flex justify-content-between">
                                          <span class="orderDisplay itemName" @click="foobar(item)">
                                              <strong>{{ item.qty }} {{ item.name }}</strong>
                                              <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
                                          </span>
                                          <span class="itemPrice">
                                              <strong>{{
                            (item.totalPrice * item.qty).toFixed(2)
                          }}</strong>
                                          </span>
                                      </div>

                                      <div class="pl-4" style="font-size: 14px">
                                        <div class="sticksTopping">
                                          <div class="d-flex justify-content-between halfToppings" v-for="(defTopping, index) in item.defaultToppings" :key="index">
                                              <span v-if="defTopping.isDeleted" :class="defTopping.isDeleted ? 'deletedTopping' : ''">{{ defTopping.name }}</span>
                                              <span class="pading-10" :class="defTopping.isDeleted ? 'deletedTopping' : ''" v-if="defTopping.isDeleted">0.00</span>
                                          </div>
                                        </div> 

                                          <div class="d-flex justify-content-between deletedToppingStick" v-if="item.size == 'thin'">
                                              <span>{{ item.size }} Crust</span>
                                          </div>
                                          <div class="sticksTopping">
                                              <div class="d-flex justify-content-between halfToppings" v-for="(topping, index) in item.toppings" :key="index">

                                                  <span v-if="topping.count == 1">+ {{ topping.name }}</span>
                                                  <span v-if="topping.count != 1">+ {{ topping.count }} {{ topping.name }}</span>
                                                  <span >{{
                                                  (topping.price * topping.count).toFixed(2)
                                                  }}</span>
                                              </div>
                                          </div>

                                      </div>
                                  </div>
                                  <!-- Half and Half Pizza View -->

                                  <div class="col-7 " v-if="item.custom == 'yes'" @click="foobar(item)">
                                    <div class="halfInner">
                                      <div class="d-flex justify-content-between halfSett">
                                          <span class="orderDisplay" @click="foobar(item)">
                                              <strong>{{ item.qty }}
                                                  {{ item.size.toUpperCase() }} A/B</strong>
                                              <strong v-if="item.cuts"> {{ item.cutsCount }} Cut</strong>
                                          </span>
                                          <span>
                                              <strong>{{
                            (item.totalPrice * item.qty).toFixed(2)
                          }}</strong>
                                          </span>
                                      </div>
                                      <div class="d-flex justify-content-between deletedTopping" v-if="item.cuts == 1">
                                          <span>{{ item.cutsCount }} Cuts</span>
                                          <span class="pading-10">0.00</span>
                                      </div>
                                      <div class="d-flex justify-content-between deletedTopping" v-if="item.crust == 'thin'">
                                          <span>{{ item.crust }} Crust</span>
                                          <span class="pading-10">0.00</span>
                                      </div>
                                      <div class="d-flex justify-content-between deletedTopping" v-if="item.sauce != 'sauce'">
                                          <span>{{ item.sauce }}</span>
                                          <span class="pading-10">0.00</span> 
                                      </div>
                                      <div class="d-flex justify-content-between halfToppings" v-for="(topping, index) in item.toppings" :key="index">
                                          <span v-if="topping.count == 1">+ {{ topping.name }}</span>
                                          <span v-if="topping.count != 1">+ {{ topping.count }} {{ topping.name }}</span>
                                          <span>{{
                          (topping.price * topping.count).toFixed(2)
                        }}</span>
                                      </div>

                                      <div class="orderDisplay halfName" @click="foobar(item)">
                                          <strong>A {{ item.half1.name }}</strong>
                                      </div>
                                      <div style="font-size: 14px">
                                          <div class="d-flex justify-content-between" v-for="(defTopping, index) in item.half1.defaultToppings" :key="index">
                                              <span v-if="defTopping.isDeleted" :class="defTopping.isDeleted ? 'deletedTopping' : ''">{{ defTopping.name }}</span>
                                              <span class="pading-10" :class="defTopping.isDeleted ? 'deletedTopping' : ''" v-if="
                              defTopping.isDeleted &&
                              item.half1.is_special == 0 &&
                              defTopping.id != 5
                            " >- {{ defTopping.price }}</span>
                                          </div>
                                          <div class="d-flex justify-content-between" v-for="(topping, index) in item.half1.toppings" :key="index">
                                              <span v-if="topping.count == 1">+ {{ topping.name }}</span>
                                              <span v-if="topping.count != 1">+ {{ topping.count }} {{ topping.name }}</span>
                                              <span>{{ (topping.price * topping.count).toFixed(2) }}</span>
                                          </div>
                                      </div>
                                      <div class="orderDisplay halfName" @click="foobar(item)">
                                          <strong>B {{ item.half2.name }}</strong>
                                      </div>
                                      <div style="font-size: 14px">
                                          <div class="d-flex justify-content-between" v-for="(defTopping, index) in item.half2.defaultToppings" :key="index">
                                              <span v-if="defTopping.isDeleted" :class="defTopping.isDeleted ? 'deletedTopping' : ''">{{ defTopping.name }}</span>
                                              <span class="pading-10" :class="defTopping.isDeleted ? 'deletedTopping' : ''" v-if="
                              defTopping.isDeleted &&
                              item.half2.is_special == 0 &&
                              defTopping.id != 5
                            ">- {{ defTopping.price }}
                                              </span>
                                          </div>
                                          <div class="d-flex justify-content-between" v-for="(topping, index) in item.half2.toppings" :key="index">
                                              <span v-if="topping.count == 1">+ {{ topping.name }}</span>
                                              <span v-if="topping.count != 1">+ {{ topping.count }} {{ topping.name }}</span>
                                              <span>{{ (topping.price * topping.count).toFixed(2) }}</span>
                                          </div>
                                      </div>
                                  </div>
                                  </div>
                                  <!-- End Of Half and Half Pizza View -->

                                  <div class="col-4" style="margin: 0px">
                                      <div class="d-flex justify-content-between">
                                          <span class="material-icons iconMinus" v-bind:class="{ static: restrictEdit }" v-if="item.qty > 1 " @click="minusQty(item)">remove</span>
                                          <span class="material-icons iconMinus" v-bind:class="{ static: restrictEdit }" v-if="item.qty == 1" @click="deleteProduct(item)">delete_outline</span>
                                          <span class="itemQty">{{ item.qty }}</span>
                                          <span class="material-icons iconPlus" v-bind:class="{ static: restrictEdit }" @click="addQty(item)">add</span>
                                      </div>
                                  </div>

                                  <!-- <div>{{ item.qty }}</div> -->
                              </div>
                          </div>
                      </div>
                  </div>
                  <br />
                  <br />
              </div>
          </div>
          <div class="col-7 mt-2 right-innery">
              <div class="row">
                  <div class="col-12">
                      <div class="row mt-1">
                          <div class="col w-1">
                              <span>
                                  <strong>
                                      <span class="activeOrder h3">#{{ order.orderId }}</span>
                                  </strong>
                              </span>
                              <span class="mx-3 h3">
                                  <strong>{{ hours }}:{{ minutes }}:{{ seconds }}</strong>
                              </span>
                          </div>

                          <!-- Display Total Price and Tax  -->
                          <div class="col-6 w-1 gray">
                              <h4 class=" text-md-center">TOTAL: {{ totalNet.toFixed(2) }}</h4>
                          </div>
                      </div>
                  </div>
              </div>

              <table class="w-100 d-noe">
                  <tr>
                      <td>
                          <table class="table quantityTable" cellpadding="0" cellspacing="0" v-if="showProducts">
                              <tr>
                                  <td v-for="(x, index) in 10" :key="x">
                                      <div class="w-b-1-circle float-left quantity" @click="quantityBar(index)">
                                          <span>{{ index }}</span>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                          <div v-if="showProducts">
                              <div class="row pizza p_binder">
                                  <products v-if="!drinkCat" :categoryId="categoryId" :halfProductVar="halfProduct" @onProductSelect="productSelect" @onAddHalf="addHalf" @onSetting="posSetting" @onFunction="posFunction" @onDoneOrder="doneOrder" @onDrinks="drinkProducts" />

                                  <drinks v-if="drinkCat" @onProductSelect="productSelect" @onDoneOrder="doneOrder" @onDrinks="drinkProducts" @onSetting="posSetting" @onFunction="posFunction" />
                              </div>
                          </div>
                          <div class="row pizza p_binder" v-if="customerOrdersComponent">
                              <orders :customerPhone="this.curentCustomer.phone" @onSelectedOrder="selectOrder" />
                          </div>
                      </td>
                  </tr>
              </table>
              <!-- Calculator component -->

              <!-- UX Change -->
              <div class="col-12 right-2" v-if="calculatorModal">
                  <div class="row" v-if="!discountOrder || !discountItem">
                      <div class="col w-3 gray" v-if="!discountActiveVar">
                          <div>
                              <h4>Discount:</h4>
                          </div>
                          <div>
                              <h4 id="total_price">
                                  -{{ totalDisc.toFixed(2) }} {{ order.discountName }}
                              </h4>
                          </div>
                      </div>
                      <div class="col w-3 red" v-if="discountActiveVar">
                          <div>
                              <h4>Discount:</h4>
                          </div>
                          <div>
                              <h4 id="total_price">
                                  -{{ totalDisc.toFixed(2) }} {{ order.discountName }}
                              </h4>
                          </div>
                      </div>
                      <div class="col w-3 gray">
                          <div>
                              <h4>Paid:</h4>
                          </div>
                          <div>
                              <h4 id="total_price">{{ Number(cashInput).toFixed(2) }}</h4>
                          </div>
                      </div>
                      <div class="col w-3 gray" v-if="cashInput - totalPrice >= 0">
                          <div>
                              <h4>Change:</h4>
                          </div>
                          <div>
                              <h4 id="total_price">
                                  {{ (cashInput - totalPrice).toFixed(2) }}
                              </h4>
                          </div>
                      </div>
                      <div class="col w-3 gray" v-if="cashInput - totalPrice < 0">
                          &nbsp;
                      </div>
                      <div class="col w-3 gray" v-if="deliveryActiveVar">
                          <div>
                              <h4>Delivery Fee:</h4>
                          </div>
                          <div>
                              <h4 id="total_price">{{ order.deliveryFee }}</h4>
                          </div>
                      </div>
                  </div>

                  <!-- <div class="row" v-if="discountOrder || discountItem">
                      <div class="col w-3 gray">
                          <div>
                              <h4>Discount:</h4>
                          </div>
                          <div>
                              <h4 id="total_price">{{ cashInput }}</h4>
                          </div>
                      </div>
                  </div> -->

                  <div class="row my-1">
                      <div class="col-2 calcBtn blue" v-bind:class="{ active: futureActive }" @click="futureModal = true">
                          Future
                      </div>
                      <div class="col-6">&nbsp;</div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(100)">
                          100
                      </div>
                      <div class="col-2 calcBtn" v-bind:class=" invoiceActiveVar ? 'active' : 'blue' " @click="invoiceActive()">
                          Invoice
                      </div>
                      <!-- <div class="col-2 calcBtn blue">
                          &nbsp;
                      </div> -->
                  </div>
                  <div class="row my-1">
                      <!-- <div class="col-2 calcBtn blue" @click="studentModal = true">
                          Student
                      </div> -->
                      <!-- <div class="col-2 calcBtn blue" @click="changeDefPrice()">
                          DEF
                      </div> -->
                      <div class="col-2 calcBtn blue">
                          &nbsp;
                      </div>
                      <div class="col-2 calcBtn" @click="calcInput('7')">7</div>
                      <div class="col-2 calcBtn" @click="calcInput('8')">8</div>
                      <div class="col-2 calcBtn" @click="calcInput('9')">9</div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(50)">50</div>
                      <div class="col-2 calcBtn " v-bind:class=" woltActive ? 'active' : 'blue' " @click="woltDelivery()">
                        <!-- :class="defTopping.isDeleted ? 'deletedTopping' : ''" -->
                        Wolt
                      </div>
                  </div>

                  <div class="row my-1">
                      <!-- <div class="col-2 calcBtn blue" @click="teamModal = true">Team</div> -->
                      <!-- <div class="col-2 calcBtn blue" @click="bigOrderModal = true">Big Order</div> -->
                      <div class="col-2 calcBtn blue">&nbsp;</div>
                      <div class="col-2 calcBtn" @click="calcInput('4')">4</div>
                      <div class="col-2 calcBtn" @click="calcInput('5')">5</div>
                      <div class="col-2 calcBtn" @click="calcInput('6')">6</div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(20)">20</div>
                      <!-- <div class="col-2 calcBtn blue" v-bind:class="{ active: glovoActive }" @click="glovoDelivery()">
                          Glovo
                      </div> -->
                      <div class="col-2 calcBtn"  v-bind:class=" glovoActive ? 'active' : 'blue' " >
                          &nbsp;
                      </div>
                  </div>
                  <div class="row my-1">
                      <!-- <div class="col-2 calcBtn blue" @click="studentDisc()">
                          Student
                      </div> -->
                      <div class="col-2 calcBtn blue" @click="managerAmount = '', managerPercent = '', managerPin = true">
                          Manager PIN
                      </div>
                      <div class="col-2 calcBtn" @click="calcInput('1')">1</div>
                      <div class="col-2 calcBtn" @click="calcInput('2')">2</div>
                      <div class="col-2 calcBtn" @click="calcInput('3')">3</div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(10)">10</div>
                      <div class="col-2 calcBtn " @click="ronnysDelivery()" v-bind:class=" deliveryActiveVar ? 'active' : 'blue' ">
                        <!-- <div class="col-2 calcBtn" @click="ronnysDelivery()" v-bind:class=" takeoutActiveVar ? 'active' : 'blue'"> -->
                          Delivery
                      </div>
                  </div> 
                  <div class="row">
                      <div class="col-2 calcBtn blue" @click="splitModal = true">
                          Split
                      </div>
                      <!-- <div class="col-2 calcBtn blue">
                          &nbsp;
                      </div> -->
                      <div class="col-4 calcBtn" @click="calcInput('0')">0</div>
                      <div class="col-2 calcBtn" @click="calcInput('.')">.</div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(5)">5</div>
                      <div class="col-2 calcBtn " @click="takeoutActive()" v-bind:class=" takeoutActiveVar ? 'active' : 'blue'">
                          Take Out
                      </div>
                  </div>
                  <div class="row my-1">
                      <div class="col-2 calcBtn blue" @click="managerDisc()">
                          Manager
                      </div>
                      <div class="col-6 calcBtn red" @click="calcClear()">
                          <i class="material-icons md-36 clearItem">close</i>
                      </div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(2)">2</div>
                      <div class="col-2 calcBtn" @click="walkinActive()" v-bind:class=" walkinActiveVar ? 'active' : 'blue'">
                          Walk In
                      </div>
                  </div>
                  <div class="row my-1">
                      <div class="col-2 calcBtn blue" @click="checkManager()">CRM DISC</div>
                      <div class="col-6 calcBtn lightGreen" @click="calcPayAll(totalPrice)">
                          PAY {{ Number(totalPrice).toFixed(2) }}
                      </div>
                      <div class="col-2 calcBtn lightGreen" @click="calcCash(1)">1</div>
                      <div class="col-2">&nbsp;</div>
                  </div>
                  <div class="row my-1">
                      <div class="col-2 calcBtn blue" @click="noDisc()">NO Disc</div>
                      <div class="col-2 calcBtn " :class=" promiseFee_el == 0 ? 'active' : 'blue' "  @click="activatePromise(0)">15</div>
                      <div class="col-2 calcBtn " :class="promiseFee_el == 1 ? 'active' : 'blue'" @click="activatePromise(1)">20</div>
                      <div class="col-2 calcBtn " :class="promiseFee_el == 2 ? 'active' : 'blue'" @click="activatePromise(2)">30</div>
                      <div class="col-2 calcBtn " :class="promiseFee_el == 3 ? 'active' : 'blue'" @click="activatePromise(3)">40</div>
                      <div class="col-2 calcBtn " :class="promiseFee_el == 4 ? 'active' : 'blue'" @click="activatePromise(4)">50</div>
                  </div>
                  <div class="row calcFooter">
                      <div v-if="!restrictEdit" class="col-2 paddingClear" style="padding-left: 0" @click="closeCalc()">
                          <div class="w-b-1 square calcBtn">
                              <i class="fa fa-home fa-4x iconColor home"></i>
                          </div>
                      </div>
                      <div v-if="restrictEdit" class="col-2 paddingClear" style="padding-left: 0">
                          <div class="w-b-1 square calcBtn">
                              <i class="fa fa-home fa-4x iconColor home"></i>
                          </div>
                      </div>
                      <div class="col-4">&nbsp;</div>
                      <div class="col-2 calcBtn green " @click="payLater()" v-b-modal.confirmModal>Pay Later</div>
                      <div class="col-2 calcBtn blue buttonTitle" @click="payCard()" v-b-modal.confirmModal>Card</div>
                      <div class="col-2 calcBtn green buttonTitle" @click="doneCash()" v-b-modal.confirmModal>Cash</div>
                  </div>
              </div>
              <!-- End of UX Change -->

              <!-- End Of Calculator Component -->

              <div class="row mt-1 right-2" v-if="showIngredients">
                  <ingredients v-if="wholePizzaPart == 1" :loversActive="this.loversActive" :product="this.pizza" :sauce="curSauce" :defaultToppings="this.pizza.half1.defaultToppings" :toppings="this.pizza.half1.toppings" :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSendSauce="addSauce" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" />
                  <ingredients v-if="wholePizzaPart == 2" :loversActive="this.loversActive" :product="this.pizza" :sauce="curSauce" :defaultToppings="this.pizza.half2.defaultToppings" :toppings="this.pizza.half2.toppings" :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSendSauce="addSauce" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" />
                  <ingredients v-if="wholePizzaPart == 3" :loversActive="this.loversActive" :product="this.pizza" :sauce="curSauce" :defaultToppings="this.pizza.defaultToppings" :toppings="
                this.pizza.toppings.concat(
                  this.pizza.half1.toppings,
                  this.pizza.half2.toppings
                )
              " :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSendSauce="addSauce" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" />
                  <ingredients v-if="halfPizzaPart == 1" :loversActive="this.loversActive" :product="this.customPizza.half1" :sauce="curSauce" :isHalfPizza="this.isHalfPizza" :halfPizzaPart="this.halfPizzaPart" :defaultToppings="this.customPizza.half1.defaultToppings" :toppings="this.customPizza.half1.toppings" :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSendSauce="addSauce" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" @onDeleteCusTopping="deleteCusTopping" />
                  <ingredients v-if="halfPizzaPart == 2" :loversActive="this.loversActive" :product="this.customPizza.half2" :isHalfPizza="this.isHalfPizza" :sauce="curSauce" :halfPizzaPart="this.halfPizzaPart" :defaultToppings="this.customPizza.half2.defaultToppings" :toppings="this.customPizza.half2.toppings" :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSendSauce="addSauce" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" @onDeleteCusTopping="deleteCusTopping" />
                  <ingredients v-if="halfPizzaAll" :loversActive="this.loversActive" :product="this.customPizza" :isHalfPizza="this.isHalfPizza" :sauce="curSauce" :halfPizzaPart="this.halfPizzaPart" :defaultToppings="
                this.customPizza.half2.defaultToppings.concat(
                  this.customPizza.half1.defaultToppings
                )
              " :toppings="
                this.customPizza.half2.toppings.concat(
                  this.customPizza.half1.toppings,
                  this.customPizza.toppings
                )
              " :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSendSauce="addSauce" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" @onDeleteCusMainTopping="deleteCusMainTopping" @onDeleteCusTopping="deleteCusTopping" />

                  <sticksIngredients v-if="isSticks" :defaultToppings="this.sticks.defaultToppings" :isSticks="this.isSticks" :toppings="this.sticks.toppings" :mapping="toppingIdCountMap" @onAddTopping="addTopping" @onSticksSize="sticksSize" @onShowProductsClear="showProductsClear" @onShowProductsComponent="showProductsComponent" @onDeleteDefTopping="deleteDefaultTopping" @onDeleteTopping="deleteTopping" />
              </div>

              <div class="row my-5 right-3" v-if="showIngredients && !isSticks">
                  
                  <div class="col" style="padding-left: 0" @click="halfPizza('A')">
                      <div class="w-h-1 square" v-bind:class="[
                  { active: halfPizzaPart == 1 },
                  { active: wholePizzaPart == 1 },
                  { size_static: noAB },
                ]">
                          <span class="position-relative topMargin">
                              <strong>A</strong>
                          </span>
                      </div>
                  </div>
                  <div class="col" style="padding-left: 0" @click="halfPizza('B')">
                      <div class="w-h-1 square" v-bind:class="[
                  { active: halfPizzaPart == 2 },
                  { active: wholePizzaPart == 2 },
                  { size_static: noAB },
                ]">
                          <span class="position-relative topMargin" >
                              <strong>B</strong>
                          </span>
                      </div>
                  </div>
                  <div class="col paddingClear">
                      <div class="w-h-1 square" v-bind:class="[
                  { active: halfPizzaAll },
                  { active: wholePizzaPart == 3 },
                ]" @click="seeHalf()">
                          <span class="position-relative topMargin" >
                              <strong>A/B</strong>
                          </span>
                      </div>
                  </div>
                  <div class="col size paddingClear p-0">
                      <div class="w-h-1 square paddingClear font-weight-bold" v-bind:class="{size_static_half: smallHalf, size_static: cheesseLoversActive, active: activeSmall }" @click="addSize('s')">
                          <span>S</span>
                      </div>
                  </div>
                  <div class="col size paddingClear p-0">
                      <div class="w-h-1 square paddingClear font-weight-bold" v-bind:class="{ active: activeMedium }" @click="addSize('m')">
                          <span>M</span>
                      </div>
                  </div>
                  <div class="col size paddingClear p-0">
                      <div class="w-h-1 square paddingClear font-weight-bold" v-bind:class="{size_static: cheesseLoversActive, active: activeXl }" @click="addSize('xl')">
                          <span>XL</span>
                      </div>
                  </div>
                  <div class="col p-0 paddingClear">
                    <div class="w-1-grey square" @click="showProductsClear()">
                      <i class="fa fa-home fa-4x iconColor"></i>
                    </div>
                  </div>
                  <div class="col thin paddingClear p-0">
                      <div class="w-h-1 square paddingClear font-weight-bold" v-bind:class="{ active: crustVar }" v-if="isHalfPizza === 'yes'" @click="addCrust(customPizza.crust)">
                          <span>Thin</span>
                      </div>
                      <div class="w-h-1 square paddingClear font-weight-bold" v-bind:class="{ active: crustVar }" v-if="isPizza === 'yes'" @click="addCrust(pizza.crust)">
                          <span>Thin</span>
                      </div>
                  </div>
                  <div class="col cuts paddingClear p-0">
                      <div class="w-h-1 square paddingClear cut_static font-weight-bold" v-bind:class="{ cut_active: mediumCuts, active: cutsCount == 6 }" @click="cuts(6)">
                          <span class="topMargin">6 Cut</span>
                      </div>
                  </div>
                  <div class="col cuts paddingClear p-0">
                      <div class="w-h-1 square paddingClear cut_static font-weight-bold" v-bind:class="{ cut_active: cutActive, active: cutsCount == 12 }" @click="cuts(12)">
                          <span class="topMargin">12 Cut</span>
                      </div>
                  </div>
                  <div class="col cuts paddingClear p-0">
                      <div class="w-h-1 square paddingClear cut_static font-weight-bold" v-bind:class="{ cut_active: cutActive, active: cutsCount == 16 }" @click="cuts(16)">
                          <span class="topMargin">16 Cut</span>
                      </div>
                  </div>
                  <div class="col p-0 paddingClear">
                      <div class="w-1" @click="showProductsComponent()">
                          <i class="fa fa-check fa-4x iconColor"></i>
                      </div>
                  </div>
              </div>
              <hr />
          </div>
      </div>

      <!-- Coupon Modal -->
      <div v-if="couponModal">
          <transition name="modal">
              <div class="modal-mask">
                  <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title">Coupon</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" @click="couponModal = false">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body">
                                  <input type="text" id="coupon_code" placeholder="Enter Coupon Code" />
                              </div>

                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" @click="couponModal = false">
                                      Close
                                  </button>
                                  <button type="button" class="btn btn-primary">
                                      Save changes
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>
      </div>
      <!-- End Of Coupon Modal -->

      <!-- Payment Confirm Modal -->

      <div v-if="confirmModal">
          <transition name="modal">
              <div class="modal-mask">
                  <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title">Confirm Payment</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" @click="confirmModal = false">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body">
                                  <div v-if="paymentType == 'card'">Confirm Card Payment?</div>
                                  <div v-if="paymentType == 'cash'">Confirm Cash Payment?</div>
                              </div>

                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" @click="confirmModal = false">
                                      Close
                                  </button>
                                  <button type="button" class="btn btn-primary" v-if="paymentType == 'card'" @click="paymentConfirm()">
                                      Confirm Payment
                                  </button>
                                  <button type="button" class="btn btn-primary" v-if="paymentType == 'cash'" @click="paymentConfirm()">
                                      Confirm Payment
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>
      </div>
      <!-- End of Payment Confirm Modal -->

      <!-- Change Modal -->

      <v-dialog 
        v-model="changeModal"
        max-width="500px"
      >
      <v-card class="justify-center">
          <v-card-title>
            <span class="headline">Change</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <div class="row">
                  <div class="col w-3 gray">
                      <div>
                          <h4>Subtotal:</h4>
                      </div>
                      <div>
                          <h4 id="total_price">{{ totalNet.toFixed(2) }}</h4>
                      </div>
                  </div>
                  <div class="col w-3 gray">
                      <div>
                          <h4>Paid:</h4>
                      </div>
                      <div>
                          <h4 id="total_price">{{ cashInput }}</h4>
                      </div>
                  </div>
                  <div class="col w-3 gray">
                      <div>
                          <h4>Change:</h4>
                      </div>
                      <div>
                          <h4 id="total_price">{{ (cashInput - totalPrice).toFixed(2) }}</h4>
                      </div>
                  </div>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>      
            <v-btn
              color="blue darken-1"
              text
              x-large
              @click="closeChangeModal()"
            >
              Close
            </v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>

      
      <!-- End of Change Modal -->

      <!-- Big Order Modal -->

      <v-dialog 
        v-model="bigOrderModal"
        max-width="500px"
      >
      <v-card>
              <v-card-title>Select Free Item</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 400px;">
                  <v-checkbox v-for="(item, index) in order.items" :key="index" v-model="bigorderSelected" :label="item.name+' : '+item.price" :value="item"></v-checkbox>
                  <v-divider></v-divider>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>

                  <v-btn color="blue darken-1" text x-large @click="bigOrderModal = false">
                      Close
                  </v-btn>
                  <v-btn color="blue darken-1" x-large text @click="bigOrder()">
                      Done
                  </v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>

      
      <!-- End of Big Order Modal -->

      <!-- Start Of CRM Modal -->

      <v-dialog 
        v-model="crmModal"
        max-width="700px"
      >
      <v-card class="justify-center">
          <v-card-title>
            <span v-if="customerChecked" class="headline">Edit Customer</span>
            <span v-if="!customerChecked" class="headline">Add New Customer</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-row>
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" required clearable autofocus></v-text-field>

                      <v-text-field v-model="curentCustomer.name" :rules="nameRules" class="my-2" label="Name" required clearable></v-text-field>
                    

                      <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                          <v-radio label="Male" value="male"></v-radio>
                          <v-radio label="Female" value="female"></v-radio>
                          <v-radio label="None" value="none"></v-radio>
                      </v-radio-group>

                      <v-text-field v-if="discountActive" v-model="curentCustomer.personal_id" class="my-2" label="ID #" clearable required></v-text-field>

                      <v-text-field name="input-7-1" label="Street address" :rules="addressRules" v-model="curentCustomer.address" clearable ></v-text-field>

                      <v-text-field v-model="curentCustomer.comment2" class="my-2" label="Driver Details" clearable></v-text-field>
                      
                      <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail" ></v-text-field>
                      
                      <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>
                                          
                      <v-text-field v-model="curentCustomer.ltdName" v-if="corporateActive" class="my-2" label="LTD Name" clearable></v-text-field>
                      
                      <v-text-field v-model="curentCustomer.ltdId" v-if="corporateActive" class="my-2" label="LTD ID#" clearable></v-text-field>
                      

                  </v-form>
                </v-row>
                <v-row>
                  <div class="col" v-for="(discount, index) in discountTypes" :key="index">
                    <v-btn class="blueBtn" v-if="discount.name != 'Manager'" :class="{ active : discount.name == curentCustomer.discount }" large @click="crmDiscount(discount)">{{ discount.name }}</v-btn>
                  </div>
                </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!customerChecked"
              color="blue darken-1"
              text
              x-large
              @click="addCustomer()"
            >
              Add New Customer
            </v-btn>
            <v-btn
              v-if="customerChecked"
              color="blue darken-1"
              text
              x-large
              @click="editCustomer()"
            >
              Save
            </v-btn>      
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End Of CRM Modal -->

      <!-- Start Of Delivery Modal -->

      <div v-if="deliveryModal">
          <transition name="modal">
              <div class="modal-mask">
                  <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title">Delivery Information</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" @click="deliveryModal = false">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body">
                                  <b-container fluid>
                                      <v-form ref="form" v-model="valid" lazy-validation>
                                          <v-text-field v-model="curentCustomer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" required clearable></v-text-field>

                                          <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail" required></v-text-field>

                                          <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                                              <v-radio label="Male" value="male"></v-radio>
                                              <v-radio label="Female" value="female"></v-radio>
                                              <v-radio label="None" value="none"></v-radio>
                                          </v-radio-group>

                                          <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="curentCustomer.address" clearable required></v-text-field>

                                          <!-- <v-combobox
                                            v-model="curentCustomer.address"
                                            label="Address"
                                            multiple
                                            chips
                                            dense
                                          ></v-combobox> -->
                                          
                                          <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" required clearable></v-text-field>

                                          <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>

                                      </v-form>
                                  </b-container>
                              </div>

                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" @click="deliveryModal = false">
                                      Close
                                  </button>
                                  <button type="button" class="btn btn-primary" @click="deliveryStep()">
                                      Deliver To Customer
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>
      </div>

      <!-- End Of Delivery Modal -->

      <!-- Start Of Delivery Fee Modal -->
      <!-- Am not using anymore -->
      <div v-if="deliveryFeeModal">
          <transition name="modal">
              <div class="modal-mask">
                  <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title">Delivery Information</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" @click="deliveryFeeModal = false">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body">
                                  <b-container fluid>
                                      <div class="row" @click="activateFee(fee.id)" v-for="(fee, index) in deliveryFee" :key="index">
                                          <div class="col feeClass" :class="{ active: activeFee_el == fee.id }">
                                              {{ fee.text }}
                                          </div>
                                      </div>
                                  </b-container>
                              </div>

                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" @click="deliveryFeeModal = false">
                                      Close
                                  </button>
                                  <button type="button" class="btn btn-primary" @click="deliverCustomer(deliveryFeeVar)">
                                      Delivery Fee
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>
      </div>

      <!-- End Of Fee Modal -->

      <!-- Start Of Delivery Type Modal -->
      <div v-if="deliveryTypeModal">
          <transition name="modal">
              <div class="modal-mask">
                  <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title">Delivery Type</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" @click="deliveryTypeModal = false">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body">
                                  <b-container fluid>
                                      <div class="row" @click="activate(type.id)" v-for="(type, index) in deliveryType" :key="index">
                                          <div class="col feeClass" :class="{ active: active_el == type.id }">
                                              {{ type.type }}
                                          </div>
                                      </div>
                                  </b-container>
                              </div>

                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" @click="deliveryActiveModal = false">
                                      Close
                                  </button>
                                  <button type="button" class="btn btn-primary" @click="
                        (deliveryModal = true),
                          (deliveryTypeModal = false),
                          deliverType(deliveryTypeVar)
                      ">
                                      Deliver Type
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>
      </div>

      <!-- End Of Delivery Type Modal -->

      <!-- Start of invoice modal -->

      <v-dialog 
        v-model="invoiceModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Invoice Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="invoice.name" class="my-2" label="Name" clearable></v-text-field>
                    <v-text-field v-model="invoice.ltd" class="my-2" label="LTD" clearable></v-text-field>

                    <v-text-field v-model="invoice.email" class="my-2" label="E-mail"></v-text-field>

                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="invoice.address" clearable required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="invoice.id" @keypress="isNumber($event)" class="my-2" label="Company ID #" clearable></v-text-field>

                    <v-text-field v-model="invoice.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" clearable></v-text-field>
                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              x-large
              @click="generateInvoice()"
            >
              Generate Invoice
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End of invoice modal -->

      <!-- Start Of Walk in Modal -->

      
      <v-dialog 
        v-model="walkInModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Walk In Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                                          
                    <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" clearable autofocus></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" clearable></v-text-field>


                  
                    <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-if="discountActive" v-model="curentCustomer.personal_id" class="my-2" label="ID #" clearable required></v-text-field>

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="curentCustomer.address" clearable></v-text-field>

                    <!-- <v-combobox
                      v-model="curentCustomer.address"
                      label="Address"
                      multiple
                      chips
                      dense
                    ></v-combobox> -->

                    <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail"></v-text-field>

                    <v-text-field v-model="curentCustomer.comment2" class="my-2" label="Driver Details" clearable></v-text-field>
                      
                    <v-text-field v-model="curentCustomer.ltdName" v-if="corporateActive" class="my-2" label="LTD Name" clearable></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.ltdId" v-if="corporateActive" class="my-2" label="LTD ID#" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="blue"
              text
              x-large
              @click="walkinCustomer()"
            >
              Walk In Customer
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End Of Walk In Modal -->

      <!-- Start Of Take out Modal -->

      <v-dialog 
        v-model="takeOutModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Take Out Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" clearable autofocus></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" clearable></v-text-field>

                    <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-if="discountActive" v-model="curentCustomer.personal_id" class="my-2" label="ID #" clearable required></v-text-field>

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="curentCustomer.address" clearable></v-text-field>

                    <!-- <v-combobox
                      v-model="curentCustomer.address"
                      label="Address"
                      multiple
                      chips
                      dense
                    ></v-combobox> -->

                    <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail"></v-text-field>

                    <v-text-field v-model="curentCustomer.comment2" class="my-2" label="Driver Details" clearable></v-text-field>
                      
                    <v-text-field v-model="curentCustomer.ltdName" v-if="corporateActive" class="my-2" label="LTD Name" clearable></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.ltdId" v-if="corporateActive" class="my-2" label="LTD ID#" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="blue"
              text
              x-large
              @click="takeoutCustomer()"
            >
              Take Out: {{ Number(totalNet).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End Of Walk In Modal -->

      <!-- Start Of Ronnys Modal -->

      <v-dialog 
        v-model="ronnysModal"
        max-width="700px"
      >
      <v-card class="justify-center">
          <v-card-title>
            <span class="headline">Delivery Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <b-container fluid>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        
                        <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" clearable autofocus></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" clearable></v-text-field>


                  
                    <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-if="discountActive" v-model="curentCustomer.personal_id" class="my-2" label="ID #" clearable required></v-text-field>

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="curentCustomer.address" clearable></v-text-field>

                    <!-- <v-combobox
                      v-model="curentCustomer.address"
                      label="Address"
                      multiple
                      chips
                      dense
                    ></v-combobox> -->

                    <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail"></v-text-field>

                    <v-text-field v-model="curentCustomer.comment2" class="my-2" label="Driver Details" clearable></v-text-field>
                      
                    <v-text-field v-model="curentCustomer.ltdName" v-if="corporateActive" class="my-2" label="LTD Name" clearable></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.ltdId" v-if="corporateActive" class="my-2" label="LTD ID#" clearable></v-text-field>

                    </v-form>
                </b-container>
                <div class="row">
                  <div class="col-2 feeClass mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 0 }" @click="activateFee(0)">
                      2.5 GEL
                  </div>
                  <div class="col-2 feeClass mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 1 }" @click="activateFee(1)">
                      4 GEL
                  </div>
                  <div class="col-2 feeClass mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 2 }" @click="activateFee(2)">
                      6 GEL
                  </div>
                  <div class="col-2 feeClass mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 3 }" @click="activateFee(3)">
                      7.5 GEL
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-2 feeClassBlue mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 4 }" @click="activateFee(4)">
                      Tskneti
                  </div>
                  <div class="col-2 feeClassBlue mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 5 }" @click="activateFee(5)">
                      Tsavkisi
                  </div>
                  <div class="col-2 feeClassBlue mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 6 }" @click="activateFee(6)">
                      Mtsxeta
                  </div>
                  <div class="col-2 feeClassBlue mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 7 }" @click="activateFee(7)">
                      Kojori
                  </div>
                  <div class="col-2 feeClassBlue mx-2" v-if="deliveryActiveVar" :class="{ active: activeFee_el == 8 }" @click="activateFee(8)">
                      KTA
                  </div>
                </div>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="blue"
              text
              x-large
              @click="deliveryCustomer()"
            >
              Delivery: {{ Number(totalNet).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End Of Ronnys Modal -->

      <!-- Start Of Glovo Modal -->

    
      <v-dialog 
        v-model="glovoModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Glovo Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>

                  <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" clearable></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.code" class="my-2" label="3 Digit Code #" required clearable></v-text-field>

                    <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-if="discountActive" v-model="curentCustomer.personal_id" class="my-2" label="ID #" clearable required></v-text-field>

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="curentCustomer.address" clearable></v-text-field>

                    <!-- <v-combobox
                      v-model="curentCustomer.address"
                      label="Address"
                      multiple
                      chips
                      dense
                    ></v-combobox> -->

                    <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail"></v-text-field>

                    <v-text-field v-model="curentCustomer.comment2" class="my-2" label="Driver Details" clearable></v-text-field>
                      
                    <v-text-field v-model="curentCustomer.ltdName" v-if="corporateActive" class="my-2" label="LTD Name" clearable></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.ltdId" v-if="corporateActive" class="my-2" label="LTD ID#" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="green"
              text
              x-large
              @click="glovoCustomer('cash')"
            >
              Glovo Pay later : {{ Number(totalPrice).toFixed(2) }}
            </v-btn>     
            <v-btn
              color="blue darken-1"
              class="blue"
              text
              x-large
              @click="glovoCustomer('transfer')"
            >
              Glovo Transfer: {{ Number(totalPrice).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End Of Glovo Modal -->

      <!-- Start Of Wolt Modal -->

      <v-dialog 
        v-model="woltModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Wolt Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                                          
                    <v-text-field v-model="curentCustomer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" clearable autofocus></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.code" class="my-2" label="3 Digit Code #" required clearable></v-text-field>

                  
                    <v-radio-group v-model="curentCustomer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-if="discountActive" v-model="curentCustomer.personal_id" class="my-2" label="ID #" clearable required></v-text-field>

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="curentCustomer.address" clearable></v-text-field>

                    <!-- <v-combobox
                      v-model="curentCustomer.address"
                      label="Address"
                      multiple
                      chips
                      dense
                    ></v-combobox> -->

                    <v-text-field v-model="curentCustomer.comment" class="my-2" label="Comment" clearable></v-text-field>

                    <v-text-field v-model="curentCustomer.email" :rules="emailRules" class="my-2" label="E-mail"></v-text-field>

                    <v-text-field v-model="curentCustomer.comment2" class="my-2" label="Driver Details" clearable></v-text-field>
                      
                    <v-text-field v-model="curentCustomer.ltdName" v-if="corporateActive" class="my-2" label="LTD Name" clearable></v-text-field>
                    
                    <v-text-field v-model="curentCustomer.ltdId" v-if="corporateActive" class="my-2" label="LTD ID#" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="blue"
              text
              x-large
              @click="woltCustomer()"
            >
              Wolt order:  {{ Number(totalNet).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End Of Wolt Modal -->

      <!-- Start Of Future Modal -->

      <div v-if="futureModal">
          <v-dialog 
          v-model="futureModal"
          max-width="600px"
        >
        <v-card>
            <v-card-title>
              <span class="headline">Future Order</span>
            </v-card-title>
            <v-card-text>
                <v-row>
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
                  <v-time-picker
                    format="24hr"
                    dark
                    v-model="futureTime"
                    scrollable
                  ></v-time-picker>
                  <v-text-field readonly v-model="futureTime" label="Enter Time 00:00 format (14:30)"></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="blue darken-1"
                x-large
                @click="cancelFuture()"
              >
                Cancel Future
              </v-btn>
              <v-btn
                color="green darken-1"
                x-large
                @click="futureOrder()"
              >
                Select Date
              </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
      </div>

      <!-- End Of Future Modal -->

      <!-- Start Of Setting Modal -->
      <div class="float-right">
        <v-dialog 
          v-model="settingModal"
          max-width="800px"
        >
        <v-card height="100vh">
            <v-card-title>
              <span class="headline">Unpaid Orders</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-data-table
                    v-model="selected"
                    :search="search"
                    :items="filteredOrders"
                    :headers="settingHeaders"
                    :items-per-page="itemsPerPage"
                    item-key="order_id"
                    :loading="loadingTable"
                    :single-select="singleSelect"
                    show-select
                    class="elevation-1"
                    @page-count="pageCount = $event"
                  >
                      <template v-slot:item="row">
                          <tr @click="onButtonClick(row.item)">
                            <td>{{row.item.id}}</td>
                            <td>{{row.item.order_data.deliveryMethod}}</td>
                            <td>{{row.item.order_data.customer.code}}</td>
                            <td>{{row.item.order_data.customer.phone}}</td>
                            <td>{{row.item.order_data.customer.name}}</td>
                            <td>{{row.item.order_data.adress}}</td>
                            <td>{{row.item.order_data.items[0].name}}</td>
                            <td>{{row.item.order_data.totalPrice}}</td>
                            <td>{{row.item.created_at}}</td>
                            <td>
                              <v-btn class="mx-2" fab dark small color="green" @click="rePrint(row.item)">
                                  <v-icon dark>print</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                      </template>
                  </v-data-table>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                icon
                x-large
                @click="arrowOrder('down')"
              >
                <i class="material-icons md-36" style="font-size: 3em" >south</i>
              </v-btn>
              <v-btn
                color="blue darken-1"
                icon
                x-large
                @click="arrowOrder('up')"
              >
                <i class="material-icons md-36" style="font-size: 3em" >north</i>
              </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
      </div>

      <!-- End Of Setting Modal -->

      <!-- Start Of Function Modal -->

      <v-dialog 
        v-model="functionModal"
        max-width="800px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Functions</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <router-link to="/timetable">
                  <v-btn color="blue" elevation="1" x-large>Timeclock</v-btn>
                </router-link>
                <router-link to="/max">
                  <v-btn color="blue" elevation="1" x-large>KDS</v-btn>
                </router-link>
                <router-link to="/orders">
                  <v-btn color="blue" elevation="1" x-large>Orders</v-btn>
                </router-link>
                <router-link to="/driverdispatch">
                  <v-btn color="blue" elevation="1" x-large>Drivers</v-btn>
                </router-link>
                <v-btn color="green" elevation="1" x-large @click="print()">NO SALE</v-btn>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
      </v-card>
      </v-dialog>
      <!-- End of Function Modal -->

      <!-- Start Of Diplomat Modal -->

      <v-dialog 
        v-model="diplomatModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Diplomat Discount</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="customer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" required clearable></v-text-field>
                    
                    <v-text-field v-model="customer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" required clearable></v-text-field>

                    <v-radio-group v-model="customer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-model="customer.id" class="my-2" label="Diplomat #" ></v-text-field>
                    

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="customer.address" clearable required></v-text-field>

                    <!-- <v-combobox
                      v-model="curentCustomer.address"
                      label="Address"
                      multiple
                      chips
                      dense
                    ></v-combobox> -->

                    <v-text-field v-model="customer.driver" class="my-2" label="Driver Details" clearable></v-text-field>

                    <v-text-field v-model="customer.email" :rules="emailRules" class="my-2" label="E-mail" ></v-text-field>

                    <v-text-field v-model="customer.comment" class="my-2" label="Comment" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              x-large
              @click="diplomatDisc()"
            >
              Discount: - {{ ((this.totalNet/100) * this.diplomatDiscount).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End of diplomat modal -->

      <!-- Start of student modal -->

      <v-dialog 
        v-model="studentModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Student Discount</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="customer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" required clearable></v-text-field>
                    
                    <v-text-field v-model="customer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" required clearable></v-text-field>

                    <v-radio-group v-model="customer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-model="customer.id" class="my-2" label="Personal #" ></v-text-field>
                    

                    <v-text-field name="input-7-1" label="Street address" :rules="addressRules" v-model="customer.address" clearable required></v-text-field>

                    <v-text-field v-model="customer.driver" class="my-2" label="Driver Details" clearable></v-text-field>

                    <v-text-field v-model="customer.email" :rules="emailRules" class="my-2" label="E-mail" ></v-text-field>

                    <v-text-field v-model="customer.comment" class="my-2" label="Comment" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              x-large
              @click="studentDisc()"
            >
              Discount:  {{ ((this.totalNet/100) * this.studentDiscount).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- End of student modal -->

      <!-- Start of team modal -->

    
      <v-dialog 
        v-model="teamModal"
        max-width="700px"
      >
      <v-card>
          <v-card-title>
            <span class="headline">Team Discount</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="customer.phone" @keypress="isNumber($event)" :rules="telRules" class="my-2" label="Tel" required clearable></v-text-field>
                    
                    <v-text-field v-model="customer.name" :counter="10" :rules="nameRules" class="my-2" label="Name" required clearable></v-text-field>

                    <v-radio-group v-model="customer.gender" label="Gender" row>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Female" value="female"></v-radio>
                        <v-radio label="None" value="none"></v-radio>
                    </v-radio-group>

                    <v-text-field v-model="customer.id" class="my-2" label="Personal #" ></v-text-field>
                    

                    <v-text-field name="input-7-1" label="Street address *" :rules="addressRules" v-model="customer.address" clearable required></v-text-field>

                    <v-text-field v-model="customer.driver" class="my-2" label="Driver Details" clearable></v-text-field>

                    <v-text-field v-model="customer.email" :rules="emailRules" class="my-2" label="E-mail" ></v-text-field>

                    <v-text-field v-model="customer.comment" class="my-2" label="Comment" clearable></v-text-field>

                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              x-large
              @click="employeeDisc()"
            >
              Discount:  {{ ((this.totalNet/100) * this.employeeDiscount).toFixed(2) }}
            </v-btn>   
          </v-card-actions>
      </v-card>
      </v-dialog>
      <!-- End of student modal -->
      <!-- Start of manager modal -->
      <v-dialog
          v-model="managerModal"
          max-width="300px"
        >
          <v-card>
            <v-card-title>
              Manager Discount
            </v-card-title>
            <v-card-text>
              <v-text-field v-if="managerAmount ==  ''" v-model="managerPercent" label="Manager Discount Percent" class="my-2" ></v-text-field>
              <v-text-field v-if="managerAmount != ''" v-model="managerPercent" label="Manager Discount Percent" class="my-2" disabled ></v-text-field>
              <v-text-field v-if="managerPercent == ''" v-model="managerAmount" label="Manager Discount Amount" class="my-2" ></v-text-field>
              <v-text-field v-if="managerPercent != ''" v-model="managerAmount" label="Manager Discount Amount" class="my-2" disabled ></v-text-field>
              <v-text-field v-model="managerComment" label="Manager Comment" class="my-2"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="blue"
                text
                @click=" checkAmount()"
              >
                Apply Discount
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End of manager modal -->

        <!-- Start of manager PIN modal -->
          <v-dialog
              v-model="managerPin"
              max-width="500px"
            >
              <v-card>
                
                <div class="container" style="width: 400px;" >
              
              <div class="row">
                  <v-alert dense type="info" v-model="pinError" dismissible>
                      The Pin You Entered is Not Correct
                  </v-alert>

                  <div class="col-12" style="margin: auto">
                      <ul id="display">
                          <li v-for="(num, index) in pinSync" :key="index">{{ num }}</li>
                          <div class="clear"></div>
                      </ul>
                  </div>
              </div>
              <div class="row">
                  <div class="col pinBtn" @click="pinChar('1')">
                      1
                  </div>
                  <div class="col pinBtn" @click="pinChar('2')">
                      2
                  </div>
                  <div class="col pinBtn" @click="pinChar('3')">
                      3
                  </div>
              </div>
              <div class="row">
                  <div class="col pinBtn" @click="pinChar('4')">
                      4
                  </div>
                  <div class="col pinBtn" @click="pinChar('5')">
                      5
                  </div>
                  <div class="col pinBtn" @click="pinChar('6')">
                      6
                  </div>
              </div>
              <div class="row">
                  <div class="col pinBtn" @click="pinChar('7')">
                      7
                  </div>
                  <div class="col pinBtn" @click="pinChar('8')">
                      8
                  </div>
                  <div class="col pinBtn" @click="pinChar('9')">
                      9
                  </div>
              </div>
              <div class="row">
                  <div class="col pinBtn" @click="pinChar('clear')">
                      C
                  </div>
                  <div class="col pinBtn" @click="pinChar('0')">
                      0
                  </div>
                  <div class="col pinBtn green" @click="pinChar('enter')">
                      E
                  </div>
              </div>
          </div>
          
          </v-card>
        </v-dialog>
        <!-- End of manager PIN modal -->

        <!-- Start of split modal -->
        <v-dialog
          v-model="splitModal"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              Total Due: {{ Number(totalPrice).toFixed(2) }}
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="splitCash" label="Split Cash" class="my-2" ></v-text-field>
              <v-text-field v-model="splitCard" label="Split Card" class="my-2"  ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="blue"
                text
                @click="applySplit()"
              >
                Pay Split
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End of split modal -->
        <v-bottom-sheet v-model="discountActive">
          <v-sheet
            class="text-center"
            height="200px"
          >
            <v-btn
              class="mt-6"
              text
              color="red"
              @click="discountActive = !discountActive"
            >
              close
            </v-btn>
            <div class="py-3">
              Discount is available! Please Enter manager PIN!
            </div>
          </v-sheet>
        </v-bottom-sheet>
  </div>
</v-app>
</template>

<script>

document.onkeypress = function (e) {
  e = e || window.event;
  if(e.ctrlKey && e.keyCode === 10) {
    document.documentElement.classList.toggle('dark-mode');
  }
}


// @ is an alias to /src

//import Helloworld from '../components/HelloWorld'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Products from "../components/Products";
import Drinks from "../components/Drinks"
import Orders from "../components/Orders"
import router from 'vue-router'
// import authService from "../services/auth.service";
//import Pizzas from '../components/Pizzas'
//import Categories from '../components/Categories';
import Ingredients from "../components/Ingredients";
import SticksIngredients from "../components/SticksIngredients";
import "bootstrap/dist/css/bootstrap.css";
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import Vue from "vue";
import axios from "axios";
import _ from "lodash";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "Home",  
    props: {
        orderIndex: {
            type: Number,
            default: -1
        },

    },
  data() {
    return {
      cheesseLoversActive: false,
      loversActive: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      discountActive: false,
      discountActiveVar: false,
      activeDiscType: "",
      managerPin: false,
      enteredPin: '',
      pinError: false,
      pinDecon: ['-','-','-','-'],
      addressList: [],
      isReopen: false,
      fullOrder: [],
      futureTime: null,
      cutsCount: null,
      restrictEdit: false,
      arrowIndex: -1,
      payLaterActive: false,
      futureActive: false,
      orders: [],
      filteredOrders:[],
      selectedOrder: [],
      discountActive: false,
      corporateActive: false,
      discountTypes: [
        { id : 0, name: 'Diplomat' },
        { id : 1, name: 'Student' },
        { id : 2, name: 'Team' },
        { id : 3, name: 'Social' },
        { id : 4, name: 'Corporate' },
        { id : 5, name: 'Manager' },
      ],
      settingHeaders: [
        { text: "Service Type", value: "order_data.deliveryMethod" },
        { text: "Glovo/Wolt #", value: "order_data.customer.code" },
        { text: "Customer Phone", value: "order_data.customer.phone" },
        { text: "Customer Name", value: "order_data.customer.name" },
        { text: "Delivery Adress", value: "order_data.adress" },
        { text: "Order Items", value: "order_data.items[0].name" },
        { text: "Total", value: "order_data.totalPrice" },
        { text: "Date", value: "order_data.created_at" },
      ],
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
          { text: "Customer Phone", value: "order_data.customer.phone" },
          { text: "Order Items", value: "order_data.items[0].name" },
        ],
      selected: [],
      loading: false,
      search: null,
      items: [],
      select: null,
      page: 0,
      pageCount: 0,
      itemsPerPage: -1,
      loadingTable: true,
      singleSelect: true,
      printError: false,
      valid: true,
      nameRules: [
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      telRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length <=20) || 'Phone be less than 20 characters',
      ],
      addressRules: [
          v => !!v || 'Adress is required',
      ],
      emailRules: [
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      noAB: false,
      alert: false,
      showProducts: true,
      showIngredients: false,
      cutActive: false,
      mediumCuts: true,
      smallHalf: false,
      qtyBar: false,
      discountInfo: [],
      telMessage: '',
      date: new Date(),
        options: {
          format: 'DD/MM/YYYY hh:mm',
          useCurrent: false,
      },
      dateCrm: new Date(),
      menu: false,   
      telMessageActive: false,
      order: {
        id: 0,
        pos_id: null,
        safe_id: null,
        orderId: Number,
        items: [],
        deliveryMethod: "Walk_In",
        deliveryType: "Walk_In",
        deliveryFee: 0,
        payment: 0,
        totalPrice: 0,
        isFuture: false,
        discountAmount: false,
        date: '00-00-000 00:00',
        customer: '',
        discount: 0,
        discountName: '',
        coupon: 0,
      },
      crustVar: false,
      deliveryFee: [{id: 0,fee: 2.5, min: 0, text: "2.5 GEL 0-3.9 Km"},
                    {id:1,fee:4, min: 0,  text: "4 GEL 4-9.9 Km"}, 
                    {id:2,fee:6, min: 0, text: "6 GEL 10-15.9 Km"}, 
                    {id:3,fee:7.5, min: 0, text: "7.5 GEL 16-19.9 Km"}, 
                    {id:4,fee:8, min: 40, text: "8 GEL Tskneti"}, 
                    {id:5,fee:10, min: 60, text: "10 GEL Tsavkisi"}, 
                    {id:6,fee:10, min: 60, text: "10 GEL Mtsxeta"},
                    {id:7,fee:12, min: 60, text: "12 GEL Kojori"},
                    {id:8,fee:14.5, min: 100, text: "14.5 GEL KTA"} ],
      deliveryType: [{id: 0, type: 'delivery'}, {id: 1, type: 'glovo'},{id: 2, type: 'wolt'}],
      promise: [{id: 0, time:15},{id: 1, time:20},{id: 2, time:30}, {id: 3, time:40}, {id: 4, time:50}],
      promiseTime: 15,
      deliveryFeeVar: -1,
      deliveryTypeVar: -1,
      ronnysActive: false,
      glovoActive: false,
      woltActive: false,
      active_el: -1,
      activeFee_el: -1,
      promiseFee_el: 0,
      diplomatModal: false,
      studentModal: false,
      teamModal: false,
      managerModal: false,
      managerModalVar: false,
      splitModal: false,
      calculatorModal: false,
      calculatorModal1: false,
      crmModal: false,
      glovoModal: false,
      woltModal: false,
      ronnysModal: false,
      activeInvoice: false,
      invoice: {
        tel: null,
        name: '',
        ltd: '',
        id: null,
        address: '',
        phone: '',
        email: ''
      },
      deliveryModal: false,
      deliveryFeeModal: false,
      deliveryTypeModal: false,
      loggedUserFull: false,
      walkInModal: false,
      takeOutModal: false,
      discountOrder: false,
      discountItem: false,
      diplomatDiscount: 18,
      employeeDiscount: 40,
      studentDiscount: 15,
      corporateDiscount: 0,
      managerPercent: '',
      managerAmount: '',
      managerComment: '',
      managerAmountVar: false,
      managerPercentVar: false,
      couponModal: false,
      ingProduct: {},
      ingHalfPizza: false,
      ingHalfPizzaPart: -1,
      ingDefToppings: [],
      ingToppings: [],
      customerOrdersComponent: false,
      settingModal: false,
      functionModal: false,
      confirmModal: false,
      invoiceModal: false,
      invoiceActiveVar: false,
      changeModal: false,
      futureModal: false,
      bigOrderModal: false,
      bigorderSelected: [],
      paymentType: "",
      isPizza: "no",
      isHalfPizza: "no",
      isSticks: false,
      halfPizzaAll: false,
      halfPizzaCounter: 1,
      halfPizzaIndex: 0,
      walkInActiveChange: false,
      walkinActiveVar: true,
      takeoutActiveVar: false,
      deliveryActiveVar: false,
      promiseActiveVar: false,
      curSauce: 'sauce',
      activeSmall: false,
      activeMedium: true,
      activeXl: false,
      cashInput: '',
      splitCash: null,
      splitCard: null,
      splitChange: false,
      split: {
        split1: {
          input: 0,
          paymentType: ''
        },
        split2: {
          input: 0,
          paymentType: ''
        }
      },
      halfPizzaPart: 0,
      wholePizzaPart: 0,
      wholePizzaActive: false,
      drinkCat: false,
      splitActive: false,
      userName: localStorage.getItem('USER_NAME'),
      userLast: localStorage.getItem('USER_LAST'),
      userEmail: localStorage.getItem('USER_EMAIL'),
      userPosition: localStorage.getItem('USER_POSITION'),
      userRole: localStorage.getItem('USER_ROLE'),
      wholePizza: false,
      halfProduct: false,
      categoryId: -1,
      itemIndex: -1,
      selectedProducts: [],
      splitPart: 0,
      selectedIngredients: [],
      productRecipe: [],
      recipes: [],
      toppingPrice: [],
      logged_user_name: localStorage.getItem("USER_NAME"),
      logged_user_position: localStorage.getItem("POSITION"),
      tax: 0,
      sticks: {
        name: "",
        price: 0,
        totalPrice: 0,
        size: 'original',
        // crust: "original",
        // sauce: "original",
        custom: "sticks",
        defaultToppings: [],
        toppings: [],
        qty: 0,
      },
      pizza: {
        name: "",
        price: 0,
        totalPrice: 0,
        crust: "original",
        sauce: "sauce",
        custom: "no",
        size: "m",
        defaultToppings: [],
        toppings: [],
        half1: { toppings: [], defaultToppings: [] },
        half2: { toppings: [], defaultToppings: [] },
        qty: 0,
      },
      customer: {
        name: '',
        gender: '',
        email: '',
        dob: '',
        address: '',
        phone: '',
        tel2: '',
        discount: '',
        comment: '',
        comment2: ''
      },
      customerChecked: false,
      lastOrder: {},
      curentCustomer: {
        name: '',
        gender: '',
        email: '',
        dob: '',
        address: '',
        phone: '',
        tel2: '',
        comment: '',
        comment2: '',
        invoice: {
          tel: null,
          name: '',
          ltd: '',
          id: null,
          address: '',
          phone: '',
          email: ''
        },
      },
      searchResults: [],
      gender: ['Male', 'Female'],
      customPizza: {
        crust: "original",
        sauce: "",
        size: "",
        price: 0,
        totalPrice: 0,
        name: "",
        custom: "yes",
        half1: { name: "", defaultToppings: [], toppings: [] },
        half2: { name: "", defaultToppings: [], toppings: [] },
        qty: 0,
      },
      productList: {},
      //   pizza_: {crust: 'original', parts: [{toppings: []}, {toppings: []}]},  this.pizza_.parts[0].toppings
      //           {half1: {defaultTop: [], top: []}, half2: {defaultTop:[], top: []}}
      version: 0,
      globalQuantity: 1,
      globalQuantityClick: 0,
      globalCalcClick: 0,
      orderDefTotal: 0,
      //pizza: {crust: 'original', sauce: 'original', size: 'm', defaultTopping:[], toppings: [], qty: 0}
    };
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
            || vm.$store.state.auth.user.data.role.toLowerCase() == "cook" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "driver") {
         vm.$router.push({name: "pos"}).catch(()=>{});
       }
       else {
         vm.$router.push({name: "dashboard"}).catch(()=>{});
       }
    });
  },

  mounted() {
    this.setTime();
    window.addEventListener("keypress", e=> {
        this.logKey(e);
    });
    this.date = this.formatDate(this.date);
    this.dateCrm = this.formatDate(this.dateCrm);

    this.loggedUserFull = JSON.parse(localStorage.getItem("loggedUserData"));

    const TOKEN = localStorage.getItem("TOKEN");

    var bodyFormData = new FormData();
    //bodyFormData.set("branch", this.branch);
    bodyFormData.set("status_key", '1,2,3,4,5,6');
    // bodyFormData.set("day", '2021-07-02');

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
        this.filteredOrders = this.orders.filter((x) => x.payment_method_id === '4' && x.order_data.paymentType != 'invoice');
      });

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "products/get-ingredients-price",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.toppingPrice = response.data;
      });

      axios
      .request({
        method: "get",
        url:
          this.$hostname + "products/get-order-id",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.order.orderId = response.data;
      });
      

    if (localStorage.getItem("items")) {
      try {
        this.order = JSON.parse(localStorage.getItem("items"));
        this.itemIndex = this.order.items.length - 1;
        console.log('role', this.$store.state.auth.user.data.role);
      } catch (e) {
        localStorage.removeItem("items");
      }
    } else {
      this.selectedProducts = [];
    }

    if(localStorage.getItem("reopenItem")){
      try {
        var fooOrder = JSON.parse(localStorage.getItem("reopenItem"));
        console.log('FOO: ', fooOrder)
        this.fullOrder = fooOrder;
        this.order = fooOrder.order_data;
        this.isReopen = true;
        this.itemIndex = this.order.items.length -1;
        // alert(this.order.paymentType);
        if(this.order.paymentType == "invoice"){
          // alert("invoice");
          this.invoice = this.order.invoice;
        }
        if(this.order.deliveryMethod == 'Walk_In'){
          this.walkinActive('no');
        } else if(this.order.deliveryMethod == 'Take Out'){
          this.takeoutActive('no');
        } else if(this.order.deliveryMethod == 'delivery'){
          this.ronnysDelivery('no');
        } else if(this.order.deliveryMethod == 'Wolt'){
          this.woltDelivery('no');   
        } else if(this.order.deliveryMethod == 'Glovo' || this.order.deliveryMethod == 'Glovo Cash'){
          this.glovoDelivery('no');
        }
        this.curentCustomer = fooOrder.order_data.customer;
      }
      catch (e){
        localStorage.removeItem("reopenItem");
      }
    }
    else{
      this.order.id = 0;
    }

    if(localStorage.getItem("payItem")){
      try {
        var fooOrder = JSON.parse(localStorage.getItem("payItem"));
        this.order = fooOrder.order_data;
        this.showProducts = false;
        this.showIngredients = false;
        this.order.totalPrice = this.totalPrice.toFixed(2);
        if(this.order.deliveryMethod == 'Walk_In'){
          this.walkinActive('no');
        } else if(this.order.deliveryMethod == 'Take Out'){
          this.takeoutActive('no');
        } else if(this.order.deliveryMethod == 'delivery'){
          this.ronnysDelivery('no');
        } else if(this.order.deliveryMethod == 'Wolt'){
          this.woltDelivery('no');   
        } else if(this.order.deliveryMethod == 'Glovo' || this.order.deliveryMethod == 'Glovo Cash'){
          this.glovoDelivery('no');
        }
        this.calculatorModal = true;
      }
      catch (e){
        localStorage.removeItem("payItem");
      }
    }
    else{
      this.order.id = 0;
    }
  },
  components: {
    Products,
    datePicker,
    Drinks,
    Orders,
    Ingredients,
    SticksIngredients
  },
  computed: {
    pinSync() {
      return this.pinDecon;
    },
    totalOrder: {
      cache: false,
      get() {
        var totalPrice = 0;
        this.order.items.forEach((i) => {
          if(i.custom === 'other'){
            var price = i.price * i.qty;
            totalPrice = totalPrice + price;
          } else {
            var price = i.totalPrice * i.qty;
            totalPrice = totalPrice + price;    
          }
        });
        
        return totalPrice;
      },
    },
    totalNet: {
      cache: false,
      get() {
        var totalPrice = 0;
        this.order.items.forEach((i) => {
          if(i.custom === 'other'){
            var price = i.price * i.qty;
            totalPrice = totalPrice + price;
          } else {
            var price = i.totalPrice * i.qty;
            totalPrice = totalPrice + price;    
          }
        });
        
        return totalPrice + this.order.deliveryFee;
      },
    },
    totalDisc: {
      cache: false,
      get() {
        var totalDisc = 0;
        
        //var toppingsPrice = 0;
        
        if(this.order.discountAmount == true){
          var disc = Number(this.order.discount);          
        } else if(this.order.discountName == 'Diplomat') {
          var disc = this.totalNet - this.totalNet / 1.18;
        } else {
          var disc = (this.totalNet/100) * this.order.discount;
        }

        return disc;
      },
    },
    nameState() {
        return this.customer.name.length > 0 ? true : false
    },
  
    getTime() {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      return time;
    },
    curNameState() {
        return this.curentCustomer.name.length > 0 ? true : false
    },

    cusAdrsState(){
         return this.curentCustomer.address.length > 0 ? true : false;
    },
    telState() {
        return this.customer.phone.length > 8 ? true : false
    },
    curTelState() {
        return this.curentCustomer.phone.length > 8 ? true : false
    },
    curTel2State() {
        return this.curentCustomer.phone2.length > 8 ? true : false
    },
    totalTax() {
      return (this.totalNet.toFixed(1) / 100) * this.tax;
    },
    totalPrice: {
      cache: false,
      get() {
        var totalPrice = 0;
        if(this.order.discountAmount == true){
          var disc = Number(this.order.discount);          
        } else if(this.order.discountName == 'Diplomat') {
          var disc = this.totalNet - this.totalNet / 1.18;
        } else {
          var disc = (this.totalNet/100) * this.order.discount;
        }
        totalPrice = this.totalNet - disc;
        return totalPrice;
      },
    },
    totalCustomer: {
      cache: false,
      get() {
        var totalPrice = 0;
        var totalDisc = 0;
        this.order.items.forEach((i) => {
          var price = i.totalPrice * i.qty;
          totalPrice = totalPrice + price;
        });
        var disc = (totalPrice/100) * this.order.discount;
        var deliveryFee = this.order.deliveryFee; 
        totalPrice = totalPrice - disc + deliveryFee;
        return totalPrice;
      },
    },
    uniqToppings() {
      return _.uniqBy(this.order.items.toppings, "id");
    },
    toppingIdCountMap() {
      const mapping = {};
      if (this.isHalfPizza == "yes" && this.halfPizzaPart == 1) {
        this.customPizza.half1.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
        // this.customPizza.half1.defaultToppings.forEach((t) => {
        //     mapping[t.id] = t.count;
        // });
      } else if (this.isHalfPizza == "yes" && this.halfPizzaPart == 2) {
        this.customPizza.half2.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
        // this.customPizza.half2.defaultToppings.forEach((t) => {
        //     mapping[t.id] = t.count;
        // });
      }
      else if (this.isHalfPizza == "yes" && this.halfPizzaPart == 0) {
        this.customPizza.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
        // this.customPizza.half2.defaultToppings.forEach((t) => {
        //     mapping[t.id] = t.count;
        // });
      } else if (this.isPizza == "yes" && this.wholePizzaPart == 1) {
        this.pizza.half1.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
        // this.customPizza.half1.defaultToppings.forEach((t) => {
        //     mapping[t.id] = t.count;
        // });
      } else if (this.isPizza == "yes" && this.wholePizzaPart == 2) {
        this.pizza.half2.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
        // this.customPizza.half2.defaultToppings.forEach((t) => {
        //     mapping[t.id] = t.count;
        // });
      } 
      else if(this.isSticks){
        this.sticks.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
      }
      else {
        this.pizza.toppings.forEach((t) => {
          mapping[t.id] = t.count || 1;
        });
      }
      return mapping;
    },
    ingredientComponent() {
      if(this.wholePizzaPart === 1) {
        this.ingProduct = this.pizza;
        this.ingDefToppings = this.pizza.half1.defaultToppings;
        this.ingToppings = this.pizza.half1.toppings;
        this.ingHalfPizza = this.isHalfPizza;
        this.ingHalfPizzaPart = -1;

        return 'WPP1';
      }
      else if(this.wholePizzaPart === 2) {
        this.ingProduct = this.pizza;
        this.ingDefToppings = this.pizza.half2.defaultToppings;
        this.ingToppings = this.pizza.half2.toppings;
        this.ingHalfPizza = this.isHalfPizza;
        this.ingHalfPizzaPart = -1;
        return 'WPP2';
      }
      else if(this.wholePizzaPart === 3) {
        this.ingProduct = this.pizza;
        this.ingDefToppings = this.pizza.defaultToppings;
        this.ingToppings = this.pizza.toppings.concat(this.pizza.half1.toppings, this.pizza.half2.toppings);
        this.ingHalfPizza = this.isHalfPizza;
        this.ingHalfPizzaPart = -1;
        return 'WPPA';
      }
      else if(this.halfPizzaPart === 1) {
        this.ingProduct = this.customPizza.half1;
        this.ingDefToppings = this.customPizza.half1.defaultToppings;
        this.ingToppings = this.customPizza.half1.toppings;
        this.ingHalfPizza = this.isHalfPizza;
        this.ingHalfPizzaPart = this.halfPizzaPart;
        return 'HPP1';
      }
      else if(this.wholePizzaPart === 2) {
        this.ingProduct = this.customPizza.half2;
        this.ingDefToppings = this.customPizza.half2.defaultToppings;
        this.ingToppings = this.customPizza.half2.topping;
        this.ingHalfPizza = this.isHalfPizza;
        this.ingHalfPizzaPart = this.halfPizzaPart;
        return 'HPP2';
      }
      else if(this.halfPizzaAll) {
        this.ingProduct = this.customPizza;
        this.ingDefToppings = this.customPizza.half2.defaultToppings.concat(this.customPizza.half1.defaultToppings);
        this.ingToppings = this.customPizza.half2.toppings.concat(this.customPizza.half1.toppings, this.customPizza.toppings);
        this.ingHalfPizza = this.isHalfPizza;
        this.ingHalfPizzaPart = this.halfPizzaPart;
        return 'HPA';
      }
    },
  },
  watch: {
      search (val) {
        if(this.checkNumber(val)){
          this.curentCustomer.phone = val;
        }
        val && val != this.select && this.querySelections(val)
      },
      curentCustomer(customer) {
        deep: true,

        //this.changeDisc();
        this.checkDisc();
        this.changeGender();
      },
      searchResults(val){
        if(val.length == 0){
          this.items = [];
        }
        else {
          this.items = this.searchResults;
        }
      },
      changeModal(val){
        if(!val){
          this.closeChangeModal();
        }
      },
      splitCash(val){
        this.splitCard = String((this.totalPrice - Number(val)).toFixed(2));
      },
    },
  methods: {
    setTime () {
      setInterval(() => {
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = this.checkSingleDigit(date.getMinutes());
        this.seconds = this.checkSingleDigit(date.getSeconds());
      }, 1000);
    },
      checkSingleDigit (digit) {
        return ('0' + digit).slice(-2)
    },
    bigOrder() {
      this.bigorderSelected.forEach( x => {
        x.isGift = true;
        x.totalPrice = 0;
      });

      this.bigOrderModal = false;
    },
    roundNumber(val) {
        var num = val;
        var oldNum = Number(val);
        var split = [];
        var digits = 0;
        var realDigits = 0;

        if (num.includes('.')){
          split = num.split('.');
          this.splitdata = split;
          num = split[1];
          digits = num.toString().split('');
          realDigits = digits.map(Number);
        } else {
          digits = num.toString().split('');
          realDigits = digits.map(Number);
        }

        if(0 <= realDigits[1] && realDigits[1] <= 4){
          oldNum = this.splitdata[0] + "." + Number(realDigits[0] + "0");
        } else if(realDigits[1] == 5){
          oldNum = this.splitdata[0] + "." + Number(realDigits[0] + "5");
        } else if(6 <= realDigits[1] && realDigits[1] <= 9){
          if(realDigits[0] == 9){
            oldNum = Number(this.splitdata[0]) + 1 +".00";
          } else {
            oldNum = this.splitdata[0] + "." + (Number(realDigits[0]) +1) + "0";
          }
        }
        
        return oldNum;
      },
    logKey(e) {
      if(this.managerPin){
        e=e || window.event;
        var charCode=(e.which) ? e.which: e.keyCode;

        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !==46) {
          e.preventDefault();
        }

        else {
          return this.pinChar(e.key);
        }
      }
    },
    pinChar(char) {
      if(char==='clear') {
        this.pinDecon=['-','-','-','-'];
        this.enteredPin='';
      }
      else if(char==='enter') {
        if(this.managerModalVar){
          this.applyManager(this.enteredPin)
        }
        else {
          this.checkManager(this.enteredPin);
        }
      }
      else {
        if(this.enteredPin.length === 3) {
          var index=this.pinDecon.indexOf('-');
          this.pinDecon[index]=char;
          this.enteredPin=this.enteredPin+char;
          if(this.managerModalVar){
            this.applyManager(this.enteredPin)
          }
          else {
            this.checkManager(this.enteredPin);
          }
          this.pinDecon=['-',
          '-',
          '-',
          '-'];
          this.enteredPin='';
        }
        else {
            var index=this.pinDecon.indexOf('-');
            this.pinDecon[index]=char;
            this.enteredPin=this.enteredPin+char;
            this.$forceUpdate();
        }
      }
    },
    checkAmount(){
       if(Number(this.managerAmount) <= this.totalPrice && Number(this.managerPercent <= 100)){
         this.managerPin = true;
         this.managerModal = false;
         this.managerModalVar = true;
       } else {
         alert('Discount Amount Is Larger Than Total');
       }
    },
    checkManager(pin){
      
      if(Number(this.managerAmount) <= this.totalPrice && Number(this.managerPercent <= 100)){
        this.managerPin = true;
        const TOKEN = localStorage.getItem("TOKEN");
        var bodyFormData = new FormData();
        bodyFormData.set("pin", pin);
        bodyFormData.set("order_id", this.order.orderId);
        axios
          .request({
            method: "post",
            url:
              this.$hostname + "manager/check-pin",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
              // console.log('MANAGER RESPONSE: ', response);
  
              if (response.data.data == true)
              {
                this.changeDisc();
                this.managerPin = false;
                this.discountActiveVar = false;
                return true;
              }
              else{
                return false;
              }
          });
      } else {
        alert("Discount Amount Is Larger Than Total");
      }
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
    checkNumber(n) { 
      return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
    },
    changeDefPrice(){
      this.order.items.forEach((x) => {
        if(x.custom == 'yes' || x.custom == 'no'){
          x.totalPrice = x.totalPrice + x.defCount;
        }
          // x.totalPrice = x.totalPrice + x.defCount;
      });
      this.order.totalPrice = this.totalNet;
      this.$forceUpdate();
    },
    changeDisc(){
      if(this.curentCustomer.discount == 'Diplomat'){
        this.diplomatDisc();
        this.discountActive = false;
      } else if(this.curentCustomer.discount == 'Student'){
        this.studentDisc();
        this.discountActive = false;
      } else if(this.curentCustomer.discount == 'Team'){
        this.employeeDisc();
        this.discountActive = false;
      } else if(this.curentCustomer.discount == 'Corporate'){
        this.corporateDisc();
        this.discountActive = false;
      } else if(this.curentCustomer.discount == ''){
        this.noDisc();
      }
    },
    checkDisc(){
      if(this.curentCustomer.discount == 'Diplomat'){
        this.discountActive = true;
        this.discountActiveVar = true;
        this.activeDiscType = 'Diplomat';
        this.order.discountName = 'Diplomat';
      } else if(this.curentCustomer.discount == 'Student'){
        this.discountActive = true;
        this.discountActiveVar = true;
        this.activeDiscType = 'Student';
        this.order.discountName = 'Student';
      } else if(this.curentCustomer.discount == 'Team'){
        this.discountActive = true;
        this.discountActiveVar = true;
        this.activeDiscType = 'Team';
        this.order.discountName = 'Team';
      } else if(this.curentCustomer.discount == 'Corporate'){
        this.discountActive = true;
        this.discountActiveVar = true;
        this.activeDiscType = 'Corporate';
        this.order.discountName = 'Corporate';
      } else if(this.curentCustomer.discount == ''){
        this.noDisc();
      }
    },
    changeGender(){
      if(this.curentCustomer.gender == 1){
        this.curentCustomer.gender = 'male';
      }
      else if(this.curentCustomer.gender == 0){
        this.curentCustomer.gender = 'female';
      }
      else {
        this.curentCustomer.gender = 'none';
      }

      // this.curentCustomer.gender = String(this.curentCustomer.gender)

    },
    reverseGender(){
      if(this.curentCustomer.gender == 'male'){
        this.curentCustomer.gender = 1;
      }
      else if(this.curentCustomer.gender == 'female'){
        this.curentCustomer.gender = 0;
      }
      else {
        this.curentCustomer.gender = -1;
      }

      // this.curentCustomer.gender = String(this.curentCustomer.gender)

    },
    customerPhone(val) {
      this.curentCustomer.phone = val;
      // alert('123' + val);
    },
    querySelections (v) {
        if (v.length > 6){
          this.checkUser(v);
          this.loading = true;
          }
          setTimeout(() => {
            this.items = this.searchResults;
            this.loading = false;
            return this.items;
        }, 500)

      },
        crmDiscount(discount){
            this.curentCustomer.discount = discount.name;
          this.$forceUpdate();
        },
        arrowOrder(way){
          var ordersLength = this.filteredOrders.length;
          var orderPosition = null;
          if(this.arrowIndex == -1){
            this.arrowIndex = 0;
          } else {
              if(this.arrowIndex < ordersLength-1 && this.arrowIndex > 0){
                if(way === 'up'){
                  // console.log('UP IF');
                  this.arrowIndex = this.arrowIndex -1;
                  this.order = this.filteredOrders[this.arrowIndex].order_data;
                }
                else if(way === 'down'){
                  // console.log('DOWN IF');
                  this.arrowIndex = this.arrowIndex + 1;
                  this.order = this.filteredOrders[this.arrowIndex].order_data;
                }
              } 
              else if(this.arrowIndex < ordersLength-1 && this.arrowIndex == 0){
                if(way === 'up'){
                  // console.log('UP els IF');
                  this.arrowIndex = ordersLength-1;
                  this.order = this.filteredOrders[this.arrowIndex].order_data;
                }
                else if(way === 'down'){
                  // console.log('DOWN else IF');
                  this.arrowIndex = this.arrowIndex + 1;
                  this.order = this.filteredOrders[this.arrowIndex].order_data;
                }
              }
              else {
                if(way === 'up'){
                  // console.log('UP ELSE');
                  this.arrowIndex = this.arrowIndex -1;
                  this.order = this.filteredOrders[this.arrowIndex].order_data;
                  // alert(this.arrowIndex);
                  // if(this.arrowIndex != ordersLength -1 ){
                  //   this.arrowIndex = ordersLength -1;
                  // } else {
                  //   this.arrowIndex = 0;
                  // }
                }
                else if(way === 'down'){
                  // console.log("DOWN ELSE");
                  this.arrowIndex = 0;
                  this.order = this.filteredOrders[this.arrowIndex].order_data;
                }
              }
            }
          // alert(this.arrowIndex);
        },
        onButtonClick(item) {
                this.showOrderComponent = true;
                this.order = item.order_data;
                this.order.id = item.id;
                this.restrictEdit = true;
                // this.lastOrder = item.order_data;
                this.selectedOrder = item;
                this.selectedOrderItems = item.order_data.items;
                this.curentCustomer = item.order_data.customer;
                this.payLaterActive = true;
                this.arrowIndex = this.filteredOrders.indexOf(this.selectedOrder);
                if(this.order.deliveryMethod == 'Walk_In'){
                  this.walkinActive('no');
                } else if(this.order.deliveryMethod == 'Take Out'){
                  this.takeoutActive('no');
                } else if(this.order.deliveryMethod == 'delivery'){
                  this.ronnysDelivery('no');
                } else if(this.order.deliveryMethod == 'Wolt'){
                  this.woltDelivery('no');   
                } else if(this.order.deliveryMethod == 'Glovo' || this.order.deliveryMethod == 'Glovo Cash'){
                  this.glovoDelivery('no');
                }
                this.doneOrder();

                console.log("Selected Item: ", this.selectedOrder);
            },
        validate () {
          if(this.$refs.form.validate()){
            alert('Form Is Valid!');
          }
          else {
            alert('Form Is Not Valid!');
          }
          
        },
        reset () {
          this.$refs.form.reset()
        },
        resetValidation () {
          this.$refs.form.resetValidation()
        },
        setVal() {
          setTimeout(() => this.telMessage = this.telMessage, 100);
        },
        goBack(){
          this.$router.push({path: 'dashboard'});
        },
        print(){
          axios
            .request({
              method: "post",
              url:
                "http://localhost/print/index.php",
            })
            .then((response) => {
              console.log('Open Drawer!', response.data.data);
            });
            // alert('DRAWER');
        },
        selectOrder(items){
          this.order = items;
        },
        activate(el){
            this.active_el = el;
            this.deliveryTypeVar = this.deliveryType[el].type;
        },
        activateFee(el){
          if(this.totalOrder > this.deliveryFee[el].min){
            this.activeFee_el = el;
            this.deliveryActiveVar = true;
            this.deliveryFeeVar = this.deliveryFee[el].fee;
            this.deliverCustomer(this.deliveryFeeVar);
          } else {
            alert('Min Order Amount Of ' + this.deliveryFee[el].min +' Is Required!');
          }
        },
        activatePromise(el){
            this.promiseFee_el = el;
            this.promiseActiveVar = true;
            this.promiseTime = this.promise[el].time;
        },
        totalPriceCounter(){
          var totalPrice = 0;
          this.order.items.forEach((i) => {
          var price = i.totalPrice * i.qty;
          totalPrice = totalPrice + price;
        });
        
        this.$forceUpdate();
        return totalPrice;
        },

        checkUser(tel){
          
          const TOKEN = localStorage.getItem("TOKEN");
          var bodyFormData = new FormData();
          bodyFormData.set("phone", tel);
          axios
            .request({
              method: "post",
              url:
                this.$hostname + "customers/get-customer",
                // "https://max.ronnyspizza.ge/rest/web/index.php?r=v1/customers/get-customer",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
                this.searchResults = response.data.data;
                this.searchResults.reverse();
                // console.log('Search Results: ',this.searchResults);
                //this.curentCustomer.phone = this.telMessage;
                //this.lastOrder = response.data.data[0].last_order;

            });
          // console.log('Curent User Data: ', this.curentCustomer);
          // alert(Object.keys(this.curentCustomer.invoice).length);
          if(Object.keys(this.curentCustomer.invoice).length !== 0) {
            this.invoice = this.curentCustomer.invoice;
          }
          // this.curentCustomer.address = this.curentCustomer.address.split(',');
            if(this.searchResults.length === 0){
              this.curentCustomer.phone = this.search;
            }
        },
      customerOrders(){
        this.settingModal = false;
        this.customerOrdersComponent = true;
        this.showProducts = false;

      },
        isEmailValid() {
          const reg =  /\S+@\S+\.\S+/;
          return (this.customer.email == "")? "" : (reg.test(this.customer.email)) ? 'has-success' : 'has-error';
      },
        
        isNumber(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();         

          } else {
            if(this.search != null){
              if(this.search.length >= 5){
                this.checkUser(this.search);
              }

            return true;
            }
              
          }    
      },
    categorySelect(id) {
      this.categoryId = id;
    },
    testAxios(){    
          const TOKEN = localStorage.getItem("TOKEN");
          var bodyFormData = new FormData();
          bodyFormData.set("branch", this.userLast);
          alert(this.userLast);
          axios.request({
              method: "post",
              url:
                this.$hostname + "manager/get-new-orders",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              console.log('------', response.data.data);
            });
    },
    productSelect(product) {
      console.log(product);
      this.playSound();

      if (product.category_name == "Pizza") {

        if(product.id == '56'){
          this.cheesseLoversActive = true;
          this.loversActive = true;
        }
        this.halfPizzaPart = 0;
        this.wholePizza = false;

        if (this.customPizza.qty === 0) {
          this.customPizza.qty = this.globalQuantity;
        }

        if (this.isHalfPizza == "yes" && this.halfPizzaCounter == 1) {
          if(product.id != '56'){
            // alert('BLA');
              this.smallHalf = true;
              console.log(" Product Recipe ", this.getRecipe(product));
              this.customPizza = {
                crust: "original",
                sauce: "sauce",
                size: "",
                price: 0,
                name: "",
                custom: "yes",
                toppings: [],
                half1: { name: "", sauce: "sauce", defaultToppings: [], toppings: [] },
                half2: { name: "", sauce: "sauce", defaultToppings: [], toppings: [] },
                toppingChange: 0,
                qty: 0,
            };
            if (this.customPizza.qty === 0) {
              this.customPizza.qty = this.globalQuantity;
            }
            this.customPizza.name = product.name;
            this.customPizza.half1.name = product.name;
            this.customPizza.half1.is_special = product.is_special;
            this.customPizza.half1.priceBySizes = product.priceBySizes;
            this.customPizza.price = this.customPizza.price + product.priceBySizes.m / 2;
            this.customPizza.size = "m";
            this.customPizza.cuts = false;
            this.customPizza.isSelected = false;
            this.halfProduct = true;
            product.qty = this.globalQuantity;
            this.selectedProducts.push(product);
            // this.itemIndex++;
          }
        } else if (this.isHalfPizza == "yes" && this.halfPizzaCounter == 2) {
          if(product.id != '56'){
            this.customPizza.half2.defaultToppings = this.getRecipe(product);
            this.customPizza.name = this.customPizza.name + "/" + product.name;
            this.customPizza.half2.name = product.name;
            this.customPizza.half2.is_special = product.is_special;
            this.customPizza.half2.priceBySizes = product.priceBySizes;
            this.customPizza.price = this.customPizza.price + product.priceBySizes.m / 2;
            this.customPizza.totalPrice = this.customPizza.price;
            product.qty = this.globalQuantity;
            this.selectedProducts.push(product);
            this.halfProduct = false;
            this.showProducts = false;
            this.showIngredients = true;
            this.order.items.push(this.customPizza);
            this.itemIndex++;
  
            this.halfPizza == "no";
            this.countTotalPrice();
          }

        } else {
          this.pizza = {
            name: "",
            price: 0,
            crust: "original",
            sauce: "sauce",
            size: "m",
            defaultToppings: [],
            toppings: [],
            half1: { toppings: [], defaultToppings: [] },
            half2: { toppings: [], defaultToppings: [] },
            toppingChange: 0,
            qty: 0,
          };
          this.pizza.defaultToppings = this.getRecipe(product);
          this.pizza.half1.defaultToppings = this.pizza.defaultToppings;
          this.pizza.half2.defaultToppings = this.pizza.defaultToppings;
          this.pizza.name = product.name;
          this.pizza.price = product.priceBySizes.m;
          this.pizza.priceBySizes = product.priceBySizes;
          this.pizza.totalPrice = this.pizza.price;
          this.pizza.custom = "no";
          this.pizza.qty = this.globalQuantity;
          this.pizza.id = product.id;
          this.pizza.is_special = product.is_special;
          this.pizza.cuts = false;
          this.pizza.isSelected = false;
          this.isSticks = false;
          this.isPizza = "yes";
          this.order.items.push(this.pizza);
          this.itemIndex++;
          this.wholePizza = true;
          this.wholePizzaPart = 3;
          this.selectedProducts.push(product);
          this.showProducts = false;
          this.showIngredients = true;
          this.countTotalPrice();
        }
      } 
      else if (product.category_name == "Sticks" || product.is_sticks == 1){
            
            if(this.isHalfPizza == "yes"){
              alert('Selected Product is not pizza');
            } else {
              let matched = false;
              if(!matched){
                  this.sticks= {
                          name: "",
                          price: 0,
                          totalPrice: 0,
                          custom: "sticks",
                          size: 'original',
                          defaultToppings: [],
                          toppings: [],
                          qty: 0,
                      },                
                  this.sticks.name = product.name;
                  this.sticks.qty = this.globalQuantity;
                  this.sticks.custom = "sticks";
                  console.log('recipe: ', this.getRecipe(product));
                  this.sticks.defaultToppings = this.getRecipe(product);
                  this.isSticks = true;
                  this.sticks.id = product.id;
                  this.sticks.price = parseFloat(product.price);
                  this.sticks.totalPrice = product.price;
                  this.sticks.isSelected = false;
                  this.selectedProducts.push(product);
                  this.itemIndex++;
                  this.order.items.push(this.sticks);
                  this.showProducts = false;
                  this.showIngredients = true;
                }
            }
      }
      else {
        let matched = false;
           this.order.items.forEach((i) => {
            if(parseInt(i.id) === parseInt(product.id ) && product.category_id !== 3){
                i.qty +=1;
                matched = true;
            }
        });

        if(!matched){
            product.qty = this.globalQuantity;
            product.custom = "other";
            product.price = parseFloat(product.price);
            product.totalPrice = product.price;
            this.selectedProducts.push(product);
            this.itemIndex++;
            this.order.items.push(product);
            this.globalQuantity = 1;
        }
        localStorage.setItem("items", JSON.stringify(this.order));
        console.log("Order Array: ", this.order);
        }
        console.log("Item Index: ",this.itemIndex);
        // alert(this.itemIndex);
        this.$forceUpdate();
    },
    ingredientSelect(ingredient) {
      this.selectedIngredients.push(ingredient);
    },
    deleteProduct(data) {
      this.order.items.splice(this.order.items.indexOf(data), 1);
      this.itemIndex = this.order.items.length - 1;
      console.log("selected item", this.selectedProducts);
      localStorage.setItem("items", JSON.stringify(this.order));
      this.showProductsComponent();
    },
    deleteDefaultTopping(topping) {
      // this.deleteTopping(topping);
      if (this.wholePizza || this.wholePizzaPart == 3) {
        //topping.isDeleted = false;
          this.order.items[this.itemIndex].defaultToppings.forEach(
            (t, index) => {
              if (parseInt(t.id) === parseInt(topping.id)) {
                if (t.name.slice(0, 3) === "No ") {
                  this.changeToppingPrice(this.order.items[this.itemIndex].size);
                  this.order.items[this.itemIndex].defaultToppings[index].isDeleted = false;
                t.name = t.name.slice(3);
                this.order.items[this.itemIndex].defaultToppings[index].name = topping.name;
                if(this.order.items[this.itemIndex].is_special == 0){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
                else if(this.order.items[this.itemIndex].is_special == 1){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
              }
              else {
                this.order.items[this.itemIndex].defaultToppings[
                  index
                ].isDeleted = true;
                this.order.items[this.itemIndex].defaultToppings[index].name =
                  "No " + topping.name;
                t.isDeleted = true;
                if(this.order.items[this.itemIndex].is_special == 0){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
                  else if(this.order.items[this.itemIndex].is_special == 1){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
              }
            }
            this.countTotalPrice();
          this.$forceUpdate();
            }
          );
        
      } 
      else if (this.wholePizzaPart == 1) {
          this.order.items[this.itemIndex].half1.defaultToppings.forEach(
            (t, index) => {
              if (parseInt(t.id) === parseInt(topping.id)) {
                if (t.name.slice(0, 3) === "No ") {
                  this.changeToppingPrice(this.order.items[this.itemIndex].size);
                  this.order.items[this.itemIndex].half1.defaultToppings[
                    index
                  ].isDeleted = false;
                
                t.name = t.name.slice(3);
                this.order.items[this.itemIndex].half1.defaultToppings[index].name = topping.name;
                if(this.order.items[this.itemIndex].is_special == 0){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
                else if(this.order.items[this.itemIndex].is_special == 1){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
              }
              else {
                this.order.items[this.itemIndex].half1.defaultToppings[
                  index
                ].isDeleted = true;
                this.order.items[this.itemIndex].half1.defaultToppings[index].name =
                  "No " + topping.name;
                t.isDeleted = true;
                if(this.order.items[this.itemIndex].is_special == 0){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
                  else if(this.order.items[this.itemIndex].is_special == 1){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
              }
            }
            this.countTotalPrice();
          this.$forceUpdate();
            }
          );
        } 
      else if (this.wholePizzaPart == 2) {
          this.order.items[this.itemIndex].half2.defaultToppings.forEach(
          (t, index) => {
            if (parseInt(t.id) === parseInt(topping.id)) {
              if (t.name.slice(0, 3) === "No ") {
                this.changeToppingPrice(this.order.items[this.itemIndex].size);
                this.order.items[this.itemIndex].half2.defaultToppings[
                  index
                ].isDeleted = false;
              
              t.name = t.name.slice(3);
              this.order.items[this.itemIndex].half2.defaultToppings[index].name = topping.name;
              if(this.order.items[this.itemIndex].is_special == 0){
                if(topping.id == 5){
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                  }
                  else {
                    this.order.items[this.itemIndex].totalPrice = 
                    this.order.items[this.itemIndex].totalPrice;
                  }
              }
              else if(this.order.items[this.itemIndex].is_special == 1){
                if(topping.id == 5){
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                  }
                  else {
                    this.order.items[this.itemIndex].totalPrice = 
                    this.order.items[this.itemIndex].totalPrice;
                  }
              }
            }
            else {
              this.order.items[this.itemIndex].half2.defaultToppings[
                index
              ].isDeleted = true;
              this.order.items[this.itemIndex].half2.defaultToppings[index].name =
                "No " + topping.name;
              t.isDeleted = true;
              if(this.order.items[this.itemIndex].is_special == 0){
                  if(topping.id == 5){
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                  }
                  else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                  }
                }
                else if(this.order.items[this.itemIndex].is_special == 1){
                  if(topping.id == 5){
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                  }
                  else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                  }
                }
            }
          }
          this.countTotalPrice();
        this.$forceUpdate();
          }
        );
      }
      else if (this.isHalfPizza == "yes") {
        if (this.halfPizzaPart == 1) {
          this.order.items[this.itemIndex].half1.defaultToppings.forEach(
            (t, index) => {
              if (parseInt(t.id) === parseInt(topping.id)) {
                if (t.name.slice(0, 3) === "No ") {
                  this.changeToppingPrice(this.order.items[this.itemIndex].size);
                  this.order.items[this.itemIndex].half1.defaultToppings[
                    index
                  ].isDeleted = false;
                
                t.name = t.name.slice(3);
                this.order.items[this.itemIndex].half1.defaultToppings[index].name = topping.name;
                if(this.order.items[this.itemIndex].half1.is_special == 0){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
                else if(this.order.items[this.itemIndex].half1is_special == 1){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
              }
              else {
                this.order.items[this.itemIndex].half1.defaultToppings[
                  index
                ].isDeleted = true;
                this.order.items[this.itemIndex].half1.defaultToppings[index].name =
                  "No " + topping.name;
                t.isDeleted = true;
                if(this.order.items[this.itemIndex].half1.is_special == 0){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
                  else if(this.order.items[this.itemIndex].half1.is_special == 1){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
              }
            }
            this.countTotalPrice();
          this.$forceUpdate();
            }
          );
        } else if (this.halfPizzaPart == 2) {
          this.order.items[this.itemIndex].half2.defaultToppings.forEach(
            (t, index) => {
              if (parseInt(t.id) === parseInt(topping.id)) {
                if (t.name.slice(0, 3) === "No ") {
                  this.changeToppingPrice(this.order.items[this.itemIndex].size);
                  this.order.items[this.itemIndex].half2.defaultToppings[
                    index
                  ].isDeleted = false;
                
                t.name = t.name.slice(3);
                this.order.items[this.itemIndex].half2.defaultToppings[index].name = topping.name;
                if(this.order.items[this.itemIndex].is_special == 0){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
                else if(this.order.items[this.itemIndex].is_special == 1){
                  if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                      this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice;
                    }
                }
              }
              else {
                this.order.items[this.itemIndex].half2.defaultToppings[
                  index
                ].isDeleted = true;
                this.order.items[this.itemIndex].half2.defaultToppings[index].name =
                  "No " + topping.name;
                t.isDeleted = true;
                if(this.order.items[this.itemIndex].is_special == 0){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
                  else if(this.order.items[this.itemIndex].is_special == 1){
                    if(topping.id == 5){
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                    else {
                        this.order.items[this.itemIndex].totalPrice = 
                        this.order.items[this.itemIndex].totalPrice;
                    }
                  }
              }
            }
            this.countTotalPrice();
            this.$forceUpdate();
          }
          );
        }
      } else if(this.isSticks){  
        this.order.items[this.itemIndex].defaultToppings.forEach(
            (t, index) => {
              if (topping.name.slice(0, 3) === "No ") {
                topping.isDeleted = false;
          
              if (parseInt(t.id) === parseInt(topping.id)) {
                this.changeToppingPrice(this.order.items[this.itemIndex].size);
                this.order.items[this.itemIndex].defaultToppings[
                  index
                ].isDeleted = false;
                
                topping.name = topping.name.slice(3);
                this.order.items[this.itemIndex].defaultToppings[index].name = topping.name.slice(3);
                if(this.order.items[this.itemIndex].is_special == 0){
                this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice + t.price;
                }
              }
          
            this.$forceUpdate();
          }
           else {
          // topping.name = "No " + topping.name;
          topping.isDeleted = true;
              if (parseInt(t.id) === parseInt(topping.id)) {
                this.order.items[this.itemIndex].defaultToppings[
                  index
                ].isDeleted = true;
                this.order.items[this.itemIndex].defaultToppings[index].name =
                  "No " + topping.name;
                  //topping.name = "No " + topping.name;
                  if(this.order.items[this.itemIndex].is_special == 0){
                  this.order.items[this.itemIndex].totalPrice = 
                      this.order.items[this.itemIndex].totalPrice - t.price;
                  }  
              }
            
          console.log("Default Toppings Array: ", this.sticks.defaultToppings);
        }
      }
      );
      }
      
      this.countTotalPrice();
      this.$forceUpdate();
    },
    deleteTopping(topping) {
      let index = -1;
      if(this.wholePizzaPart == 1 || this.halfPizzaPart == 1){
        this.order.items[this.itemIndex].half1.toppings.forEach((t, idx) => {
        if (parseInt(t.id) === parseInt(topping.id)) {
          t.count = 0;
          console.log('topping count delete: ', t.count);
          index = idx;
        }
      });
      this.order.items[this.itemIndex].half1.toppings.splice(index, 1);
      this.countTotalPrice();
      }
      else if(this.wholePizzaPart == 2){
        this.order.items[this.itemIndex].half1.toppings.forEach((t, idx) => {
        if (parseInt(t.id) === parseInt(topping.id)) {
          t.count = 0;
          console.log('topping count delete: ', t.count);
          index = idx;
        }
      });
      this.order.items[this.itemIndex].half2.toppings.splice(index, 1);
      this.countTotalPrice();
      }
      else if(this.wholePizzaPart == 3){
        this.order.items[this.itemIndex].toppings.forEach((t, idx) => {
        if (parseInt(t.id) === parseInt(topping.id)) {
        t.count = 0;
        console.log('topping count delete: ', t.count);
        index = idx;
        
        }
      });
      this.order.items[this.itemIndex].toppings.splice(index, 1);
      this.countTotalPrice();
      }
      else if(this.isSticks){
        this.order.items[this.itemIndex].toppings.forEach((t, idx) => {
        if (parseInt(t.id) === parseInt(topping.id)) {
          t.count = 0;
          this.order.items[this.itemIndex].toppings.splice(idx, 1);
          this.countTotalPrice();
        }
      });
      
      }
      this.countTotalPrice();
      this.$forceUpdate();
    },

    deleteCusTopping(topping) {
      let index = -1;
      let half1 = 0;
      let half2 = 0;
      if (this.halfPizzaPart == 1) {
        this.order.items[this.itemIndex].half1.toppings.forEach((t, idx) => {
          if (parseInt(t.id) === parseInt(topping.id)) {
            t.count = 0;
            index = idx;
            this.customPizza.half1.totalPrice = this.customPizza.price;
            half1 = this.customPizza.half1.price; 
            //this.customPizza.totalPrice = this.customPizza.price;
          } 
        });
        this.order.items[this.itemIndex].half1.toppings.splice(index, 1);
        this.countTotalPrice();
      } else if (this.halfPizzaPart == 2) {
        this.order.items[this.itemIndex].half2.toppings.forEach((t, idx) => {
          if (parseInt(t.id) === parseInt(topping.id)) {
            t.count = 0;
            index = idx;
            this.customPizza.half2.totalPrice = this.customPizza.price;
            half2 = this.customPizza.half2.price; 
          }
        });
        this.order.items[this.itemIndex].half2.toppings.splice(index, 1);
        this.countTotalPrice();
      }
      this.countTotalPrice();
      this.$forceUpdate();
    },
    deleteCusMainTopping(topping) {
      let index = -1;
        this.order.items[this.itemIndex].toppings.forEach((t, idx) => {
          if (parseInt(t.id) === parseInt(topping.id)) {
            t.count = 0;
            index = idx;
          }
        });
        this.order.items[this.itemIndex].toppings.splice(index, 1);
        this.countTotalPrice();
        this.$forceUpdate();
    },

    clearOrder() {
      this.order.items.splice(0, this.order.items.length);
      localStorage.removeItem("items");
      localStorage.removeItem("payItem");
      localStorage.removeItem("reopenItem");
      this.calculatorModal = false;
      this.$router.go();
    },
    clearCustomer(){
      this.curentCustomer = {
        name: '',
        gender: '',
        email: '',
        dob: '',
        address: '', 
        phone: '',
        comment: '',
        comment2: '',
        invoice: {
          tel: null,
          name: '',
          ltd: '',
          id: null,
          address: '',
          phone: '',
          email: ''
        },
      };
      this.invoice = {
        tel: null,
        name: '',
        ltd: '',
        id: null,
        address: '',
        phone: '',
        email: ''
      };
      this.searchResults = [];
      this.telMessage = '';
      this.customerChecked = false;
      this.$forceUpdate();
    },

    doneOrder() {
      if(this.totalNet == 0){
        alert('Order Is Empty');
      } else{
        this.showProducts = false;
        this.showIngredients = false;
        this.order.totalPrice = this.totalPrice.toFixed(2);
        this.calculatorModal = true;
      }
    },
    addCrust(crustPar) {
      var crust;

      if (crustPar === "thin") {
        this.crustVar = false;
        crust = "original";
      } else if (crustPar === "original") {
        this.crustVar = true;
        crust = "thin";
      }
      if (this.isHalfPizza == "yes") {
        this.customPizza.crust = crust;
      } else if (this.isHalfPizza == "no") {
        this.pizza.crust = crust;
      }

    },
    addSauce(sauce) {
      if(sauce === 'sauce'){
        sauce = 'less sauce';
        this.curSauce = 'less sauce';
      }
      else if(sauce === 'less sauce'){
        sauce = 'more sauce';
        this.curSauce = 'more sauce';
      }
      else if(sauce === 'more sauce'){
        sauce = 'no sauce';
        this.curSauce = 'no sauce';
      }
      else if(sauce === 'no sauce'){
        sauce = 'sauce';
        this.curSauce = 'sauce';
      }

      // this.curSauce = sauce;
      
      if (this.isHalfPizza == "yes") {
          if(this.halfPizzaPart == 1){
            this.customPizza.sauce = sauce;
            this.customPizza.half1.sauce = sauce;
          }
          else if(this.halfPizzaPart == 2){
            this.customPizza.sauce = sauce;  
            this.customPizza.half2.sauce = sauce;
          }
          else if(this.halfPizzaPart == 0 || this.halfPizzaPart == 3){
            this.customPizza.sauce = sauce;
            this.customPizza.half1.sauce = sauce;
            this.customPizza.half2.sauce = sauce;
          }
        
      } else if (this.isHalfPizza == "no") {
        this.pizza.sauce = sauce;
      }
      this.$forceUpdate();
    },
    addSize(size) {
      // alert(this.itemIndex);
      this.$forceUpdate();
      if (this.isHalfPizza == "yes") {
        this.changeToppingPrice(size);
        this.customPizza.size = size;
        if (size === "xl") {
            this.cutActive = true;
            this.mediumCuts = false;
            this.order.items[this.itemIndex].cuts = false;
            this.order.items[this.itemIndex].cutsCount = 0;
            this.order.items[this.itemIndex].totalPrice =
            this.order.items[this.itemIndex].half1.priceBySizes.xl / 2 +
            this.order.items[this.itemIndex].half2.priceBySizes.xl / 2;
            this.order.items[this.itemIndex].price = this.order.items[this.itemIndex].totalPrice;
            // DELETE AFTER
            // this.order.items[this.itemIndex].totalPrice = (this.order.items[this.itemIndex].totalPrice / 100) * 90;
            //
            this.customPizza.totalPrice = this.order.items[this.itemIndex].totalPrice;
            this.customPizza.price = this.customPizza.totalPrice;
            this.activeSmall = false;
            this.noAB = false;
            this.activeMedium = false;
            this.activeXl = true;
        } else if (size === "m") {
            this.mediumCuts = true;
            this.cutActive = false
            this.order.items[this.itemIndex].totalPrice =
            this.order.items[this.itemIndex].half1.priceBySizes.m / 2 +
            this.order.items[this.itemIndex].half2.priceBySizes.m / 2;
            this.order.items[this.itemIndex].cuts = false;
            this.order.items[this.itemIndex].cutsCount = 0;
            this.customPizza.totalPrice = this.order.items[this.itemIndex].totalPrice;
            this.customPizza.price = this.customPizza.totalPrice;
            this.activeSmall = false;
            this.noAB = false;
            this.activeMedium = true;
            this.activeXl = false;
        } else if (size === "s") {
            this.order.items[this.itemIndex].totalPrice =
            this.order.items[this.itemIndex].half1.priceBySizes.s / 2;
            this.order.items[this.itemIndex].half2.priceBySizes.s / 2;
            this.order.items[this.itemIndex].cuts = false;
            this.order.items[this.itemIndex].cutsCount = 0;
            this.customPizza.totalPrice = this.order.items[this.itemIndex].totalPrice;
            this.customPizza.price = this.customPizza.totalPrice;
            this.cutActive = false;
            this.mediumCuts = false;
            this.noAB = true;
            this.activeSmall = true;
            this.activeMedium = false;
            this.activeXl = false;
        }
      } else if (this.isHalfPizza == "no") {
        this.changeToppingPrice(size);
        this.pizza.size = size;
        if (size === "xl") {
          this.cutActive = true;
          this.mediumCuts = false;
          this.order.items[this.itemIndex].cuts = false;
          this.order.items[this.itemIndex].cutsCount = 0;
          this.order.items[this.itemIndex].totalPrice = this.order.items[
            this.itemIndex
          ].priceBySizes.xl;
          this.order.items[this.itemIndex].price = this.order.items[this.itemIndex].totalPrice;
          // this.order.items[this.itemIndex].oldPrice = this.order.items[
          //   this.itemIndex
          // ].priceBySizes.xl;
          // DELETE AFTER
          // this.order.items[this.itemIndex].price = (this.order.items[this.itemIndex].totalPrice / 100) * 90
          // alert(this.order.items[this.itemIndex].totalPrice);
          // this.order.items[this.itemIndex].totalPrice = (this.order.items[this.itemIndex].totalPrice / 100) * 90;
          // alert(this.order.items[this.itemIndex].totalPrice);
          //
          this.activeSmall = false;
          this.noAB = false;
            this.activeMedium = false;
            this.activeXl = true;
          
        } else if (size === "m") {
          this.mediumCuts = true;
          this.cutActive = false;
          this.order.items[this.itemIndex].totalPrice = this.order.items[
            this.itemIndex
          ].priceBySizes.m;
          this.order.items[this.itemIndex].cuts = false;
          this.order.items[this.itemIndex].cutsCount = 0;
          this.order.items[this.itemIndex].price = this.order.items[this.itemIndex].totalPrice;
          this.noAB = false;
          this.activeSmall = false;
          this.activeMedium = true;
          this.activeXl = false;
        } else if (size === "s") {
          this.order.items[this.itemIndex].totalPrice = this.order.items[
            this.itemIndex
          ].priceBySizes.s;
          this.order.items[this.itemIndex].cuts = false;
          this.order.items[this.itemIndex].cutsCount = 0;
          this.order.items[this.itemIndex].price = this.order.items[this.itemIndex].totalPrice;
          this.cutActive = false;
          this.mediumCuts = false;
          this.noAB = true;
          this.activeSmall = true;
          this.activeMedium = false;
          this.activeXl = false;
        }
      }

      this.countTotalPrice();
    },

    changeToppingPrice(size){
      if(this.order.items[this.itemIndex].custom == 'no'){
        
        //if(this.order.items[this.itemIndex].is_special === 0){
          this.order.items[this.itemIndex].defaultToppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl;
          }
        });  


        this.order.items[this.itemIndex].toppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl;
          }
        });
        this.order.items[this.itemIndex].half1.toppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });
        this.order.items[this.itemIndex].half2.toppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });
        this.order.items[this.itemIndex].half1.defaultToppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });
        this.order.items[this.itemIndex].half2.defaultToppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });
      }
      if(this.isHalfPizza == 'yes'){
          this.order.items[this.itemIndex].half1.defaultToppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });  
          this.order.items[this.itemIndex].half2.defaultToppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });  
        // }
        
        this.order.items[this.itemIndex].toppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl;
          }
        });
        this.order.items[this.itemIndex].half1.toppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });
        this.order.items[this.itemIndex].half2.toppings.forEach(t => {
          if(size == 's'){
            t.price = this.toppingPrice[t.isPremium].s/2;
          }
          if(size == 'm'){
            t.price = this.toppingPrice[t.isPremium].m/2;
          }
          if(size == 'xl'){
            t.price = this.toppingPrice[t.isPremium].xl/2;
          }
        });
      }
    },

    sticksSize(size){
        if(this.sticks.size === size){
          this.sticks.size = 'original';
        }
        else {
          this.sticks.size = size;
        }
        this.$forceUpdate();
    },
    cuts(count) {
      if(this.order.items[this.itemIndex].cutsCount === count){
        this.order.items[this.itemIndex].cuts ^= true;
        this.order.items[this.itemIndex].cutsCount = null;
        this.cutsCount = null;
      }
      else {
        this.order.items[this.itemIndex].cuts = true;
        this.order.items[this.itemIndex].cutsCount = count;
        this.cutsCount = count;
      }
      this.$forceUpdate();
    },
    addTopping(topping) {
      this.playSound();
      let matchedTopping = false;
      if(topping.isPremium == 4){
        this.deleteDefaultTopping(topping);
      } else{
        if(topping.name.slice(0, 3) === "No ")
        {
          topping.name = topping.name.slice(3);
        }
        if (this.isHalfPizza == "yes") {
          
          if(this.halfPizzaPart == 1){

              let matched = false;

              this.customPizza.half1.defaultToppings.forEach((t) => {
            if (parseInt(t.id) === topping.id) {
              matchedTopping = true;
              if (t.name.slice(0, 3) == "No ") {
                t.name = topping.name;
                t.isDeleted = false;
                matched = true;
                this.customPizza.totalPrice = this.customPizza.price;
              }
            }
          });
              if (!matched) {
              matched = false;
              this.customPizza.half1.toppings.forEach((t) => {
                if (parseInt(t.id) === topping.id) {
                  t.count += 1;
                  if (t.count === 4) {
                    t.count = 0;
                    this.deleteCusTopping(t);
                    this.deleteDefaultTopping(t);
                    this.customPizza.totalPrice = this.customPizza.price;
                  }
                  // Adding topping price
                    if (this.customPizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s /2;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    } else if (this.customPizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m /2;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    } else if (this.customPizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl /2;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    }
                  matched = true;
                  }
              });

              if (!matched) {
                  if (this.customPizza.size == "s") {
                    topping.price = this.toppingPrice[topping.isPremium].s /2;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  } else if (this.customPizza.size == "m") {
                    topping.price = this.toppingPrice[topping.isPremium].m /2;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  } else if (this.customPizza.size == "xl") {
                    topping.price = this.toppingPrice[topping.isPremium].xl /2;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  }
                this.customPizza.half1.toppings.push({ ...topping, count: 1 });
                } 
              }
            this.countTotalPrice();
            this.$forceUpdate();

          }     
        }
          // end of half pizza part 1
          if(this.halfPizzaPart == 2){

            

              let matched = false;

              this.customPizza.half2.defaultToppings.forEach((t) => {
            if (parseInt(t.id) === topping.id) {
              if (t.name.slice(0, 3) == "No ") {
                t.name = topping.name;
                t.isDeleted = false;
                this.customPizza.totalPrice = this.customPizza.price;
                matched = true;
              }
              // t.count += 1;
              // matched = true;
            }
          });
              if (!matched) {
              matched = false;
              this.customPizza.half2.toppings.forEach((t) => {
                if (parseInt(t.id) === topping.id) {
                  t.count += 1;
                  if (t.count === 4) {
                    t.count = 0;
                    this.deleteCusTopping(t);
                    this.deleteDefaultTopping(t);
                    this.customPizza.totalPrice = this.customPizza.price;
                  }
                  // Adding topping price
                    if (this.customPizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s /2;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    } else if (this.customPizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m /2;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    } else if (this.customPizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl /2;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    }
                  matched = true;
                  }
              });

              if (!matched) {
                  if (this.customPizza.size == "s") {
                    topping.price = this.toppingPrice[topping.isPremium].s /2;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  } else if (this.customPizza.size == "m") {
                    topping.price = this.toppingPrice[topping.isPremium].m /2;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  } else if (this.customPizza.size == "xl") {
                    topping.price = this.toppingPrice[topping.isPremium].xl /2;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  }
                this.customPizza.half2.toppings.push({ ...topping, count: 1 });
                } 
              }
            this.countTotalPrice();
            this.$forceUpdate();

          }
          // end of half pizza part 2
          else if (this.halfPizzaAll){
              
              let matched = false;
              
              if (!matched) {
              matched = false;
              this.customPizza.toppings.forEach((t) => {
                if (parseInt(t.id) === topping.id) {
                  t.count += 1;
                  if (t.count === 4) {
                    t.count = 0;
                    this.deleteCusMainTopping(t);
                    
                    this.customPizza.totalPrice = this.customPizza.price;
                  }
                  // Adding topping price
                    if (this.customPizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    } else if (this.customPizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    } else if (this.customPizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.customPizza.totalPrice =
                        this.customPizza.totalPrice + t.price;
                    }
    
                  matched = true;
                }
              });
              if (!matched) {
                  if (this.customPizza.size == "s") {
                    topping.price = this.toppingPrice[topping.isPremium].s;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  } else if (this.customPizza.size == "m") {
                    topping.price = this.toppingPrice[topping.isPremium].m;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  } else if (this.customPizza.size == "xl") {
                    topping.price = this.toppingPrice[topping.isPremium].xl;
                    this.customPizza.totalPrice =
                      this.customPizza.totalPrice + topping.price;
                  }
                
                this.customPizza.toppings.push({ ...topping, count: 1 });
              }
            }
            this.countTotalPrice();
            this.$forceUpdate();

        } //end of half pizza block

          // End of topping on whole pizza
          else if (this.isPizza == "yes") {
          let matched = false;
          
          //this.pizza.toppingChange++;
          if(this.pizza.is_special == 0){
            this.pizza.defaultToppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                matchedTopping = true;
                if (t.name.slice(0, 3) === "No ") {
                  if(topping.id == 5){

                    this.pizza.totalPrice = this.pizza.totalPrice; 
                  }
                  else {
                    this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  t.name = topping.name;
                  // this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  t.isDeleted = false;
                  matched = true;
                }

                if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.pizza.totalPrice = this.pizza.price;
                  } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  }
                // t.count += 1;
                // matched = true;
              }
            });
          }
          else if(this.pizza.is_special == 1){
            this.pizza.defaultToppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                matchedTopping = true;
                if (t.name.slice(0, 3) == "No ") {
                  if(topping.id == 5){
                    this.pizza.totalPrice = this.pizza.totalPrice;  
                  }
                  else {
                    this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  t.name = topping.name;
                  // this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  t.isDeleted = false;
                  matched = true;
                }

                if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.pizza.totalPrice = this.pizza.price;
                  } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  }
                // t.count += 1;
                // matched = true;
              }
            });
          }

          if (this.wholePizzaPart === 1){

            if(this.pizza.is_special == 0){
            this.pizza.half1.defaultToppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                matchedTopping = true;
                if (t.name.slice(0, 3) === "No ") {
                  if(topping.id == 5){
                    this.pizza.totalPrice = this.pizza.totalPrice; 
                  }
                  else {
                    this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  t.name = topping.name;
                  // this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  t.isDeleted = false;
                  matched = true;
                }

                if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.pizza.totalPrice = this.pizza.price;
                  } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  }
                // t.count += 1;
                // matched = true;
              }
            });
          }
          else if(this.pizza.is_special == 1){
            this.pizza.half1.defaultToppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                matchedTopping = true;
                if (t.name.slice(0, 3) == "No ") {       
                  if(topping.id == 5){
                    this.pizza.totalPrice = this.pizza.totalPrice;  
                  }
                  else {
                    this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  t.name = topping.name;
                  // this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  t.isDeleted = false;
                  matched = true;
                }

                if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.pizza.totalPrice = this.pizza.price;
                  } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  }
                // t.count += 1;
                // matched = true;
              }
            });
          }
            
            this.wholePizzaActive = true;
            if (!matched) {
              matched = false;
              this.pizza.half1.toppings.forEach((t) => {
                  if (parseInt(t.id) === topping.id) {
                  t.count += 1;
                  if (t.count === 4) {
                      t.count = 0;
                      this.deleteTopping(t);
                      if(matchedTopping){
                        this.deleteDefaultTopping(t);
                      }
                  }
                      if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      }
                  matched = true;
                  }
              });
              if (!matched) {
                  if (this.pizza.size == "s") {
                      topping.price = this.toppingPrice[topping.isPremium].s/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  } else if (this.pizza.size == "m") {
                      topping.price = this.toppingPrice[topping.isPremium].m/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  } else if (this.pizza.size == "xl") {
                      topping.price = this.toppingPrice[topping.isPremium].xl/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  this.pizza.half1.toppings.push({ ...topping, count: 1 });
              }
              }

          }
          else if(this.wholePizzaPart === 2){
            if(this.pizza.is_special == 0){
            this.pizza.half2.defaultToppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                matchedTopping = true;
                if (t.name.slice(0, 3) === "No ") {
                  if(topping.id == 5){
                    this.pizza.totalPrice = this.pizza.totalPrice; 
                  }
                  else {
                    this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  t.name = topping.name;
                  // this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  t.isDeleted = false;
                  matched = true;
                }

                if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.pizza.totalPrice = this.pizza.price;
                  } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  }
                // t.count += 1;
                // matched = true;
              }
            });
          }
          else if(this.pizza.is_special == 1){
            this.pizza.half2.defaultToppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                matchedTopping = true;
                if (t.name.slice(0, 3) == "No ") {
                  if(topping.id == 5){
                    this.pizza.totalPrice = this.pizza.totalPrice;  
                  }
                  else {
                    this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  t.name = topping.name;
                  // this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  t.isDeleted = false;
                  matched = true;
                }

                if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      this.pizza.totalPrice = this.pizza.price;
                  } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.price + t.price;
                  }
                // t.count += 1;
                // matched = true;
              }
            });
          }
            
            this.wholePizzaActive = true;
            if (!matched) {
              matched = false;
              this.pizza.half2.toppings.forEach((t) => {
                  if (parseInt(t.id) === topping.id) {
                  t.count += 1;
                  if (t.count === 4) {
                      t.count = 0;
                      this.deleteTopping(t);
                      if(matchedTopping){
                        this.deleteDefaultTopping(t);
                      }
                  }
                      if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      }
                  matched = true;
                  }
              });
              if (!matched) {
                  if (this.pizza.size == "s") {
                      topping.price = this.toppingPrice[topping.isPremium].s/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  } else if (this.pizza.size == "m") {
                      topping.price = this.toppingPrice[topping.isPremium].m/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  } else if (this.pizza.size == "xl") {
                      topping.price = this.toppingPrice[topping.isPremium].xl/2;
                      this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }
                  
                  this.pizza.half2.toppings.push({ ...topping, count: 1 });
              }
              }

          }
          else {
              if (!matched) {
              matched = false;
              this.pizza.toppings.forEach((t) => {
                  if (parseInt(t.id) === topping.id) {
                  t.count += 1;
                  if (t.count === 4) {
                      t.count = 0;
                      console.log('Topping count: ', t.count);
                      this.deleteTopping(t);
                      if(matchedTopping){
                        this.deleteDefaultTopping(t);
                      }
                  }   
                      if (this.pizza.size == "s") {
                      t.price = this.toppingPrice[topping.isPremium].s;
                        this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      } else if (this.pizza.size == "m") {
                      t.price = this.toppingPrice[topping.isPremium].m;
                      // alert(this.pizza.totalPrice); // ?????
                      //this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      } else if (this.pizza.size == "xl") {
                      t.price = this.toppingPrice[topping.isPremium].xl;
                      this.pizza.totalPrice = this.pizza.totalPrice + t.price * t.count;
                      }
                  matched = true;
                  }
              });
              if (!matched) {
                  if (this.pizza.size == "s") {
                      topping.price = this.toppingPrice[topping.isPremium].s;
                      //this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  } else if (this.pizza.size == "m") {
                      topping.price = this.toppingPrice[topping.isPremium].m;
                      //this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  } else if (this.pizza.size == "xl") {
                      topping.price = this.toppingPrice[topping.isPremium].xl;
                      //this.pizza.totalPrice = this.pizza.totalPrice + topping.price;
                  }

                  this.pizza.toppings.push({ ...topping, count: 1 });
              }
              }
          }
        }
          // end of add pizza toppings

          else if (this.isSticks) {
          let matched = false;
          this.sticks.defaultToppings.forEach((t) => {
            if (parseInt(t.id) === topping.id) {
              if (t.name.slice(0, 3) == "No ") {
                t.name = topping.name;
                t.isDeleted = false;
                matched = true;
              }
              // t.count += 1;
              // matched = true;
            }
          });
          if (!matched) {
            matched = false;
            this.sticks.toppings.forEach((t) => {
              if (parseInt(t.id) === topping.id) {
                t.count += 1;
                if (t.count === 4) {
                  t.count = 0;
                  this.deleteTopping(t);
                }
                if (topping.id === 24) {
                    t.price = 2.4;
                    this.sticks.totalPrice = this.sticks.price + t.price * t.count;
                } else {
                    t.price = 0.0;
                    this.sticks.totalPrice = this.sticks.price + t.price * t.count;
                }
                matched = true;
              }
            });
            if (!matched) {
              if (topping.id === 24) {
                  topping.price = 2.4;
                  this.sticks.totalPrice = this.sticks.price + topping.price;
              } else {
                  topping.price = 0.0;
                  this.sticks.totalPrice = this.sticks.price + topping.price;
              }
              this.sticks.toppings.push({ ...topping, count: 1 });
            }
          }
        
        }
      }
      // end of add sticks tooppings

      this.countTotalPrice();
      this.$forceUpdate();
    },
    addQty(product) {
      

      product.qty++;

      this.version++;
      const pr = this.selectedProducts.filter((p) => p.id === product.id);
      pr.qty = product.qty;
      this.$forceUpdate();
      localStorage.setItem("items", JSON.stringify(this.order));
    },
    minusQty(product) {
      if (product.qty == 1) {
        product.qty--;
        console.log("--------", this.selectedProducts.indexOf(product));
        this.order.items.splice(this.order.items.indexOf(product), 1);
        this.itemIndex--;
      } else {
        product.qty--;
        const pr = this.selectedProducts.filter((p) => p.id === product.id);
        pr.qty = product.qty;
        this.$forceUpdate();
        localStorage.setItem("items", JSON.stringify(this.order));
      }
    },

    plusDefTopQty(topping) {
      topping.count++;
      if (topping.count == 5) {
        topping.count = 0;
        this.order.items.defaultToppings.splice(
          this.order.items.defaultToppings.indexOf(topping),
          1
        );
      }
      this.version++;
      const pr = this.order.items.defaultToppings.filter(
        (p) => p.id === topping.id
      );
      pr.qty = topping.qty;
      this.$forceUpdate();
      //localStorage.setItem('items', JSON.stringify(this.selectedProducts));
    },
    minusDefTopQty(topping) {
      if (topping.count == 1) {
        topping.count--;
        console.log(
          "--------",
          this.order.items.defaultToppings.indexOf(topping)
        );
        this.order.items.defaultToppings.splice(
          this.this.order.items.defaultToppings.indexOf(topping),
          1
        );
      } else {
        topping.count--;
        const pr = this.order.items.defaultToppings.filter(
          (p) => p.id === topping.id
        );
        pr.count = topping.qty;
        this.$forceUpdate();
        console.log(
          "Selected Product Qty",
          this.order.items.defaultToppings.count
        );
      }
    },
    countTotalPrice() {
      for (var i = 0; i < this.order.items.length; i++) {
        this.changeToppingPrice(this.order.items[i].size);
        var toppingTotal = 0;

        if (this.order.items[i].custom == "other") {
           this.order.items[i].totalPrice =
           this.order.items[i].price * this.order.items[i].qty;
        } else if (
          !this.order.items[i].toppings &&
          this.order.items[i].toppings.length == 0
        ) {
          this.order.items[i].totalPrice = this.order.items[i].price;
        } else if (this.order.items[i].custom == "sticks") {
            for (var k = 0; k < this.order.items[i].toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].toppings[k].price *
                  this.order.items[i].toppings[k].count;
              //alert(toppingTotal);
              this.order.items[i].totalPrice =
                this.order.items[i].price + toppingTotal;
            }
            if(this.order.items[i].toppings.length == 0){
              this.order.items[i].totalPrice = this.order.items[i].price;
            }
        }
        else {
          if (this.order.items[i].custom === "yes") {

            let defCount = 0;
            this.order.items[i].half1.defaultToppings.forEach(t => {
              if(t.isDeleted){
                    if(t.id == 5){
                      defCount = defCount;
                    }
                    else {
                      defCount = defCount + t.price;
                    }
                }
            });
            this.order.items[i].half2.defaultToppings.forEach(t => {
              if(t.isDeleted){
                    if(t.id == 5){
                      defCount = defCount;
                    }
                    else {
                      defCount = defCount + t.price;
                    }
                }
            });
            if(this.order.items[i].half1.is_special == 0){
              this.order.items[i].defCount = defCount;
            }
            else {
              this.order.items[i].defCount = 0;
            }

            if(this.order.items[i].half2.is_special == 0){
              this.order.items[i].defCount = defCount;
            }
            else {
              this.order.items[i].defCount = 0;
            }
  
            for (k = 0; k < this.order.items[i].half1.toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].half1.toppings[k].price *
                  this.order.items[i].half1.toppings[k].count;
              //alert(toppingTotal);
                this.order.items[i].totalPrice =
                      this.order.items[i].price + toppingTotal - this.order.items[i].defCount;
            }
            for (k = 0; k < this.order.items[i].half2.toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].half2.toppings[k].price *
                  this.order.items[i].half2.toppings[k].count;
             
                this.order.items[i].totalPrice =
                      this.order.items[i].price + toppingTotal - this.order.items[i].defCount;
            }
            for (var k = 0; k < this.order.items[i].toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].toppings[k].price *
                  this.order.items[i].toppings[k].count;

                    this.order.items[i].totalPrice =
                      this.order.items[i].price + toppingTotal - this.order.items[i].defCount;
            }

            if(this.order.items[i].toppings.length == 0 
                && this.order.items[i].half1.toppings.length == 0 
                && this.order.items[i].half2.toppings.length == 0) {
                    this.order.items[i].totalPrice = this.order.items[i].price - this.order.items[i].defCount;
                }
            
          } else {
            let defCount = 0;
            this.order.items[i].defaultToppings.forEach(t => {
                if(t.isDeleted){
                    if(t.id == 5){
                      defCount = defCount;
                    }
                    else {
                      defCount = defCount + t.price;
                    }
                }
            });
            this.order.items[i].half1.defaultToppings.forEach(t => {
              if(t.isDeleted){
                    if(t.id == 5){
                      defCount = defCount;
                    }
                    else {
                      defCount = defCount + t.price;
                    }
                }
            });
            this.order.items[i].half2.defaultToppings.forEach(t => {
              if(t.isDeleted){
                if(t.id == 5){
                      defCount = defCount;
                    }
                    else {
                      defCount = defCount + t.price;
                    }
                }
            });
            if(this.order.items[i].is_special == 0){
              this.order.items[i].defCount = defCount;
            }
            else {
              this.order.items[i].defCount = 0;
            }

            for (k = 0; k < this.order.items[i].half1.toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].half1.toppings[k].price *
                  this.order.items[i].half1.toppings[k].count;
              //alert(toppingTotal);
                this.order.items[i].totalPrice =
                      this.order.items[i].price + toppingTotal - this.order.items[i].defCount;
            }
            for (k = 0; k < this.order.items[i].half2.toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].half2.toppings[k].price *
                  this.order.items[i].half2.toppings[k].count;
             
                this.order.items[i].totalPrice =
                      this.order.items[i].price + toppingTotal - this.order.items[i].defCount;
            }
            for (var k = 0; k < this.order.items[i].toppings.length; k++) {
              toppingTotal =
                toppingTotal +
                this.order.items[i].toppings[k].price *
                  this.order.items[i].toppings[k].count;

                    this.order.items[i].totalPrice =
                      this.order.items[i].price + toppingTotal - this.order.items[i].defCount;
            }

            if(this.order.items[i].toppings.length == 0 
                && this.order.items[i].half1.toppings.length == 0 
                && this.order.items[i].half2.toppings.length == 0) {
                    this.order.items[i].totalPrice = this.order.items[i].price - this.order.items[i].defCount;
                }
            
          }
        }
        // this.changeToppingPrice(this.order.items[i].size);
      }

      this.$forceUpdate();
      this.totalPriceCounter();
      //this.changeToppingPrice(this.order.items[i]);
    },

    plusTopQty(topping) {
      topping.count++;
      if (topping.count == 4) {
        topping.count = 0;
        this.deleteTopping(topping);
      }
      //this.version++;
      console.log("before");

      this.countTotalPrice();
      this.version++;
      const pr = this.order.items[0].toppings.filter(
        (p) => p.id === topping.id
      );
      pr.count = topping.count;
      console.log("filtered toppings", pr);
      this.$forceUpdate();
    },
    minusTopQty(topping) {
      if (topping.count == 1) {
        topping.count--;
        this.deleteTopping(topping);
        this.countTotalPrice();
        //alert(product.id);
      } else {
        topping.count--;
        this.version++;
        const pr = this.order.items.toppings.filter((p) => p.id === topping.id);
        pr.count = topping.qty;
        this.countTotalPrice();
        this.$forceUpdate();
      }
    },
    plusCusTopQty(topping, half) {
      topping.count++;
      //alert(item.totalPrice);
      if (topping.count == 5) {
        topping.count = 0;
        this.deleteTopping(topping);
      }
      this.version++;
      //alert(topping.count);
      if (half == "A") {
        const pr = this.order.items.half1.toppings.filter(
          (p) => p.id === topping.id
        );
        pr.count = topping.count;
      } else if (half == "B") {
        const pr = this.order.items.half2.toppings.filter(
          (p) => p.id === topping.id
        );
        pr.count = topping.count;
      }

      this.countTotalPrice();

      this.$forceUpdate();
    },
    minusCusTopQty(topping) {
      if (topping.count == 1) {
        topping.count--;
        //alert(product.id);
        this.deleteTopping(topping);
      } else {
        topping.count--;
        const pr = this.order.items.toppings.filter((p) => p.id === topping.id);
        pr.count = topping.qty;
        this.$forceUpdate();
      }
    },
    itemTotalPrice(item) {
      //alert(item.totalPrice);
    },
    getRecipe(product) {
      const TOKEN = localStorage.getItem("TOKEN");
      var bodyFormData = new FormData();
      bodyFormData.set("product_id", product.id);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "products/get-reciept-by-product-id",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          //console.log('Response Data ----',response.data);
          this.recipes = response.data;

          //alert(this.halfPizzaCounter);
          if (this.isHalfPizza == "yes" && this.halfPizzaCounter == 1) {
            this.customPizza.half1.defaultToppings = response.data;
            this.customPizza.half1.defaultToppings.forEach(dt => {
              dt.price = this.toppingPrice[dt.isPremium].m;
              dt.isDeleted = false;
            });
            this.halfPizzaCounter++;
          } else if (this.isHalfPizza == "yes" && this.halfPizzaCounter == 2) {
            this.customPizza.half2.defaultToppings = response.data;
            this.customPizza.half2.defaultToppings.forEach(dt =>{
              dt.price =  this.toppingPrice[dt.isPremium].m;
              dt.isDeleted = false;
            });
            this.halfPizzaCounter++;
          } 
          else if (this.isSticks){
            this.sticks.defaultToppings = response.data;
          }          
          else {
            // this.pizza.defaultToppings = response.data;
            this.pizza.defaultToppings = response.data.map((t) => {
              t.price=  this.toppingPrice[t.isPremium].m;
              t.isDeleted = false;
              return { ...t, count: 1 };
            });
            this.pizza.half1.defaultToppings = response.data.map((t) => {
              t.price=  this.toppingPrice[t.isPremium].m/2;
              t.isDeleted = false;
              return { ...t, count: 1 };
            });
            this.pizza.half2.defaultToppings = response.data.map((t) => {
              t.price=  this.toppingPrice[t.isPremium].m/2;
              t.isDeleted = false;
              return { ...t, count: 1 };
            });
          }

          //console.log(product.name,' Recipe: ', this.recipes);
        });
      return this.recipes;
    },

    quantityBar(qty) {
      const curTime = new Date().getTime();
      const diff = curTime - this.globalQuantityClick;

      //alert(this.globalQuantity.toString().length);

      if (diff < 1000 && this.globalQuantity.toString().length < 3) {
        this.globalQuantity = parseInt(
          this.globalQuantity.toString() + qty.toString()
        );
      } else {
        this.globalQuantity = qty;
      }

      this.globalQuantityClick = curTime;
    },
    addToOrder() {
      if (this.isHalfPizza == "yes" || this.halfPizzaCounter == 3) {
        this.customPizza.custom = "yes";
        this.order.items.push(this.customPizza);
        this.isHalfPizza = "no";
        this.halfPizzaCounter = 1;
      } else if (this.isPizza == "yes") {
        console.log("----pizza----", this.pizza);
        this.pizza.custom = "no";
        this.order.items.push(this.pizza);
        this.isPizza = "no";
      }
      localStorage.setItem("items", JSON.stringify(this.order));
      this.showProducts = true;
      this.showIngredients = false;

      console.log("Order Array: ", this.order);
    },
    halfPizza(half) {
      this.playSound();
      if(this.order.items[this.itemIndex].size === 's'){
        this.alert = true;
      }
      else {
        if(this.isPizza == 'yes'){
          if (half == "A") {
            this.wholePizza = false;
            this.wholePizzaPart = 1;
            this.smallHalf = true;
          } else if (half == "B") {  
              this.wholePizza = false;       
              this.wholePizzaPart = 2;
              this.smallHalf = true;
          } else {
              this.isHalfPizza = "no";
          }  
        } else{
          if (half == "A") {
              this.halfPizzaPart = 1;
              this.halfPizzaAll = false;
          } else if (half == "B") {
              this.halfPizzaPart = 2;
              this.halfPizzaAll = false;
          } else {
              this.halfPizzaAll = true;
              this.isHalfPizza = "no";
          }
        }
      }
    },
    addHalf() {
      this.playSound();
      if(this.isHalfPizza === 'yes'){
        this.isHalfPizza = "no";
      }
      else {
        this.isHalfPizza = "yes";
      }
      this.halfPizzaAll = !this.halfPizzaAll;
    },
    seeHalf() {
      this.playSound();
      if(this.isHalfPizza == 'yes'){
        this.isPizza = 'no';
        this.halfPizzaAll = true;
        this.halfPizzaPart = 0;
      } else if (this.isPizza == 'yes'){
        this.isHalfPizza = 'no';
        this.smallHalf = false;
        this.wholePizza = false;
        this.wholePizzaPart = 3;
      }
    },
    toppingCounter(item, topping) {
      var count = 0;

      for (var i = 0; i < item.toppings.length; i++) {
        if (item.toppings[i].name == topping.name) {
          count++;
          item.toppings[i].count = count;
        }
      }
    },
    showProductsComponent() {
      this.playSound();
      localStorage.setItem("items", JSON.stringify(this.order));
      this.showProducts = true;
      this.isHalfPizza = "no";
      this.isPizza = 'no';
      this.wholePizza = false;
      this.isSticks = false;
      this.calculatorModal = false;
      this.halfPizzaPart = 0;
      this.wholePizzaPart = 0;
      this.smallHalf = false;
      this.cheesseLoversActive = false;
      this.loversActive = false;
      this.crustVar = false;
      this.halfPizzaCounter = 1;
      this.globalQuantity = 1;
      this.curSauce = 'sauce';
      this.halfPizzaAll = false;
      this.showIngredients = false;
      this.activeMedium = true;
      this.activeSmall = false;
      this.activeXl = false;
    },
    showProductsClear(){
      this.order.items.splice(this.itemIndex, 1);
      this.itemIndex = this.order.items.length - 1;
      this.showProductsComponent();
    },

    compressArray(toppings) {
      const uniqueToppings = {}; // თავიდან რაღაც ცვლადით დაიწყე, რომ ჩაყარო ტოპინგები
      toppings.forEach((topping) => {
        if (uniqueToppings[topping.name]) {
          uniqueToppings[topping.name].count += 1;
        } else {
          uniqueToppings[topping.name] = { ...topping, count: 1 };
        }
      });
      return uniqueToppings;
    },

    foobar(item) {
      if(this.calculatorModal){
            this.itemIndex = this.order.items.indexOf(item);
      } else {

            this.showProductsComponent();
            this.playSound();
            this.showProducts = false;
            this.showIngredients = true;
            this.itemIndex = this.order.items.indexOf(item);

            if(this.order.items[this.itemIndex].id == '56'){
              this.cheesseLoversActive = true;
              this.loversActive = true;
            }

            if(this.order.items[this.itemIndex].size === 's'){
              this.activeSmall = true;
              this.activeMedium = false;
              this.activeXl = false;
            }
             else if(this.order.items[this.itemIndex].size === 'm'){
              this.activeSmall = false;
              this.activeMedium = true;
              this.activeXl = false;
            }
            else if(this.order.items[this.itemIndex].size === 'xl'){
              this.activeSmall = false;
              this.activeMedium = false;
              this.activeXl = true;
            }

            if (item.custom === "no") {

                this.pizza = item;
                this.wholePizzaPart = 3;
                this.halfPizzaAll = false;
                this.isPizza = "yes";
                this.curSauce = this.order.items[this.itemIndex].sauce;
            } else if (item.custom === "yes") {
              
                this.customPizza = item;
                this.halfPizzaPart = 3;
                this.smallHalf = true;
                this.wholePizza = false;
                this.curSauce = this.order.items[this.itemIndex].sauce;
                this.isHalfPizza = "yes";
                this.halfPizzaAll = true;
            }
            else if(item.custom === 'other'){
              this.showProductsComponent();
            }
              else if (item.custom === "sticks") {
              this.sticks = item;
              this.isSticks = true;
              this.wholePizza = false;
              this.halfPizzaAll = false;
            }
      }
      this.$forceUpdate();
    },
    
    splitSelect(part){
      if(part === 1){
        this.splitPart = 1;
      }
      else if(part === 2){
        this.splitPart = 2; 
      }
    },
    invoiceActive(){
      this.invoiceModal = true;
      this.invoiceActiveVar = true;
    },
    generateInvoice(){
      this.order.invoice = this.invoice;
      this.activeInvoice = true;
      this.paymentType = 'invoice';
      this.invoiceModal = false;
    },
    walkinActive(ND) {
      this.playSound();
      if(!this.walkinActiveVar){
        this.walkinActiveVar = true;
      }
      if (this.takeoutActiveVar || this.deliveryActiveVar || this.glovoActive || this.woltActive) {
        this.takeoutActiveVar = false;
        this.deliveryActiveVar = false;
        this.glovoActive = false;
        this.woltActive = false;
        this.ronnysActive = false;
      }
      this.order.deliveryFee = 0;
      this.order.deliveryMethod = 'Walk_In';
      this.order.customer = this.curentCustomer;
      if(ND === 'no'){
        // pass
      }
      else {
        this.walkInModal = !this.walkInModal;
      }
    },
    takeoutActive(ND) {
      this.playSound();
      this.takeoutActiveVar = true;
      if (this.walkinActiveVar || this.deliveryActiveVar || this.glovoActive || this.woltActive) {
        this.walkinActiveVar = false;
        this.deliveryActiveVar = false;
        this.glovoActive = false;
        this.woltActive = false;
        this.ronnysActive = false;
      }
      this.order.deliveryFee = 0;
      this.order.deliveryMethod = 'Take Out';
      this.order.deliveryType = 'Take_out';
      if(ND === 'no'){
        // pass
      }
      else {
      this.takeOutModal = !this.takeOutModal;
      }
    },
    deliveryActive() {
      this.playSound();
      this.deliveryActiveVar = !this.deliveryActiveVar;
      if (this.walkinActiveVar || this.takeoutActiveVar) {
        this.walkinActiveVar = false;
        this.takeoutActiveVar = false;
      }
      this.order.deliveryMethod = 'Delivery';
      this.deliveryTypeModal = !this.deliveryTypeModal;
    },
    
    deliverType(type){
      if(type != -1){
        this.order.deliveryType = type;
        this.order.deliveryFee = 0;
        this.deliveryTypeModal != this.deliveryTypeModal;
      }
      else {
        this.deliveryFeeModal = false;
      }

    },
    calcCash(cash) {
      this.playSound();
      if(this.splitActive){
        if(this.splitPart === 1){
          this.split.split1.input = this.split.split1.input + cash;
          this.cashInput = parseFloat(this.split.split1.input) + parseFloat(this.split.split2.input);
        }
        else if(this.splitPart === 2){
          this.split.split2.input = this.split.split2.input + cash;
          this.cashInput = parseFloat(this.split.split1.input) + parseFloat(this.split.split2.input);
        }
      }
      else {
        this.cashInput = Number(this.cashInput) + cash;
      }
    },
    calcPayAll(cash){
      this.cashInput = cash;
    },
    calcInput(input) {
      this.playSound();

      if(this.splitActive){
        if(this.splitPart === 1){
          if(this.split.split1.input == 0){
            this.split.split1.input = '';
          }
          this.split.split1.input = this.split.split1.input + input;
          this.cashInput = parseFloat(this.split.split1.input) + parseFloat(this.split.split2.input);
        }
        else if(this.splitPart === 2){
          if(this.split.split2.input == 0){
            this.split.split2.input = '';
          }
          this.split.split2.input = this.split.split2.input + input;
          this.cashInput = parseFloat(this.split.split1.input) + parseFloat(this.split.split2.input);

        }
      }
      else {
        this.cashInput = this.cashInput + input ;
        let index = this.cashInput.length;
        let decimal = '';
        let foo = '';
        if(index > 2 ){
          if(this.cashInput.indexOf('.') === -1){
              this.cashInput = this.cashInput.substr(0, index-2) + '.' + this.cashInput.substr(index -2, index);
          }
          else {
              foo = this.cashInput.split('.').join('');
              this.cashInput = foo.substr(0, index-3) + '.' + foo.substr(index -3, index);
          }
        }
      }

    },
    payLater() {
        this.paymentType = 'payLater';
        this.paymentConfirm();
    },
    payGlovo() {
      this.noDisc();
      this.paymentConfirm();
    },
    payWolt() {
        this.noDisc();
        // DELETE AFTER
        // this.order.items.forEach(x =>{
        //   if(x.size == 'xl'){
        //     // alert(x.name);
        //     var diff = x.totalPrice - x.price;
        //     x.price = x.oldPrice + diff;
        //     x.totalPrice = x.price;
        //   }
        // });
        //
        this.paymentConfirm();
    },
    doneCash() {
      this.playSound();
      if(this.order.deliveryMethod === 'Delivery' && this.order.deliveryFee === 0){
        alert('You Should Select Delivery Fee For Order!');
      }
      else {
        if(this.order.deliveryMethod === "Walk_In" || this.order.deliveryMethod === "Take Out"){
          if(this.totalPrice > Number(this.cashInput)){
            alert('Enter Cash Ammount!');
          }
          else {
            this.cashInput = parseFloat(this.cashInput);
            this.confirmModal = true;
            this.paymentType = "cash";
          }
        }
        else {
            if(!this.deliveryActiveVar && !this.walkinActiveVar && !this.takeoutActiveVar && !this.glovoActive && !this.woltActive){
              alert('Please Specify Delivery Method');
            }
            else {

                if(this.splitActive){
                  if(this.splitPart === 1){
                    this.split.split1.paymentType = 'cash';
                  }
                  else if (this.splitPart === 2){
                    this.split.split2.paymentType = 'cash';
                  }
                }
                else {
                  this.cashInput = parseFloat(this.cashInput);
                  this.confirmModal = true;
                  this.paymentType = "cash";
                }
            }
        }
      }
    },
    payCard() {
      this.playSound();
      if(this.order.deliveryMethod === 'Delivery' && this.order.deliveryFee === 0){
        alert('You Should Select Delivery Fee For Order!');
      }
      else {
        if(!this.deliveryActiveVar && !this.walkinActiveVar && !this.takeoutActiveVar && !this.glovoActive && !this.woltActive){
          alert('Please Specify Delivery Method');
        }
        else{
          if(this.splitActive){
            if(this.splitPart === 1){
              this.split.split1.paymentType = 'card';
            }
            else if (this.splitPart === 2){
              this.split.split2.paymentType = 'card';
            }
          }
          else {
              this.confirmModal = true;
              this.paymentType = "card";
          }
        }
      }
      
    },
    splitPayment() {
      this.playSound();
      this.splitActive = !this.splitActive;
    },
    applySplit(){
      this.paymentType = 'split';
      this.paymentConfirm();
    },
    drinkProducts(){
      // alert(this.drinkCat);
      this.drinkCat = !this.drinkCat;
    },
    paymentConfirm() {
      this.playSound();
      this.order.customer = this.curentCustomer;
      if (this.paymentType == "cash") {
        this.confirmModal = false;
        this.order.paymentType = 'Cash';
        this.print();
        this.changeModal = true;
      } else if (this.paymentType == "card" && this.order.deliveryMethod == 'Wolt') {
        this.order.paymentType = 'Card';
        this.confirmModal = false;
      } else if (this.paymentType == "card" && this.order.deliveryMethod != 'Wolt') {
        this.order.paymentType = 'Card';
        this.print();
        this.confirmModal = false;
      }
      else if (this.paymentType == 'payLater'){
        this.order.paymentType = 'payLater';
      } 
      else if (this.paymentType == 'transfer'){
        this.order.paymentType = 'transfer';
      }
      else if (this.paymentType == 'invoice'){
        this.order.paymentType = 'invoice';
      }
      else if (this.paymentType == 'split'){
        this.order.paymentType = 'split';
        this.order.splitCard = this.splitCard;
        this.order.splitCash = this.splitCash;
        this.print();
      }


      if (this.paymentType == "cash" || this.paymentType == "card"  || this.paymentType == "payLater" || this.paymentType == 'transfer' || this.paymentType == 'split' || this.paymentType == 'invoice') {
        if(this.payLaterActive){
          this.payOrder();
        }
        else if(this.isReopen){

        this.order.totalPrice = this.totalNet.toFixed(2);
        this.order.promiseTime = this.promiseTime;
        this.order.id = this.fullOrder.id;
        this.order.pos_id = this.loggedUserFull.pos_id;
        this.order.safe_id = this.loggedUserFull.safe_id;
        console.log('Last order structure: ', this.order);
        const TOKEN = localStorage.getItem("TOKEN");
        axios.request({
          method: "post",
          url:
            //"http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/products/send-order",
            // this.$hostname + "orders/reopen",
            this.$hostname + "orders/edit",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: { order: this.order },
        }).then((response) => {
            this.printOrder(this.order.id);
            console.log(this.order.id)
            
            localStorage.removeItem("reopenItem");
            // if(this.printError){
            //   console.log("Print Error");
            // }
            // else
            if(response.status === 200){
              this.calcPay();
            }
              console.log("Order Response", response);
          });
        }
        
        else {
          this.order.totalPrice = Number(this.totalNet.toFixed(2));
          this.order.promiseTime = this.promiseTime;
          
          this.order.pos_id = this.loggedUserFull.pos_id;
          this.order.safe_id = this.loggedUserFull.safe_id;
          console.log('Last order structure: ', this.order);
          const TOKEN = localStorage.getItem("TOKEN");
          axios.request({
            method: "post",
            url:
              this.$hostname + "orders/create",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: { order: this.order },
          }).then((response) => {

            console.log('ORDER STRUCTURE: ', this.order);
            
            this.printOrder(response.data);
            // alert(this);
            localStorage.removeItem("reopenItem");
            if(this.printError){
              console.log("Print Error");
            }
            else if(response.status === 200 && this.paymentType == "card"){
              this.calcPay();
            } else if(response.status === 200 && this.paymentType == "payLater"){
              this.calcPay();
              console.log('CREATE: ', response);
            } else if(response.status === 200 && this.paymentType == "transfer"){
              this.calcPay();
            } else if(response.status === 200 && this.order.paymentType == "split"){
              this.splitModal = false;
              this.calcPay();
            } else if(response.status === 200 && this.paymentType == "invoice"){
              this.calcPay();
            }
              console.log("Order Response", response);
          });
        }
      }
    },
    payOrder(){
        const TOKEN = localStorage.getItem("TOKEN");
        //this.order.id = this.selected
        //this.order = JSON.parse(this.selectedOrder);
        this.order.totalPrice = this.totalNet.toFixed(2);
        this.order.pos_id = this.loggedUserFull.pos_id;
        axios.request({
            method: 'post',
            url: this.$hostname + "orders/paid",
            headers: { 
              'Authorization': 'Bearer '+TOKEN, 
            },
            data: { order: this.order },
          })
          .then(response => {
            // this.products = response.data;
            console.log(response);
            if(response.status === 200 && this.paymentType == "card" || this.paymentType == "split"){
              console.log("ORDER: ", response);
              this.calcPay();
            } 
            //this.products = this.products.reverse();
            // console.log("Productd data from API: ", response.data)
          });
    },
    rePrint(orderID){
        const TOKEN = localStorage.getItem("TOKEN");
        // console.log('BLA',orderID);
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
              console.log("Order Response", response);
            }
        });
        this.settingModal = false;
    },

    printOrder(orderID){
      // alert("BLA");
      const TOKEN = localStorage.getItem("TOKEN");
      var bodyFormData = new FormData();
      bodyFormData.set("id", orderID.data);
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
            alert("Error Printing Order");
            this.printError = true;
          }
          else{
            this.printError = false;
            console.log("Order Response", response);
          }
      });
    },
    calcClear() {
      this.cashInput = '';
    },
    calcPay() {
      this.calculatorModal = false;
      this.showProducts = true;
      this.curentCustomer = {
        name: '',
        gender: '',
        email: '',
        dob: '',
        adress: [],
        tel: '',
        tel2: '',
        comment: '',
        comment2: ''
      };
      this.customer = {
        name: '',
        gender: '',
        email: '',
        dob: '',
        address: '',
        phone: '',
        tel2: '',
        comment: '',
        comment2: ''
      };
      this.order = {
        orderId: Number,
        items: [],
        deliveryMethod: "Walk_In",
        payment: 0,
        totalPrice: 0,
        isFuture: false,
        date: '00-00-000 00:00',
        customer: '',
        discount: 0,
        coupon: 0,
      };
      
      this.telMessage = '';
      this.customerChecked = false;
      this.calcClear();
      this.clearOrder();
    },

    playSound() {
      // console.log('Play Sound!');
    },
    telMsg() {
      this.customer.phone = this.telMessage;
      this.crmModal = true;
    },
    futureOrder() {
      if(this.futureTime.split(":")[0].length == 1){
        alert('0'+this.futureTime);
      }
      this.order.date = this.date + ' ' + this.futureTime;
      this.order.isFuture = true;  
      this.futureActive = true;
      this.futureModal = false;
    },
    cancelFuture() {
      this.order.date = '';
      this.date = new Date().toISOString().substr(0, 10),
      this.futureTime = null;
      this.order.isFuture = false;  
      this.futureActive = false;
      this.futureModal = false;
    },
    copyLastOrder() {
      if(this.curentCustomer.phone.length < 9){
        alert("Enter Whole Number!");
      } else {
        const TOKEN = localStorage.getItem("TOKEN");
        var bodyFormData = new FormData();
        bodyFormData.set("phone", this.curentCustomer.phone);
        axios.request({
            method: "post",
            url:
              this.$hostname + "customers/last-order",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
            // console.log('Last Order: ', response.data.data);
            this.order.items = response.data.data.items;
          });
      }
      
        
    },
    closeCalc(){
        this.calculatorModal = false;
        this.discountOrder = false;
        this.discountitem = false;

        this.showProductsComponent();
    },
    glovoDelivery(ND){
      this.noDisc();
      this.order.deliveryFee = 0;
      this.walkinActiveVar = false;
      this.deliveryActiveVar = false
      this.takeoutActiveVar = false;
      this.ronnysActive = false;
      this.woltActive = false;
      this.glovoActive = true;
      if(ND === 'no'){
        // pass
      }
      else {
        this.glovoModal = true;
      }
    },
    woltDelivery(ND){
      this.noDisc();
      this.order.deliveryFee = 0;
      this.walkinActiveVar = false;
      this.takeoutActiveVar = false;
      this.deliveryActiveVar = false;
      this.ronnysActive = false;
      this.woltActive = true;
      this.glovoActive = false;
      if(ND === 'no'){
        // pass
      }
      else {
        this.woltModal = true;
      }
    },
    ronnysDelivery(ND){
      this.deliveryActiveVar = true;
      this.walkinActiveVar = false;
      this.takeoutActiveVar = false;
      this.ronnysActive = true;
      this.woltActive = false;
      this.glovoActive = false;
      if(ND === 'no'){
        if (this.order.deliveryFee === 2.5)
          this.activeFee_el = 0;
        else if (this.order.deliveryFee === 4)
          this.activeFee_el = 1;
        else if (this.order.deliveryFee === 6)
          this.activeFee_el = 2;
        else if (this.order.deliveryFee === 7,5)
          this.activeFee_el = 3;
        else if (this.order.deliveryFee === 7)
          this.activeFee_el = 4;
        else if (this.order.deliveryFee === 10)
          this.activeFee_el = 5;
        else if (this.order.deliveryFee === 13.5)
          this.activeFee_el = 6;
        // pass
      }
      else {
        this.ronnysModal = true;
        }
      },
    discOrder(){
        this.discountItem = false;
        this.discountOrder = !this.discountOrder;
    },
    discItem(){
        this.discountOrder = false;
        this.discountItem = true;
    },
    noDisc(){
      this.order.discount = 0;
      this.order.discountName = '';
      this.order.discountAmount = false;
      this.order.discInfo = '';
    },
    diplomatDisc(){
      this.diplomatModal = false;
      this.discountActive = true;
      this.order.discountAmount = false;
      this.order.discount = this.diplomatDiscount;
      this.order.discountInfo = this.discountInfo;
      this.order.discountName = 'Diplomat';
    },
    studentDisc(){
      this.studentModal = false;
      this.discountActive = true;
      this.order.discountAmount = false;
      this.order.discount = this.studentDiscount;
      this.order.discountInfo = this.discountInfo;
      this.order.discountName = 'Student';
    },
    employeeDisc(){
        this.teamModal = false;
        this.discountActive = true;
        this.order.discountAmount = false;
        this.order.discount = this.employeeDiscount;
        this.order.discountInfo = this.discountInfo;
        this.order.discountName = 'Team';
    },
    corporateDisc(){
        this.teamModal = false;
        this.corporateActive = true;
        this.order.discountAmount = false;
        this.order.discount = this.corporateDiscount;
        this.order.discountInfo = this.discountInfo;
        this.order.discountName = 'Corporate';
    },
    managerDisc(){
      // alert(this.checkManager());
      // if(this.checkManager()){
      //   this.managerModal = true;
      // }
      // else{
      //   alert('Enter Manager Pin');
      // }
      this.managerModal = true; 
    },
    applyManager(pin){
      if(this.managerComment == ''){
        alert('Manager comment is required!');
      } 
      else{
        // totalPrice
        // this.managerModal = false;
        // this.managerPin = true;
        // console.log("Check Returns: ", this.checkManager());
        const TOKEN = localStorage.getItem("TOKEN");
        var bodyFormData = new FormData();
        bodyFormData.set("pin", pin);
        bodyFormData.set("order_id", this.order.orderId);
        axios
          .request({
            method: "post",
            url:
              this.$hostname + "manager/check-pin",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
              // console.log('MANAGER RESPONSE: ', response);

              if (response.data.data == true)
              {
                this.discountActiveVar = false;
                if(this.managerPercent != ''){
                this.order.discount = this.managerPercent;
                this.order.managerComment = this.managerComment;
                this.order.discountName = 'Manager';
                this.order.discountAmount = false;
                this.managerPercentVar = true;
                this.managerModalVar = false;
                this.managerPin = false;
              } else if(this.managerAmount != '') {
                this.order.discount = this.managerAmount;
                this.order.managerComment = this.managerComment;
                this.order.discountName = 'Manager';
                this.order.discountAmount = true;
                this.managerAmountVar = true;
                this.managerModalVar = false;
                this.managerPin = false;
              } else if(this.managerAmount == '' && this.managerPercent == ''){
                this.managerModalVar = false;
                this.managerPin = false;
                alert('No Discount Selected');
              }
              }
              else{
                this.managerModal = false;
                this.managerPin = false;
                alert('Pin is not correct!');
              }

          });
          // if(this.managerPercent != ''){
          //   this.order.discount = this.managerPercent;
          //   this.order.managerComment = this.managerComment;
          //   this.order.discountName = 'Manager';
          //   this.order.discountAmount = false;
          //   this.managerPercentVar = true;
          //   this.managerModal = false;
          // } else if(this.managerAmount != '') {
          //   this.order.discount = this.managerAmount;
          //   this.order.managerComment = this.managerComment;
          //   this.order.discountName = 'Manager';
          //   this.order.discountAmount = true;
          //   this.managerAmountVar = true;
          //   this.managerModal = false;
          // } else if(this.managerAmount == '' && this.managerPercent == ''){
          //   alert('No Discount Selected');
          // }
      }
      this.$forceUpdate();
    },
    doneDisc(){
        this.order.discount = this.cashInput; 
    },
    addCustomer(){
      // console.log('Customer info: ',this.customer);
      this.reverseGender();

      const TOKEN = localStorage.getItem("TOKEN");
      var bodyFormData = new FormData();
      bodyFormData.set("id", -1);
      bodyFormData.set("name", this.curentCustomer.name);
      bodyFormData.set("address", this.curentCustomer.address);
      bodyFormData.set("gender", this.curentCustomer.gender);
      bodyFormData.set("email", this.curentCustomer.email);
      bodyFormData.set("phone", this.curentCustomer.phone);
      bodyFormData.set("discount", this.curentCustomer.discount);
      bodyFormData.set("comment2", this.curentCustomer.comment2);
      bodyFormData.set("personal_id", this.curentCustomer.personal_id);
      bodyFormData.set("comment", this.curentCustomer.comment);
      bodyFormData.set("ltd_name", this.curentCustomer.ltdName);
      bodyFormData.set("ltd_id", this.curentCustomer.ltdId);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "customers/create-customer",
            //"http://max.ronnyspizza.ge/rest/web/index.php?r=v1/customers/create-customer",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          // console.log('------', response.data);
          // console.log('CUSTOMER: ', this.customer);

        //  this.curentCustomer = this.customer;
        //  console.log('Current Customer from API: ', this.curentCustomer);

        });


      this.crmModal = false;
    },
    editCustomer(){
      const TOKEN = localStorage.getItem("TOKEN");
      this.reverseGender();
      var bodyFormData = new FormData();
      bodyFormData.set("id", this.curentCustomer.id);
      bodyFormData.set("name", this.curentCustomer.name);
      bodyFormData.set("address", this.curentCustomer.address);
      bodyFormData.set("gender", this.curentCustomer.gender);
      bodyFormData.set("phone", this.curentCustomer.phone);
      bodyFormData.set("discount", this.curentCustomer.discount);
      bodyFormData.set("email", this.curentCustomer.email);
      bodyFormData.set("personal_id", this.curentCustomer.personal_id);
      bodyFormData.set("comment", this.curentCustomer.comment);
      bodyFormData.set("comment2", this.curentCustomer.comment2);
      bodyFormData.set("ltd_name", this.curentCustomer.ltdName);
      bodyFormData.set("ltd_id", this.curentCustomer.ltdId);
      axios
        .request({
          method: "post",
          url:
            this.$hostname + "customers/create-customer",
            //"http://max.ronnyspizza.ge/rest/web/index.php?r=v1/customers/create-customer",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
        // console.log('------', response.data);

        // console.log('Current Customer from API: ', this.curentCustomer);
        this.changeDisc();

        });


      this.crmModal = false;
    },
    deliverCustomer(fee){
      if(fee != -1){
        this.order.deliveryFee = fee;
        this.deliveryFeeModal = false;
        this.order.customer = this.curentCustomer;
        this.order.adress = this.curentCustomer.address;
      }
      else {
        this.order.customer = this.curentCustomer;
        this.order.adress = this.curentCustomer.address;
        this.deliveryFeeModal = false;
      }
      
    },
    deliveryStep(){
      this.deliveryModal = false;
      if(this.order.deliveryType === 'delivery'){
        this.deliveryFeeModal = true;
      }
      else {
        this.order.deliveryFee = 'other';
        this.order.customer = this.curentCustomer;
        this.order.adress = this.curentCustomer.address;
        console.log('Order View: ', this.order);
      }
    },
    walkinCustomer(){
      
      this.order.customer = this.curentCustomer;
      this.order.deliveryType = "Walk_In";
      this.order.deliveryMethod = "Walk_In";
      this.walkInModal = false;
      
    },
    takeoutCustomer(){
      // if(this.curentCustomer.phone === '')
      // {
      //   alert('Phone field is empty!');
      // }
      // else {
        this.order.customer = this.curentCustomer;
        this.order.deliveryType = "Take_out";
        this.order.deliveryMethod = "Take Out";
        this.takeOutModal = false;
        // if(this.activeInvoice){
        //   this.paymentConfirm();
        // }
        // else {
        //   this.payLater();
        // }
      // }
      
    },
   deliveryCustomer(){
      if(this.curentCustomer.address === '' || this.curentCustomer.phone === ''){
        alert('Adress and Phone Fields are required!');
      }
      else if(this.deliveryFeeVar == -1){
        alert("You should select delivery fee!");
      }
      else {
        this.order.customer = this.curentCustomer;
        this.order.deliveryType = 'delivery';
        this.order.deliveryMethod = 'delivery';
        console.log('Ronnys customer : ', this.order.customer);
        this.ronnysModal = false;
        
        if(this.activeInvoice){
          this.paymentConfirm();
        }
        else {
          this.payLater();
        }
        //this.deliveryFeeModal = true;
      }
    },
   glovoCustomer(payment){
     if(this.curentCustomer.code.length === 3)
      {
        this.changeDefPrice();
        this.order.customer = this.curentCustomer;
        this.order.deliveryType = 'Glovo';
        if(payment === 'cash'){
          // this.order.deliveryMethod = 'Glovo Cash';
          this.order.deliveryMethod = 'Glovo';
          this.paymentType = 'cash';
          this.glovoModal = false;
          this.payLater();
        }
        else if(payment === 'card'){
          this.order.deliveryMethod = 'Glovo';
          this.paymentType = 'card';
          console.log('Glovo customer : ', this.order.customer);
          this.glovoModal = false;
          this.payLater();
        }
        else if(payment === 'transfer'){
          this.order.deliveryMethod = 'Glovo';
          this.paymentType = 'transfer';
          console.log('Glovo customer : ', this.order.customer);
          this.glovoModal = false;
          this.payGlovo();
        }
        // console.log('Glovo customer : ', this.order.customer);
        // this.glovoModal = false;
        // this.payGlovo();
      }
      else {
        alert('3 Digit Code is required!');
      }
    },
   woltCustomer(){

   if(this.curentCustomer.code.length === 3 && this.curentCustomer.name !== '')
      {
        this.changeDefPrice();
        this.order.customer = this.curentCustomer;
        this.order.deliveryType = 'Wolt';
        this.order.deliveryMethod = 'Wolt';
        this.paymentType = 'card';
        console.log('Wolt customer : ', this.order.customer);
        this.woltModal = false;

        // WOLT SALE CHECK
        // this.order.items.forEach( x => {
        //   if(x.id == '42' || x.id == '32'){
        //     if(x.size == 'm'){
        //       var diff = x.totalPrice - x.price;
        //       x.totalPrice = (x.price * 0.9) + diff;
        //       // x.totalPrice = x.totalPrice * 0.9;
        //     }
        //   }
        //   if(x.id == '40' || x.id == '31'){
        //     if(x.size == 'xl'){
        //       var diff = x.totalPrice - x.price;
        //       x.totalPrice = (x.price * 0.85) + diff;
        //       // x.totalPrice = x.totalPrice * 0.85;
        //     }
        //   }
        // });
        // WRITE COMMENT "WOLT SALE" IN ORDER_DATA OBJECT

        this.payWolt();
      }
      else {
        alert('3 Digit Code And Customer name fields are required!');
      }
    },
    closeChangeModal(){
      this.changeModal = false;
      this.calcPay();
    },
    posSetting(){
      this.settingModal = !this.settingModal;
    },
    posFunction(){
      this.functionModal = !this.functionModal;
    }
  },
};
</script>
<style>

.active {
    border: 3px solid #F60005 !important;
    box-sizing: border-box;
}
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}


#wrap {
    position: relative;
    margin-left: 50px;
}

#display {
    position: relative;
    top: -10px;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #00D881;
}

#numpad {
    position: absolute;
}

#display li {
    display: inline-block;
    font-family: monospace;
    font-size: 200%;
    padding: 10px 24px;
    background: #E6BC3B;
    color: black;
    margin-right: 1px;
}

#numpad li {
    float: left;
    padding: 13px 50px;
    background: #00D881;
    color: black;
    margin: 5px;
    cursor: pointer;
}

.numChar {
    font-family: monospace;
    font-size: 200%;
    border-radius: 51%;
    margin-top: 50%;
    height: 60px;
    width: 60px;
    background: #00D881;
    color: rgb(2, 1, 1);
    margin: 5px;
    cursor: pointer;
}

.pressed {
    box-shadow: inset 2px 2px 12px 5px rgba(0, 0, 0, 0.5);
}

.clear {
    clear: both;
}
</style>