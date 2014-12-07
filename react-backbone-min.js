/*!
 * https://github.com/jhudson8/react-backbone v0.14.1;  MIT license; Joe Hudson<joehud_AT_gmail.com>
 */
!function(e){"function"==typeof define&&define.amd?define([],function(){return e}):"undefined"!=typeof exports&&"undefined"!=typeof require?module.exports=e:e(React,Backbone,_)}(function(e,t,n){function i(e,t,n){return"collection"===e?t.getCollection(n):t.getModel(n)}function o(e){return e?n.isArray(e)?e:[e]:void 0}function r(e,t){return function(){return t?t:i(e,modelOrCollection)}}function a(e){return e.getModelKey?e.getModelKey():e.props.name||e.props.key||e.props.ref}function s(e,t){if(t&&t.modelIndexErrors)return t.modelIndexErrors(e);if(Array.isArray(e)){var i={};return n.each(e,function(e){for(var t in e)i[t]=e[t]}),i}return e}function u(e,t){if(e.getModel){var n=a(e),i=e.getModel();if(i)return t(n,i)}}function d(e,t,i,r,a){var s,u,d=Array.isArray(t)?t:o(i.props[t]);if(d){for(var l=0;l<d.length;l++)s=d[l],u=r.replace("{key}",s),i[e+"On"](u,n.bind(a,i),this);return d}}function l(e,t,n,o,r){var a=c(o),s=n[0],u=n[1],d=n[2];a[s]={type:t,ev:s,cb:u,ctx:d};var l=r||i(e,o);l&&o["on"===t?"listenTo":"listenToOnce"](l,s,u,d)}function c(e){var t=g("__modelEvents",e);return t||(t={},y({__modelEvents:t},e)),t}function f(e){for(var t,n=0;n<e.length;n++)t=e[n],"true"===t?t=!0:"false"===t?t=!1:t.match(/^[0-9]+$/)?t=parseInt(t):t.match(/^[0-9]+\.[0-9]+/)&&(t=parseFloat(t)),e[n]=t;return e}var p=t.xhrEventName,h=t.xhrCompleteEventName,v=t.xhrModelLoadingAttribute,g=e.mixins.getState,y=e.mixins.setState;e.events.mixin=e.events.mixin||t.Events,e.mixins.getModelKey=a,e.mixins.modelIndexErrors=s,t.input=t.input||{};{var m=t.input.getModelValue=function(e){return u(e,function(e,t){return t.get(e)})};t.input.setModelValue=function(e,t,n){return u(e,function(e,i){return i.set(e,t,n)})}}n.each([{type:"model",capType:"Model",changeEvents:["change"]},{type:"collection",capType:"Collection",changeEvents:["add","remove","reset","sort"]}],function(t){var o={};o["get"+t.capType]=function(e){return e=e||this.props,g(t.type,this)||e[t.type]},o["set"+t.capType]=function(e,o){var r=i(t.type,this,this.props),a=c(this);n.each(a,function(n){this[t.type+"Off"](n.ev,n.cb,n.ctx,r),l(t.type,n.type,[n.ev,n.cb,n.ctx],this,e)},this),o!==!0&&y(t.type,e)},e.mixins.add(t.type+"Aware",o,"state");var a={getInitialState:function(){var e=i(t.type,this);return e&&(e.off&&e.on||(console.error("the model/collection does not implement on/off functions - you will see problems"),console.log(e))),{}},componentWillReceiveProps:function(e){var n=i(t.type,this),o=i(t.type,this,e);n!==o&&this["set"+t.capType](o,!0)}};a[t.type+"On"]=function(){l(t.type,"on",arguments,this)},a[t.type+"Once"]=function(){l(t.type,"once",arguments,this)},a[t.type+"Off"]=function(e,n,i,o){var a=c(this);delete a[e],this.stopListening(r(t.type,o),e,n,i)},e.mixins.add(t.type+"Events",a,t.type+"Aware","listen","events");var s={getInitialState:function(){n.each(t.changeEvents,function(e){this[t.type+"On"](e,function(){this.deferUpdate()},this)},this)}};e.mixins.add(t.type+"ChangeAware",s,t.type+"Events","listen","events","deferUpdate");var u={getInitialState:function(){this[t.type+"On"](p,function(e,n){y({loading:!0},this);var o=i(t.type,this);n.on("success",function(){y({loading:o[v]},this)},this),n.on("error",function(e){y({loading:o[v],error:e},this)},this)});var e=i(t.type,this);return{loading:e&&e[v]}},componentDidMount:function(){var e=this.state,n=i(t.type,this);if(n){var o=n[v];o?(this[t.type+"Once"](h,function(){y({loading:!1},this)}),e.loading||y({loading:!0},this)):e.loading&&y({loading:!1},this)}}};e.mixins.add(t.type+"XHRAware",u,t.type+"Events");var f=function(){var e=arguments.length>0?Array.prototype.slice.call(arguments,0):void 0;return{getInitialState:function(){e=d(t.type,e||"loadOn",this,p+":{key}",function(e){var n=i(t.type,this);y({loading:n[v]},this),e.on("complete",function(){y({loading:!1},this)},this)});var n=i(t.type,this);if(n){var o,r=n.loading;if(r)for(var a=function(){y({loading:!1},this)},s=0;s<r.length;s++){var u=e.indexOf(r[s].method);if(u>=0)return o=e[u],r[s].on("complete",a,this),{loading:n[v]}}}return{}}}};e.mixins.add(t.type+"LoadOn",f,t.type+"Events");var m=function(){var e=arguments.length>0?Array.prototype.slice.call(arguments,0):void 0;return{getInitialState:function(){d(t.type,e||"updateOn",this,"{key}",function(){this.deferUpdate()})}}};e.mixins.add(t.type+"UpdateOn",m,t.type+"Events","deferUpdate");var x=new RegExp("^"+t.type+"([.+])?$");e.events.handle(x,function(e,n){return{on:function(){if(!this[t.type+"On"])throw new Error("use the "+t.type+' "Events" mixin instead of "events"');this[t.type+"On"](e.path,n)},off:function(){}}})}),n.each({XHRAware:"XHRAware",changeAware:"ChangeAware",loadOn:"LoadOn",updateOn:"UpdateOn"},function(t,n){e.mixins.add(n,{},"model"+t,"collection"+t)}),e.mixins.add("modelPopulate",{modelPopulate:function(){var e,i,o,r,s;n.each(arguments,function(a){a instanceof t.Model?r=a:n.isBoolean(a)?(s=!0,r=!1):n.isArray(a)?e=a:n.isFunction(a)?i=a:o=a}),n.isUndefined(r)&&this.getModel&&(r=this.getModel());var u={};e||(e=n.map(this.refs,function(e){return e}));return n.each(e,function(e){if(e.getValue){var t=a(e);if(t){var i=e.getValue();u[t]=i}}else if(e.modelPopulate&&e.getModel){if(!r&&!s)return;var d=e.getModel(),l=r||o&&o.populateModel;if(d===l){var c=e.modelPopulate(n.extend({populateModel:l},o),!0);n.defaults(u,c)}}}),r&&r.set(u,{validate:!0})&&i.call(this,r),u}},"modelAware"),e.mixins.add("loadWhile",{loadWhile:function(e){function t(t){var i=e[t];e[t]=function(){y({loading:!1},n),i&&i.apply(this,arguments)}}e=e||{};var n=this;return t("error"),t("success"),y({loading:!0},this),e}}),e.mixins.add("modelValidator",{modelValidate:function(e,t){var n=this.getModel();return n&&n.validate?s(n.validate(e,t),this)||!1:void 0}},"modelAware"),e.mixins.add("modelInvalidAware",{getInitialState:function(){var e=a(this);return e&&this.modelOn("invalid",function(t,n){var i=s(n,this)||{},o=i&&i[e];o&&y({invalid:o},this)}),{}}},"modelEventAware");var x=e.events.specials;if(x){var M=["memoize","delay","defer","throttle","debounce","once","after","before"];n.each(M,function(e){x[e]=x[e]||function(t,i){return i=f(i),i.splice(0,0,t),n[e].apply(n,i)}})}var O=function(t,i,o,r){return e.createClass(n.extend({mixins:["modelAware"],render:function(){var r={},a=m(this);return o?r.defaultChecked=a:r.defaultValue=a,e.DOM[t](n.extend(r,i,this.props),this.props.children)},getValue:function(){if(this.isMounted()){if(o){var e=this.getDOMNode();return e.checked&&(e.value||!0)||!1}return $(this.getDOMNode()).val()}},getDOMValue:function(){return this.isMounted()?$(this.getDOMNode()).val():void 0}},r))};t.input=t.input||{},n.defaults(t.input,{Text:O("input",{type:"text"}),TextArea:O("textarea"),Select:O("select",void 0,void 0),CheckBox:O("input",{type:"checkbox"},!0),RadioGroup:e.createClass({render:function(){var t=this.props;return t.ref="input",e.DOM[t.tag||"span"](t,t.children)},componentDidMount:function(){var e=m(this);if(e){var t='input[value="'+e.replace('"','\\"')+'"]',n=$(this.getDOMNode()).find(t);n.attr("checked","checked")}},getValue:function(){if(this.isMounted())for(var e='input[type="radio"]',t=$(this.getDOMNode()).find(e),n=0;n<t.length;n++)if(t[n].checked)return t[n].value},getDOMValue:function(){if(this.isMounted()){return $(this.getDOMNode()).val()}}})})});