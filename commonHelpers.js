import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as h,i as c}from"./assets/vendor-77e16229.js";const n=document.querySelector("#datetime-picker"),s=document.querySelector("#start-button");let r=null;const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=t[0];e<new Date?(c.warning({title:"Invalid Date",message:"Please choose a date in the future",position:"topCenter",timeout:5e3}),document.querySelector("#start-button").disabled=!0):(document.querySelector("#start-button").disabled=!1,r=e)}};h(n,y);const p={intervalId:null,start(){s.disabled=!0,n.disabled=!0,this.intervalId=setInterval(()=>{const t=r.getTime()-Date.now();if(t<=0){this.stop();return}const{days:e,hours:a,minutes:u,seconds:i}=v(t);document.querySelector(".js-timer__days .value").textContent=o(e),document.querySelector(".js-timer__hours .value").textContent=o(a),document.querySelector(".js-timer__minutes .value").textContent=o(u),document.querySelector(".js-timer__seconds .value").textContent=o(i)},1e3)},stop(){clearInterval(this.intervalId),s.disabled=!1,n.disabled=!1,c.success({title:"Done",message:"Countdown completed!",position:"topCenter",timeout:5e3})}};s.addEventListener("click",function(){r&&p.start()});function v(t){const d=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:d,hours:l,minutes:m,seconds:f}}function o(t){return String(t).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
