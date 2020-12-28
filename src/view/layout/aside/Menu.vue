<script>
/* eslint-disable */
</script>
<template>
  <ul class="menu-nav">
    
    <li class="menu-section">
      <h4 class="menu-text">Cashier</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>

    <router-link
      to="/dashboard"
      v-slot="{ href, navigate, isActive, isExactActive }"
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
        <a :href="href" class="menu-link" @click="navigate">
          <v-icon
            class="menu-icon"
            large
          >
          addchart
          </v-icon>
          <span class="menu-text">Dashboard</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/pos"
      v-slot="{ href, navigate, isActive, isExactActive }"
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
        <a :href="href" class="menu-link" @click="navigate">
          <v-icon
            class="menu-icon"
            large
          >
          fact_check
          </v-icon>
          <span class="menu-text">POS</span>
        </a>
      </li>
    </router-link>
    
    <router-link
      to="/order"
      v-slot="{ href, navigate, isActive, isExactActive }"
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
        <a :href="href" class="menu-link" @click="navigate">
          <v-icon
            class="menu-icon"
            large
          >
          view_list
          </v-icon>
          <span class="menu-text">Orders</span>
        </a>
      </li>
    </router-link>


    <router-link
      to="/driverdispatch"
      v-slot="{ href, navigate, isActive, isExactActive }"
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
        <a :href="href" class="menu-link" @click="navigate">
          <v-icon
            class="menu-icon"
            large
          >
          moped
          </v-icon>
          <span class="menu-text">Driver Dispatch</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/timetable"
      v-slot="{ href, navigate, isActive, isExactActive }"
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
        <a :href="href" class="menu-link" @click="navigate">
          <v-icon
            class="menu-icon"
            large
          >
          alarm_add
          </v-icon>
          <span class="menu-text">Time Clock</span>
        </a>
      </li>
    </router-link>


    <li class="menu-section">
      <h4 class="menu-text">Manager</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>


  <router-link
      to="/max"
      v-slot="{ href, navigate, isActive, isExactActive }"
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
        <a :href="href" class="menu-link" @click="navigate">
          <v-icon
            class="menu-icon"
            large
          >
          receipt_long
          </v-icon>
          <span class="menu-text">MAX</span>
        </a>
      </li>
    </router-link>
    
  </ul>
</template>

<script>
export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
