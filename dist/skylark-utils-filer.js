/**
 * skylark-utils-filer - The filer features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,t){var r=t.define,n=t.require,a="function"==typeof r&&r.amd,i=!a&&"undefined"!=typeof exports;if(!a&&!r){var o={};r=t.define=function(e,t,r){"function"==typeof r?(o[e]={factory:r,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var r=t.split("/"),n=e.split("/");r.pop();for(var a=0;a<n.length;a++)"."!=n[a]&&(".."==n[a]?r.pop():r.push(n[a]));return r.join("/")}(t,e)}),resolved:!1,exports:null},n(e)):o[e]={factory:null,resolved:!0,exports:r}},n=t.require=function(e){if(!o.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var r=o[e];if(!r.resolved){var a=[];r.deps.forEach(function(e){a.push(n(e))}),r.exports=r.factory.apply(t,a)||null,r.resolved=!0}return r.exports}}if(!r)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,t){e("skylark-utils-filer/filer",["skylark-langx/skylark"],function(e){var t=function(){return t};return e.filer=t}),e("skylark-utils-filer/download",["./filer"],function(e){return e.downlad=function(e,t){if(window.navigator.msSaveBlob)types.isString(e)&&(e=dataURItoBlob(e)),window.navigator.msSaveBlob(e,t);else{var r=document.createElement("a");e instanceof Blob&&(e=URL.createObjectURL(e)),r.href=e,r.setAttribute("download",t||"noname"),r.dispatchEvent(new CustomEvent("click"))}}}),e("skylark-utils-filer/webentry",["skylark-langx/Deferred","./filer"],function(e,t){var r=function(){function t(t,n){var a=new e,i=function(e){a.reject(e)};if(n=n||"",t.isFile)t.file(function(e){e.relativePath=n,a.resolve(e)},i);else if(t.isDirectory){var o=t.createReader();o.readEntries(function(e){r(e,n+t.name+"/").then(function(e){a.resolve(e)}).catch(i)},i)}else a.resolve([]);return a.promise}function r(r,n){return e.all(langx.map(r,function(e){return t(e,n)})).then(function(){return concat.apply([],arguments)})}return{one:t,all:r}}();return t.webentry=r}),e("skylark-utils-filer/dropzone",["skylark-langx/arrays","skylark-langx/Deferred","skylark-utils-dom/styler","skylark-utils-dom/eventer","./filer","./webentry"],function(e,t,r,n,a,i){return a.dropzone=function(t,a){var o=(a=a||{}).hoverClass||"dropzone",l=a.dropped,s=0;return n.on(t,"dragenter",function(e){e.dataTransfer&&e.dataTransfer.types.indexOf("Files")>-1&&(n.stop(e),s++,r.addClass(t,o))}),n.on(t,"dragover",function(e){e.dataTransfer&&e.dataTransfer.types.indexOf("Files")>-1&&n.stop(e)}),n.on(t,"dragleave",function(e){e.dataTransfer&&e.dataTransfer.types.indexOf("Files")>-1&&0==--s&&r.removeClass(t,o)}),n.on(t,"drop",function(a){if(a.dataTransfer&&a.dataTransfer.types.indexOf("Files")>-1&&(r.removeClass(t,o),n.stop(a),l)){var s=a.dataTransfer.items;s&&s.length&&(s[0].webkitGetAsEntry||s[0].getAsEntry)?i.all(e.map(s,function(e){return e.webkitGetAsEntry?e.webkitGetAsEntry():e.getAsEntry()})).then(l):l(a.dataTransfer.files)}}),this}}),e("skylark-utils-filer/pastezone",["skylark-langx/objects","skylark-utils-dom/eventer","./filer"],function(e,t,r){return r.pastezone=function(r,n){(n=n||{}).hoverClass;var a=n.pasted;return t.on(r,"paste",function(t){var r=t.originalEvent&&t.originalEvent.clipboardData&&t.originalEvent.clipboardData.items,n=[];r&&r.length&&e.each(r,function(e,t){var r=t.getAsFile&&t.getAsFile();r&&n.push(r)}),a&&n.length&&a(n)}),this}}),e("skylark-utils-filer/select",["./filer"],function(e){var t,r=1/0;return e.select=function(e){var n=(e=e||{}).directory||!1,a=e.multiple||!1,i=e.picked;if(!t){var o=t=document.createElement("input");function l(e){for(var t=e.length;t--;)e[t].size>r&&e.splice(t,1);i(e)}o.type="file",o.style.position="fixed",o.style.left=0,o.style.top=0,o.style.opacity=.001,document.body.appendChild(o),o.onchange=function(e){var t=e.target.webkitEntries||e.target.entries;t&&t.length?webentry.all(t).then(function(e){l(e)}):l(Array.prototype.slice.call(e.target.files)),o.value=""}}t.multiple=a,t.webkitdirectory=n,t.click()}}),e("skylark-utils-filer/picker",["skylark-langx/objects","skylark-utils-dom/eventer","./filer","./select"],function(e,t,r,n){return r.picker=function(e,r){return t.on(e,"click",function(e){e.preventDefault(),n(r)}),this}}),e("skylark-utils-filer/read",["skylark-langx/Deferred","./filer"],function(e,t){return t.read=t.readFile=function(t,r){r=r||{};var n=new e,a=new FileReader;a.onload=function(e){n.resolve(e.target.result)},a.onerror=function(e){var t=e.target.error.code;2===t?alert("please don't open this page using protocol fill:///"):alert("error code: "+t)},r.asArrayBuffer?a.readAsArrayBuffer(t):r.asDataUrl?a.readAsDataURL(t):r.asText?a.readAsText(t):a.readAsArrayBuffer(t);return n.promise}}),e("skylark-utils-filer/upload",["skylark-langx/types","skylark-langx/objects","skylark-langx/arrays","skylark-langx/Deferred","skylark-langx/Xhr","./filer"],function(e,t,r,n,a,i){return i.upload=function(r){var i=t.mixin({contentRange:null,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,limitMultiFileUploadSize:void 0,limitMultiFileUploadSizeOverhead:512,sequentialUploads:!1,limitConcurrentUploads:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,autoUpload:!0,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(e,r){return e=this.messages[e]||e.toString(),r&&t.each(r,function(t,r){e=e.replace("{"+t+"}",r)}),e},formData:function(e){return e.serializeArray()},add:function(e,t){if(e.isDefaultPrevented())return!1;(t.autoUpload||!1!==t.autoUpload&&$(this).fileupload("option","autoUpload"))&&t.process().done(function(){t.submit()})},processData:!1,contentType:!1,cache:!1},r),o=function(){var e=Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice;return e.apply(this,arguments)},l=function(e){return a.request(e.url,e)};function s(r){var n,a=r.files[0],i=r.multipart,o="array"===e.type(r.paramName)?r.paramName[0]:r.paramName;r.headers=t.mixin({},r.headers),r.contentRange&&(r.headers["Content-Range"]=r.contentRange),i?(n=new FormData,r.blob?n.append(o,r.blob,a.name):t.each(r.files,function(t,a){n.append("array"===e.type(r.paramName)&&r.paramName[t]||o,a,a.uploadName||a.name)}),r.data=n):(r.headers["Content-Disposition"]='attachment; filename="'+encodeURI(a.name)+'"',r.contentType=a.type||"application/octet-stream",r.data=r.blob||a),r.blob=null}function u(e,r){e.uploadedBytes=e.uploadedBytes||0;var a,i,u=e.files[0],d=u.size,f=e.uploadedBytes,c=e.maxChunkSize||d,p=o,y=new n,k=y.promise;return!(!p||!(f||c<d)||e.data)&&(!!r||(f>=d?(u.error=e.i18n("uploadedBytes"),this._getXHRPromise(!1,e.context,[null,"error",u.error])):(i=function(){var r=t.mixin({},e),n=r._progress.loaded;r.blob=p.call(u,f,f+c,u.type),r.chunkSize=r.blob.size,r.contentRange="bytes "+f+"-"+(f+r.chunkSize-1)+"/"+d,s(r),a=l(r).done(function(t,a,o){f=function(e){var t=e.getResponseHeader("Range"),r=t&&t.split("-"),n=r&&r.length>1&&parseInt(r[1],10);return n&&n+1}(o)||f+r.chunkSize,n+r.chunkSize-r._progress.loaded&&y.progress({lengthComputable:!0,loaded:f-r.uploadedBytes,total:f-r.uploadedBytes}),e.uploadedBytes=r.uploadedBytes=f,r.result=t,r.textStatus=a,r.jqXHR=o,f<d?i():y.resolveWith(r.context,[t,a,o])}).fail(function(e,t,n){r.jqXHR=e,r.textStatus=t,r.errorThrown=n,y.rejectWith(r.context,[e,t,n])})},k.abort=function(){return a.abort()},i(),k)))}d=i,d.type=d.type||"POST",u(d,!0)||d.data||s(d),i._bitrateTimer=new function(){this.timestamp=Date.now?Date.now():(new Date).getTime(),this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,r){var n=e-this.timestamp;return(!this.bitrate||!r||n>r)&&(this.bitrate=(t-this.loaded)*(1e3/n)*8,this.loaded=t,this.timestamp=e),this.bitrate}};var d;var f=u(i)||l(i);return f.options=i,f}}),e("skylark-utils-filer/main",["./filer","./download","./dropzone","./pastezone","./picker","./read","./select","./upload","./webentry"],function(e){return e}),e("skylark-utils-filer",["skylark-utils-filer/main"],function(e){return e})}(r),!a){var l=n("skylark-langx/skylark");i?module.exports=l:t.skylarkjs=l}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-utils-filer.js.map
