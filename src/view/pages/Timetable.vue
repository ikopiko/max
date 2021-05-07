<script>
/* eslint-disable */
</script>
<template>
    <b-container data-app>  
      <v-alert v-model="alert" color="pink" dark border="top" transition="scale-transition" dismissible>
          Login Failed
      </v-alert>
          <b-row>
            <v-btn v-if="loggedUser.role == 'admin' || 
                         loggedUser.role == 'globalManager' || 
                         loggedUser.role == 'viceManager' || 
                         loggedUser.role == 'branchManager' || 
                         loggedUser.role == 'weiser'" 
              @click="timeClockDetails = true">Timeclock Details</v-btn>
          </b-row> 
          <b-row>
              <b-col cols="3" ><h2>{{ pinUser.first_name  }} - {{ pinUser.role }}</h2></b-col>
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
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('1')">1</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('2')">2</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('3')">3</div>
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
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('4')">4</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('5')">5</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('6')">6</div>
              <!-- &nbsp; -->
            </b-col>
            
            <b-col cols="4">
                <div class="break" @click="timeFoo('br_start')">Start Break</div>
            </b-col>

            <b-col cols="2">&nbsp;</b-col>
          </b-row>
            <br />
          <b-row>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('7')">7</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('8')">8</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('9')">9</div>
              <!-- &nbsp; -->
            </b-col>

            <b-col cols="4">
                <div class="break" @click="timeFoo('br_end')">End break</div>
            </b-col>

            <b-col cols="2">&nbsp;</b-col>
          </b-row>
            <br />
          <b-row>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('clear')">C</div>
              <!-- &nbsp; -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('0')">0</div>
              <!-- &nbsp -->
            </b-col>
            <b-col cols="2" class="text-center" align-v="center">
              <div class="pinBtn" @click="pinCharClock('enter')">E</div>
            </b-col>
            
            <!-- <b-col cols="2">
                <div class="correction" @click="correctionFoo()">Correction</div>
            </b-col>
            <b-col cols="2">
                <div class="exit" @click="exitFoo()">EXIT</div>
            </b-col> -->
            <b-col cols="6">&nbsp;</b-col>
          </b-row>

      <v-dialog
        v-model="timeClockDetails"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Timeclock Details</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Select Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="8">

                <template>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            IN
                          </th>
                          <th class="text-left">
                            OUT
                          </th>
                          <th class="text-left">
                            Break
                          </th>
                          <th class="text-left">
                            Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in filterDetails"
                          :key="item.id"
                        >
                          <td>{{ item.username }}</td>
                          <td>{{ item.inTime }}</td>
                          <td>{{ item.outTime }}</td>
                          <td>{{ item.startBrake }}</td>
                          <td v-if="item.workHours != 'NaN'">{{ item.workHours }}</td>
                          <td v-if="item.workHours == 'NaN'">&nbsp;</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

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
      menu: false,
      detailedInfo: [],
      date: new Date().toISOString().substr(0, 10),
      timeClockDetails: false,
      loggedUser: {},
      loginActive: false,
      alert: false,
      enteredPin: '',
      pinDecon: ['-', '-', '-', '-'],
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
        },
        filterDetails (){
          this.detailedInfo.forEach(x => {
              x.inTime = '';
              x.outTime = '';
              x.workHours = '';
              x.clockedindata.forEach(y => {
                const date = new Date(y.created_at);

                const createdTime = date.getHours() + ":" + date.getMinutes();

                 if(y.state == "IN"){
                   x.inTime = createdTime;
                   x.inFull = y.created_at;
                 }
                 else if(y.state == 'FINISH'){
                   x.outTime = createdTime;
                   x.outFull = y.created_at;
                 }
                 else if(y.state == 'BREAK') {
                   x.startBrake = createdTime;
                   x.startFull = y.created_at;
                 }
              const inDate = new Date(x.inFull);
              const outDate = new Date(x.outFull);

              const diffTime = outDate.getTime() - inDate.getTime();
              x.workHours = (diffTime / 3600000).toFixed(2);
              })
          })
          return this.detailedInfo;
        }
    },
    beforeRouteEnter (to, from, next) {
    next(vm => {
       if (vm.$store.state.auth.user.data.role.toLowerCase() == "admin"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "vicemanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "globalmanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "branchmanager"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "weiser" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "cashier"
            || vm.$store.state.auth.user.data.role.toLowerCase() == "courier" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "posaccess" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "cook" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "thermometer" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "housekeeper" 
            || vm.$store.state.auth.user.data.role.toLowerCase() == "driver") {
         vm.$router.push({name: "timetable"});
       }
       else {
         vm.$router.push({name: "dashboard"});
       }
    });
  },mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.loggedUser = this.$store.state.auth.user.data;

    this.updateData(this.date)

    window.addEventListener("keypress", e => {
        this.logKeyClock(e);
        });
  },
  watch: {
    date(val){
      this.updateData(val);
    },
  },
  methods: {
        updateData(date){
          var dateString = date + " to "+ date;
          const TOKEN = this.loggedUser.token;
          var bodyUpdate = new FormData();
          bodyUpdate.set("day", dateString);

          axios
            .request({
              method: "post",
              url:
                this.$hostname + "manager/clock-in-users",
              headers: {
                Authorization: "Bearer " + TOKEN,
              },
              data: bodyUpdate,
            })
            .then((response) => {
              console.log('Detaileeeeeed: ', response);
              this.detailedInfo = response.data.data;
          });  
          this.$forceUpdate();
        },
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
            if(this.loginActive){
              var shortURL = this.$hostname + 'timesheet/';
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
              this.updateData(this.date);
            }
            else {
              alert("User isn't logged in");
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
            this.updateData(this.date);
            this.loginActive = false;
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
                        this.$authHostName + "/clocked",
                    data: bodyFormData,
                    })
                    .then((response) => {
                        if(response.status === 200 && !response.data.is_error){
                            console.log('------', response);
                            this.loginToken = response.data.data.token;
                            this.pinUser = response.data.data;
                            this.loginActive = true;

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
