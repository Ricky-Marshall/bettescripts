// ==UserScript==
// @name        Google Translation Bar
// @namespace   googletranslationbar
// @description On-page Google Translate, work on all web browsers from desktop to mobile!
// @include     http*
// @include     https*
// @include     https://javengsub.com
// @exclude     https://javengsub.com/ajg/
// @exclude     /^.*translate.google.com.*/
// @exclude     /^.*translate.googleapis.com.*/
// @version     1.1
// @grant       none
// @noframes
// ==/UserScript==
if (window.top != window.self)  //don't run on frames or iframes
    return;
  var d=document;
  
  function gtranslateproxy() {
  b=d.body;
  var o=d.createElement('scri'+'pt');
  o.setAttribute('src','//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  o.setAttribute('type','text/javascript');
  b.appendChild(o);
  var v=b.insertBefore(d.createElement('div'),b.firstChild);
  v.id='google_translate_element';
  v.style.display='none';
  var p=d.createElement('scri'+'pt');
  p.text='function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:""},"google_translate_element");}';
  p.setAttribute('type','text/javascript');
  b.appendChild(p);
  
  }
  
  gtranslateproxy();

"use strict";

const firstLangExp = /英语|English/;
const firstLangCode = "en";
const secondLangCode = "zh-CN";

const inputBox = document.querySelector("textarea");
const langSelector = document.querySelector('[role="tablist"]').parentNode
  .parentNode.previousElementSibling;
let prevIsFirstLang = null;
const switchLang = () => {
  if (inputBox.value == "") return;
  const isFirstLang = firstLangExp.test(langSelector.textContent);
  if (isFirstLang === prevIsFirstLang) return;
  prevIsFirstLang = isFirstLang;
  let targetLang = isFirstLang ? secondLangCode : firstLangCode;
  const targetButton = document.querySelector(
    `[data-popup-corner]~* [role="tab"][data-language-code="${targetLang}"]`
  );
  if (targetButton.getAttribute("aria-selected") === "true") return;
  targetButton.click();
};
// switchLang();
new MutationObserver(switchLang).observe(langSelector, {
  characterData: true,
  subtree: true,
});
const autoLangButton = document.querySelector("[data-language-code=auto]");
if (autoLangButton.getAttribute("aria-selected") !== "true") {
  autoLangButton.click();
}
