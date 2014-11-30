/*!
 * https://github.com/jhudson8/react-backbone;  MIT license; Joe Hudson<joehud_AT_gmail.com>
 */
!function(e){"function"==typeof define&&define.amd?define([],function(){return e}):"undefined"!=typeof exports&&"undefined"!=typeof require?module.exports=e:e(React,Backbone,_)}(function(React,Backbone,_){!function(){function e(e){e=e||"_all";var n=f[e];return n||(n=function(n,a){"_all"!==e&&(options=a,a=n,n=e),t(a.method,this,a.model,a.options)},f[e]=n),n}function t(e,t,r,d){function f(e){var i=d[e];d[e]=function(r,o,s){if(e!==c||v.preventDefault||(v.trigger("after-send",r,o,s,e,v),r=v.data||r,!v.preventDefault)){try{i&&i.call(this,r,o,s)}finally{var l=u.indexOf(v);l>=0&&u.splice(l,1),0===u.length&&(t[a]=void 0,t.trigger(n,v))}var d=e===c?[e,v]:[e,r,o,s,v];v.trigger.apply(v,d),d.splice(0,0,"complete"),v.trigger.apply(v,d)}}}var u=t[a]=t[a]||[],h=d&&d.event||e,v=new l(e,r,d),p=i+":"+h;t.trigger(i,h,v),t.trigger(p,v),t===r&&(o.trigger(i,h,t,v),o.trigger(p,t,v));var m=d.beforeSend;return d.beforeSend=function(e,t){if(v.xhr=e,v.settings=t,m){var n=m.call(this,e,t);if(n===!1)return n}return v.trigger("before-send",e,t,v),v.preventDefault?!1:void u.push(v)},f(c),f(s),v}var n=Backbone.xhrCompleteEventName=Backbone.xhrCompleteEventName||"xhr:complete",a=Backbone.xhrModelLoadingAttribute=Backbone.xhrModelLoadingAttribute||"xhrActivity",i=Backbone.xhrEventName=Backbone.xhrEventName||"xhr",r=Backbone.xhrGlobalAttribute=Backbone.xhrGlobalAttribute||"xhrEvents",o=Backbone[r]=_.extend({},Backbone.Events),c="success",s="error",l=function(e,t,n){this.method=e,this.model=t,this.options=n};l.prototype.abort=function(){this.aborted||(this.aborted=!0,this.preventDefault=!0,this.xhr&&this.xhr.abort())},_.extend(l.prototype,Backbone.Events);var d=Backbone.sync;Backbone.sync=function(e,n,a){a=a||{},a.url||(a.url=_.result(n,"url"));var i=t(e,n,n,a);if(!i.preventDefault){var r=d.call(this,e,n,a);return i.xhr=r,r}},o.on(i+":read",function(e,t){t.on(c,function(){e.hasBeenFetched=!0,e.hadFetchError=!1}),t.on(s,function(){e.hadFetchError=!0})}),Backbone.Model.prototype.whenFetched=Backbone.Collection.whenFetched=function(e,t){function n(){e(i)}var i=this;if(this.hasBeenFetched)return e(this);var r=_.find(this[a],function(e){return"read"===e.method});r?(r.on("success",n),t&&r.on("error",t)):this.fetch({success:n,error:t})},Backbone.forwardXhrEvents=function(t,n,a){var r=e(!_.isFunction(a)&&a);if(_.isFunction(a))try{t.on(i,r,n),a.call(this)}finally{t.off(i,r,n)}else{var o=a?i+":"+a:i;t.on(o,r,n)}},Backbone.stopXhrForwarding=function(t,n,a){var r=e(a);t.off(i,r,n)};var f={}}(),function(){function setState(e,t){if(t.isMounted())t.setState(e);else if(t.state)for(var n in e)t.state[n]=e[n];else{var a=t.__temporary_state||{};for(var n in e)a[n]=e[n];t.__temporary_state=a}}function getState(e,t){var n=t.state,a=t.__temporary_state;return n&&n[e]||a&&a[e]}function get(values,index,initiatedOnce,rtn){function addTo(name){var indexName=name,match=name.match(/^([^\(]*)\s*\(([^\)]*)\)\s*/),params=match&&match[2];if(name=match&&match[1]||name,!index[indexName]){params&&(params=eval("["+params+"]"));var mixin=_mixins[name],checkAgain=!1,skip=!1;if(!mixin)throw new Error('invalid mixin "'+name+'"');if("function"==typeof mixin)_initiatedOnce[name]?(initiatedOnce[name]=initiatedOnce[name]||[],initiatedOnce[name].push(params),skip=!0):(mixin=mixin.apply(this,params||[]),checkAgain=!0);else if(params)throw new Error('the mixin "'+name+'" does not support parameters');get(_dependsOn[name],index,initiatedOnce,rtn),get(_dependsInjected[name],index,initiatedOnce,rtn),index[indexName]=!0,checkAgain?get([mixin],index,initiatedOnce,rtn):skip||rtn.push(mixin)}}function handleMixin(e){if(e)if(Array.isArray(e))get(e,index,initiatedOnce,rtn);else if("string"==typeof e)addTo(e);else{if(e.mixins){get(e.mixins,index,initiatedOnce,rtn);var t=_mixins[e];if(!t){t={};for(var n in e)"mixins"!==n&&(t[n]=e[n])}_mixins[e]=t,e=t}rtn.push(e)}}if(Array.isArray(values))for(var i=0;i<values.length;i++)handleMixin(values[i]);else handleMixin(values)}function getInitiatedOnce(e,t){function n(e,n){e=e.apply(this,n||[]),t.push(e)}for(var a in e)e.hasOwnProperty(a)&&n(_mixins[a],e[a])}function addMixin(e,t,n,a,i){React.mixins;(a||!_mixins[e])&&(_dependsOn[e]=n.length&&n,_mixins[e]=t,i&&(_initiatedOnce[e]=!0))}function GROUP(){}function mixinParams(e,t){var n,a=e[0],i=!1;if("object"==typeof a?(n=a.name,i=a.initiatedOnce):n=a,!n||!n.length)throw new Error("the mixin name hasn't been specified");return Array.isArray(e[1])?[n,e[1][0],Array.prototype.slice.call(e[1],1),t,i]:[n,e[1],Array.prototype.slice.call(e,2),t,i]}var _dependsOn={},_dependsInjected={},_mixins={},_initiatedOnce={},_createClass=React.createClass;React.createClass=function(e){return e.mixins&&(e.mixins=React.mixins.get(e.mixins)),_createClass.apply(React,arguments)},React.mixins={get:function(){var e=[],t={},n={};return get(Array.prototype.slice.call(arguments),t,n,e),getInitiatedOnce(n,e),e},inject:function(e){var t=_dependsInjected[e];t||(t=_dependsInjected[e]=[]),t.push(Array.prototype.slice.call(arguments,1))},alias:function(e){addMixin(e,GROUP,Array.prototype.slice.call(arguments,1),!1)},add:function(){addMixin.apply(this,mixinParams(arguments,!1))},replace:function(){addMixin.apply(this,mixinParams(arguments,!0))},exists:function(e){return _mixins[e]||!1},_reset:function(){_dependsOn={},_mixins={},_dependsInjected={},_onceInitiated={}}},React.mixins.add("deferUpdate",{getInitialState:function(){return{}},deferUpdate:function(){var e=this.state;if(!e._deferUpdate){e._deferUpdate=!0;var t=this;setTimeout(function(){delete e._deferUpdate,t.isMounted()&&t.forceUpdate()},0)}}}),React.mixins.add("state",{getInitialState:function(){return{}},componentWillMount:function(){var e=this.__temporary_state;if(e){for(var t in e)this.state[t]=e[t];delete this.__temporary_state}}}),React.mixins.setState=setState,React.mixins.getState=getState}(),function(){function normalizeEvents(e,t,n){t=t||{},n?n+=":":n="";var a,i;for(var r in e)a=e[r],i=typeof a,"string"===i||"function"===i?t[n+r]=a:a&&normalizeEvents(a,t,n+r);return t}function manageEvent(e,t){var n={type:e};for(var a in t)n[a]=t[a];var i=React.mixins.getState("__watchedEvents",this);i||(i=[],setState({__watchedEvents:i},this)),n.context=n.context||this,i.push(n);var r=getTarget(n.target,this);if(this.isMounted()&&r&&r[n.type](n.event,n.callback,n.context),"off"===e)for(var o,c=0;c<i.length;c++)o=i[c],o.event===t.event&&o.callback===t.callback&&getTarget(o.target,this)===r&&i.splice(c,1)}function _watchedEventsBindAll(e){var t=getState("__watchedEvents",e);if(t){var n;for(var a in t){n=t[a];var i=getTarget(n.target,e);i&&i[n.type](n.event,n.callback,n.context)}}}function _watchedEventsUnbindAll(e,t){var n=getState("__watchedEvents",t);if(n){var a;for(var i in n){a=n[i];var r=getTarget(a.target,t);r&&r.off(a.event,a.callback,a.context)}e||setState({__watchedEvents:[]},t)}}function getTarget(e,t){return"function"==typeof e?e.call(t):e}function createHandler(event,callback,context,dontWrapCallback){if(!dontWrapCallback){var _callback=callback,noArg;if("object"==typeof callback&&(_callback=callback.callback.call(this)),"string"==typeof callback&&(noArg=noArgMethods.indexOf(callback)>=0,_callback=context[callback]),!_callback)throw'no callback function exists for "'+callback+'"';callback=function(){return _callback.apply(context,noArg?[]:arguments)}}var match=event.match(specialWrapper);if(match){var specialMethodName=match[1],args=eval("["+match[2]+"]"),rest=match[3],specialHandler=React.events.specials[specialMethodName];if(specialHandler)return 1===args.length&&""===args[0]&&(args=[]),callback=specialHandler.call(context,callback,args),createHandler(rest,callback,context,!0);throw new Error('invalid special event handler "'+specialMethodName+"'")}var parts=event.match(splitter),handlerName=parts[1];path=parts[2],handler=handlers[handlerName];for(var i=0;!handler&&i<patternHandlers.length;i++)handlerName.match(patternHandlers[i].pattern)&&(handler=patternHandlers[i].handler);if(!handler)throw new Error('no handler registered for "'+event+'"');return handler.call(context,{key:handlerName,path:path},callback)}function registerObjectHandler(e,t){eventManager.handle(e,function(e,n){var a,i,r=e.path.match(splitter),o=r[1],c=r[2];return{on:function(){var e=t.call(this,o);e&&(i=e.state||e,e.on(c,n),a=e)},off:function(){a&&(a.off(c,n),a=void 0,i=void 0)},isStale:function(){if(!a)return!!e;var e=t.call(this,o);return e&&(e.state||e)===i?void 0:!0}}})}var handlers={},patternHandlers=[],splitter=/^([^:]+):?(.*)/,specialWrapper=/^\*([^\(]+)\(([^)]*)\)[->:]*(.*)/,noArgMethods=["forceUpdate"],setState=React.mixins.setState,getState=React.mixins.getState,handlerTemplates={standard:function(e){var t={on:e.onKey||"on",off:e.offKey||"off"},n=e.target;return function(a,i){function r(e,a){return function(){var r="function"==typeof n?n.call(a,o):n;r&&r[t[e]](o,i)}}var o=a.path;return{on:r("on",this),off:r("off",this),initialize:e.initialize}}}},eventManager=React.events={specials:{},handle:function(e,t){"function"!=typeof t&&(t=handlerTemplates[t.type||"standard"](t)),e instanceof RegExp?patternHandlers.push({pattern:e,handler:t}):handlers[e]=t}};"undefined"!=typeof window&&eventManager.handle("window",{target:window,onKey:"addEventListener",offKey:"removeEventListener"});var objectHandlers={ref:function(e){return this.refs[e]},prop:function(e){return this.props[e]}},objectFactory;for(var key in objectHandlers)registerObjectHandler(key,objectHandlers[key]);eventManager.handle("repeat",function(e,t){var n,a=parseInt(e.path,10);return{on:function(){n=setInterval(t,a)},off:function(){n=!!clearInterval(n)}}}),eventManager.handle("!repeat",function(e,t){function n(e){e!==!0&&t(),setTimeout(function(){a&&requestAnimationFrame(n)},i)}var a,i=parseInt(e.path,10);return{on:function(){a=!0,n(!0)},off:function(){a=!1}}}),React.mixins.add("events",function(){function e(e,t){return function(){e.apply(t,arguments)}}var t=[{triggerWith:function(){var e=Array.prototype.slice.call(arguments),t=this;return function(){t.trigger.apply(this,e)}},getInitialState:function(){var e=[];if(this.events){var t,n=normalizeEvents(this.events);for(var a in n)t=createHandler(a,n[a],this),t.initialize&&t.initialize.call(this),e.push(t)}return{_eventHandlers:e}},componentDidUpdate:function(){for(var e,t=getState("_eventHandlers",this),n=0;n<t.length;n++)e=t[n],e.isStale&&e.isStale.call(this)&&(e.off.call(this),e.on.call(this))},componentDidMount:function(){for(var e=getState("_eventHandlers",this),t=0;t<e.length;t++)e[t].on.call(this)},componentWillUnmount:function(){for(var e=getState("_eventHandlers",this),t=0;t<e.length;t++)e[t].off.call(this)}}];if(eventManager.mixin){var n={},a={};for(var i in eventManager.mixin)n[i]=e(eventManager.mixin[i],a);n.getInitialState=function(){return{__events:a}},t.push(n)}return t},"state"),React.mixins.add("listen",{componentDidMount:function(){_watchedEventsUnbindAll(!0,this),_watchedEventsBindAll(this)},componentWillUnmount:function(){_watchedEventsUnbindAll(!0,this)},listenTo:function(e,t,n,a){var i=t?{event:t,callback:n,target:e,context:a}:e;manageEvent.call(this,"on",i)},listenToOnce:function(e,t,n,a){var i={event:t,callback:n,target:e,context:a};manageEvent.call(this,"once",i)},stopListening:function(e,t,n,a){var i={event:t,callback:n,target:e,context:a};manageEvent.call(this,"off",i)}})}(),function(){function e(e){return e?_.isArray(e)?e:[e]:void 0}function t(e){return function(){return e?e:this.getModel?this.getModel():void 0}}function n(e){return e.getModelKey?e.getModelKey():e.props.key||e.props.ref||e.props.name}function a(e,t){if(e.getModel){var a=n(e),i=e.getModel();if(i)return t(a,i)}}function i(t,n,a,i){var r,o,c=Array.isArray(t)?t:e(n.props[t]);if(c){for(var s=0;s<c.length;s++)r=c[s],o=a.replace("{key}",r),n.modelOn(o,_.bind(i,n),this);return c}}function r(e,t,n,a){var i=o(n),r=t[0],c=t[1],s=t[2];i[r]={type:e,ev:r,cb:c,ctx:s};var l=a||n.getModel();l&&n["on"===e?"listenTo":"listenToOnce"](l,r,c,s)}function o(e){var t=f("__modelEvents",e);return t||(t={},u({__modelEvents:t},e)),t}function c(e){for(var t,n=0;n<e.length;n++)t=e[n],"true"===t?t=!0:"false"===t?t=!1:t.match(/^[0-9]+$/)?t=parseInt(t):t.match(/^[0-9]+\.[0-9]+/)&&(t=parseFloat(t)),e[n]=t;return e}var s=Backbone.xhrEventName,l=Backbone.xhrCompleteEventName,d=Backbone.xhrModelLoadingAttribute,f=React.mixins.getState,u=React.mixins.setState;Backbone.input=Backbone.input||{};{var h=Backbone.input.getModelValue=function(e){return a(e,function(e,t){return t.get(e)})};Backbone.input.setModelValue=function(e,t,n){return a(e,function(e,a){return a.set(e,t,n)})}}if(React.mixins.add("modelAware",{getModel:function(e){return e=e||this.props,f("model",this)||f("collection",this)||e.model||e.collection},setModel:function(e,t){var n=this.getModel(),a=o(this);_.each(a,function(t){this.modelOff(t.ev,t.cb,t.ctx,n),r(t.type,[t.ev,t.cb,t.ctx],this,e)},this),t!==!0&&u("model",e)}},"state"),React.mixins.add("modelPopulate",{modelPopulate:function(){var e,t,a,i;_.each(arguments,function(n){n instanceof Backbone.Model||n===!1?i=n:_.isArray(n)?e=n:_.isFunction(n)?t=n:a=n}),_.isUndefined(i)&&this.getModel&&(i=this.getModel());var r={};e||(e=_.map(this.refs,function(e){return e}));var o={};if(_.each(e,function(e){if(e.getValue){var t=n(e);if(t){var c=e.getValue();r[t]=c}}else if(e.modelPopulate&&e.getModel){if(!i)return;var s=e.getModel();if(s){var l=e.modelPopulate(a,!1),d=o[s.cid]||{};_.extend(d,l),o[s.cid]={model:s,attr:d}}}}),i){var c=!0,s=o[i.cid];s||(s={model:i,attr:{}}),_.extend(s.attr,r),o[i.cid]=s;var l=_.defaults({validate:!0},a);_.each(o,function(e){var t=!e.model._validate(e.attr,l);c=!t&&c}),c&&(a=_.defaults({validate:!1},a),_.each(o,function(e){e.model.set(e.attr,a)})),t&&c&&t.call(this,i)}return r}},"modelAware"),React.mixins.add("modelValidator",{modelValidate:function(e,t){var n=this.getModel();return n&&n.validate?this.modelIndexErrors(n.validate(e,t))||!1:void 0}},"modelAware","modelIndexErrors"),React.mixins.add("modelEventAware",{getInitialState:function(){var e=this.getModel();return e&&(e.off&&e.on||(console.error("the model does not implement on/off functions - you will see problems"),console.log(e))),{}},componentWillReceiveProps:function(e){var t=this.getModel(),n=this.getModel(e);t!==n&&this.setModel(n,!0)},modelOn:function(){r("on",arguments,this)},modelOnce:function(){r("once",arguments,this)},modelOff:function(e,n,a,i){var r=o(this);delete r[e],this.stopListening(t(i),e,n,a)}},"modelAware","listen"),React.mixins.add("modelChangeAware",{getInitialState:function(){return _.each(["change","reset","add","remove","sort"],function(e){this.modelOn(e,function(){this.deferUpdate()})},this),null}},"modelEventAware","deferUpdate"),React.mixins.add("modelXHRAware",{getInitialState:function(){this.modelOn(s,function(e,t){u({loading:!0},this);var n=this.getModel();t.on("success",function(){u({loading:n[d]},this)},this),t.on("error",function(e){u({loading:n[d],error:e},this)},this)});var e=this.getModel();return{loading:e&&e[d]}},componentDidMount:function(){var e=this.state,t=this.getModel();if(t){var n=t[d];n?(this.modelOnce(l,function(){u({loading:!1},this)}),e.loading||u({loading:!0},this)):e.loading&&u({loading:!1},this)}}},"modelEventAware"),React.mixins.add("modelInvalidAware",{getInitialState:function(){var e=n(this);return e&&this.modelOn("invalid",function(t,n){var a=this.modelIndexErrors(n)||{},i=a&&a[e];i&&u({invalid:i},this)}),{}}},"modelIndexErrors","modelEventAware"),React.mixins.add("modelIndexErrors",{modelIndexErrors:function(e){if(Array.isArray(e)){var t={};return _.each(e,function(e){for(var n in e)t[n]=e[n]}),t}return e}}),React.mixins.add("modelLoadOn",function(){var e=arguments.length>0?Array.prototype.slice.call(arguments,0):void 0;return{getInitialState:function(){e=i(e||"loadOn",this,s+":{key}",function(e){var t=this.getModel();u({loading:t[d]},this),e.on("complete",function(){u({loading:!1},this)},this)});var t=this.getModel();if(t){var n,a=t.loading;if(a)for(var r=function(){u({loading:!1},this)},o=0;o<a.length;o++){var c=e.indexOf(a[o].method);if(c>=0)return n=e[c],a[o].on("complete",r,this),{loading:t[d]}}}return{}},loadWhile:function(e){function t(t){var a=e[t];e[t]=function(){u({loading:!1},n),a&&a.apply(this,arguments)}}e=e||{};var n=this;return t("error"),t("success"),u({loading:!0},this),e}}},"modelEventAware"),React.mixins.add("modelUpdateOn",function(){var e=arguments.length>0?Array.prototype.slice.call(arguments,0):void 0;return{getInitialState:function(){i(e||"updateOn",this,"{key}",function(){this.deferUpdate()})}}},"modelEventAware","deferUpdate"),React.events){React.events.mixin=React.events.mixin||Backbone.Events;var v=/^model(\[.+\])?$/;React.events.handle(v,function(e,t){return{on:function(){this.modelOn(e.path,t)},off:function(){}}});var p=React.events.specials;if(p){var m=["memoize","delay","defer","throttle","debounce","once","after","before"];_.each(m,function(e){p[e]=p[e]||function(t,n){return n=c(n),n.splice(0,0,t),_[e].apply(_,n)}})}}var g=function(e,t,n,a){return React.createClass(_.extend({mixins:["modelAware"],render:function(){var a={},i=h(this);return n?a.defaultChecked=i:a.defaultValue=i,React.DOM[e](_.extend(a,t,this.props),this.props.children)},getValue:function(){if(this.isMounted()){if(n){var e=this.getDOMNode();return e.checked&&(e.value||!0)||!1}return $(this.getDOMNode()).val()}},getDOMValue:function(){return this.isMounted()?$(this.getDOMNode()).val():void 0}},a))};Backbone.input=Backbone.input||{},_.defaults(Backbone.input,{Text:g("input",{type:"text"}),TextArea:g("textarea"),Select:g("select",void 0,void 0),CheckBox:g("input",{type:"checkbox"},!0),RadioGroup:React.createClass({render:function(){var e=this.props;return e.ref="input",React.DOM[e.tag||"span"](e,e.children)},componentDidMount:function(){var e=h(this);if(e){var t='input[value="'+e.replace('"','\\"')+'"]',n=$(this.getDOMNode()).find(t);n.attr("checked","checked")}},getValue:function(){if(this.isMounted())for(var e='input[type="radio"]',t=$(this.getDOMNode()).find(e),n=0;n<t.length;n++)if(t[n].checked)return t[n].value},getDOMValue:function(){if(this.isMounted()){return $(this.getDOMNode()).val()}}})})}()});