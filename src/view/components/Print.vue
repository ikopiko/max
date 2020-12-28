<script>
/* eslint-disable */
</script>
<template>
<div style="background-color:#D8D8D8; font-size:24px;">
    123
    <button @click="sendData()">
        123
    </button>

</div>
</template>

<script>
import LoadScript from 'vue-plugin-load-script';
import $ from 'jquery';
import Vue from 'vue';

Vue.use(LoadScript);

Vue.LoadScript("../../assets/js/print/BrowserPrint.js");
Vue.LoadScript("../../assets/js/print/DevDemo.js");

export default {
    mounted(){
        $(document).ready(setup_web_print);
        // console.log(devPrint);
    },
}
</script>
