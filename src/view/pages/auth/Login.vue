<script>
/* eslint-disable */
</script>
<template>
<div data-app>

    <!-- Begin User & Pass Authorization -->
    <div v-if="userPass" class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
        <span class="font-weight-bold font-size-3 text-dark-60">
            Don't have an account yet?
        </span>
        <router-link class="font-weight-bold font-size-3 ml-2" :to="{ name: 'register' }">
            Sign Up!
        </router-link>
    </div>

    <div v-if="userPass" class="login-form login-signin">
        <div class="text-center mb-10 mb-lg-20">
            <h3 class="font-size-h1">Sign In</h3>
            <p class="text-muted font-weight-semi-bold">
                Enter your username and password
            </p>
        </div>

        <!--begin::Form-->
        <b-form class="form" @submit.stop.prevent="onSubmit">
            <div role="alert" class="alert alert-info">
                <div class="alert-text">
                    Use account <strong>admin@demo.com</strong> and password
                    <strong>demo</strong> to continue.
                </div>
            </div>

            <div role="alert" v-bind:class="{ show: errors.length }" class="alert fade alert-danger">
                <div class="alert-text" v-for="(error, i) in errors" :key="i">
                    {{ error }}
                </div>
            </div>

            <b-form-group id="example-input-group-1" label="" label-for="example-input-1">
                <b-form-input class="form-control form-control-solid h-auto py-5 px-6" id="example-input-1" name="example-input-1" v-model="$v.form.email.$model" :state="validateState('email')" aria-describedby="input-1-live-feedback"></b-form-input>

                <b-form-invalid-feedback id="input-1-live-feedback">
                    Email is required and a valid email address.
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="example-input-group-2" label="" label-for="example-input-2">
                <b-form-input class="form-control form-control-solid h-auto py-5 px-6" type="password" id="example-input-2" name="example-input-2" v-model="$v.form.password.$model" :state="validateState('password')" aria-describedby="input-2-live-feedback"></b-form-input>

                <b-form-invalid-feedback id="input-2-live-feedback">
                    Password is required.
                </b-form-invalid-feedback>
            </b-form-group>

            <!--begin::Action-->
            <div class="form-group d-flex flex-wrap justify-content-between align-items-center">
                <a href="#" class="text-dark-60 text-hover-primary my-3 mr-2" id="kt_login_forgot">
                    Forgot Password ?
                </a>
                <button ref="kt_login_signin_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3">
                    Sign In
                </button>
            </div>
            <!--end::Action-->
        </b-form>
        <!--end::Form-->
    </div>
    <!-- End Of User & Pass Authorization -->

    <!-- Begin PIN Authorization -->
    <div v-if="pinAuth" class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
    </div>

    <div class="container" style="width: 400px;" v-if="pinAuth">
        
        <div class="row">
            <v-alert dense type="info" v-model="pinError" dismissible>
                The Pin You Entered is Not Correct
            </v-alert>

            <v-alert dense dismissible v-if="pinSuccess" type="success">
                The Pin You Entered is Correct
            </v-alert>
            <div class="col-12" >
                <ul id="display">
                    <li v-for="(num, index) in pinAst" :key="index">{{ num }}</li>
                    <div class="clear"></div>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col pinBtn" @click="pinChar('1')">
                1
            </div>
            <div class="col pinBtn" @click="pinChar('2')">
                2
            </div>
            <div class="col pinBtn" @click="pinChar('3')">
                3
            </div>
        </div>
        <div class="row">
            <div class="col pinBtn" @click="pinChar('4')">
                4
            </div>
            <div class="col pinBtn" @click="pinChar('5')">
                5
            </div>
            <div class="col pinBtn" @click="pinChar('6')">
                6
            </div>
        </div>
        <div class="row">
            <div class="col pinBtn" @click="pinChar('7')">
                7
            </div>
            <div class="col pinBtn" @click="pinChar('8')">
                8
            </div>
            <div class="col pinBtn" @click="pinChar('9')">
                9
            </div>
        </div>
        <div class="row">
            <div class="col pinBtn" @click="pinChar('clear')">
                C
            </div>
            <div class="col pinBtn" @click="pinChar('0')">
                0
            </div>
            <div class="col pinBtn green" @click="pinChar('enter')">
                E
            </div>
        </div>
    </div>

    <!-- End PIN Authorization -->

</div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
    padding-right: 3.5rem !important;
}
</style>
<script>
import {mapState} from "vuex";
import _ from 'lodash';

import {
    LOGIN,
    LOGOUT
}

from "@/core/services/store/auth.module";

import {
    validationMixin
}

from "vuelidate";

import {
    minLength,
    required
}

from "vuelidate/lib/validators";

import {
    BootstrapVue,
    IconsPlugin
}

from "bootstrap-vue";
import Vue from 'vue';
import axios from 'axios';

export default {

    mixins: [validationMixin],
    name: "login",
    data() {
        return {
            getMac: null,
            // Remove this dummy login info
            form: {
                email: "",
                    password: ""
            },
            localPosData: null,
            pinError: false,
            pinSuccess: false,
            userPass: false,
            pinAuth: true,
            enteredPin: '',
            pinDecon: ['-',
            '-',
            '-',
            '-',
            '-',
            '-'],
            pinAst: ['-',
            '-',
            '-',
            '-',
            '-',
            '-'], 
        };
    },
    validations: {
        form: {
            email: {
                required
            },
            password: {
                required,
                minLength: minLength(3)
            }
        }
    },
    mounted() {
        window.addEventListener("keypress", e=> {
            this.logKey(e);
        });

        axios.request({
                method: "post",
                url:
                // this.$hostname + "orders/print",
                // "http://192.168.1.124/ronny/rest/web/index.php?r=auth/get-mac",
                this.$localServerAuth + "/get-mac",
            }).then((response) => {
                console.log("GET MAC RESPONSE: "+ response.data);
                this.getMac = response.data;
            });
    },
    methods: {
        validateState(name) {
            const {
                $dirty,
                $error
            } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form= {
                email: null,
                    password: null
            };

            this.$nextTick(()=> {
                    this.$v.$reset();
                }
            );
        },
        onSubmit() {
            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }
            const username=this.$v.form.email.$model;
            const password=this.$v.form.password.$model;

            // clear existing errors
            this.$store.dispatch(LOGOUT);

            // set spinner to submit button
            const submitButton=this.$refs["kt_login_signin_submit"];
            submitButton.classList.add("spinner", "spinner-light", "spinner-right");

            // dummy delay
            setTimeout(()=> {

                    // send login request
                    this.$store.dispatch(LOGIN, {
                            username, password
                        }
                    ) // go to which page after successfully login

                    .then(()=> this.$router.push( {
                                name: "dashboard"
                            }

                        )).catch(()=>{});

                    submitButton.classList.remove("spinner",
                        "spinner-light",
                        "spinner-right"
                    );
                }

                , 2000);
        },

        onPinSubmit(sentPin, sentMac) {
        // onPinSubmit(sentPin) {
            const pin = sentPin;
            const mac = sentMac;

            // clear existing errors
            this.$store.dispatch(LOGOUT);

            // set spinner to submit button
            const submitButton=this.$refs["kt_login_signin_submit"];

            // dummy delay
            setTimeout(()=> {
                    // send login request
                    // localStorage.setItem('reloaded', '1');
                    // alert(localStorage.getItem('reloaded'));
                    this.$store.dispatch(LOGIN, {
                            pin,
                            mac
                        }
                        
                    ) // go to which page after successfully login
                    .then(()=> this.$router.push( {
                            name: "dashboard"
                        }
                    )).catch(()=>{});
            }, 100);
        },

        pinChar(char) {
            var loggedUser = this.$store.state.auth.user;
            if(_.isEmpty(loggedUser)){
                if(char==='clear') {
                    this.pinDecon=['-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',];
                    this.pinAst=['-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-'];
                    this.enteredPin='';
                }
                else if(char==='enter') {
                    this.login(this.enteredPin);
                }
                else {
                    if(this.enteredPin.length === 5) {
                        var index=this.pinDecon.indexOf('-');
                        this.pinDecon[index]=char;
                        this.enteredPin=this.enteredPin+char;
                        this.login(this.enteredPin);
                        this.pinDecon=['-',
                        '-',
                        '-',
                        '-',
                        '-',
                        '-'];
                        this.pinAst=['-',
                        '-',
                        '-',
                        '-',
                        '-',
                        '-'];
                        this.enteredPin='';
                    }
                    else {
                        var index=this.pinDecon.indexOf('-');
                        this.pinDecon[index]=char;
                        this.pinAst[index]= '*';
                        this.enteredPin=this.enteredPin+char;
                        //alert('Number is: ' + this.enteredPin);
                        this.$forceUpdate();
                    }
                }
            }
        },

        login(pin) {
            this.pinError = true;

            // let mac = "BLA";

            this.getMac = 'd4:c9:ef:dc:4c:a5';  // VAKE NEW TEST

            // this.getMac = 'D4:C9:EF:D5:6D:D2';  // SABURTALO NEW TEST

            // this.getMac = 'd4:c9:ef:d5:70:8f';  //  DIGOMI POS 1
            // this.getMac = 'ec:b1:d7:6e:01:3b';  //  DIGOMI POS 2
            // this.getMac = 'ec:b1:d7:6e:01:3r';  // DIGOMI POS 3

            // this.getMac = 'E8:39:35:5B:B7:CE';  // SABURTALO 1

            // this.getMac = 'd4:c9:ef:dc:4c:a5';  // VAKE 1
            // this.getMac = 'f0:92:1c:ea:90:2e';  // VAKE 2

            // this.getMac = '2c:27:d7:27:3e:81';  // GLDANI 1

            
            var bodyFormData=new FormData();
            bodyFormData.set("pin", pin);
            bodyFormData.set("mac", this.getMac);

            axios.request({
                    method: "post",
                    url: this.$authHostName,
                    data: bodyFormData,
            }).then((response) => {  
                    if(!response.data.is_error) {
                        console.log('Success Login -- ', response);
                        localStorage.setItem("loggedUserData", JSON.stringify(response.data.data));
                        this.pinError = false;
                        this.pinSuccess = true;
                        this.onPinSubmit(pin, this.getMac);
                        // this.onPinSubmit(pin);
                    }
                    else {
                        console.log('Login Failed', response);
                        this.pinError = true;
                    }
                }
            );
        },
        logKey(e) {
            e=e || window.event;
            var charCode=(e.which) ? e.which: e.keyCode;

            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !==46) {
                e.preventDefault();
            }

            else {
                return this.pinChar(e.key);
            }
        },
    },
    computed: {
        ...mapState( {
                errors: state=> state.auth.errors
            }
        ),
        pinSync() {
            return this.pinDecon;
        }
    }
};
</script>
<style>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}


#wrap {
    position: relative;
    margin-left: 50px;
}

#display {
    position: relative;
    top: -10px;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #00D881;
}

#numpad {
    position: absolute;
}

#display li {
    display: inline-block;
    font-family: monospace;
    font-size: 200%;
    padding: 10px 16px;
    background: #E6BC3B;
    color: black;
    margin-right: 1px;
}

#numpad li {
    float: left;
    padding: 13px 50px;
    background: #00D881;
    color: black;
    margin: 5px;
    cursor: pointer;
}

.numChar {
    font-family: monospace;
    font-size: 200%;
    border-radius: 51%;
    margin-top: 50%;
    height: 60px;
    width: 60px;
    background: #00D881;
    color: rgb(2, 1, 1);
    margin: 5px;
    cursor: pointer;
}

.pressed {
    box-shadow: inset 2px 2px 12px 5px rgba(0, 0, 0, 0.5);
}

.clear {
    clear: both;
}
</style>
