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
                        <!-- {{ item.meta_data[0].value }} -->
                        {{ item.name }}</strong
                      >
                    </span>
                    <span>
                      <!-- {{ (item.total.toFixed(2) * item.quantity) }}  -->
                      {{ item.price }}                  
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