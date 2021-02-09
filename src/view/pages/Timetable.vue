<script>
/* eslint-disable */
</script>
<template>
    <b-container>   
          <b-row>
              <b-col cols="3">{{ pinUser.first_name  }}  {{ pinUser.role }} </b-col>
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
              <div class="numChar" @click="pinChar('1')">1</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('2')">2</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('3')">3</div>
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
              <div class="numChar" @click="pinChar('4')">4</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('5')">5</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('6')">6</div>
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
              <div class="numChar" @click="pinChar('7')">7</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('8')">8</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('9')">9</div>
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
              <div class="numChar" @click="pinChar('4')">C</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('5')">0</div>
              <!-- &nbsp -->
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('enter')">E</div>
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
        this.logKey(e);
        });
  },
  methods: {
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
        pinChar(char){
                if(char === 'clear'){
                    alert('Input Cleared');
                    this.pinDecon = ['-', '-', '-', '-'];
                    this.enteredPin = '';
                }
                else if(char === 'enter'){
                    this.login(this.enteredPin);
                }
                else {
                    if(this.enteredPin.length === 4)
                    {
                        this.login(this.enteredPin);
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
            login(pin){
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
                            alert('Login Failed');
                        }
                    
                    });    
                
            },
            logKey(e){
            e = e || window.event;
            var charCode = (e.which) ? e.which : e.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();         
            }
            else {
                return this.pinChar(e.key);
            }
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
