<script>
/* eslint-disable */
</script>
<template>
  <div>
    <div class="container">
      <div class="row">
       
          <v-card
              class="mx-5 col-3 cardClass"
              outlined
              :class="{ cardClassActive  : posView || allView }"
            > 
            <router-link class="mx-5" to="/pos"> 
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline h2 bold mb-1">
                    POS
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="120"
                  color="grey"
                >
                <!-- <v-icon
                  x-large
                >
                bar_chart
                </v-icon> -->
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <div class="demo green bottomleft"> 
                </div>
              </v-card-actions>
              </router-link>
          </v-card>
    
          <v-card
              class="mx-5 col-3 cardClass"
              outlined
              :class="{ cardClassActive  : ordersView || allView }"
            ><router-link class="mx-5" to="/orders"> 
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline h2 bold mb-1">
                    Orders
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="120"
                  color="grey"
                >
                <!-- <v-icon
                  x-large
                >
                bar_chart
                </v-icon> -->
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <div class="demo red bottomleft"> 
                </div>
              </v-card-actions>
              </router-link>
          </v-card>
   
          <v-card
              class="mx-5 col-3 cardClass"
              outlined
              :class="{ cardClassActive  : driverView || allView }"
            ><router-link class="mx-5" to="/driverdispatch"> 
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline h2 bold mb-1">
                    Driver
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="120"
                  color="grey"
                >
                <!-- <v-icon
                  x-large
                >
                bar_chart
                </v-icon> -->
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <div class="demo blue bottomleft"> 
                </div>
              </v-card-actions>
            </router-link>
          </v-card>

          <v-card
              class="mx-5 my-5 col-3 cardClass"
              outlined
              :class="{ cardClassActive  : maxView || allView }"
            ><router-link class="mx-5 my-5" to="/max"> 
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline h2 bold mb-1">
                    MAX
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="120"
                  color="grey"
                >
                <!-- <v-icon
                  x-large
                >
                bar_chart
                </v-icon> -->
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <div class="demo yellow bottomleft"> 
                </div>
              </v-card-actions>
              </router-link>
          </v-card>

          <v-card
              class="mx-5 my-5 col-3 cardClass"
              outlined
              :class="{ cardClassActive  : timeView || allView }"
            >
            <router-link class="mx-5 my-5" to="/timetable"> 
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline h2 bold mb-1">
                    Timeclock
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="120"
                  color="grey"
                >
                <!-- <v-icon
                  x-large
                >
                alarm
                </v-icon> -->
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <div class="demo orange bottomleft"> 
                </div>
              </v-card-actions>
            </router-link>
          </v-card>

          <v-card
              class="mx-5 my-5 col-3 cardClass"
              outlined
              :class="{ cardClassActive  : managerView || allView }"
            >
            <router-link class="mx-5 my-5" to="/banks"> 
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline h2 bold mb-1">
                    Banks
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="120"
                  color="grey"
                >
                <!-- <v-icon
                  x-large
                >
                account_balance
                </v-icon> -->
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <div class="demo purple bottomleft"> 
                </div>
              </v-card-actions>
            </router-link>
          </v-card>
        
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";


export default {
  name: "dashboard",
  components: {

  },
  data(){
    return {
      loggedUser: {},
      loggedUserFull: {},
      posView: false,
      ordersView: false,
      timeView: false,
      managerView: false,
      allView: false,
      driverView: false,
      maxView: false,
      dialog: false,
    }
  },
  mounted() {
      if (localStorage.getItem('reloaded')) {
          // The page was just reloaded. Clear the value from local storage
          // so that it will reload the next time this page is visited.
          localStorage.removeItem('reloaded');
      } else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          this.$router.go();
    }
    this.loggedUserFull = JSON.parse(localStorage.getItem("loggedUserData"));
    // console.log("Fullll", this.loggedUserFull);
    this.loggedUser = this.$store.state.auth.user.data;

    if(this.loggedUser.role.toLowerCase() == "admin"){
      this.allView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "globalmanager"){
      this.allView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "vicemanager"){
      this.allView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "branchmanager"){
      this.allView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "weiser"){
      this.allView = true;
    }
    else if(this.loggedUser.role.toLowerCase() === "posaccess") {
      this.posView = true;
      this.ordersView = true;
      this.driverView = true;
      this.timeView = true;
      this.maxView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "cashier") {
      this.posView = true;
      this.ordersView = true;
      this.driverView = true;
      this.timeView = true;
      this.maxView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "driver") {
      this.driverView = true;
      this.ordersView = true;
      this.timeView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "courier") {
      this.driverView = true;
      this.ordersView = true;
      this.timeView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "cook") {
      this.posView = true;
      this.maxView = true;
      this.timeView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "thermometer") {
      this.timeView = true;
    }
    else if(this.loggedUser.role.toLowerCase() == "housekeeper") {
      this.timeView = true;
    }
  },
  methods: {
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
    }
  },
};
</script>
