<script>
/* eslint-disable */
</script>
<template>
    <b-container>  
      <v-alert v-model="alert" color="pink" dark border="top" transition="scale-transition" dismissible>
          Login Failed
      </v-alert> 
          <b-row>
              <b-col cols="3">{{ pinUser.first_name  }} - {{ pinUser.role }} </b-col>
              <b-col cols="3">
                <ul id="display">
                    <li v-for="num in pinSync" :key="num">{{ num }}</li>
                    <div class="clear"></div>
                </ul>
              </b-col>
              <b-col cols="3">&nbsp;</b-col>
              <b-col cols="3">&nbsp;</b-col>
              <b-col cols="3">{{ timeNow }}</b-col>
          </b-row>
          
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('1')">1</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('2')">2</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('3')">3</div>
              <!-- &nbsp; -->
            </b-col>
            
            <b-col cols="2">
                <div class="inOut" @click="timeFoo('in')">IN</div>
            </b-col>
            <b-col cols="2">
                <div class="inOut" @click="timeFoo('out')">OUT</div>
            </b-col>
            <b-col cols="2">&nbsp;</b-col>
          </b-row>
            <br />
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('4')">4</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('5')">5</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('6')">6</div>
              <!-- &nbsp; -->
            </b-col>
            
            <b-col cols="4">
                <div class="break" @click="timeFoo('br_start')">Start Break</div>
            </b-col>

            <b-col cols="2">&nbsp;</b-col>
          </b-row>
            <br />
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('7')">7</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('8')">8</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('9')">9</div>
              <!-- &nbsp; -->
            </b-col>

            <b-col cols="4">
                <div class="break" @click="timeFoo('br_end')">End break</div>
            </b-col>

            <b-col cols="2">&nbsp;</b-col>
          </b-row>
            <br />
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('clear')">C</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('0')">0</div>
              <!-- &nbsp -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinCharClock('enter')">E</div>
            </b-col>
            
            <b-col cols="2">
                <div class="correction" @click="correctionFoo()">Correction</div>
            </b-col>
            <b-col cols="2">
                <div class="exit" @click="exitFoo()">EXIT</div>
            </b-col>
            <b-col cols="2">&nbsp;</b-col>
          </b-row>

    </b-container>

</template>

<script>
/* eslint-disable */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import axios from 'axios';



export default {
  name: "dashboard",
  components: {

  },
  data() {
    return {
      loggedUser: {},
      alert: false,
      enteredPin: '',
      pinDecon: ['-', '-', '-', '-'],
      date: Date().toLocaleString(),
      loginToken: '',
      pinUser: {
          first_name: '',
          role: '',
      },

    };
  },
  mounted() {
        window.addEventListener("keypress", e=> {
                this.logKeyClock(e);
        });
  },
  computed: {
        pinSync(){
            return this.pinDecon;
        },
        timeNow () {
            return this.date;
        }
    },
    beforeRouteEnter (to, from, next) {
    next(vm => {
       if (vm.$store.state.auth.user.data.role !== "admin" || vm.$store.state.auth.user.data.role !== "posaccess") {
         vm.$router.push({name: "timetable"});
       }
       else {
         vm.$router.push({name: "dashboard"});
       }
    });
  },d() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.loggedUser = this.$store.state.auth.user.data;

    window.addEventListener("keypress", e => {
        this.logKeyClock(e);
        });
  },
  methods: {
        logKeyClock(e) {
            //alert(e.target);
            e=e || window.event;
            var charCode=(e.which) ? e.which: e.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !==46) {
                evt.preventDefault();
            }
            else {
                return this.pinCharClock(e.key);
            }
        },
        timeFoo(state){
            var shortURL = 'http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/timesheet/';
            if(state === 'in'){
                var URL = shortURL + 'start';
                alert('Work Day Started!');
                this.sendTimesheet(URL);
            }
            else if (state === 'out'){
                var URL = shortURL + 'finish';
                alert('Work Day Ended!');
                this.sendTimesheet(URL);
            }
            else if (state === 'br_start'){
                var URL = shortURL + 'start-break';
                alert('Break Started!');
                this.sendTimesheet(URL);
            }
            else if (state === 'br_end'){
                var URL = shortURL + 'end-break';
                alert('End Of Break!');
                this.sendTimesheet(URL);
            }
        },
        sendTimesheet(URL){
            var TOKEN = this.loginToken;
            axios
            .request({
                method: "post",
                url: URL,
                headers: {
                Authorization: "Bearer " + TOKEN,
                },
            })
            .then((response) => {
                console.log('responese: ',response)
            });
            this.pinUser = {
                first_name: '',
                role: '',
            };
        },
        correctionFoo(){
            alert('Correction Function');
        },
        exitFoo(){
            alert('Exit Function');
        },
        pinCharClock(char){
                if(char === 'clear'){
                    // alert('Input Cleared');
                    this.pinDecon = ['-', '-', '-', '-'];
                    this.enteredPin = '';
                    this.pinUser = {};
                }
                else if(char === 'enter'){
                    this.loginClock(this.enteredPin);
                }
                else {
                    if(this.enteredPin.length === 3)
                    {
                        var index = this.pinDecon.indexOf('-');
                        this.pinDecon[index] = char;
                        this.enteredPin = this.enteredPin + char;
                        this.loginClock(this.enteredPin);
                        this.pinDecon = ['-', '-', '-', '-'];
                        this.enteredPin = '';
                    }
                    else {
                    var index = this.pinDecon.indexOf('-');
                    this.pinDecon[index] = char;
                    this.enteredPin = this.enteredPin + char;
                    this.$forceUpdate();
                    }
                }
            },
            loginClock(pin){
                var bodyFormData = new FormData();
                bodyFormData.set("pin", pin);
                axios.request({
                    method: "post",
                    url:
                        "http://188.169.16.186:8082/ronny/rest/web/index.php?r=auth/clocked",
                    data: bodyFormData,
                    })
                    .then((response) => {
                        if(response.status === 200 && !response.data.is_error){
                            console.log('------', response);
                            this.loginToken = response.data.data.token;
                            this.pinUser = response.data.data;

                        }
                        else {
                            console.log('Login Failed');
                            this.alert = true;
                        }
                    
                    });    
                
            },
    }
};
</script>
<style>
    .numChar {
    font-family: monospace;
    font-size: 200%;
    border-radius: 5%;
    padding: 15px 0px;
    height: 100%;
    width: 100%;
    background: #b1bdb8;
    color: rgb(255, 255, 255);
    cursor: pointer;
    }
    .inOut {
    font-family: monospace;
    font-size: 300%;
    border-radius: 5%;
    text-align: center;
    height: 100%;
    width: 100%;
    background: #18587e88;
    color: rgb(2, 1, 1);
    margin: 5px;
    cursor: pointer;
    }

    .break {
    font-family: monospace;
    font-size: 300%;
    border-radius: 5%;
    text-align: center;
    height: 100%;
    width: 100%;
    background: #00D881;
    color: rgb(2, 1, 1);
    margin: 5px;
    cursor: pointer;
    }
    
    .exit {
    font-family: monospace;
    font-size: 300%;
    border-radius: 5%;
    text-align: center;
    height: 100%;
    width: 100%;
    background: #d80036;
    color: rgb(2, 1, 1);
    margin: 5px;
    cursor: pointer;
    }

    .correction {
    font-family: monospace;
    font-size: 200%;
    text-align: center;
    height: 100%;
    width: 100%;
    background: #88928e;
    color: rgb(2, 1, 1);
    margin: 5px;
    cursor: pointer;
    }

    #display {
    position: relative;
    top: -10px;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #00D881;
    }

    #display li {
    display: inline-block;
    font-family: monospace;
    font-size: 200%;
    padding: 5px 12px;
    background: #FDD147;
    color: black;
    margin-right: 1px;
    }
</style>
