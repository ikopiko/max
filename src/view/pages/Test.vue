<script>
/* eslint-disable */
</script>
<template>
    <div class="container" data-app>
        <!-- FIRST ROW -->
        <div class="row">
            <div class="col-6 bg-light">
                <div class="row">
                    <div class="row">
                        <div class="col-12">
                            {{ dates[0] }} - {{ dates[1] }}
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <v-date-picker
                            v-model="dates"
                            range
                        ></v-date-picker>
                    </div>
                </div>
                
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-12 mt-5">
                        <v-autocomplete
                            v-model="values"
                            :items="items"
                            outlined
                            dense
                            chips
                            small-chips
                            label="Outlined"
                            multiple
                        ></v-autocomplete>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 my-5">
                        <v-list
                            flat
                            subheader
                            three-line
                            >
                            <v-subheader>Filters</v-subheader>

                            <v-list-item-group
                                v-model="settings"
                                multiple
                                active-class=""
                            >
                                <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                    <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                    <v-list-item-title>Order Number</v-list-item-title>
                                    <v-list-item-subtitle>Filter By Order Number</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                                </v-list-item>

                                <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                    <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                    <v-list-item-title>Customer</v-list-item-title>
                                    <v-list-item-subtitle>Filter By Customer Name, Phne Number and Email</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                                </v-list-item>

                                <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                    <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                    <v-list-item-title>Branch</v-list-item-title>
                                    <v-list-item-subtitle>Filter By Branch</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                    </div>
                </div>
            </div>
            
        </div>

        <v-footer
            padless
        >
            <v-row
            justify="center"
            no-gutters
            >

            <div class="mx-2">
                <v-btn
                color="error"
                dark
                x-large
                >
                Open
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn
                color="error"
                dark
                x-large
                >
                Pending Payments
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn
                color="error"
                dark
                x-large
                >
                Open And Pending
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn
                color="error"
                dark
                x-large
                >
                Future
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn
                color="error"
                dark
                x-large
                >
                Voids
                </v-btn>
            </div>
            <div class="mx-2">
                <v-btn
                color="error"
                dark
                x-large
                >
                Discards
                </v-btn>
            </div>
            
            </v-row>
        </v-footer>
    </div>
</template>

<script>
  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
  import Vue from "vue";

  Vue.use(BootstrapVue);
  Vue.use(IconsPlugin);

  export default {
    name: 'Test',
    data() {
      return {
        items: ['Irakli Andguladze', 'Levan Andguladze', 'Levan Gobronidze', 'Eric Binder'],
        values: [],
        value: null,
        dates: ['2019-09-10', '2019-09-20'],
        settings: [],
    }
  },
  computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
}
</script>