(()=>{"use strict";(()=>{let t;const e=document.querySelector(".form");e.addEventListener("submit",(async t=>{t.preventDefault();const c=e.querySelector('input[name="q"]'),l=c.value;if(c.classList.remove("form__field-input--invalid"),null!=l&&""!=l){const t=o(l),e=await n(l,t);e?(i(e),a(e)):c.classList.add("form__field-input--invalid")}else c.classList.add("form__field-input--invalid")}));const o=t=>{const e=/^[a-z0-9-]+\.[a-z0-9-]+(\.[a-z0-9-]+){0,2}$/i;return t.match(e)&&t.match(e).length},n=async(t,e)=>{try{let o="https://geo.ipify.org/api/v1?apiKey=at_4QfFJCyqI6IWXa92XInarOz8zKUaX";t&&(o=`https://geo.ipify.org/api/v1?apiKey=at_4QfFJCyqI6IWXa92XInarOz8zKUaX&${e?"domain":"ip"}=${t}`);const n=await fetch(o),i=await n.json();return{ip:i.ip,location:`${i.location.city}, ${i.location.country}`,timezone:`UTC ${i.location.timezone}`,isp:i.isp,lng:i.location.lng,lat:i.location.lat}}catch(t){return console.log(t),!1}},i=({ip:t,location:e,timezone:o,isp:n})=>{const i=document.querySelector(".data-ip > p"),a=document.querySelector(".data-location > p"),c=document.querySelector(".data-timezone > p"),l=document.querySelector(".data-isp > p");i.textContent=t,a.textContent=e,c.textContent=o,l.textContent=n},a=({lat:e,lng:o})=>{t.setView([e,o],13);const n=L.icon({iconUrl:"./img/icon-location.svg",iconSize:[46,56]});L.marker([e,o],{icon:n}).off("click").addTo(t)};t=L.map("map",{zoomControl:!1,attributionControl:!1}).setView([0,0],2),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(t),(async()=>{const t=await n();t&&(i(t),a(t))})()})()})();