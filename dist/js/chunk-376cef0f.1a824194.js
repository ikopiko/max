(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-376cef0f"],{"9ef7":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("b-alert",{staticClass:"alert alert-custom alert-white alert-shadow fade show gutter-b",attrs:{show:"",variant:"light"}},[o("div",{staticClass:"alert-icon"},[o("span",{staticClass:"svg-icon svg-icon-lg"},[o("inline-svg",{attrs:{src:"media/svg/icons/Tools/Compass.svg"}})],1)]),o("div",{staticClass:"alert-text"},[o("b",[e._v("Form Checkbox Inputs")]),e._v(" For cross browser consistency, <b-form-checkbox-group> and <b-form-checkbox> use Bootstrap's custom checkbox input to replace the browser default checkbox input. It is built on top of semantic and accessible markup, so it is a solid replacement for the default checkbox input. "),o("a",{staticClass:"font-weight-bold",attrs:{href:"https://bootstrap-vue.js.org/docs/components/form-checkbox",target:"_blank"}},[e._v(" See documentation. ")])])]),o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6"},[o("KTCodePreview",{attrs:{title:"Single checkbox"},scopedSlots:e._u([{key:"preview",fn:function(){return[o("div",[o("b-form-checkbox",{attrs:{id:"checkbox-1",name:"checkbox-1",value:"accepted","unchecked-value":"not_accepted"},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[e._v(" I accept the terms and use ")]),o("div",{staticClass:"mt-3"},[e._v(" State: "),o("strong",[e._v(e._s(e.status))])])],1)]},proxy:!0},{key:"html",fn:function(){return[e._v(" "+e._s(e.code1.html)+" ")]},proxy:!0},{key:"js",fn:function(){return[e._v(" "+e._s(e.code1.js)+" ")]},proxy:!0}])}),o("KTCodePreview",{attrs:{title:"Multiple choice checkboxes"},scopedSlots:e._u([{key:"preview",fn:function(){return[o("div",[o("b-form-group",{attrs:{label:"Using options array:"}},[o("b-form-checkbox-group",{attrs:{id:"checkbox-group-1",options:e.code2.options,name:"flavour-1"},model:{value:e.code2.selected1,callback:function(t){e.$set(e.code2,"selected1",t)},expression:"code2.selected1"}})],1),o("div",{staticClass:"mb-5"},[e._v(" Selected: "),o("strong",[e._v(e._s(e.code2.selected1))])]),o("b-form-group",{attrs:{label:"Using sub-components:"}},[o("b-form-checkbox-group",{attrs:{id:"checkbox-group-2",name:"flavour-2"},model:{value:e.code2.selected2,callback:function(t){e.$set(e.code2,"selected2",t)},expression:"code2.selected2"}},[o("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Orange")]),o("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Apple")]),o("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Pineapple")]),o("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Grape")])],1)],1),o("div",[e._v(" Selected: "),o("strong",[e._v(e._s(e.code2.selected2))])])],1)]},proxy:!0},{key:"html",fn:function(){return[e._v(" "+e._s(e.code2.html)+" ")]},proxy:!0},{key:"js",fn:function(){return[e._v(" "+e._s(e.code2.js)+" ")]},proxy:!0}])}),o("KTCodePreview",{attrs:{title:"Inline and stacked checkboxes"},scopedSlots:e._u([{key:"preview",fn:function(){return[o("p",[o("code",[e._v("<b-form-checkbox-group>")]),e._v(" components render inline checkboxes by default, while "),o("code",[e._v("<b-form-checkbox>")]),e._v(" renders block-level (stacked) checkboxes. ")]),o("div",[o("b-form-group",{attrs:{label:"Form-checkbox-group inline checkboxes (default)"}},[o("b-form-checkbox-group",{attrs:{options:e.code3.options,name:"flavour-1a"},model:{value:e.code3.selected1,callback:function(t){e.$set(e.code3,"selected1",t)},expression:"code3.selected1"}})],1),o("b-form-group",{attrs:{label:"Form-checkbox-group stacked checkboxes"}},[o("b-form-checkbox-group",{attrs:{options:e.code3.options,name:"flavour-2a",stacked:""},model:{value:e.code3.selected2,callback:function(t){e.$set(e.code3,"selected2",t)},expression:"code3.selected2"}})],1),o("b-form-group",{attrs:{label:"Individual stacked checkboxes (default)"}},e._l(e.code3.options,(function(t){return o("b-form-checkbox",{key:t.value,attrs:{value:t.value,name:"flavour-3a"},model:{value:e.code3.selected3,callback:function(t){e.$set(e.code3,"selected3",t)},expression:"code3.selected3"}},[e._v(" "+e._s(t.text)+" ")])})),1),o("b-form-group",{attrs:{label:"Individual inline checkboxes"}},e._l(e.code3.options,(function(t){return o("b-form-checkbox",{key:t.value,attrs:{value:t.value,name:"flavour-4a",inline:""},model:{value:e.code3.selected4,callback:function(t){e.$set(e.code3,"selected4",t)},expression:"code3.selected4"}},[e._v(" "+e._s(t.text)+" ")])})),1)],1)]},proxy:!0},{key:"html",fn:function(){return[e._v(" "+e._s(e.code3.html)+" ")]},proxy:!0},{key:"js",fn:function(){return[e._v(" "+e._s(e.code3.js)+" ")]},proxy:!0}])})],1),o("div",{staticClass:"col-md-6"},[o("KTCodePreview",{attrs:{title:"Control sizing"},scopedSlots:e._u([{key:"preview",fn:function(){return[o("p",[e._v(" Use the "),o("code",[e._v("size")]),e._v(" prop to control the size of the checkbox. The default size is medium. Supported size values are "),o("code",[e._v("sm")]),e._v(" (small) and "),o("code",[e._v("lg")]),e._v(" (large). ")]),o("div",[o("b-form-checkbox",{attrs:{size:"sm"}},[e._v("Small")]),o("b-form-checkbox",[e._v("Default")]),o("b-form-checkbox",{attrs:{size:"lg"}},[e._v("Large")])],1)]},proxy:!0},{key:"code",fn:function(){return[o("highlight-code",{attrs:{lang:"html"}},[e._v(" "+e._s(e.code4.html)+" ")])]},proxy:!0}])}),o("KTCodePreview",{attrs:{title:"Grouped button style checkboxes"},scopedSlots:e._u([{key:"preview",fn:function(){return[o("div",[o("b-form-group",{attrs:{label:"Button-group style checkboxes"}},[o("b-form-checkbox-group",{attrs:{options:e.code5.options,name:"buttons-1",buttons:""},model:{value:e.code5.selected1,callback:function(t){e.$set(e.code5,"selected1",t)},expression:"code5.selected1"}})],1),o("b-form-group",{attrs:{label:"Button-group style checkboxes with variant primary and large buttons"}},[o("b-form-checkbox-group",{attrs:{options:e.code5.options,buttons:"","button-variant":"primary",size:"lg",name:"buttons-2"},model:{value:e.code5.selected2,callback:function(t){e.$set(e.code5,"selected2",t)},expression:"code5.selected2"}})],1),o("b-form-group",{attrs:{label:"Stacked (vertical) button-group style checkboxes"}},[o("b-form-checkbox-group",{attrs:{options:e.code5.options,stacked:"",buttons:""},model:{value:e.code5.selected3,callback:function(t){e.$set(e.code5,"selected3",t)},expression:"code5.selected3"}})],1)],1)]},proxy:!0},{key:"html",fn:function(){return[e._v(" "+e._s(e.code5.html)+" ")]},proxy:!0},{key:"js",fn:function(){return[e._v(" "+e._s(e.code5.js)+" ")]},proxy:!0}])})],1)])],1)},s=[],n=o("d968"),l=o("0bce"),c={data:function(){return{code1:{html:'<div>\n    <b-form-checkbox\n      id="checkbox-1"\n      v-model="status"\n      name="checkbox-1"\n      value="accepted"\n      unchecked-value="not_accepted"\n    >\n      I accept the terms and use\n    </b-form-checkbox>\n\n    <div>State: <strong>{{ status }}</strong></div>\n  </div>',js:"export default {\n    data() {\n      return {\n        status: 'not_accepted'\n      }\n    }\n  }"},status:"not_accepted",code2:{html:'<div>\n    <b-form-group label="Using options array:">\n      <b-form-checkbox-group\n        id="checkbox-group-1"\n        v-model="selected"\n        :options="options"\n        name="flavour-1"\n      ></b-form-checkbox-group>\n    </b-form-group>\n\n    <b-form-group label="Using sub-components:">\n      <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">\n        <b-form-checkbox value="orange">Orange</b-form-checkbox>\n        <b-form-checkbox value="apple">Apple</b-form-checkbox>\n        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>\n        <b-form-checkbox value="grape">Grape</b-form-checkbox>\n      </b-form-checkbox-group>\n    </b-form-group>\n\n    <div>Selected: <strong>{{ selected }}</strong></div>\n  </div>',js:"export default {\n    data() {\n      return {\n        selected: [], // Must be an array reference!\n        options: [\n          { text: 'Orange', value: 'orange' },\n          { text: 'Apple', value: 'apple' },\n          { text: 'Pineapple', value: 'pineapple' },\n          { text: 'Grape', value: 'grape' }\n        ]\n      }\n    }\n  }",selected1:[],selected2:[],options:[{text:"Orange",value:"orange"},{text:"Apple",value:"apple"},{text:"Pineapple",value:"pineapple"},{text:"Grape",value:"grape"}]},code3:{html:'<div>\n    <b-form-group label="Form-checkbox-group inline checkboxes (default)">\n      <b-form-checkbox-group\n        v-model="selected"\n        :options="options"\n        name="flavour-1a"\n      ></b-form-checkbox-group>\n    </b-form-group>\n\n    <b-form-group label="Form-checkbox-group stacked checkboxes">\n      <b-form-checkbox-group\n        v-model="selected"\n        :options="options"\n        name="flavour-2a"\n        stacked\n      ></b-form-checkbox-group>\n    </b-form-group>\n\n    <b-form-group label="Individual stacked checkboxes (default)">\n      <b-form-checkbox\n        v-for="option in options"\n        v-model="selected"\n        :key="option.value"\n        :value="option.value"\n        name="flavour-3a"\n      >\n        {{ option.text }}\n      </b-form-checkbox>\n    </b-form-group>\n\n    <b-form-group label="Individual inline checkboxes">\n      <b-form-checkbox\n        v-for="option in options"\n        v-model="selected"\n        :key="option.value"\n        :value="option.value"\n        name="flavour-4a"\n        inline\n      >\n        {{ option.text }}\n      </b-form-checkbox>\n    </b-form-group>\n  </div>',js:"export default {\n    data() {\n      return {\n        selected: [], // Must be an array reference!\n        options: [\n          { text: 'Orange', value: 'orange' },\n          { text: 'Apple', value: 'apple' },\n          { text: 'Pineapple', value: 'pineapple' },\n          { text: 'Grape', value: 'grape' }\n        ]\n      }\n    }\n  }",selected1:[],selected2:[],selected3:[],selected4:[],options:[{text:"Orange",value:"orange"},{text:"Apple",value:"apple"},{text:"Pineapple",value:"pineapple"},{text:"Grape",value:"grape"}]},code4:{html:'<div>\n  <b-form-checkbox size="sm">Small</b-form-checkbox>\n  <b-form-checkbox>Default</b-form-checkbox>\n  <b-form-checkbox size="lg">Large</b-form-checkbox>\n</div>'},code5:{html:'<div>\n    <b-form-group label="Button-group style checkboxes">\n      <b-form-checkbox-group\n        v-model="selected"\n        :options="options"\n        name="buttons-1"\n        buttons\n      ></b-form-checkbox-group>\n    </b-form-group>\n\n    <b-form-group label="Button-group style checkboxes with variant primary and large buttons">\n      <b-form-checkbox-group\n        v-model="selected"\n        :options="options"\n        buttons\n        button-variant="primary"\n        size="lg"\n        name="buttons-2"\n      ></b-form-checkbox-group>\n    </b-form-group>\n\n    <b-form-group label="Stacked (vertical) button-group style checkboxes">\n      <b-form-checkbox-group\n        v-model="selected"\n        :options="options"\n        stacked\n        buttons\n      ></b-form-checkbox-group>\n    </b-form-group>\n  </div>',js:"\n  export default {\n    data() {\n      return {\n        selected: [], // Must be an array reference!\n        options: [\n          { text: 'Orange', value: 'orange' },\n          { text: 'Apple', value: 'apple' },\n          { text: 'Pineapple', value: 'pineapple' },\n          { text: 'Grape', value: 'grape' }\n        ]\n      }\n    }\n  }",selected1:[],selected2:[],selected3:[],options:[{text:"Orange",value:"orange"},{text:"Apple",value:"apple"},{text:"Pineapple",value:"pineapple"},{text:"Grape",value:"grape"}]}}},components:{KTCodePreview:n["a"]},mounted:function(){this.$store.dispatch(l["a"],[{title:"Vue Bootstrap",route:"alert"},{title:"Form Checkbox"}])}},r=c,i=o("2877"),d=Object(i["a"])(r,a,s,!1,null,null,null);t["default"]=d.exports},d968:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("KTCard",{ref:"preview",attrs:{title:e.title,example:!0},scopedSlots:e._u([e.hasTitleSlot?{key:"title",fn:function(){return[o("h3",{staticClass:"card-title"},[e._t("title")],2)]},proxy:!0}:null,{key:"toolbar",fn:function(){return[o("div",{staticClass:"example-tools justify-content-center"},[o("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.top",value:"View code",expression:"'View code'",modifiers:{hover:!0,top:!0}}],staticClass:"example-toggle",attrs:{"data-toggle":"tooltip"}}),o("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.top",value:"Copy code",expression:"'Copy code'",modifiers:{hover:!0,top:!0}}],staticClass:"example-copy",attrs:{"data-toggle":"tooltip"}})])]},proxy:!0},{key:"body",fn:function(){return[o("div",{staticClass:"example-code mb-5"},[e.hasGeneralCode||e.hasSingleCodeType?e._e():o("ul",{staticClass:"example-nav nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-2x",attrs:{role:"tablist"}},[e.hasHtmlCode?o("li",{staticClass:"nav-item"},[o("a",{staticClass:"nav-link active",attrs:{"data-tab":"0","data-toggle":"tab",href:"#",role:"tab","aria-selected":"true"},on:{click:e.setActiveTab}},[e._v(" HTML ")])]):e._e(),e.hasJsCode?o("li",{staticClass:"nav-item"},[o("a",{staticClass:"nav-link",attrs:{"data-tab":"1","data-toggle":"tab",href:"#",role:"tab","aria-selected":"false"},on:{click:e.setActiveTab}},[e._v(" JS ")])]):e._e(),e.hasScssCode?o("li",{staticClass:"nav-item"},[o("a",{staticClass:"nav-link",attrs:{"data-tab":"2","data-toggle":"tab",href:"#",role:"tab","aria-selected":"false"},on:{click:e.setActiveTab}},[e._v(" SCSS ")])]):e._e()]),e.hasGeneralCode?o("div",[e._t("code")],2):e._e(),e.hasGeneralCode||e.hasSingleCodeType?e._e():o("div",[o("b-tabs",{staticClass:"hide-tabs",attrs:{"content-class":"mt-3"},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}},[o("b-tab",{staticClass:"example-highlight",attrs:{active:""}},[o("highlight-code",{staticClass:"language-html",attrs:{lang:"html"}},[e._t("html")],2)],1),o("b-tab",{staticClass:"example-highlight"},[o("highlight-code",{staticClass:"language-js",attrs:{lang:"js"}},[e._t("js")],2)],1),o("b-tab",{staticClass:"example-highlight"},[o("highlight-code",{staticClass:"language-scss",attrs:{lang:"scss"}},[e._t("scss")],2)],1)],1)],1),e.hasSingleCodeType?o("div",{staticClass:"example-highlight"},[e.hasHtmlCode?o("highlight-code",{staticClass:"language-html",attrs:{lang:"html"}},[e._t("html")],2):e._e(),e.hasJsCode?o("highlight-code",{staticClass:"language-js",attrs:{lang:"js"}},[e._t("js")],2):e._e(),e.hasScssCode?o("highlight-code",{staticClass:"language-scss",attrs:{lang:"scss"}},[e._t("scss")],2):e._e()],1):e._e()]),e._t("preview")]},proxy:!0}],null,!0)})},s=[],n=(o("4160"),o("159b"),function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"card card-custom gutter-b",class:e.classes},[e.hasTitleSlot||e.title?o("div",{staticClass:"card-header",class:e.headClass},[o("div",{staticClass:"card-title"},[e.hasTitleSlot?e._t("title"):e._e(),e.hasTitleSlot?e._e():o("h3",{staticClass:"card-label"},[e._v(" "+e._s(e.title)+" ")])],2),o("div",{staticClass:"card-toolbar"},[e._t("toolbar")],2)]):e._e(),o("div",{staticClass:"card-body",class:{bodyClass:e.bodyClass,"body-fit":e.bodyFit,"body-fluid":e.bodyFluid}},[e._t("body")],2),e.hasFootSlot?o("div",{staticClass:"card-footer"},[e._t("foot")],2):e._e()])}),l=[],c={name:"KTCard",props:{title:String,headSize:String,fluidHeight:Boolean,fluidHalfHeight:Boolean,headOverlay:Boolean,cardClass:String,headClass:String,bodyClass:String,bodyFit:Boolean,bodyFluid:Boolean,example:Boolean},components:{},methods:{},computed:{classes:function(){var e={"example example-compact":this.example,"height-fluid":this.fluidHeight,"height-fluid-half":this.fluidHalfHeight,"head-overlay":this.headOverlay};return e[this.headSizeClass]=this.headSizeClass,this.cardClass&&(e[this.cardClass]=!0),e},hasTitleSlot:function(){return!!this.$slots["title"]},hasFootSlot:function(){return!!this.$slots["foot"]},headSizeClass:function(){return!!this.headSize&&"head-".concat(this.headSize)}}},r=c,i=o("2877"),d=Object(i["a"])(r,n,l,!1,null,null,null),u=d.exports,p=o("b2e9"),b={name:"KTCodePreview",props:{title:String},data:function(){return{tabIndex:0,isOpen:!1}},components:{KTCard:u},mounted:function(){var e=this;this.$nextTick((function(){p["a"].init([e.$el]);var t=e.$el.querySelectorAll(".hljs");t.forEach((function(e){e.classList.add("language-".concat(e.classList[1])),e.classList.remove("hljs")}))}))},methods:{setActiveTab:function(e){for(var t=e.target.closest('[role="tablist"]'),o=t.querySelectorAll('[data-toggle="tab"]'),a=0;a<o.length;a++)o[a].classList.remove("active");e.target.classList.add("active"),this.tabIndex=parseInt(e.target.getAttribute("data-tab"))}},computed:{hasTitleSlot:function(){return!!this.$slots["title"]},hasSingleCodeType:function(){var e=this,t=0;return["html","js","scss"].forEach((function(o){e.$slots.hasOwnProperty(o)&&t++})),1===t},hasGeneralCode:function(){return!!this.$slots["code"]},hasJsCode:function(){return!!this.$slots["js"]},hasScssCode:function(){return!!this.$slots["scss"]},hasHtmlCode:function(){return!!this.$slots["html"]}}},h=b,v=Object(i["a"])(h,a,s,!1,null,null,null);t["a"]=v.exports}}]);
//# sourceMappingURL=chunk-376cef0f.1a824194.js.map