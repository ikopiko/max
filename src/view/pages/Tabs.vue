<script>
/* eslint-disable */
</script>
<template>
    <div>        
            <b-card no-body class="col-12">
              
            <b-tabs pills vertical content-class="navTabs" active-tab-class="activeTab" lazy11>
                <!-- Render Tabs, supply a unique `key` to each tab -->
                <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'#' + i" active>
                <pos :orderIndex = i />
                <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
                  Close tab
                </b-button>
                </b-tab>

                <!-- New Tab Button (Using tabs-end slot) -->
                <template v-slot:tabs-end>
                <b-nav-item role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
                </template>

                <!-- Render this if no tabs -->
                <template v-slot:empty>
                <div class="text-center text-muted">
                    There are no open tabs<br>
                    Open a new tab using the <b>+</b> button above.
                </div>
                </template>
            </b-tabs>
            </b-card>
            
    </div>
</template>

<script>
  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
  import Vue from "vue";
  import Pos from './Pos.vue'
  import axios from "axios";

  Vue.use(BootstrapVue);
  Vue.use(IconsPlugin);

  export default {
    name: 'Tabs',
    data() {
      return {
        tabs: [],
        tabCounter: 0,
        orderId: 0,
        newID: '',
        oldID: '',
        logged_user: {},
        isPos: false,
        userPermissions: {
            admin : 'all', 
        },
        posView: false,
        ordersView: false,
        timeView: false,
        allView: false,
        TOKEN: '',
      }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
        
    },
    components: {
        Pos
    },
    mounted() {

        this.logged_user.token = localStorage.getItem('TOKEN');
        this.logged_user.name = localStorage.getItem('USER_NAME');
        this.logged_user.lastName = localStorage.getItem('USER_LAST');
        this.logged_user.role = localStorage.getItem('USER_ROLE');

        console.log('Logged User Log: ', this.logged_user);
        this.TOKEN = this.logged_user.token;
        
        if(this.logged_user.role !== 'admin'){
            
            this.$router.push({name: 'main'});
        }
        this.newOrderID();

    },
    methods: {
      posComponent(){
          this.isPos = !this.isPos;

      },
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
          }
        }
      },
      newTab() {
        this.newOrderID();
        this.tabs.push(this.orderId);
      },
      
      newOrderID() {
        
        if(this.orderId === this.oldID){
          this.oldID  = parseInt(this.oldID);
          this.orderId = this.oldID + 1;
        }
        else if(this.orderId !== 0) {
          this.oldID = this.orderId;
        }

        axios
      .request({
        method: "get",
        url:
          "http://188.169.16.186:8082//ronny/rest/web/index.php?r=v1/products/get-order-id",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.orderId = response.data;
        // this.orderId = parseInt(parseFloat(response.data));
        console.log('orderID: ', this.orderId);
      });
        
      }
      
    }
  }
</script>