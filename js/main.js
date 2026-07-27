(function(){
  "use strict";

  /* ---------- NAV ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScroll(){
    if(window.scrollY > 40){ nav.classList.add("scrolled"); }
    else{ nav.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  navToggle.addEventListener("click", function(){
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  Array.prototype.forEach.call(navLinks.querySelectorAll("a"), function(l){
    l.addEventListener("click", function(){
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ---------- REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var el = e.target;
          var delay = el.dataset.delay || 0;
          setTimeout(function(){ el.classList.add("visible"); }, delay);
          io.unobserve(el);
        }
      });
    }, {threshold:0.12, rootMargin:"0px 0px -8% 0px"});
    revealEls.forEach(function(el, i){
      io.observe(el);
    });
  } else {
    revealEls.forEach(function(el){ el.classList.add("visible"); });
  }

  /* ---------- STATS COUNTER ---------- */
  var stats = document.querySelectorAll(".stat-num");
  function animateCount(el){
    var target = parseFloat(el.dataset.target);
    var prefix = el.dataset.prefix || "";
    var suffix = el.dataset.suffix || "";
    var isFloat = target % 1 !== 0;
    var dur = 1600, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = target * ease;
      var shown = isFloat ? val.toFixed(1) : Math.round(val);
      el.textContent = prefix + shown + suffix;
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (isFloat ? target.toFixed(1) : target) + suffix;
    }
    requestAnimationFrame(step);
  }
  if("IntersectionObserver" in window){
    var sio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ animateCount(e.target); sio.unobserve(e.target); }
      });
    }, {threshold:0.5});
    stats.forEach(function(s){ sio.observe(s); });
  } else {
    stats.forEach(animateCount);
  }

  /* ---------- FILTERS ---------- */
  var filterBtns = document.querySelectorAll(".filter");
  var works = Array.prototype.slice.call(document.querySelectorAll(".work"));

  filterBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      filterBtns.forEach(function(b){ b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.dataset.filter;
      works.forEach(function(w){
        var show = (f === "all" || w.dataset.category === f);
        w.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- WORK → DETAIL PAGE NAV ---------- */
  // EdgeOne 访问令牌透传：跳转详情页时自动带上 eo_token / eo_time
  function eoLink(url){
    try{
      var p = new URLSearchParams(location.search);
      var token = p.get("eo_token");
      var time = p.get("eo_time");
      if(token){
        var sep = url.indexOf("?") === -1 ? "?" : "&";
        url += sep + "eo_token=" + encodeURIComponent(token);
        if(time) url += "&eo_time=" + encodeURIComponent(time);
      }
    }catch(e){}
    return url;
  }
  // 作品卡点击直接跳转到独立详情页 work.html?id=xxx
  works.forEach(function(w){
    w.addEventListener("click", function(){
      var id = w.dataset.id;
      if(id){ window.location.href = eoLink("work.html?id=" + encodeURIComponent(id)); }
    });
  });

  /* ---------- HERO 头像 3D 跟随鼠标 ---------- */
  var portraitFrame = document.getElementById("portraitFrame");
  var heroSec = document.querySelector(".hero");
  if(portraitFrame && heroSec && window.matchMedia("(pointer:fine)").matches){
    var ticking = false;
    heroSec.addEventListener("mousemove", function(e){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var r = portraitFrame.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var dx = (e.clientX - cx) / r.width;
        var dy = (e.clientY - cy) / r.height;
        var ry = Math.max(-1, Math.min(1, dx)) * 14;
        var rx = Math.max(-1, Math.min(1, dy)) * -14;
        portraitFrame.style.transform = "perspective(800px) rotateY(" + ry + "deg) rotateX(" + rx + "deg)";
        ticking = false;
      });
    });
    heroSec.addEventListener("mouseleave", function(){
      portraitFrame.style.transform = "";
    });
  }

})();