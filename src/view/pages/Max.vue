<script>
/* eslint-disable */
</script>
<template>
  <div class="row">
      <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        @click="getTab(item)"
        :key="item.id"
      >
      <v-badge
          v-if="item.content != 0"
          :color= item.color 
          :content= item.content 
        >
        {{ item.name }}
      </v-badge>
      <v-badge
          v-if="item.content == 0"
          :content= item.content 
        >
        {{ item.name }}
        </v-badge>
        
      </v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card
          color="basil"
          flat
        >
          <Card 
          :orders = filteredOrders />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import axios from "axios";

import Card from "@/view/components/Cards.vue";

export default {
  name: "dashboard",
  components: {
    Card
  },
  data() {
    return {
      loggedUser: {},
      loader: true,
      orders: [],
      filteredOrders: [],
      tab: 1,
      items: [
        {id: 0, name: "Pending Orders", content: null, color: 'red'},
        {id: 1, name: "Preparing in Kitchen", content: null, color: 'green'},
        {id: 2, name: "Completed Orders", content: null, color: 'yellow'},
      ],
    };
  },
  
  beforeRouteEnter (to, from, next) {
    next(vm => {
       if (vm.$store.state.auth.user.data.role !== "admin" || vm.$store.state.auth.user.data.role !== "posaccess") {
         vm.$router.push({name: "max"});
       }
       else {
         vm.$router.push({name: "dashboard"});
       }
    });
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    // this.loggedUser = this.$store.state.auth.user.data;
    this.updateOrders();

    this.filteredOrders = this.orders.filter((x) => x.status == 2 || x.status == 3 || x.status == 4);
  },
  created () {
      this.timer = setInterval(this.updateOrders, 500)
    },
  methods: {
    /**
     * Set current active on click
     * @param event
     */
    getTab(tab){
            if(tab.id == 0) {
              this.filteredOrders = this.orders.filter((x) => x.status == 1);
            }
            else if(tab.id == 1) {
              this.filteredOrders = this.orders.filter((x) => x.status == 2 || x.status == 3 || x.status == 4);
            }
            else if(tab.id == 2) {
              this.filteredOrders = this.orders.filter((x) => x.status == 5);
            }
            this.$forceUpdate();
        },
        updateOrders(){
          const TOKEN = localStorage.getItem("TOKEN");

          var bodyFormData = new FormData();
          bodyFormData.set("status_key", '1,2,3,4,5');

          axios
            .request({
              method: "post",
              url:
                "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/list",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              this.orders = response.data.data;
              console.log("response 123: ", this.orders);

              this.items[0].content = this.orders.filter((x) => x.status == 1).length;
              this.items[1].content = this.orders.filter((x) => x.status == 2 || x.status == 3 || x.status == 4).length;
              this.items[2].content = this.orders.filter((x) => x.status == 5).length;

            });
          this.getTab(this.items[this.tab]);
        },
  }
};
</script>
