(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a478a4e"],{2298:function(e,t,i){},a9ca:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"},[i("span",{staticClass:"font-weight-bold font-size-3 text-dark-60"},[e._v(" Already have an account? ")]),i("router-link",{staticClass:"font-weight-bold font-size-3 ml-2",attrs:{to:{name:"login"}}},[e._v(" Sign In! ")])],1),i("div",{staticClass:"login-form login-signin"},[e._m(0),i("b-form",{staticClass:"form",on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.onSubmit(t)}}},[i("b-form-group",{attrs:{id:"example-input-group-0",label:"","label-for":"example-input-0"}},[i("b-form-input",{staticClass:"form-control form-control-solid h-auto py-5 px-6",attrs:{id:"example-input-0",name:"example-input-0",state:e.validateState("username"),"aria-describedby":"input-0-live-feedback",placeholder:"Username"},model:{value:e.$v.form.username.$model,callback:function(t){e.$set(e.$v.form.username,"$model",t)},expression:"$v.form.username.$model"}}),i("b-form-invalid-feedback",{attrs:{id:"input-0-live-feedback"}},[e._v(" Username is required. ")])],1),i("b-form-group",{attrs:{id:"example-input-group-1",label:"","label-for":"example-input-1"}},[i("b-form-input",{staticClass:"form-control form-control-solid h-auto py-5 px-6",attrs:{id:"example-input-1",name:"example-input-1",state:e.validateState("email"),"aria-describedby":"input-1-live-feedback",placeholder:"Email address"},model:{value:e.$v.form.email.$model,callback:function(t){e.$set(e.$v.form.email,"$model",t)},expression:"$v.form.email.$model"}}),i("b-form-invalid-feedback",{attrs:{id:"input-1-live-feedback"}},[e._v(" Email is required and a valid email address. ")])],1),i("b-form-group",{attrs:{id:"example-input-group-2",label:"","label-for":"example-input-2"}},[i("b-form-input",{staticClass:"form-control form-control-solid h-auto py-5 px-6",attrs:{type:"password",id:"example-input-2",name:"example-input-2",state:e.validateState("password"),"aria-describedby":"input-2-live-feedback",placeholder:"Password"},model:{value:e.$v.form.password.$model,callback:function(t){e.$set(e.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}}),i("b-form-invalid-feedback",{attrs:{id:"input-2-live-feedback"}},[e._v(" Password is required. ")])],1),i("div",{staticClass:"form-group d-flex flex-wrap flex-center"},[i("button",{ref:"kt_login_signup_submit",staticClass:"btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4",attrs:{type:"submit"}},[e._v(" Submit ")]),i("button",{staticClass:"btn btn-light-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4",on:{click:function(t){return e.$router.push("login")}}},[e._v(" Cancel ")])])],1)],1)])},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"text-center mb-10 mb-lg-20"},[i("h3",{staticClass:"font-size-h1"},[e._v("Sign Up")]),i("p",{staticClass:"text-muted font-weight-semi-bold"},[e._v(" Enter your details to create your account ")])])}],o=i("5530"),n=i("2f62"),s=i("854b"),l=i("1dce"),m=i("b5ae"),u={mixins:[l["validationMixin"]],name:"register",data:function(){return{form:{email:"admin@demo.com",password:"demo"}}},validations:{form:{username:{required:m["required"],minLength:Object(m["minLength"])(3)},email:{required:m["required"],email:m["email"]},password:{required:m["required"],minLength:Object(m["minLength"])(3)}}},methods:{validateState:function(e){var t=this.$v.form[e],i=t.$dirty,a=t.$error;return i?!a:null},resetForm:function(){var e=this;this.form={username:null,email:null,password:null},this.$nextTick((function(){e.$v.$reset()}))},onSubmit:function(){var e=this;if(this.$v.form.$touch(),!this.$v.form.$anyError){var t=this.$v.form.username.$model,i=this.$v.form.email.$model,a=this.$v.form.password.$model;this.$store.dispatch(s["b"]);var r=this.$refs["kt_login_signup_submit"];r.classList.add("spinner","spinner-light","spinner-right"),setTimeout((function(){e.$store.dispatch(s["c"],{email:i,password:a,username:t}).then((function(){return e.$router.push({name:"dashboard"})})),r.classList.remove("spinner","spinner-light","spinner-right")}),2e3)}}},computed:Object(o["a"])({},Object(n["c"])({errors:function(e){return e.auth.errors}}))},d=u,p=(i("e818"),i("2877")),c=Object(p["a"])(d,a,r,!1,null,"1b28ab7f",null);t["default"]=c.exports},e818:function(e,t,i){"use strict";i("2298")}}]);
//# sourceMappingURL=chunk-5a478a4e.b348bf70.js.map