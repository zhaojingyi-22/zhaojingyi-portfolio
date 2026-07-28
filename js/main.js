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

  /* ---------- READING PROGRESS BAR ---------- */
  var progressEl = document.getElementById("readingProgress");
  if(progressEl){
    var progTicking = false;
    function updateProgress(){
      var sh = document.documentElement.scrollHeight - window.innerHeight;
      var pct = sh > 0 ? (window.scrollY / sh) * 100 : 0;
      progressEl.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }
    window.addEventListener("scroll", function(){
      if(progTicking) return;
      progTicking = true;
      requestAnimationFrame(function(){ updateProgress(); progTicking = false; });
    }, {passive:true});
    window.addEventListener("resize", updateProgress, {passive:true});
    updateProgress();
  }

  /* ---------- BACK TO TOP ---------- */
  var backBtn = document.getElementById("backToTop");
  if(backBtn){
    var btTicking = false;
    window.addEventListener("scroll", function(){
      if(btTicking) return;
      btTicking = true;
      requestAnimationFrame(function(){
        if(window.scrollY > window.innerHeight * 0.8){
          backBtn.classList.add("show");
        } else {
          backBtn.classList.remove("show");
        }
        btTicking = false;
      });
    }, {passive:true});
    backBtn.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

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

  /* ---------- STAT PROGRESS RINGS (装饰性进度环) ---------- */
  var statEls = document.querySelectorAll(".stat");
  var ringPercents = [88, 72, 92, 78]; /* 依次对应 CTR / 转化率 / GMV / 大促 */
  var SVG_NS = "http://www.w3.org/2000/svg";
  statEls.forEach(function(stat, i){
    var pct = ringPercents[i] || 70;
    var radius = 18;
    var circumference = 2 * Math.PI * radius;
    var dashOffset = circumference * (1 - pct / 100);

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "stat-ring");
    svg.setAttribute("viewBox", "0 0 42 42");

    var bg = document.createElementNS(SVG_NS, "circle");
    bg.setAttribute("class", "ring-bg");
    bg.setAttribute("cx", "21"); bg.setAttribute("cy", "21"); bg.setAttribute("r", radius);

    var fg = document.createElementNS(SVG_NS, "circle");
    fg.setAttribute("class", "ring-fg");
    fg.setAttribute("cx", "21"); fg.setAttribute("cy", "21"); fg.setAttribute("r", radius);
    fg.setAttribute("stroke-dasharray", circumference);
    fg.setAttribute("stroke-dashoffset", circumference);

    svg.appendChild(bg);
    svg.appendChild(fg);
    stat.appendChild(svg);

    /* 滚动到视口时，等数字滚动完再画环 */
    if("IntersectionObserver" in window){
      var rio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            setTimeout(function(){ fg.style.strokeDashoffset = dashOffset; }, 700);
            rio.unobserve(e.target);
          }
        });
      }, {threshold:0.5});
      rio.observe(stat);
    } else {
      fg.style.strokeDashoffset = dashOffset;
    }
  });

  /* ---------- FILTERS (with fade transition) ---------- */
  var filterBtns = document.querySelectorAll(".filter");
  var works = Array.prototype.slice.call(document.querySelectorAll(".work"));
  var filterTimer = null;

  filterBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      filterBtns.forEach(function(b){ b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.dataset.filter;

      if(filterTimer){ clearTimeout(filterTimer); filterTimer = null; }

      works.forEach(function(w){
        var shouldShow = (f === "all" || w.dataset.category === f);
        var isCurrentlyHidden = w.classList.contains("is-hidden");

        if(shouldShow){
          if(isCurrentlyHidden){
            /* 从隐藏恢复：先显示但透明，双 rAF 后淡入 */
            w.classList.remove("is-hidden");
            w.classList.add("filtering-out");
            requestAnimationFrame(function(){
              requestAnimationFrame(function(){
                w.classList.remove("filtering-out");
              });
            });
          }
          /* 已经在显示的卡片不动 */
        } else {
          /* 不该显示：淡出 */
          if(!isCurrentlyHidden){
            w.classList.add("filtering-out");
          }
        }
      });

      /* 360ms 后真正隐藏淡出的卡片 */
      filterTimer = setTimeout(function(){
        works.forEach(function(w){
          if(w.classList.contains("filtering-out") && !w.classList.contains("is-hidden")){
            var stillHide = !(f === "all" || w.dataset.category === f);
            if(stillHide){ w.classList.add("is-hidden"); }
          }
        });
        filterTimer = null;
      }, 360);
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

  /* ---------- WORK CARDS 3D TILT + MAGNETIC HOVER ---------- */
  if(window.matchMedia("(pointer:fine)").matches){
    works.forEach(function(card){
      var title = card.querySelector(".work-title");
      var view = card.querySelector(".work-view");
      var index = card.querySelector(".work-index");
      var isFeatured = card === works[0];

      card.addEventListener("mousemove", function(e){
        var r = card.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - .5;
        var dy = (e.clientY - r.top) / r.height - .5;
        var ry = dx * 12;
        var rx = -dy * 12;
        var mx = dx * 10;
        var my = dy * 10;

        card.style.transform = "perspective(1000px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-10px)";

        if(view){
          view.style.transform = "scale(1) rotate(0) translate(" + (dx * 6) + "px, " + (dy * 6) + "px)";
          view.style.opacity = "1";
        }
        if(index){
          index.style.transform = "scale(1.12) translate(" + (-dx * 4) + "px, " + (-dy * 4) + "px)";
        }
        if(title){
          title.style.transform = "translateX(" + (dx * 8 + 4) + "px)";
        }
      });

      card.addEventListener("mouseleave", function(){
        card.style.transform = "";
        if(view){ view.style.transform = ""; view.style.opacity = ""; }
        if(index){ index.style.transform = ""; }
        if(title){ title.style.transform = ""; }
      });
    });
  }

  /* ---------- GLOBAL DECOR: particles + cursor glow ---------- */
  (function(){
    var gp = document.getElementById("gParticles");
    if(gp){
      var n = 18;
      for(var i=0;i<n;i++){
        var p = document.createElement("i");
        p.className = "particle";
        p.style.left = Math.random()*100 + "%";
        p.style.top = Math.random()*100 + "%";
        p.style.animationDelay = (Math.random()*8) + "s";
        p.style.animationDuration = (6 + Math.random()*6) + "s";
        p.style.opacity = (.12 + Math.random()*.3);
        gp.appendChild(p);
      }
    }
    var cg = document.getElementById("cursorGlow");
    if(cg && window.matchMedia("(pointer:fine)").matches){
      var gTicking = false;
      window.addEventListener("mousemove", function(e){
        cg.classList.add("on");
        if(gTicking) return;
        gTicking = true;
        requestAnimationFrame(function(){
          cg.style.left = e.clientX + "px";
          cg.style.top = e.clientY + "px";
          gTicking = false;
        });
      });
      document.addEventListener("mouseleave", function(){ cg.classList.remove("on"); });
    }

    /* ---------- CANVAS CURSOR TRAIL (gradient lines following mouse) ---------- */
    var trailCanvas = document.getElementById("cursorTrail");
    if(trailCanvas && window.matchMedia("(pointer:fine)").matches){
      var tctx = trailCanvas.getContext("2d");
      var trail = [];
      var MAX_PTS = 18;
      var LIFE = 350; /* ms — short & snappy */

      function tResize(){
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
      }
      tResize();
      window.addEventListener("resize", tResize);

      var lastSample = 0;
      window.addEventListener("mousemove", function(e){
        var now = performance.now();
        if(now - lastSample < 8) return;
        lastSample = now;
        trail.push({x:e.clientX, y:e.clientY, t:now});
        if(trail.length > MAX_PTS) trail.shift();
      });
      document.addEventListener("mouseleave", function(){ trail = []; });

      function tDraw(){
        tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        var now = performance.now();
        while(trail.length > 0 && now - trail[0].t > LIFE) trail.shift();

        if(trail.length > 2){
          var oldest = trail[0], newest = trail[trail.length - 1];

          /* smooth quadratic path in one stroke */
          tctx.beginPath();
          tctx.moveTo((trail[0].x+trail[1].x)/2, (trail[0].y+trail[1].y)/2);
          for(var i = 1; i < trail.length - 1; i++){
            var p = trail[i];
            var mx = (p.x + trail[i+1].x) / 2;
            var my = (p.y + trail[i+1].y) / 2;
            tctx.quadraticCurveTo(p.x, p.y, mx, my);
          }

          /* single gradient: transparent → light red at head */
          var grad = tctx.createLinearGradient(oldest.x, oldest.y, newest.x, newest.y);
          grad.addColorStop(0,   "rgba(225,29,45,0)");
          grad.addColorStop(.5,  "rgba(225,29,45,0.15)");
          grad.addColorStop(1,  "rgba(255,59,70,0.5)");

          tctx.strokeStyle = grad;
          tctx.lineWidth = 2;
          tctx.lineCap = "round";
          tctx.lineJoin = "round";
          tctx.stroke();
        }
        requestAnimationFrame(tDraw);
      }
      tDraw();
    }
  })();

  /* ---------- WORKS 区鼠标跟随光晕 + 粒子 ---------- */
  var worksSec = document.getElementById("works");
  if(worksSec){
    /* spotlight */
    var spot = document.createElement("span");
    spot.className = "works-spotlight";
    worksSec.appendChild(spot);
    var wTicking = false;
    var wOver = false;
    worksSec.addEventListener("mouseenter", function(){ wOver = true; spot.classList.add("on"); });
    worksSec.addEventListener("mouseleave", function(){ wOver = false; spot.classList.remove("on"); });
    worksSec.addEventListener("mousemove", function(e){
      if(wTicking) return;
      wTicking = true;
      requestAnimationFrame(function(){
        var r = worksSec.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        spot.style.left = x + "px";
        spot.style.top = y + "px";
        wTicking = false;
      });
    });

    /* floating particles inside works-deco */
    var gp = document.getElementById("gridParticles");
    if(gp){
      var pc = 14;
      for(var pi=0; pi<pc; pi++){
        var p = document.createElement("i");
        p.className = "particle";
        p.style.left = Math.random()*100 + "%";
        p.style.top = Math.random()*100 + "%";
        p.style.animationDelay = (Math.random()*6) + "s";
        p.style.animationDuration = (5 + Math.random()*5) + "s";
        p.style.opacity = (.15 + Math.random()*.3);
        gp.appendChild(p);
      }
    }
  }

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