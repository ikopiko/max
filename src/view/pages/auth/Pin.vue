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
          </b-row>
          
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('1')">1</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('2')">2</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('3')">3</div>
            </b-col>
            
          </b-row>
            <br />
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('4')">4</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('5')">5</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('6')">6</div>
            </b-col>
            
          </b-row>
            <br />
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('7')">7</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('8')">8</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('9')">9</div>
            </b-col>
          </b-row>
            <br />
          <b-row>
            <b-col cols="3">&nbsp;</b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('4')">C</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div class="numChar" @click="pinChar('5')">0</div>
            </b-col>
            <b-col cols="1" class="text-center" align-v="center">
              <div  >&nbsp;</div>
            </b-col>
          </b-row>

    </b-container>
</template>
<script>
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vue from 'vue';
import axios from 'axios';

1
export default {
    components: {
    },
    mounted() {
        window.addEventListener("keypress", e => {
        this.logKey(e);
        });
    },    
    data() {
        return {
            amount: '123',
            fullValue: '123',
            visible: true,
            layout: "numeric",
            input: null,
            options: {
                useKbEvents: false,
                preventClickEvent: false
            },
            enteredPin: '',
            pinDecon: ['-', '-', '-', '-'],

        }
    },
    computed: {
        pinSync(){
            return this.pinDecon;
        }
    },
    methods: {
        accept(text) {
          alert("Input text: " + text);
          this.hide();
        },
        onChange(text){
            this.fullValue = text;
        },
        show(e) {
          this.input = e.target;
          console.log('e: ', e);
          this.layout = e.target.dataset.layout;
 
          if (!this.visible)
            this.visible = true
        },
 
        hide() {
          this.visible = false;
        },
        handleOnComplete(value) {
        console.log('OTP completed: ', value);
        },
        handleOnChange(value) {
        console.log('OTP changed: ', value);
        },
        handleClearInput() {
        this.$refs.otpInput.clearInput();
        },

        pinChar(char){
            if(char === 'clear'){
                alert('Input Cleared');
                this.pinDecon = ['-', '-', '-', '-'];
                this.enteredPin = '';
            }
            else if(char === 'enter'){
                alert('Done');
            }
            else {
                if(this.enteredPin.length === 4)
                {
                    alert('Limit is 4');
                    this.login(this.enteredPin);
                    this.pinDecon = ['-', '-', '-', '-'];
                    this.enteredPin = '';
                }
                else {
                var index = this.pinDecon.indexOf('-');
                this.pinDecon[index] = char;
                this.enteredPin = this.enteredPin + char;
                //alert('Number is: ' + this.enteredPin);
                this.$forceUpdate();
                }
            }
        },
        login(pin){
            var bodyFormData = new FormData();
            bodyFormData.set("pin", pin);
            bodyFormData.set("mac", 'E839355BB7CE');
            axios.request({
                method: "post",
                url:
                    this.$authHostName,
                data: bodyFormData,
                })
                .then((response) => {
                    if(response.status === 200 && !response.data.is_error){
                        alert('Success Loggin');
                        console.log('------', response);
                    }
                    else {
                        alert('Login Failed');
                    }
                
                });    
            
        },
        logKey(e){
          //alert(e.target);
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
}


</script>
<style>
  /* .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;

  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } */

  ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
/* Reset */

#wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  margin-left: -100px;
  margin-top: -150px;
}

#display {
  position: relative;
  top: -10px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #00D881;
}

#numpad {
  position: relative;
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

#numpad li {
  font-family: monospace;
  font-size: 200%;
  border-radius: 51%;
  float: left;
  padding: 12px 20px;
  background: #00D881;
  color: black;
  margin: 5px;
  cursor: pointer;
  -webkit-transition: box-shadow 0.3s ease-in-out;
  -moz-transition: box-shadow 0.3s ease-in-out;
  -o-transition: box-shadow 0.3s ease-in-out;
  -ms-transition: box-shadow 0.3s ease-in-out;
  transition: box-shadow 0.3s ease-in-out; 
}

.numChar {
    font-family: monospace;
    font-size: 200%;
    border-radius: 5%;
    padding: 15px 0px;
    height: 70px;
    width: 70px;
    background: #b1bdb8;
    color: rgb(255, 255, 255);
    margin: 5px;
    cursor: pointer;
    }


.pressed {
  box-shadow: inset 2px 2px 12px 5px rgba(0,0,0,0.5);
}

.clear {
  clear: both;
}
</style>