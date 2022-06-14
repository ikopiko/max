<script>
/* eslint-disable */
</script>
<template>
<!-- <v-app> -->
  <div class="row">
    <audio ref="audioElm" src="@/assets/beep.wav"></audio>
    <!-- <button @click="playSound">PLAY</button> -->
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
      <v-tab-item v-for="item in items" :key="item.id">
        <v-card
        >
          <Card 
          :orders = filteredOrders />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
<!-- </v-app> -->
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
      date: new Date(),
      oldCount: null,
      items: [
        {id: 0, name: "Pending Orders", content: null, oldContent: null, color: 'red'},
        {id: 1, name: "Preparing in Kitchen", content: null, oldContent: null, color: 'green'},
        {id: 2, name: "Completed Orders", content: null,  oldContent: null, color: 'yellow'},
      ],
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
            || vm.$store.state.auth.user.data.role.toLowerCase() == "posaccess" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "cook" ) {
         vm.$router.push({name: "max"}).catch(()=>{});
       }
       else {
         vm.$router.push({name: "dashboard"}).catch(()=>{});
       }
    });
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.updateOrders();

    this.filteredOrders = this.orders.filter((x) => x.status == 2 || x.status == 3 || x.status == 4);
    this.date = this.formatDate(this.date);
  },
  created () {
      this.timer = setInterval(this.updateOrders, 500)
    },
  methods: {
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
          const TOKEN = this.$store.state.auth.user.data.token;

          var dateString = this.date + ' to '+ this.date;
          var bodyFormData = new FormData();
          //bodyFormData.set("branch", this.branch);
          bodyFormData.set("day", dateString);
          bodyFormData.set("status_key", '1,2,3,4,5');

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
              this.items[0].oldContent = this.items[0].content;
              this.items[1].oldContent = this.items[1].content;
              this.items[2].oldContent = this.items[2].content;

              // var contentSum = this.items[0].content  + this.items[1].content + this.items[2].content;

              this.items[0].content = this.orders.filter((x) => x.status == 1).length;
              this.items[1].content = this.orders.filter((x) => x.status == 2 || x.status == 3 || x.status == 4).length;
              this.items[2].content = this.orders.filter((x) => x.status == 5).length;

              this.oldCount = this.items[0].content  + this.items[1].content + this.items[2].content;
              var contentSum = 0;
              var oldSum = 0;
              this.items.forEach(x => {
                contentSum = contentSum + x.content;
                oldSum = oldSum + x.oldContent;
              });
              this.oldCount = oldSum;

              if(contentSum > oldSum){
                this.playSound();
              }

            });
          this.getTab(this.items[this.tab]);
        },
        playSound() {
          this.$refs.audioElm.play();
        },
  }
};
</script>
