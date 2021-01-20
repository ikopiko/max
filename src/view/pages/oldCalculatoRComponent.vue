<div class="col-12 right-2" v-if="calculatorModal">
          <div class="row" v-if="!discountOrder || !discountItem">
            <div class="col w-3 gray">
              <div>
                <h4>Discount:</h4>
              </div>
              <div>
                <h4 id="total_price">-{{ totalDisc.toFixed(2) }} {{ order.discountName}}</h4>
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
            <div class="col w-3 gray" v-if="(cashInput - totalPrice) >= 0">
              <div>
                <h4>Change:</h4>
              </div>
              <div>
                <h4 id="total_price">{{ (cashInput - totalPrice).toFixed(2) }}</h4>
              </div>
            </div>
            <div class="col w-3 gray" v-if="(cashInput - totalPrice) < 0">&nbsp;</div>
            <div class="col w-3 gray" v-if="deliveryActiveVar">
              <div>
                <h4>Delivery Fee:</h4>
              </div>
              <div>
                <h4 id="total_price">{{ order.deliveryFee }}</h4>
              </div>
            </div>
          </div>

          <!-- <div class="row" v-if="splitActive">

            <div class="col w-3 gray" :class="{active : splitPart == 1}" @click="splitSelect(1)">
              <div>
                <h4>Split 1</h4>
                <h4 id="split_1">{{ split.split1.input }} {{ split.split1.paymentType }}</h4>
              </div>
            </div>
            <div class="col w-3 gray" :class="{active: splitPart == 2}" @click="splitSelect(2)">
              <div>
                <h4>Split 2</h4>
                <h4 id="split_2">{{ split.split2.input }} {{ split.split2.paymentType }}</h4>
              </div>
            </div>
            <div class="col w-3 gray" v-for="(splitCnt, index) in split" :key="index" @click="splitSelect(index)">
              <div>
                <h4>Split {{ index }}</h4>
                <h4 id="split_1">{{ splitCnt.input }} {{ splitCnt.paymentType }}</h4>
              </div>
            </div> 

          </div> -->

          <div class="row" v-if="discountOrder || discountItem">
            
            <div class="col w-3 gray">
              <div>
                <h4>Discount:</h4>
              </div>
              <div>
                <h4 id="total_price">{{ cashInput }}</h4>
              </div>
            </div>
            
          </div>
          

          <div class="row my-1">
            <div class="col-1">&nbsp;</div>
            <div class="col-1 paddingClear" style="padding-left: 0" @click="closeCalc()">
              <div class="w-b-1 square">
                      <i class="fa fa-home fa-4x iconColor"></i>
              </div>
            </div>
            <div class="col-1 calcBtn grey">Manager</div>
            <div class="col-3 calcBtn" @click="couponModal = true;" v-b-modal.couponModal>Coupon</div>
            <div class="col-1 calcBtn lightGreen" @click="calcCash(100)">100</div>
            <div
              class="col-1 calcBtn blue"
              @click="walkinActive() "
              v-bind:class="{active: walkinActiveVar}"
            >Walk In</div>
            <div class="col-1 calcBtn blue" @click="invoiceActive()">Invoice</div>
            <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 0 }" @click="activateFee(0)">1.5 GEL 0-3.9 Km</div>

          </div>
          <div class="row my-1">
            <div class="col-1">&nbsp;</div>
            <div class="col-1 calcBtn blue" @click="diplomatDisc();">Diplomat</div>
            <div class="col-1 calcBtn blue" @click="employeeDisc();">Employee</div>
            <div class="col-1 calcBtn" @click="calcInput('7')">7</div>
            <div class="col-1 calcBtn" @click="calcInput('8')">8</div>
            <div class="col-1 calcBtn" @click="calcInput('9')">9</div>
            <div class="col-1 calcBtn lightGreen" @click="calcCash(50)">50</div>
            <div
              class="col-1 calcBtn blue"
              @click="takeoutActive()"
              v-bind:class="{active: takeoutActiveVar}"
            >Take Out</div>
            <div class="col-1 calcBtn blue" v-bind:class="{active: glovoActive}" @click="glovoDelivery();">Glovo</div>
            <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 1 }" @click="activateFee(1)">3 GEL 4-9.9 Km</div>
          </div>


          <div class="row my-1">
            <div class="col-1">&nbsp;</div>
            <div class="col-1 calcBtn blue" @click="studentDiscount();">Student</div>
            <div class="col-1 calcBtn blue" @click="socialDiscount();">Social</div>
            <div class="col-1 calcBtn" @click="calcInput('4')">4</div>
            <div class="col-1 calcBtn" @click="calcInput('5')">5</div>
            <div class="col-1 calcBtn" @click="calcInput('6')">6</div>
            <div class="col-1 calcBtn lightGreen" @click="calcCash(20)">20</div>
            <div
              class="col-1 calcBtn blue"
              @click="ronnysDelivery()"
              v-bind:class="{active: ronnysActive}"
            >Delivery</div>
            <div class="col-1 calcBtn blue" v-bind:class="{active: woltActive}" @click="woltDelivery();">Wolt</div>
            <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 2 }" @click="activateFee(2)">4.5 GEL 10-15.9 Km</div>

          </div>
          <div class="row my-1">
            <div class="col-1">&nbsp;</div>
            <div class="col-1 calcBtn blue" @click="noDisc()">NO Disc</div>
            <div class="col-1 calcBtn blue" >&nbsp;</div>
            <div class="col-1 calcBtn" @click="calcInput('1')">1</div>
            <div class="col-1 calcBtn" @click="calcInput('2')">2</div>
            <div class="col-1 calcBtn" @click="calcInput('3')">3</div>
            <div class="col-1 calcBtn lightGreen" @click="calcCash(10)">10</div>
            <div class="col-2 calcBtn green" @click="doneCash()" v-b-modal.confirmModal>Cash</div>
            <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 3 }" @click="activateFee(3)">6 GEL 16-19.9 Km</div>
          </div>
          <div class="row">
            <div class="col-1">&nbsp;</div>
            <div class="col-1 calcBtn blue" @click="futureModal = true">Future</div>
            <div class="col-1 calcBtn blue">other</div>
            <div class="col-1 calcBtn" @click="calcInput('0')">0</div>
            <div class="col-1 calcBtn" @click="calcInput('00')">00</div>
            <div class="col-1 calcBtn" @click="calcInput('.')">.</div>
            <div class="col-1 calcBtn lightGreen" @click="calcCash(5)">5</div>
            <div class="col-2 calcBtn green" @click="payCard()" v-b-modal.confirmModal>Card</div>
            <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 4 }" @click="activateFee(4)">7 GEL 20-27.9 Km</div>
          </div>
          <div class="row my-1">
              <div class="col-1">&nbsp;</div>
              <div class="col-2 calcBtn red" @click="calcClear()">
                  <i class="material-icons md-36" >close</i>
              </div>
              <div class="col-3 calcBtn lightGreen" @click="calcPayAll(totalPrice)">PAY {{ totalPrice.toFixed(2) }}</div>
              <div class="col-1 calcBtn lightGreen" @click="calcCash(2)">2</div>
              <div class="col-2">&nbsp;</div>
              <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 5 }" @click="activateFee(5)">10 GEL 28 Km +</div>
          </div>
          <div class="row my-1">
              <div class="col-9">&nbsp;</div>
              <div class="col-2 feeClass" v-if="deliveryActiveVar" :class="{active: activeFee_el == 6 }" @click="activateFee(6)">13.5 GEL Rustavi</div>
          </div>
        </div>