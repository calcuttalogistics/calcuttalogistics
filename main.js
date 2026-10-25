(function(){
'use strict';
var d=document,h=d.querySelector('.site-header'),t=d.querySelector('.nav-toggle'),n=d.getElementById('primary-nav');
if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o);});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');t.setAttribute('aria-expanded','false');t.focus();}});}
if(h){var tick=false;addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){h.classList.toggle('shrink',scrollY>40);tick=false;});}},{passive:true});}
var rv=d.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});rv.forEach(function(el){io.observe(el);});}else{rv.forEach(function(el){el.classList.add('in');});}
var y=d.getElementById('year');if(y)y.textContent=new Date().getFullYear();
/* Preselect service from /contact/?service=<slug> on any page with a #service select */
var sel=d.getElementById('service');
if(sel){var s=new URLSearchParams(location.search).get('service');
if(s){for(var i=0;i<sel.options.length;i++){if(sel.options[i].getAttribute('data-slug')===s){sel.selectedIndex=i;break;}}}}
/* Quote form */
var f=d.getElementById('quote-form');
if(f){var msg=d.getElementById('form-msg'),btn=f.querySelector('button[type=submit]'),lab=btn.querySelector('span');
var FB=' Call 431-277-8330 or email dispatch@calcuttalogistics.com';
var chk=function(el){var w=el.closest('.field'),e=w&&w.querySelector('.err'),m='';
if(el.required&&!el.value.trim())m='This field is required.';
else if(el.type==='email'&&el.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value))m='Enter a valid email address.';
else if(el.name==='phone'&&el.value&&el.value.replace(/\D/g,'').length<10)m='Enter a phone number with at least 10 digits.';
if(e){e.textContent=m;w.classList.toggle('invalid',!!m);el.setAttribute('aria-invalid',m?'true':'false');}return !m;};
f.addEventListener('blur',function(e){if(e.target.matches&&e.target.matches('[required]'))chk(e.target);},true);
f.addEventListener('submit',function(e){
var bad=null;f.querySelectorAll('[required]').forEach(function(el){if(!chk(el)&&!bad)bad=el;});
if(bad){e.preventDefault();bad.focus();return;}
if(!window.fetch||!window.FormData)return;
e.preventDefault();btn.disabled=true;lab.textContent='Sending...';msg.className='form-msg';msg.textContent='';
var o={};new FormData(f).forEach(function(v,k){o[k]=v;});
fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(o)})
.then(function(r){return r.json().then(function(j){return r.ok&&j.success;});})
.then(function(ok){if(!ok)throw 0;f.reset();msg.className='form-msg ok';msg.textContent='Thank you. Your quote request has been received and dispatch will respond shortly.';})
.catch(function(){msg.className='form-msg bad';msg.textContent='Your request could not be sent.'+FB;})
.then(function(){btn.disabled=false;lab.textContent='Request a Freight Quote';msg.setAttribute('tabindex','-1');msg.focus();});
});}
})();
