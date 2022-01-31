// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pupilpath.skedula.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    const origOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            if (this.responseURL === "https://pupilpath.skedula.com/Grades/Performance/chartData/overall.aspx") {
                 let text = this.response;
                 let interval = setInterval(function() {
                     try {
                         let ele = document.querySelector(".highcharts-data-labels").children[4];
                         ele.innerHTML = ele.innerHTML.replace(/\d*-\d*/, text.match(/<pointer value='(.*?)'/)[1]);
                         clearInterval(interval);
                     } catch(e) {}
                 }, 50);
            }
        });
        origOpen.apply(this, arguments);
    };
})();
