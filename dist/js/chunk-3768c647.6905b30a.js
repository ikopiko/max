(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3768c647"],{"0b36":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-alert",{staticClass:"alert alert-custom alert-white alert-shadow fade show gutter-b",attrs:{show:"",variant:"light"}},[a("div",{staticClass:"alert-icon"},[a("span",{staticClass:"svg-icon svg-icon-lg"},[a("inline-svg",{attrs:{src:"media/svg/icons/Tools/Compass.svg"}})],1)]),a("div",{staticClass:"alert-text"},[a("b",[t._v("Tabs")]),t._v(" Create a widget of tabbable panes of local content. The tabs component is built upon navs and cards internally, and provides full keyboard navigation control of the tabs. "),a("a",{staticClass:"font-weight-bold",attrs:{href:"https://bootstrap-vue.js.org/docs/components/tabs",target:"_blank"}},[t._v(" See documentation. ")])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("KTCodePreview",{attrs:{title:"Basic usage"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("div",[a("b-tabs",{attrs:{"content-class":"mt-3"}},[a("b-tab",{attrs:{title:"First",active:""}},[a("p",[t._v("I'm the first tab")])]),a("b-tab",{attrs:{title:"Second"}},[a("p",[t._v("I'm the second tab")])]),a("b-tab",{attrs:{title:"Disabled",disabled:""}},[a("p",[t._v("I'm a disabled tab!")])])],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code1.html)+" ")]},proxy:!0}])}),a("KTCodePreview",{attrs:{title:"Pills variant"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("p",[t._v(" Tabs use the "),a("code",[t._v("tabs")]),t._v(" styling by default. Just add "),a("code",[t._v("pills")]),t._v(" property to "),a("code",[t._v("<b-tabs>")]),t._v(" for the pill style variant. ")]),a("div",[a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{pills:"",card:""}},[a("b-tab",{attrs:{title:"Tab 1",active:""}},[a("b-card-text",[t._v("Tab Contents 1")])],1),a("b-tab",{attrs:{title:"Tab 2"}},[a("b-card-text",[t._v("Tab Contents 2")])],1)],1)],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code3.html)+" ")]},proxy:!0}])}),a("KTCodePreview",{attrs:{title:"Fill"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("p",[t._v(" To proportionately fill all available space with your tab controls, set the "),a("code",[t._v("fill")]),t._v(" prop. Notice that all horizontal space is occupied, but not every control has the same width. ")]),a("div",[a("b-tabs",{attrs:{"content-class":"mt-3",fill:""}},[a("b-tab",{attrs:{title:"First",active:""}},[a("p",[t._v("I'm the first tab")])]),a("b-tab",{attrs:{title:"Second"}},[a("p",[t._v("I'm the second tab")])]),a("b-tab",{attrs:{title:"Very, very long title"}},[a("p",[t._v("I'm the tab with the very, very long title")])]),a("b-tab",{attrs:{title:"Disabled",disabled:""}},[a("p",[t._v("I'm a disabled tab!")])])],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code4.html)+" ")]},proxy:!0}])})],1),a("div",{staticClass:"col-md-6"},[a("KTCodePreview",{attrs:{title:"Justified"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("p",[t._v(" For equal-width controls, use the "),a("code",[t._v("justified")]),t._v(" prop instead. All horizontal space will be occupied by the controls, but unlike using "),a("code",[t._v("fill")]),t._v(" above, every control will be the same width. ")]),a("div",[a("b-tabs",{attrs:{"content-class":"mt-3",justified:""}},[a("b-tab",{attrs:{title:"First",active:""}},[a("p",[t._v("I'm the first tab")])]),a("b-tab",{attrs:{title:"Second"}},[a("p",[t._v("I'm the second tab")])]),a("b-tab",{attrs:{title:"Very, very long title"}},[a("p",[t._v("I'm the tab with the very, very long title")])]),a("b-tab",{attrs:{title:"Disabled",disabled:""}},[a("p",[t._v("I'm a disabled tab!")])])],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code5.html)+" ")]},proxy:!0}])}),a("KTCodePreview",{attrs:{title:"Vertical tabs"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("p",[t._v(" Have the tab controls placed on the lefthand side by setting the "),a("code",[t._v("vertical")]),t._v(" prop to "),a("code",[t._v("true")]),t._v(". Vertical tabs work with or without "),a("code",[t._v("card")]),t._v(" mode enabled. ")]),a("div",[a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{pills:"",card:"",vertical:""}},[a("b-tab",{attrs:{title:"Tab 1",active:""}},[a("b-card-text",[t._v("Tab Contents 1")])],1),a("b-tab",{attrs:{title:"Tab 2"}},[a("b-card-text",[t._v("Tab Contents 2")])],1),a("b-tab",{attrs:{title:"Tab 3"}},[a("b-card-text",[t._v("Tab Contents 3")])],1)],1)],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code6.html)+" ")]},proxy:!0}])}),a("KTCodePreview",{attrs:{title:"Add custom content to tab title"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("p",[t._v(" If you want to add custom content to tab title, like HTML code, icons, or another non-interactive Vue component, this possible by using "),a("code",[t._v("title")]),t._v(" slot of "),a("code",[t._v("<b-tab>")])]),a("div",[a("b-tabs",[a("b-tab",{attrs:{active:""},scopedSlots:t._u([{key:"title",fn:function(){return[a("b-spinner",{attrs:{type:"grow",small:""}}),t._v(" I'm "),a("i",[t._v("Custom")]),a("strong",[t._v("Title")])]},proxy:!0}])},[a("p",{staticClass:"p-3"},[t._v("Tab Contents 1")])]),a("b-tab",{scopedSlots:t._u([{key:"title",fn:function(){return[a("b-spinner",{attrs:{type:"border",small:""}}),t._v(" Tab 2 ")]},proxy:!0}])},[a("p",{staticClass:"p-3"},[t._v("Tab Contents 2")])])],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code7.html)+" ")]},proxy:!0}])})],1),a("div",{staticClass:"col-md-12"},[a("KTCodePreview",{attrs:{title:"Cards integration"},scopedSlots:t._u([{key:"preview",fn:function(){return[a("p",[t._v(" Tabs support integrating with Bootstrap cards. Just add the card property to "),a("code",[t._v("<b-tabs>")]),t._v(" and place it inside a "),a("code",[t._v("<b-card>")]),t._v(" component. Note that you should add the "),a("code",[t._v("no-body")]),t._v(" prop on the "),a("code",[t._v("<b-card>")]),t._v(" component in order to properly decorate the card header and remove the extra padding introduced by "),a("code",[t._v("card-body")]),t._v(". ")]),a("div",[a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{card:""}},[a("b-tab",{attrs:{"no-body":"",title:"Picture 1"}},[a("b-card-img",{attrs:{bottom:"",src:"https://picsum.photos/600/200/?image=21"}}),a("b-card-footer",[t._v("Picture 1 footer")])],1),a("b-tab",{attrs:{"no-body":"",title:"Picture 2"}},[a("b-card-img",{attrs:{bottom:"",src:"https://picsum.photos/600/200/?image=25"}}),a("b-card-footer",[t._v("Picture 2 footer")])],1),a("b-tab",{attrs:{"no-body":"",title:"Picture 3"}},[a("b-card-img",{attrs:{bottom:"",src:"https://picsum.photos/600/200/?image=26"}}),a("b-card-footer",[t._v("Picture 3 footer")])],1),a("b-tab",{attrs:{title:"Text"}},[a("b-card-title",[t._v(" This tab does not have the "),a("code",[t._v("no-body")]),t._v(" prop set ")]),a("b-card-text",[t._v(" Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. ")])],1)],1)],1)],1)]},proxy:!0},{key:"html",fn:function(){return[t._v(" "+t._s(t.code2.html)+" ")]},proxy:!0}])})],1)])],1)},i=[],o=a("d968"),l=a("0bce"),n={data:function(){return{code1:{html:'<div>\n  <b-tabs content-class="mt-3">\n    <b-tab title="First" active><p>I\'m the first tab</p></b-tab>\n    <b-tab title="Second"><p>I\'m the second tab</p></b-tab>\n    <b-tab title="Disabled" disabled><p>I\'m a disabled tab!</p></b-tab>\n  </b-tabs>\n</div>'},code2:{html:'<div>\n  <b-card no-body>\n    <b-tabs card>\n      <b-tab no-body title="Picture 1">\n        <b-card-img bottom src="https://picsum.photos/600/200/?image=21"></b-card-img>\n        <b-card-footer>Picture 1 footer</b-card-footer>\n      </b-tab>\n\n      <b-tab no-body title="Picture 2">\n        <b-card-img bottom src="https://picsum.photos/600/200/?image=25"></b-card-img>\n        <b-card-footer>Picture 2 footer</b-card-footer>\n      </b-tab>\n\n      <b-tab no-body title="Picture 3">\n        <b-card-img bottom src="https://picsum.photos/600/200/?image=26"></b-card-img>\n        <b-card-footer>Picture 3 footer</b-card-footer>\n      </b-tab>\n\n      <b-tab title="Text">\n        <b-card-title>This tab does not have the <code>no-body</code> prop set</b-card-title>\n        <b-card-text>\n          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum\n          consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex\n          consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt\n          veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua\n          esse irure.\n        </b-card-text>\n      </b-tab>\n    </b-tabs>\n  </b-card>\n</div>'},code3:{html:'<div>\n  <b-card no-body>\n    <b-tabs pills card>\n      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>\n      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>\n    </b-tabs>\n  </b-card>\n</div>'},code4:{html:'<div>\n  <b-tabs content-class="mt-3" fill>\n    <b-tab title="First" active><p>I\'m the first tab</p></b-tab>\n    <b-tab title="Second"><p>I\'m the second tab</p></b-tab>\n    <b-tab title="Very, very long title"><p>I\'m the tab with the very, very long title</p></b-tab>\n    <b-tab title="Disabled" disabled><p>I\'m a disabled tab!</p></b-tab>\n  </b-tabs>\n</div>'},code5:{html:'<div>\n  <b-tabs content-class="mt-3" justified>\n    <b-tab title="First" active><p>I\'m the first tab</p></b-tab>\n    <b-tab title="Second"><p>I\'m the second tab</p></b-tab>\n    <b-tab title="Very, very long title"><p>I\'m the tab with the very, very long title</p></b-tab>\n    <b-tab title="Disabled" disabled><p>I\'m a disabled tab!</p></b-tab>\n  </b-tabs>\n</div>'},code6:{html:'<div>\n  <b-card no-body>\n    <b-tabs pills card vertical>\n      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>\n      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>\n      <b-tab title="Tab 3"><b-card-text>Tab Contents 3</b-card-text></b-tab>\n    </b-tabs>\n  </b-card>\n</div>'},code7:{html:'<div>\n  <b-tabs>\n    <b-tab active>\n      <template v-slot:title>\n        <b-spinner type="grow" small></b-spinner> I\'m <i>Custom</i> <strong>Title</strong>\n      </template>\n      <p class="p-3">Tab Contents 1</p>\n    </b-tab>\n\n    <b-tab>\n      <template v-slot:title>\n        <b-spinner type="border" small></b-spinner> Tab 2\n      </template>\n      <p class="p-3">Tab Contents 2</p>\n    </b-tab>\n  </b-tabs>\n</div>'}}},components:{KTCodePreview:o["a"]},mounted:function(){this.$store.dispatch(l["a"],[{title:"Vue Bootstrap",route:"alert"},{title:""}])}},r=n,b=a("2877"),c=Object(b["a"])(r,s,i,!1,null,null,null);e["default"]=c.exports},d968:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("KTCard",{ref:"preview",attrs:{title:t.title,example:!0},scopedSlots:t._u([t.hasTitleSlot?{key:"title",fn:function(){return[a("h3",{staticClass:"card-title"},[t._t("title")],2)]},proxy:!0}:null,{key:"toolbar",fn:function(){return[a("div",{staticClass:"example-tools justify-content-center"},[a("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.top",value:"View code",expression:"'View code'",modifiers:{hover:!0,top:!0}}],staticClass:"example-toggle",attrs:{"data-toggle":"tooltip"}}),a("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.top",value:"Copy code",expression:"'Copy code'",modifiers:{hover:!0,top:!0}}],staticClass:"example-copy",attrs:{"data-toggle":"tooltip"}})])]},proxy:!0},{key:"body",fn:function(){return[a("div",{staticClass:"example-code mb-5"},[t.hasGeneralCode||t.hasSingleCodeType?t._e():a("ul",{staticClass:"example-nav nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-2x",attrs:{role:"tablist"}},[t.hasHtmlCode?a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link active",attrs:{"data-tab":"0","data-toggle":"tab",href:"#",role:"tab","aria-selected":"true"},on:{click:t.setActiveTab}},[t._v(" HTML ")])]):t._e(),t.hasJsCode?a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{"data-tab":"1","data-toggle":"tab",href:"#",role:"tab","aria-selected":"false"},on:{click:t.setActiveTab}},[t._v(" JS ")])]):t._e(),t.hasScssCode?a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{"data-tab":"2","data-toggle":"tab",href:"#",role:"tab","aria-selected":"false"},on:{click:t.setActiveTab}},[t._v(" SCSS ")])]):t._e()]),t.hasGeneralCode?a("div",[t._t("code")],2):t._e(),t.hasGeneralCode||t.hasSingleCodeType?t._e():a("div",[a("b-tabs",{staticClass:"hide-tabs",attrs:{"content-class":"mt-3"},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},[a("b-tab",{staticClass:"example-highlight",attrs:{active:""}},[a("highlight-code",{staticClass:"language-html",attrs:{lang:"html"}},[t._t("html")],2)],1),a("b-tab",{staticClass:"example-highlight"},[a("highlight-code",{staticClass:"language-js",attrs:{lang:"js"}},[t._t("js")],2)],1),a("b-tab",{staticClass:"example-highlight"},[a("highlight-code",{staticClass:"language-scss",attrs:{lang:"scss"}},[t._t("scss")],2)],1)],1)],1),t.hasSingleCodeType?a("div",{staticClass:"example-highlight"},[t.hasHtmlCode?a("highlight-code",{staticClass:"language-html",attrs:{lang:"html"}},[t._t("html")],2):t._e(),t.hasJsCode?a("highlight-code",{staticClass:"language-js",attrs:{lang:"js"}},[t._t("js")],2):t._e(),t.hasScssCode?a("highlight-code",{staticClass:"language-scss",attrs:{lang:"scss"}},[t._t("scss")],2):t._e()],1):t._e()]),t._t("preview")]},proxy:!0}],null,!0)})},i=[],o=(a("4160"),a("159b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card card-custom gutter-b",class:t.classes},[t.hasTitleSlot||t.title?a("div",{staticClass:"card-header",class:t.headClass},[a("div",{staticClass:"card-title"},[t.hasTitleSlot?t._t("title"):t._e(),t.hasTitleSlot?t._e():a("h3",{staticClass:"card-label"},[t._v(" "+t._s(t.title)+" ")])],2),a("div",{staticClass:"card-toolbar"},[t._t("toolbar")],2)]):t._e(),a("div",{staticClass:"card-body",class:{bodyClass:t.bodyClass,"body-fit":t.bodyFit,"body-fluid":t.bodyFluid}},[t._t("body")],2),t.hasFootSlot?a("div",{staticClass:"card-footer"},[t._t("foot")],2):t._e()])}),l=[],n={name:"KTCard",props:{title:String,headSize:String,fluidHeight:Boolean,fluidHalfHeight:Boolean,headOverlay:Boolean,cardClass:String,headClass:String,bodyClass:String,bodyFit:Boolean,bodyFluid:Boolean,example:Boolean},components:{},methods:{},computed:{classes:function(){var t={"example example-compact":this.example,"height-fluid":this.fluidHeight,"height-fluid-half":this.fluidHalfHeight,"head-overlay":this.headOverlay};return t[this.headSizeClass]=this.headSizeClass,this.cardClass&&(t[this.cardClass]=!0),t},hasTitleSlot:function(){return!!this.$slots["title"]},hasFootSlot:function(){return!!this.$slots["foot"]},headSizeClass:function(){return!!this.headSize&&"head-".concat(this.headSize)}}},r=n,b=a("2877"),c=Object(b["a"])(r,o,l,!1,null,null,null),d=c.exports,v=a("b2e9"),p={name:"KTCodePreview",props:{title:String},data:function(){return{tabIndex:0,isOpen:!1}},components:{KTCard:d},mounted:function(){var t=this;this.$nextTick((function(){v["a"].init([t.$el]);var e=t.$el.querySelectorAll(".hljs");e.forEach((function(t){t.classList.add("language-".concat(t.classList[1])),t.classList.remove("hljs")}))}))},methods:{setActiveTab:function(t){for(var e=t.target.closest('[role="tablist"]'),a=e.querySelectorAll('[data-toggle="tab"]'),s=0;s<a.length;s++)a[s].classList.remove("active");t.target.classList.add("active"),this.tabIndex=parseInt(t.target.getAttribute("data-tab"))}},computed:{hasTitleSlot:function(){return!!this.$slots["title"]},hasSingleCodeType:function(){var t=this,e=0;return["html","js","scss"].forEach((function(a){t.$slots.hasOwnProperty(a)&&e++})),1===e},hasGeneralCode:function(){return!!this.$slots["code"]},hasJsCode:function(){return!!this.$slots["js"]},hasScssCode:function(){return!!this.$slots["scss"]},hasHtmlCode:function(){return!!this.$slots["html"]}}},h=p,u=Object(b["a"])(h,s,i,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-3768c647.6905b30a.js.map