<script>
/* eslint-disable */
</script>

<template>
    <v-container data-app>
        <v-row>
            <v-card class="col-md-8 col-sm-12">
                <v-tabs
                v-model="tab"
                fixed-tabs
                background-color="primary"
                dark      
                >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                    @click="getTab(item)"
                >
                    {{ item.tab }}
                </v-tab>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-data-table
                            v-model="selected"
                            :search="search"
                            :headers="headers"
                            :items="filteredOrders"
                            :items-per-page="itemsPerPage"
                            item-key="order_id"
                            :loading="loading"
                            :single-select="singleSelect"
                            show-select
                            class="elevation-1"
                            @page-count="pageCount = $event"
                        >
                            <template v-slot:item="row">
                                <tr @click="onButtonClick(row.item)">
                                    <td>{{row.item.order_data.deliveryMethod}}</td>
                                    <td>{{row.item.order_data.adress}}</td>
                                    <td>{{row.item.order_data.customer.name}}</td>
                                    <td>{{row.item.order_data.customer.tel}}</td>
                                    <td>{{row.item.order_data.items[0].name}}...</td>
                                </tr>
                            </template>
                    </v-data-table>
                    </v-tab-item>
            </v-tabs-items>
            </v-tabs>
            </v-card>
            <v-card class="col-md-4 col-sm-12">
                <i class="material-icons md-36 topcorner" @click="clearOrder()" v-if="showOrderComponent">close</i>
                <orderList :orderProp="order" v-if="showOrderComponent" />

                <v-btn v-if="finishedActive" @click="statusRequest('in_delivery')">Start Order</v-btn>
                <v-btn v-if="ongoingActive" @click="statusRequest('Finished')">Finish Order</v-btn>
                <v-btn @click="customerReject()">Customer Reject</v-btn>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import orderList from '../components/Order';
import axios from 'axios';
export default {
    name: 'Single Order',
    data(){
        return {
            showOrderComponent: false,
            order: [],
            orders: [],
            filteredOrders: [],
            pageCount: 0,
            finishedActive: true,
            ongoingActive: false,
            itemsPerPage: 5,
            selectedOrder: [],
            selected: [],
            loading: true,
            search: '',
            singleSelect: true,
            branch: 'saburtalo',
            status: 2,
            tab: 0,
            items: [
            { tab: 'Finished Orders', content: 'finished' },
            { tab: 'Ongoing Orders', content: 'ongoing' },
            ],
            headers: [
            {
                text: "ORDER ID",
                align: "start",
                sortable: false,
                value: "order_id",
            },
            { text: "Delivery Adress", value: "order_data.adress" },
            { text: "Customer Name", value: "order_data.customer.name" },
            { text: "Customer Phone", value: "order_data.customer.tel" },
            { text: "Order Items", value: "order_data.items[0].name" },
            ],
        }
    },
    props: {
      orderProp: {
          type: Object,
      },

  },
    mounted() {
        this.loggedUser = this.$store.state.auth.user.data;

        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        // bodyFormData.set("branch", this.branch);
        bodyFormData.set("status_key", "5,6");

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
            console.log("response: ", response);
            this.orders = response.data.data;
            this.orders = this.orders.filter((x) =>  x.order_data.deliveryType === "Ronnys" )
            // this.orders.forEach(x => {
            //     x.order_data = JSON.parse(x.order_data);
            // });
            this.filteredOrders = this.orders.filter((x) => x.status === '5');
            console.log("orders data: ", response.data.data);
        });


    },
    components: {
        orderList,
    },
    computed: {

    },
    methods: {
        updateOrders() {
            this.loggedUser = this.$store.state.auth.user.data;

            const TOKEN = this.loggedUser.token;
            var bodyFormData = new FormData();
            // bodyFormData.set("branch", this.branch);
            bodyFormData.set("status_key", "5,6");

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
                console.log("response: ", response);
                this.orders = response.data.data;
                this.orders = this.orders.filter((x) =>  x.order_data.deliveryType === "Ronnys" )
                // this.orders.forEach(x => {
                //     x.order_data = JSON.parse(x.order_data);
                // });
                this.filteredOrders = this.orders.filter((x) => x.status === '5');
                console.log("orders data: ", response.data.data);
                this.selectedOrder = [];
            });
        },
        statusRequest(status){
          const TOKEN = this.loggedUser.token;
          var bodyFormData = new FormData();
          bodyFormData.set("order_status", status);
          bodyFormData.set("id", this.selectedOrder.id);

          axios
            .request({
              method: "post",
              url:
                "http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/change-status",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              if(response.data.is_error){
                console.log("Status Change Error");
              }
              else{
                console.log("Order Status Changed Correctly");
                this.updateOrders();
              }
            });
        },
        goBack(){
             this.$router.go(-1);
        },
        driverFinish(){
            alert('Driver Finished Delivery: ' + this.selectedOrder.id);
        },
        driverReject(){
            alert("Driver Reject Delivery" + this.selectedOrder.id);
        },
        customerReject(){
            alert('Customer Reject Delivery'+ this.selectedOrder.id);
        },
        clearOrder(){
          this.order = [];
          this.selectedOrder = [];
          this.showOrderComponent = false;
        },
        onButtonClick(item) {
            this.showOrderComponent = true;
            this.order = item;
            this.selectedOrder = item;

            console.log("Selected Item: ", this.selectedOrder);
        },
        getTab(tab){
            if(tab.content === 'finished') {
                this.ongoingActive = false;
                this.finishedActive = true;
                this.filteredOrders = this.orders.filter((x) => x.status === '5');
            }
            else if(tab.content === 'ongoing') {
                this.ongoingActive = true;
                this.finishedActive = false;
                this.filteredOrders = this.orders.filter((x) => x.status === '6');
            }
            this.$forceUpdate();
        },
    },
}
</script>