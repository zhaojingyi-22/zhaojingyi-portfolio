(function(){
  "use strict";

  /* ---------- 数据源（与首页作品卡完全一致） ---------- */
  var WORKS = [
    {
      id: "brand-suyuan",
      cat: "品牌设计",
      title: "苏园馥品牌设计",
      year: "2024",
      category: "brand",
      cover: "assets/works/brand-suyuan-02.jpg",
      images: [
        "assets/works/brand-suyuan-02.jpg",
        "assets/works/brand-suyuan-01.jpg",
        "assets/works/brand-suyuan-03.jpg"
      ],
      tags: ["品牌定位", "标志设计", "标准字", "色彩体系", "包装延展"],
      desc: "<p>以苏州园林与东方香氛为灵感，为「苏园馥 Suyuan Fragrance」完成品牌定位、命名、标志、字体、色彩体系与包装延展。从品牌核心关键词到 VI 应用落地，构建一套完整的东方香氛品牌视觉系统。</p>",
      points: [
        "品牌定位与视觉策略推导",
        "标志 / 标准字 / 色彩体系",
        "包装、物料与场景应用延展"
      ]
    },
    {
      id: "ecom-scone",
      cat: "电商设计",
      title: "乳酪司康详情页设计",
      year: "2025",
      category: "ecommerce",
      cover: "assets/works/ecom-scone-01.jpg",
      images: [
        "assets/works/ecom-scone-01.jpg",
        "assets/works/ecom-scone-02.jpg"
      ],
      tags: ["天猫", "详情页", "食品类目"],
      desc: "<p>为烘焙品牌设计天猫/淘宝详情页，以明亮轻快的果绿色调突出「减糖轻脂」的产品卖点。通过场景化食材展示、卖点模块拆解与优惠券区布局，提升页面停留与转化。</p>",
      points: [
        "详情页整体策划与视觉设计",
        "产品卖点模块化呈现",
        "移动端长图适配"
      ]
    },
    {
      id: "ecom-mideer",
      cat: "电商设计",
      title: "弥鹿笔袋详情页设计",
      year: "2025",
      category: "ecommerce",
      cover: "assets/works/ecom-mideer-01.jpg",
      images: [
        "assets/works/ecom-mideer-01.jpg",
        "assets/works/ecom-mideer-02.jpg"
      ],
      tags: ["京东", "详情页", "儿童文具"],
      desc: "<p>针对儿童文具品类，为 mideer 笔袋设计电商详情页。以柔和的糖果色与趣味排版传递「专为小学生设计」的产品心智，功能分区可视化呈现，降低家长决策成本。</p>",
      points: [
        "儿童文具详情页视觉",
        "功能卖点可视化",
        "产品身份卡 / 尺寸图"
      ]
    },
    {
      id: "ecom-cocacola",
      cat: "电商设计",
      title: "可口可乐联名杯详情页设计",
      year: "2024",
      category: "ecommerce",
      cover: "assets/works/ecom-cocacola-01.jpg",
      images: [
        "assets/works/ecom-cocacola-01.jpg",
        "assets/works/ecom-cocacola-02.jpg"
      ],
      tags: ["天猫", "联名款", "详情页"],
      desc: "<p>为 GERM × Coca-Cola 联名星钻吸管杯设计电商详情页。粉绿撞色搭配清透产品场景，强化「一杯三饮」「母婴级 TRITAN 材质」等核心卖点，兼顾颜值表达与功能信任。</p>",
      points: [
        "联名产品详情页设计",
        "核心卖点场景化表达",
        "材质 / 功能可视化"
      ]
    },
    {
      id: "creative-dunhuang",
      cat: "文创设计",
      title: "藻韵敦煌文创设计",
      year: "2025",
      category: "creative",
      cover: "assets/works/creative-dunhuang-01.jpg",
      images: [
        "assets/works/creative-dunhuang-01.jpg",
        "assets/works/creative-dunhuang-02.jpg",
        "assets/works/creative-dunhuang-03.jpg",
        "assets/works/creative-dunhuang-04.jpg"
      ],
      tags: ["毕业设计", "敦煌藻井", "文创延展"],
      desc: "<p>2025 毕业设计作品。以敦煌莫高窟藻井图案为研究对象，提取不同朝代纹样进行再设计与图案化表达，构建基于敦煌藻井的文创图案设计体系，并延展至丝巾、包装、文具等载体。</p>",
      points: [
        "敦煌藻井图案再设计",
        "标准字与纹样系统",
        "丝巾 / 包装 / 文具延展"
      ]
    },
    {
      id: "other-poster",
      cat: "其它设计",
      title: "海报设计合集",
      year: "2023–2024",
      category: "other",
      cover: "assets/works/other-poster-01.jpg",
      images: [
        "assets/works/other-poster-01.jpg"
      ],
      tags: ["海报", "平面设计"],
      desc: "<p>汇集不同主题与风格的平面海报练习与商稿，覆盖节日营销、美食、家居、文化等题材，展现排版、配色与视觉张力的多面性。</p>",
      points: [
        "多风格平面海报",
        "字体排版与视觉实验",
        "节日 / 美食 / 文化题材"
      ]
    },
    {
      id: "other-book",
      cat: "其它设计",
      title: "手绘本封面设计",
      year: "2024",
      category: "other",
      cover: "assets/works/other-book-01.jpg",
      images: [
        "assets/works/other-book-01.jpg"
      ],
      tags: ["绘本", "封面", "插画"],
      desc: "<p>以《龟兔赛跑》为主题的手绘本封面设计，用高饱和撞色与丰富场景叙事构建童话感，兼顾儿童绘本的趣味性与封面货架吸睛度。</p>",
      points: [
        "儿童绘本封面",
        "场景化叙事插画",
        "高饱和撞色表达"
      ]
    },
    {
      id: "other-illust",
      cat: "其它设计",
      title: "插画与个人创作",
      year: "2021–2024",
      category: "other",
      cover: "assets/works/other-illust-01.jpg",
      images: [
        "assets/works/other-illust-01.jpg"
      ],
      tags: ["插画", "个人创作"],
      desc: "<p>个人兴趣驱动的插画与手绘练习合集，涵盖人物肖像、场景插画、实验性构图等。画画是日常审美训练，也是商业项目中创意表现的储备。</p>",
      points: [
        "人物 / 场景插画",
        "实验性构图与配色",
        "审美与手绘能力训练"
      ]
    }
  ];

  /* ---------- URL 参数解析 ---------- */
  function getQueryId(){
    var m = location.search.match(/[?&]id=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  /* ---------- EdgeOne 访问令牌透传 ---------- */
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

  /* ---------- 渲染 ---------- */
  var currentId = getQueryId();
  var work = WORKS.find(function(w){ return w.id === currentId; });
  if(!work){
    document.querySelector(".work-body").innerHTML = '<p style="color:#9a9a9a">未找到作品。<a href="' + eoLink("index.html#works") + '" style="color:#E11D2D">返回作品列表</a></p>';
    return;
  }

  // 设置页面标题
  document.title = work.title + " · 赵靖贻设计作品集";

  // Hero
  document.getElementById("workCat").textContent = "— " + work.cat.toUpperCase();
  document.getElementById("workTitle").textContent = work.title;

  var meta = document.getElementById("workMeta");
  meta.innerHTML = "";
  work.tags.forEach(function(t, i){
    var span = document.createElement("span");
    span.textContent = t;
    meta.appendChild(span);
  });
  var yearSpan = document.createElement("span");
  yearSpan.textContent = work.year;
  meta.appendChild(yearSpan);

  // 描述
  var desc = document.getElementById("workDesc");
  desc.innerHTML = work.desc;
  if(work.points && work.points.length){
    var ul = document.createElement("ul");
    work.points.forEach(function(p){
      var li = document.createElement("li");
      li.textContent = p;
      ul.appendChild(li);
    });
    desc.appendChild(ul);
  }

  // 图集
  var gallery = document.getElementById("workGallery");
  work.images.forEach(function(src, i){
    var img = document.createElement("img");
    img.src = src;
    img.alt = work.title + " — 图 " + (i + 1);
    img.loading = i === 0 ? "eager" : "lazy";
    gallery.appendChild(img);
  });

  // Pager（上一篇 / 下一篇）
  var idx = WORKS.findIndex(function(w){ return w.id === currentId; });
  var prev = WORKS[(idx - 1 + WORKS.length) % WORKS.length];
  var next = WORKS[(idx + 1) % WORKS.length];

  document.getElementById("pagerPrev").href = eoLink("work.html?id=" + encodeURIComponent(prev.id));
  document.getElementById("pagerPrevTitle").textContent = prev.title;
  document.getElementById("pagerNext").href = eoLink("work.html?id=" + encodeURIComponent(next.id));
  document.getElementById("pagerNextTitle").textContent = next.title;

})();