(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e8aa642"],{"16b7":function(e,t,s){"use strict";s("a9e3");var n=s("2b0e");t["a"]=n["default"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(e,t){var s=this;this.clearDelay();var n=parseInt(this["".concat(e,"Delay")],10);this["".concat(e,"Timeout")]=setTimeout(t||function(){s.isActive={open:!0,close:!1}[e]},n)}}})},"1d4d":function(e,t,s){"use strict";s("d81d"),s("a9e3"),s("c96a"),s("696f");var n=s("9d26"),a=s("a9ad"),i=s("16b7"),r=s("af2b"),o=s("5311"),l=s("7560"),c=s("80d2"),d=s("58df");t["a"]=Object(d["a"])(a["a"],i["a"],o["a"],r["a"],l["a"]).extend({name:"v-rating",props:{backgroundColor:{type:String,default:"accent"},color:{type:String,default:"primary"},clearable:Boolean,dense:Boolean,emptyIcon:{type:String,default:"$ratingEmpty"},fullIcon:{type:String,default:"$ratingFull"},halfIcon:{type:String,default:"$ratingHalf"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,size:[Number,String],value:{type:Number,default:0},iconLabel:{type:String,default:"$vuetify.rating.ariaLabel.icon"}},data:function(){return{hoverIndex:-1,internalValue:this.value}},computed:{directives:function(){return this.readonly||!this.ripple?[]:[{name:"ripple",value:{circle:!0}}]},iconProps:function(){var e=this.$props,t=e.dark,s=e.large,n=e.light,a=e.medium,i=e.small,r=e.size,o=e.xLarge,l=e.xSmall;return{dark:t,large:s,light:n,medium:a,size:r,small:i,xLarge:o,xSmall:l}},isHovering:function(){return this.hover&&this.hoverIndex>=0}},watch:{internalValue:function(e){e!==this.value&&this.$emit("input",e)},value:function(e){this.internalValue=e}},methods:{createClickFn:function(e){var t=this;return function(s){if(!t.readonly){var n=t.genHoverIndex(s,e);t.clearable&&t.internalValue===n?t.internalValue=0:t.internalValue=n}}},createProps:function(e){var t={index:e,value:this.internalValue,click:this.createClickFn(e),isFilled:Math.floor(this.internalValue)>e,isHovered:Math.floor(this.hoverIndex)>e};return this.halfIncrements&&(t.isHalfHovered=!t.isHovered&&(this.hoverIndex-e)%1>0,t.isHalfFilled=!t.isFilled&&(this.internalValue-e)%1>0),t},genHoverIndex:function(e,t){var s=this.isHalfEvent(e);return this.halfIncrements&&this.$vuetify.rtl&&(s=!s),t+(s?.5:1)},getIconName:function(e){var t=this.isHovering?e.isHovered:e.isFilled,s=this.isHovering?e.isHalfHovered:e.isHalfFilled;return t?this.fullIcon:s?this.halfIcon:this.emptyIcon},getColor:function(e){if(this.isHovering){if(e.isHovered||e.isHalfHovered)return this.color}else if(e.isFilled||e.isHalfFilled)return this.color;return this.backgroundColor},isHalfEvent:function(e){if(this.halfIncrements){var t=e.target&&e.target.getBoundingClientRect();if(t&&e.pageX-t.left<t.width/2)return!0}return!1},onMouseEnter:function(e,t){var s=this;this.runDelay("open",(function(){s.hoverIndex=s.genHoverIndex(e,t)}))},onMouseLeave:function(){var e=this;this.runDelay("close",(function(){return e.hoverIndex=-1}))},genItem:function(e){var t=this,s=this.createProps(e);if(this.$scopedSlots.item)return this.$scopedSlots.item(s);var a={click:s.click};return this.hover&&(a.mouseenter=function(s){return t.onMouseEnter(s,e)},a.mouseleave=this.onMouseLeave,this.halfIncrements&&(a.mousemove=function(s){return t.onMouseEnter(s,e)})),this.$createElement(n["a"],this.setTextColor(this.getColor(s),{attrs:{tabindex:-1,"aria-label":this.$vuetify.lang.t(this.iconLabel,e+1,Number(this.length))},directives:this.directives,props:this.iconProps,on:a}),[this.getIconName(s)])}},render:function(e){var t=this,s=Object(c["i"])(Number(this.length)).map((function(e){return t.genItem(e)}));return e("div",{staticClass:"v-rating",class:{"v-rating--readonly":this.readonly,"v-rating--dense":this.dense}},s)}})},"20f6":function(e,t,s){},"2fa4":function(e,t,s){"use strict";s("20f6");var n=s("80d2");t["a"]=Object(n["j"])("spacer","div","v-spacer")},4894:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-btn",{staticClass:"ma-3",attrs:{dark:""},on:{click:function(t){return e.goBack()}}},[s("v-icon",{attrs:{dark:"",left:""}},[e._v(" mdi-arrow-left ")]),e._v("Back ")],1),"pos"===e.order.source?s("span",[s("v-card",{staticClass:"my-3 mx-3 cardStyle",attrs:{"max-width":"344",outlined:""}},[s("v-list-item",{attrs:{"three-line":""}},[s("v-list-item-content",[s("div",{staticClass:"overline mb-4"},[e._v(" # "+e._s(e.order.orderId)+" "),s("div",{staticStyle:{float:"right","text-align":"right"}},[e._v(" "+e._s(e.order.date)+" ")])]),s("v-list-item-title",{staticClass:"headline cardStyle mb-1"},[e._v(e._s(e.order.order_data.customer.name))]),s("v-list-item-title",{staticClass:"headline mb-1"},[e._v(e._s(e.order.order_data.customer.email))]),s("v-list-item-title",{staticClass:"headline mb-1"},[e._v(e._s(e.order.order_data.customer.tel)+" "+e._s(e.order.order_data.customer.adress))]),s("v-list-item-title",{staticClass:"headline mb-1 delivery"},[e._v(e._s(e.order.order_data.deliveryType)+" Delivery")]),e._l(e.order.order_data.items,(function(t){return s("div",{key:t.id,staticClass:"row"},["no"==t.custom?s("div",{staticClass:"col-12"},[s("div",{staticClass:"d-flex justify-content-between"},[s("span",{staticClass:"orderDisplay",on:{click:function(s){return e.foobar(t)}}},[s("strong",[e._v(e._s(t.qty)+" "+e._s(t.size.toUpperCase())+" "+e._s(t.name))]),t.cuts?s("strong",[e._v(" 16 Cut")]):e._e()]),s("span",[e._v(" "+e._s((t.totalPrice*t.qty).toFixed(2))+" ")])]),s("div",{staticClass:"pl-4",staticStyle:{"font-size":"14px"}},["thin"==t.crust?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.crust)+" Crust")]),s("span",[e._v("0.00")])]):e._e(),"original"!=t.sauce?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.sauce)+" Sauce")]),s("span",[e._v("0.00")])]):e._e(),e._l(t.defaultToppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between"},[t.isDeleted?s("span",{class:t.isDeleted?"deletedTopping":""},[e._v(e._s(t.name))]):e._e(),t.isDeleted?s("span",{class:t.isDeleted?"deletedTopping":""},[e._v("0.00")]):e._e()])})),e._l(t.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])})),t.half1.toppings.length>0?s("span",[e._v("A")]):e._e(),e._l(t.half1.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])})),t.half2.toppings.length>0?s("span",[e._v("B")]):e._e(),e._l(t.half2.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])}))],2)]):e._e(),"other"==t.custom?s("div",{staticClass:"col-12"},[s("div",{staticClass:"d-flex justify-content-between"},[s("span",{staticClass:"orderDisplay",on:{click:function(s){return e.foobar(t)}}},[s("strong",[e._v(e._s(t.qty)+" "+e._s(t.name))]),t.cuts?s("strong",[e._v(" 16 Cut")]):e._e()]),s("span",[e._v(" "+e._s((t.totalPrice*t.qty).toFixed(2))+" ")])])]):e._e(),"sticks"==t.custom?s("div",{staticClass:"col-12"},[s("div",{staticClass:"d-flex justify-content-between"},[s("span",{staticClass:"orderDisplay",on:{click:function(s){return e.foobar(t)}}},[s("strong",[e._v(e._s(t.qty)+" "+e._s(t.name))]),t.cuts?s("strong",[e._v(" 16 Cut")]):e._e()]),s("span",[e._v(" "+e._s((t.totalPrice*t.qty).toFixed(2))+" ")])]),s("div",{staticClass:"pl-4",staticStyle:{"font-size":"14px"}},e._l(t.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])})),0)]):e._e(),"yes"==t.custom?s("div",{staticClass:"col-12",on:{click:function(s){return e.foobar(t)}}},[s("div",{staticClass:"d-flex justify-content-between"},[s("span",{staticClass:"orderDisplay",on:{click:function(s){return e.foobar(t)}}},[s("strong",[e._v(e._s(t.qty)+" "+e._s(t.size.toUpperCase())+" A/B")]),t.cuts?s("strong",[e._v(" 16 Cut")]):e._e()]),s("span",[e._v(" "+e._s((t.totalPrice*t.qty).toFixed(2))+" ")])]),e._l(t.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])})),"thin"==t.crust?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.crust)+" Crust")]),s("span",[e._v("0.00")])]):e._e(),"original"!=t.sauce?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.sauce)+" Sauce")]),s("span",[e._v("0.00")])]):e._e(),s("div",{staticClass:"orderDisplay",on:{click:function(s){return e.foobar(t)}}},[s("strong",[e._v("A "+e._s(t.half1.name))])]),s("div",{staticClass:"pl-4",staticStyle:{"font-size":"14px"}},["thin"==t.half1.crust?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.half1.crust)+" Crust")]),s("span",[e._v("0.00")])]):e._e(),"original"!=t.half1.sauce?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.half1.sauce)+" Sauce")]),s("span",[e._v("0.00")])]):e._e(),e._l(t.half1.defaultToppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between"},[t.isDeleted?s("span",{class:t.isDeleted?"deletedTopping":""},[e._v(e._s(t.name))]):e._e(),t.isDeleted?s("span",{class:t.isDeleted?"deletedTopping":""},[e._v("0.00")]):e._e()])})),e._l(t.half1.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])}))],2),s("div",{staticClass:"orderDisplay",on:{click:function(s){return e.foobar(t)}}},[s("strong",[e._v("B "+e._s(t.half2.name))])]),s("div",{staticClass:"pl-4",staticStyle:{"font-size":"14px"}},["thin"==t.half2.crust?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.half2.crust)+" Crust")]),s("span",[e._v("0.00")])]):e._e(),"original"!=t.half2.sauce?s("div",{staticClass:"d-flex justify-content-between deletedTopping"},[s("span",[e._v(e._s(t.half2.sauce)+" Sauce")]),s("span",[e._v("0.00")])]):e._e(),e._l(t.half2.defaultToppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between"},[t.isDeleted?s("span",{class:t.isDeleted?"deletedTopping":""},[e._v(e._s(t.name))]):e._e(),t.isDeleted?s("span",{class:t.isDeleted?"deletedTopping":""},[e._v("0.00")]):e._e()])})),e._l(t.half2.toppings,(function(t){return s("div",{key:t.id,staticClass:"d-flex justify-content-between orderDisplay"},[1==t.count?s("span",[e._v("+ "+e._s(t.name))]):e._e(),1!=t.count?s("span",[e._v("+ "+e._s(t.count)+" "+e._s(t.name))]):e._e(),s("span",[e._v(e._s((t.price*t.count).toFixed(2)))])])}))],2)],2):e._e()])})),s("div",{staticClass:"cardPrice"},[s("strong",[e._v(e._s(e.order.order_data.totalPrice))])]),s("v-list-item-title",{staticClass:"headline cardStyle mb-1"},[e._v(e._s(e.order.order_data.customer.adress))])],2)],1),1===e.statusIndex?s("v-card-actions",[s("v-btn",{attrs:{color:"orange lighten-2",text:""}},[e._v(" Waiting For Baker 1 ")]),s("v-spacer"),s("b-button",{attrs:{variant:"success"},on:{click:function(t){return e.baker1Done(e.order)}}},[e._v("Ready")])],1):e._e(),2===e.statusIndex?s("v-card-actions",[s("v-btn",{attrs:{color:"orange lighten-2",text:""}},[e._v(" Waiting For Baker 2 ")]),s("v-spacer"),s("b-button",{attrs:{variant:"success"},on:{click:function(t){return e.baker2Done(e.order)}}},[e._v("Ready")])],1):e._e(),3===e.statusIndex?s("v-card-actions",[s("v-btn",{attrs:{color:"orange lighten-2",text:""}},[e._v(" Pizza In Oven ")]),s("v-spacer"),s("b-button",{attrs:{variant:"success"},on:{click:function(t){return e.boxPizza(e.order)}}},[e._v("BOX")])],1):e._e(),4===e.statusIndex?s("v-card-actions",[s("v-btn",{attrs:{color:"orange lighten-2",text:""}},[e._v(" Waiting For Customer ")]),s("v-spacer"),s("b-button",{attrs:{variant:"success"},on:{click:function(t){return e.customerDelivery(e.order)}}},[e._v("Ready")])],1):e._e()],1)],1):e._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"col-3"},[s("v-rating",{attrs:{"background-color":"orange lighten-3",color:"orange",medium:""},model:{value:e.rating,callback:function(t){e.rating=t},expression:"rating"}})],1)])],1)},a=[],i={name:"Single Order",data:function(){return{order:[]}},props:{orderProp:{type:Object}},mounted:function(){console.log("Single Order: ",this.orderProp),this.order=this.orderProp},methods:{goBack:function(){this.$router.go(-1)}}},r=i,o=s("2877"),l=s("6544"),c=s.n(l),d=s("8336"),u=s("b0af"),v=s("99d9"),p=s("132d"),_=s("da13"),f=s("5d23"),h=s("1d4d"),g=s("2fa4"),m=Object(o["a"])(r,n,a,!1,null,null,null);t["default"]=m.exports;c()(m,{VBtn:d["a"],VCard:u["a"],VCardActions:v["a"],VIcon:p["a"],VListItem:_["a"],VListItemContent:f["a"],VListItemTitle:f["c"],VRating:h["a"],VSpacer:g["a"]})},5311:function(e,t,s){"use strict";var n=s("5607"),a=s("2b0e");t["a"]=a["default"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}})},"615b":function(e,t,s){},"696f":function(e,t,s){},"99d9":function(e,t,s){"use strict";s.d(t,"a",(function(){return i})),s.d(t,"b",(function(){return o})),s.d(t,"c",(function(){return l}));var n=s("b0af"),a=s("80d2"),i=Object(a["j"])("v-card__actions"),r=Object(a["j"])("v-card__subtitle"),o=Object(a["j"])("v-card__text"),l=Object(a["j"])("v-card__title");n["a"]},b0af:function(e,t,s){"use strict";s("0481"),s("4069"),s("a9e3");var n=s("5530"),a=(s("615b"),s("10d2")),i=s("297c"),r=s("1c87"),o=s("58df");t["a"]=Object(o["a"])(i["a"],r["a"],a["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({"v-card":!0},r["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},a["a"].options.computed.classes.call(this))},styles:function(){var e=Object(n["a"])({},a["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=i["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var t=this.generateRouteLink(),s=t.tag,n=t.data;return n.style=this.styles,this.isClickable&&(n.attrs=n.attrs||{},n.attrs.tabindex=0),e(s,this.setBackgroundColor(this.color,n),[this.genProgress(),this.$slots.default])}})}}]);
//# sourceMappingURL=chunk-1e8aa642.57e1f839.js.map