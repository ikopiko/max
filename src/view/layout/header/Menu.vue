<script>
/* eslint-disable */
</script>
<template>
  <div data-app>
    <ul class="menu-nav">
      <router-link
        to="/dashboard"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link">
            <span class="menu-text"> Dashboard </span>
          </a>
        </li>
      </router-link>

      <router-link
        to="/orders"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link">
            <span class="menu-text"> Order List </span>
          </a>
        </li>
      </router-link>
      <router-link
        to="/max"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link">
            <span class="menu-text"> KDS </span>
          </a>
        </li>
      </router-link>

      <router-link
        to="/pos"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link" >
            <span class="menu-text"> POS </span>
          </a>
        </li>
      </router-link>
      
      <router-link
        to="/driverdispatch"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link" >
            <span class="menu-text"> Driver Dispatch </span>
          </a>
        </li>
      </router-link>
      
      <router-link
        to="/timetable"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link">
            <span class="menu-text"> Time Clock </span>
          </a>
        </li>
      </router-link>

      <router-link
        to="/banks"
        v-slot="{ href, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link">
            <span class="menu-text"> Banks </span>
          </a>
        </li>
      </router-link>

      <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item "
        >
          <!-- <a class="menu-link">
            <span class="menu-text red-text"> {{ ordersCount }} Pending Orders </span>
          </a> -->

          <v-tooltip
          v-model="show"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
                <v-badge
                :content="ordersCount"
                :value="ordersCount"
                color="green"
                overlap
              >
                <v-icon large>
                  notifications
                </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <span>Pending orders in {{ loggedUser.branch_name }}</span>
        </v-tooltip>

        
          <!-- <v-badge
            :content="ordersCount"
            :value="ordersCount"
            color="green"
            overlap
          >
            <v-icon large>
              notifications
            </v-icon>
          </v-badge> -->
        </li>
    </ul>
  </div>
</template>

<script>
import { branchOrders } from "../../../core/plugins/firebase";

export default {
  name: "KTMenu",
  data() {
    return {
      firebaseNotifications: [],
      loggedUser: {},
      ordersCount: null,
      show: false,
    }
  },
  mounted() {
    this.loggedUser = this.$store.state.auth.user.data;

    this.firebaseNotifications.forEach(x => {
      if(x.id == this.loggedUser.branch_id){
        this.ordersCount = x.count;
      }
    });
    // this.$watch(
    //   "firebaseNotifications",
    //   function () {
    //     this.firebaseNotifications
           
    //   },
    //   { deep: false }
    // );

    // console.log('NOTIFICATION BRANCH: ', this.firebaseNotifications);
  },
  watch: {
    firebaseNotifications(val){
      deep: true,

      this.firebaseNotifications.forEach(x => {
        if(x.id == this.loggedUser.branch_id){
          this.ordersCount = x.count;
          this.$forceUpdate();
        }
      });

    },
  },
  firebase: {
    firebaseNotifications: branchOrders,
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
<style lang="scss">
.red-text {
  color: red !important;
}
</style>
