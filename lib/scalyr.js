'use strict';angular.module('sly',['slyEvaluate','slyRepeat']);function isArray(value){return Object.prototype.toString.call(value)==='[object Array]';}
function isBoolean(value){return typeof value=='boolean';}
function isDate(value){return Object.prototype.toString.call(value)==='[object Date]';}
function isDefined(value){return typeof value!='undefined';}
function isFunction(value){return typeof value=='function';}
function isNull(value){return value===null;}
function isNumber(value){return typeof value=='number';}
function isObject(value){return value!==null&&typeof value=='object';}
function isString(value){return typeof value=='string';}
function isUndefined(value){return typeof value=='undefined';}
function convertToBoolean(value){if(isBoolean(value))
return value;return value!==null&&value!==''&&value!=='false';}
function hasProperty(obj,prop){return obj.hasOwnProperty(prop);}
function isStringEmpty(value){return isNull(value)||isUndefined(value)||(isString(value)&&(value.length==0));}
function isStringNonempty(value){return isString(value)&&(value.length>0);}
function upperCaseFirstLetter(input){return input.charAt(0).toUpperCase()+input.slice(1);}
function areEqual(obj1,obj2){return angular.equals(obj1,obj2);}
function min(a,b){return a<b?a:b;}
function max(a,b){return a>b?a:b;}
function beginsWith(input,prefix){return isString(input)&&input.lastIndexOf(prefix,0)==0;}
function endsWith(input,postfix){return isString(input)&&input.indexOf(postfix,input.length-postfix.length)!==-1;}
function copy(source,destination){return angular.copy(source,destination);}
function removeProperty(obj,property){delete obj[property];}
function removeProperties(obj,properties){for(var i=0;i<properties.length;++i)
delete obj[properties[i]];}
function forEach(obj,iterator,context){return angular.forEach(obj,iterator,context);}
function defineScalyrJsLibrary(libraryName,libraryExporter){var moduleDependencies=[];if(libraryExporter instanceof Array){for(var i=0;i<libraryExporter.length-1;++i)
moduleDependencies.push(libraryExporter[i]);}
return angular.module(libraryName,moduleDependencies).factory(libraryName,libraryExporter);}
function defineScalyrAngularModule(moduleName,dependencies){return angular.module(moduleName,dependencies);}
defineScalyrAngularModule('slyEvaluate',['gatedScope']).directive('slyEvaluateOnlyWhen',['$parse',function($parse){return{scope:true,restrict:'A',compile:function compile(tElement,tAttrs){return{pre:function preLink(scope,element,attrs){var previousValue=null;var initialized=false;var expressionToCheck=$parse(attrs['slyEvaluateOnlyWhen']);var alwaysEvaluateString=null;if(hasProperty(attrs,'slyAlwaysEvaluate')){alwaysEvaluateString=attrs['slyAlwaysEvaluate'];if(isStringEmpty(alwaysEvaluateString))
throw new Exception('Empty string is illegal for value of slyAlwaysEvaluate');}
scope.$addWatcherGate(function evaluteOnlyWhenChecker(){var currentValue=expressionToCheck(scope);if(!initialized){initialized=true;previousValue=currentValue;return true;}
var result=previousValue!==currentValue;previousValue=currentValue;return result;},function shouldGateWatcher(watchExpression){return isNull(alwaysEvaluateString)||!(isStringNonempty(watchExpression)&&(watchExpression.indexOf(alwaysEvaluateString)>=0));},true);},};},};}]).directive('slyAlwaysEvaluate',function(){return{restrict:'A',link:function(scope,element,attrs){},};}).directive('slyShow',['$animate',function($animate){function toBoolean(value){if(value&&value.length!==0){var v=(""+value);v=isString(v)?v.toLowerCase():v;value=!(v=='f'||v=='0'||v=='false'||v=='no'||v=='n'||v=='[]');}else{value=false;}
return value;}
return{restrict:'A',link:function slyShowLink(scope,element,attr){scope.$watch(attr.slyShow,function ngSlyShowAction(value){$animate[toBoolean(value)?'removeClass':'addClass'](element,'ng-hide');},false,'slyShow');},};}]).directive('slyPreventEvaluationWhenHidden',function(){return{restrict:'A',scope:true,compile:function compile(tElement,tAttrs){return{pre:function preLink(scope,element,attrs){scope.$addWatcherGate(function hiddenChecker(){return!element.hasClass('ng-hide');},function hiddenDecider(watchExpression,listener,equality,directiveName){if(isDefined(directiveName)&&(directiveName=='slyShow'))
return false;return true;});},};},};});defineScalyrAngularModule('slyRepeat',['gatedScope']).directive('slyRepeat',['$animate','$parse',function($animate,$parse){function gateWatchersForScope(elementScope){elementScope.scope.$addWatcherGate(function(){return elementScope.isActiveForRepeat;});}
return{restrict:'A',scope:true,transclude:'element',priority:1000,terminal:true,compile:function(element,attr,linker){return function($scope,$element,$attr){var expression=$attr.slyRepeat;var match=expression.match(/^\s*(.+)\s+in\s+(.*?)$/);if(!match){throw Error("Expected slyRepeat in form of '_item_ in _collection_' but got '"+expression+"'.");}
var iterVar=match[1];var collectionExpr=match[2];match=iterVar.match(/^(?:([\$\w]+))$/);if(!match){throw Error("'item' in 'item in collection' should be identifier but got '"+lhs+"'.");}
var previousElements=[];var previousElementBuffer=[];var deregisterCallback=$scope.$watchCollection(collectionExpr,function(collection){if(!collection)
return;if(!isArray(collection))
throw Error("'collection' did not evaluate to an array.  expression was "+collectionExpr);var originalPreviousElementsLength=previousElements.length;if((previousElements.length<collection.length)&&(previousElementBuffer.length>0)){var limit=previousElements.length+previousElementBuffer.length;if(limit>collection.length)
limit=collection.length;previousElements=previousElements.concat(previousElementBuffer.splice(0,limit-previousElements.length));}
var currentElements=null;var currentElementBuffer=[];var newElements=[];if(collection.length>previousElements.length){for(var i=previousElements.length;i<collection.length;++i){var newElement={scope:$scope.$new(),isActiveForRepeat:true,};gateWatchersForScope(newElement);newElement.scope.$index=i;newElement.scope.$first=(i==0);newElements.push(newElement);}
currentElements=previousElements.concat(newElements);currentElementBuffer=previousElementBuffer;}else if(collection.length<previousElements.length){for(var i=collection.length;i<previousElements.length;++i)
previousElements[i].isActiveForRepeat=false;currentElementBuffer=previousElements.splice(collection.length,previousElements.length-collection.length).concat(previousElementBuffer);currentElements=previousElements;}else{currentElements=previousElements;currentElementBuffer=previousElementBuffer;}
if(currentElements.length>0){var firstIndexToFix=currentElements.length-1;var lastIndexToFix=currentElements.length-1;if(originalPreviousElementsLength<currentElements.length){firstIndexToFix=originalPreviousElementsLength;}
if(firstIndexToFix>0){firstIndexToFix=firstIndexToFix-1;}
for(var i=firstIndexToFix;i<=lastIndexToFix;++i){currentElements[i].scope.$last=(i==(currentElements.length-1));currentElements[i].scope.$middle=((i!=0)&&(i!=(currentElements.length-1)));if(!currentElements[i].isActiveForRepeat){currentElements[i].isActiveForRepeat=true;currentElements[i].element.css('display','');}}}
for(var i=0;i<currentElementBuffer.length;++i){if(currentElementBuffer[i].isActiveForRepeat)
break;currentElementBuffer[i].element.css('display','none');}
for(var i=0;i<currentElements.length;++i){currentElements[i].scope[iterVar]=collection[i];}
var prevElement=$element;if(previousElements.length>0)
prevElement=previousElements[previousElements.length-1].element;for(var i=0;i<newElements.length;++i){linker(newElements[i].scope,function(clone){$animate.enter(clone,null,prevElement);prevElement=clone;newElements[i].element=clone;});}
previousElements=currentElements;previousElementBuffer=currentElementBuffer;});$scope.$on('$destroy',function(){deregisterCallback();});};}};}]);defineScalyrAngularModule('gatedScope',[]).config(['$provide',function($provide){$provide.decorator('$rootScope',['$delegate','$exceptionHandler',function($rootScope,$exceptionHandler){var scopePrototype={};for(var key in $rootScope){if(isFunction($rootScope[key]))
scopePrototype[key]=$rootScope[key];}
var Scope=$rootScope.constructor;var methodsToAdd={};var initWatchVal;methodsToAdd.$new=function(isolate){var result=scopePrototype.$new.call(this,isolate);result.$$gatingFunction=this.$$gatingFunction;result.$$parentGatingFunction=this.$$gatingFunction;result.$$shouldGateFunction=this.$$shouldGateFunction;result.$$gatedWatchers=[];result.$$cleanUpQueue=this.$$cleanUpQueue;return result;};methodsToAdd.$digestGated=function gatedScopeDigest(targetGatingFunction){var watch,value,watchers,length,next,current=this,target=this,last,dirty=false;do{if(watchers=current.$$gatedWatchers){length=watchers.length;while(length--){try{watch=watchers[length];if(watch.gatingFunction!==targetGatingFunction)
continue;if(watch&&!isNull(watch.cleanUp)){watch.cleanUp();watch.cleanUp=null;}
if(watch&&(value=watch.get(current))!==(last=watch.last)&&!(watch.eq?areEqual(value,last):(typeof value=='number'&&typeof last=='number'&&isNaN(value)&&isNaN(last)))){dirty=true;watch.last=watch.eq?copy(value):value;watch.fn(value,((last===initWatchVal)?value:last),current);}}catch(e){$exceptionHandler(e);}}}
if(!(next=((current.$$gatingFunction===targetGatingFunction&&current.$$childHead)||(current!==target&&current.$$nextSibling)))){while(current!==target&&!(next=current.$$nextSibling)){current=current.$parent;}}}while((current=next));targetGatingFunction.hasDigested=true;return dirty;};methodsToAdd.$watch=function gatedWatch(watchExpression,listener,objectEquality,directiveName){if(!isNull(this.$$gatingFunction)&&(isNull(this.$$shouldGateFunction)||this.$$shouldGateFunction(watchExpression,listener,objectEquality,directiveName))){var tmp=this.$$watchers;this.$$watchers=this.$$gatedWatchers;var result=scopePrototype.$watch.call(this,watchExpression,listener,objectEquality);this.$$watchers=tmp;this.$$gatedWatchers[0].gatingFunction=this.$$gatingFunction;this.$$gatedWatchers[0].cleanUp=null;initWatchVal=this.$$gatedWatchers[0].last;var watch=this.$$gatedWatchers[0];if(this.$$gatingFunction.shouldEvalNewWatchers&&this.$$gatingFunction.hasDigested){var self=this;watch.cleanUp=scopePrototype.$watch.call(self,function(){if(!isNull(watch.cleanUp)){self.$$cleanUpQueue.unshift(watch.cleanUp);watch.cleanUp=null;}
var value;var last=initWatchVal;if(watch&&(value=watch.get(self))!==(last=watch.last)&&!(watch.eq?areEqual(value,last):(typeof value=='number'&&typeof last=='number'&&isNaN(value)&&isNaN(last)))){watch.last=watch.eq?copy(value):value;watch.fn(value,((last===initWatchVal)?value:last),self);}
return watch.last;});}
return result;}else{return scopePrototype.$watch.call(this,watchExpression,listener,objectEquality);}};methodsToAdd.$digest=function gatedDigest(){var dirty=false;if(!isNull(this.$$parentGatingFunction)&&this.$$parentGatingFunction()){var ttl=5;do{dirty=this.$digestGated(this.$$parentGatingFunction);ttl--;if(dirty&&!(ttl--)){throw Error(TTL+' $digest() iterations reached for gated watcher. Aborting!\n'+'Watchers fired in the last 5 iterations.');}}while(dirty);}
dirty=scopePrototype.$digest.call(this)||dirty;var cleanUpQueue=this.$$cleanUpQueue;while(cleanUpQueue.length)
try{cleanUpQueue.shift()();}catch(e){$exceptionHandler(e);}
return dirty;}
methodsToAdd.$addWatcherGate=function(gatingFunction,shouldGateFunction,shouldEvalNewWatchers){var changeCount=0;var self=this;var hasNestedGates=!isNull(this.$$gatingFunction);(function(){var promotedWatcher=null;self.$watch(function(){if(gatingFunction()){if(self.$digestGated(gatingFunction))
++changeCount;}else if(hasNestedGates&&isNull(promotedWatcher)){promotedWatcher=scopePrototype.$watch.call(self,function(){if(gatingFunction()){promotedWatcher();promotedWatcher=null;if(self.$digestGated(gatingFunction))
++changeCount;}
return changeCount;});}
return changeCount;});})();if(isUndefined(shouldGateFunction))
shouldGateFunction=null;if(isUndefined(shouldEvalNewWatchers))
shouldEvalNewWatchers=false;this.$$gatingFunction=gatingFunction;this.$$gatingFunction.shouldEvalNewWatchers=shouldEvalNewWatchers;this.$$shouldGateFunction=shouldGateFunction;};angular.extend(Scope.prototype,methodsToAdd);angular.extend($rootScope,methodsToAdd);$rootScope.$$gatingFunction=null;$rootScope.$$parentGatingFunction=null;$rootScope.$$shouldGateFunction=null;$rootScope.$$gatedWatchers=[];$rootScope.$$cleanUpQueue=[];return $rootScope;}]);}]);