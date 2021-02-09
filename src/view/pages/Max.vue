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
        :key="item.id"
      >
      <v-badge
          :color= item.color 
          :content= item.content 
        >
        {{ item.name }}
        </v-badge>
        
      </v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <Card 
          :statusIndex= 1 />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <Card
          :statusIndex= 2 />
        </v-card> 
      </v-tab-item>
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <Card 
          :statusIndex= 3 />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>
</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import Card from "@/view/components/Cards.vue";

export default {
  name: "dashboard",
  components: {
    Card
  },
  data() {
    return {
      loggedUser: {},
      tab: 1,
      items: [
        {name: "Pending Orders", content: 1, color: 'red'},
        {name: "Preparing in Kitchen", content: 3, color: 'green'},
        {name: "Completed Orders", content: 8, color: 'yellow'},
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
    this.loggedUser = this.$store.state.auth.user.data;
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
  }
};
</script>
