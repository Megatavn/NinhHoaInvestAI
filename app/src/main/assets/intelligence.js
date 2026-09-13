/* Ninh Hoa Invest AI - Listing + Van Phong Intelligence
 * Client-only, offline-first data layer. Sources are deliberately allowlisted.
 * This file is loaded after the legacy app.html overrides so the new screens
 * stay isolated from the existing news renderer.
 */
(function(){
  'use strict';

  var INTEL_VERSION='1.0.0';
  var REFRESH_MINUTES=30;
  var MAX_RSS_ITEMS=40;
  var MAX_LISTING_REQUESTS=7;
  var FETCH_TIMEOUT_MS=12000;
  var SAFE_HOSTS=[
    'news.google.com','bqlkktkcn.khanhhoa.gov.vn','vanphong.khanhhoa.gov.vn',
    'khanhhoa.gov.vn','www.khanhhoa.gov.vn','baochinhphu.vn',
    'taynhatrang.khanhhoa.gov.vn','congbaokhanhhoa.gov.vn',
    'vanban.chinhphu.vn','vbpl.vn'
  ];
  var LISTING_SITE_HOSTS=['batdongsan.com.vn','nhatot.com','bds68.com.vn','meeyland.com'];
  var LISTING_QUERIES=[
    {label:'Dốc Lết',query:'"Dốc Lết" mua bán đất'},
    {label:'Ninh Hải',query:'"Ninh Hải" Ninh Hòa mua bán đất'},
    {label:'Ninh Thủy',query:'"Ninh Thủy" Ninh Hòa mua bán đất'},
    {label:'Ninh Xuân',query:'"Ninh Xuân" Ninh Hòa mua bán đất'},
    {label:'Ninh Xuân 1',query:'"Ninh Xuân 1" khu công nghiệp đất'},
    {label:'Ninh Xuân 2',query:'"Ninh Xuân 2" khu công nghiệp đất'},
    {label:'KCN Ninh Xuân',query:'"KCN Ninh Xuân" đất nền'}
  ];
  var LISTING_SOURCES=[
    {id:'batdongsan',name:'Batdongsan.com.vn',url:'https://batdongsan.com.vn/ban-dat-xa-ninh-xuan',mode:'link-out only',status:'link-out',reason:'Không tự crawl: chưa có feed/API được cấp phép trong app.'},
    {id:'nhatot',name:'Nhà Tốt / Chợ Tốt',url:'https://www.nhatot.com/mua-ban-dat-xa-ninh-xuan-thi-xa-ninh-hoa-khanh-hoa?land_type=1',mode:'link-out only',status:'blocked',reason:'Robots/điều khoản hạn chế tự động thu thập; chỉ mở trang gốc.'},
    {id:'bds68',name:'BĐS68',url:'https://bds68.com.vn/ban-dat/khanh-hoa/ninh-hoa/xa-ninh-xuan',mode:'link-out only',status:'link-out',reason:'Không tự crawl: chưa có feed/API được cấp phép trong app.'},
    {id:'meeyland',name:'Meeyland',url:'https://meeyland.com/ban-dat-dong-ninh-hoa-khanh-hoa-p1132/307526165',mode:'link-out only',status:'link-out',reason:'Link-out tin môi giới; chưa thẩm định và không tự lấy nội dung.'}
  ];
  var OFFICIAL_SOURCES=[
    {id:'kkt-overview',name:'Tổng quan KKT Vân Phong',url:'https://bqlkktkcn.khanhhoa.gov.vn/gioi-thieu-chung-khu-kinh-te-van-phong.html',match:['vân phong','van phong','phân khu']},
    {id:'doclet-zone',name:'Phân khu Ninh Hải – Dốc Lết',url:'https://vanphong.khanhhoa.gov.vn/quy-hoach-phan-khu/khu-%C4%91%C3%B4-th%E1%BB%8B-du-l%E1%BB%8Bch-ninh-h%E1%BA%A3i-d%E1%BB%91c-l%E1%BA%BFt',match:['dốc lết','ninh hải']},
    {id:'ninhxuan-update',name:'Công bố 3 KCN trọng điểm',url:'https://bqlkktkcn.khanhhoa.gov.vn/article/tin-tuc/khanh-hoa-cong-bo-va-trao-quyet-dinh-chap-thuan-chu-truong-dau-tu-3-du-an-khu-cong-nghiep-trong-diem.html',match:['ninh xuân','ninh diêm']},
    {id:'ninhxuan-progress',name:'Kiểm tra thực địa và GPMB KCN',url:'https://www.khanhhoa.gov.vn/vi/du-an-dau-tu-mua-sam-cong/pho-chu-tich-ubnd-tinh-trinh-minh-hoang-kiem-tra-thuc-dia-cong-tac-giai-phong-mat-bang-cac-khu-cong-nghiep',match:['ninh xuân','giải phóng mặt bằng']},
    {id:'ninhtho-update',name:'Điều chỉnh KCN Ninh Thọ',url:'https://bqlkktkcn.khanhhoa.gov.vn/article/tin-van/phe-duyet-dieu-chinh-cuc-bo-quy-hoach-chung-khu-kinh-te-van-phong-tinh-khanh-hoa-den-nam-2040-tam-nhin-den-nam-2050-khu-cong-nghiep-ninh-tho.html',match:['ninh thọ','660/qđ-ubnd']},
    {id:'vanphong-index',name:'Chỉ mục quy hoạch phân khu KKT',url:'https://vanphong.khanhhoa.gov.vn/quy-hoach-phan-khu',match:['19 phân khu','phân khu']}
  ];
  var intel={
    listings:loadListings(),
    listingMeta:loadSafe('intel_listing_meta',{lastRefreshAt:null,status:'Chưa cập nhật',sources:[]}),
    van:loadSafe('intel_vanphong',null),
    filter:{area:'Tất cả',source:'Tất cả',fresh:'all'},
    running:false
  };
  var pending={};

  function loadSafe(key,fallback){try{return JSON.parse(localStorage.getItem('v22_'+key))??fallback}catch(e){return fallback}}
  function saveSafe(key,value){try{localStorage.setItem('v22_'+key,JSON.stringify(value))}catch(e){console.warn('Intel cache',e)}}
  function text(v){return String(v==null?'':v)}
  function escIntel(v){return typeof esc==='function'?esc(v):text(v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]})}
  function fold(v){return text(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d')}
  function stripHtml(v){var raw=text(v).replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ');var doc=new DOMParser().parseFromString(raw,'text/html');return text(doc.body&&doc.body.textContent||'').replace(/\s+/g,' ').trim()}
  function redactPII(v){return text(v).replace(/(?:\+?84|0)(?:[ .-]?\d){8,10}/g,'[đã ẩn số điện thoại]').replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g,'[đã ẩn email]')}
  function parseDate(v){var d=v?new Date(v):new Date();return isNaN(d.getTime())?null:d.toISOString()}
  function dateLabel(v){if(!v)return 'Chưa có dữ liệu';var d=new Date(v);return isNaN(d.getTime())?'Chưa có dữ liệu':d.toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'})}
  function shortDate(v){if(!v)return 'Chưa có dữ liệu';var d=new Date(v);return isNaN(d.getTime())?'Chưa có dữ liệu':d.toLocaleDateString('vi-VN')}
  function hostAllowed(url){try{var u=new URL(url);if(u.protocol!=='https:')return false;var h=u.hostname.toLowerCase();return SAFE_HOSTS.some(function(x){return h===x||h.endsWith('.'+x)})}catch(e){return false}}
  function externalUrlSafe(raw){
    try{
      var value=text(raw).trim();
      if(!value||/[\u0000-\u001f\u007f]/.test(value))return '';
      var u=new URL(value),h=u.hostname.toLowerCase().replace(/\.$/,'');
      if(u.protocol!=='https:'||u.username||u.password||!h||u.port&&u.port!=='443')return '';
      if(h==='localhost'||h.endsWith('.local')||h.indexOf('..')>-1||/^\[/.test(h)||/^(?:\d{1,3}\.){3}\d{1,3}$/.test(h))return '';
      return u.href;
    }catch(e){return ''}
  }
  function openUrlSafe(raw){
    var url=externalUrlSafe(raw);
    if(!url){if(typeof toast==='function')toast('Liên kết không hợp lệ hoặc bị từ chối');return false}
    try{
      if(window.Android&&Android.openExternal){Android.openExternal(url)}
      else{location.href=url}
      return true;
    }catch(e){if(typeof toast==='function')toast('Không mở được liên kết');return false}
  }
  window.openUrlSafe=openUrlSafe;
  function loadListings(){
    var raw=loadSafe('intel_listings',[]);
    if(!Array.isArray(raw))return [];
    return raw.filter(function(x){return x&&typeof x==='object'&&typeof x.title==='string'&&typeof x.url==='string'&&!!externalUrlSafe(x.url)}).slice(0,160);
  }
  function bindSavedListingEvents(){
    if(window.__intelSavedEventsBound)return;
    window.__intelSavedEventsBound=true;
    document.addEventListener('click',function(e){
      var node=e.target;
      while(node&&node!==document&&(!node.getAttribute||!node.getAttribute('data-intel-saved-action')))node=node.parentElement;
      if(!node||node===document)return;
      var index=Number(node.getAttribute('data-intel-saved-index')),item=Array.isArray(state.saved)?state.saved[index]:null;
      if(!item||!isFinite(index)||index<0||Math.floor(index)!==index)return;
      if(node.getAttribute('data-intel-saved-action')==='open')openUrlSafe(item.url);
      else if(node.getAttribute('data-intel-saved-action')==='brief'){
        if(item.kind==='listing')listingDetail(item);
        else if(typeof window.briefNews==='function')window.briefNews(item);
      }
    });
  }

  window.__intelFetchDone=window.__intelFetchDone||function(id,payload){var p=pending[id];if(!p)return;delete pending[id];if(text(payload).indexOf('__ERROR__')===0)p.reject(new Error(text(payload).replace(/^__ERROR__/,'').trim()||'Nguồn không khả dụng'));else p.resolve(payload)};
  function fetchSafe(url){
    return new Promise(function(resolve,reject){
      if(!hostAllowed(url)){reject(new Error('Nguồn chưa nằm trong allowlist'));return}
      var id='intel_'+Date.now()+'_'+Math.random().toString(36).slice(2);
      pending[id]={resolve:resolve,reject:reject};
      try{
        if(window.Android&&Android.fetchUrlSafe){Android.fetchUrlSafe(id,url)}
        else{
          var timedOut=false,timer=setTimeout(function(){timedOut=true;delete pending[id];reject(new Error('Hết thời gian chờ nguồn'))},FETCH_TIMEOUT_MS);
          fetch(url,{credentials:'omit'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(payload){if(payload.length>1024*1024)throw new Error('Nội dung nguồn vượt giới hạn 1 MB');if(!timedOut){clearTimeout(timer);resolve(payload)}}).catch(function(e){if(!timedOut){clearTimeout(timer);delete pending[id];reject(e)}})
        }
      }catch(e){delete pending[id];reject(e)}
    })
  }
  function pause(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})}
  function listingQueryText(spec){var q=typeof spec==='string'?spec:spec.query;return q+' ('+LISTING_SITE_HOSTS.map(function(h){return 'site:'+h}).join(' OR ')+')'}
  function rssUrl(q){var p=new URLSearchParams({q:q,hl:'vi',gl:'VN',ceid:'VN:vi'});return 'https://news.google.com/rss/search?'+p.toString()}
  function xmlValue(item,selector){var el=item.querySelector(selector);return el?text(el.textContent):''}
  function numberValue(v){var m=text(v).replace(/\s/g,'').match(/\d+(?:[.,]\d+)?/);if(!m)return null;return parseFloat(m[0].replace(',','.'))}
  function parseMoney(v){var s=fold(v).replace(/,/g,'.').replace(/\s+/g,' ');var m=s.match(/(\d+(?:\.\d+)?)\s*(ty|trieu|tr|nghin|k)\b/);if(!m)return null;var n=Number(m[1]);if(!isFinite(n))return null;if(m[2]==='trieu'||m[2]==='tr')return n/1000;if(m[2]==='nghin'||m[2]==='k')return n/1000000;return n}
  function parseLocaleAreaNumber(raw){
    var s=text(raw).replace(/\s/g,'');if(!s)return null;
    if(s.indexOf('.')>-1&&s.indexOf(',')>-1){
      s=s.lastIndexOf(',')>s.lastIndexOf('.')?s.replace(/\./g,'').replace(',','.'):s.replace(/,/g,'');
    }else if(s.indexOf(',')>-1){
      var comma=s.split(',');s=comma.length===2&&comma[1].length===3?s.replace(',',''):s.replace(',','.');
    }else if(s.indexOf('.')>-1){
      var dot=s.split('.');if(dot.length>1&&dot.slice(1).every(function(part){return part.length===3}))s=s.replace(/\./g,'');
    }
    var n=Number(s);return isFinite(n)&&n>=0?n:null;
  }
  function parseArea(v){var m=text(v).match(/(\d[\d\s.,]*)\s*(?:m2|m²|met\s*vuông)\b/i);return m?parseLocaleAreaNumber(m[1]):null}
  function listingArea(t){var s=fold(t);if(s.indexOf('doc let')>-1||s.indexOf('ninh hai')>-1)return 'Dốc Lết / Ninh Hải';if(s.indexOf('ninh thuy')>-1)return 'Ninh Thủy';if(s.indexOf('ninh xuan')>-1)return 'Ninh Xuân';return 'Khác' }
  function likelyListing(t){return /(mua bán|bán đất|đất nền|sổ hồng|sổ đỏ|m²|m2|giá|tỷ|triệu|lô đất)/i.test(t)}
  function parseRssListings(xml,query){
    var doc=new DOMParser().parseFromString(text(xml),'text/xml');
    return Array.prototype.slice.call(doc.querySelectorAll('item')).slice(0,MAX_RSS_ITEMS).map(function(item){
      var title=redactPII(xmlValue(item,'title')).trim();
      var url=externalUrlSafe(xmlValue(item,'link'));
      var raw=redactPII(stripHtml(xmlValue(item,'description'))).slice(0,600);
      var source=redactPII(xmlValue(item,'source'))||'Google Tin tức RSS';
      var published=parseDate(xmlValue(item,'pubDate'));
      var observed=new Date().toISOString();
      var combined=title+' '+raw+' '+query;
      var price=parseMoney(combined),area=parseArea(combined);
      var perM2=(price!=null&&area!=null&&area>0&&isFinite(price)&&isFinite(area))?price*1000/area:null;
      return {kind:'listing',title:title,summary:raw||'Mở nguồn để đọc chi tiết.',url:url,source:'Google Tin tức · '+source,sourceType:'RSS search signal',observedAt:observed,observed_at:observed,publishedAt:published,areaName:listingArea(combined),areaValueM2:area,areaM2:area,price:price,priceBillion:price,pricePerM2:perM2,confidence:'thấp',badge:'unverified',claimStatus:'reported',status:'active',query:query};
    }).filter(function(x){return x.title&&x.url&&likelyListing(x.title+' '+x.summary+' '+x.query)})
  }
  function dedupeListings(items){
    var by={};(items||[]).forEach(function(x){var key=fold(x.title).replace(/[^a-z0-9]+/g,' ').trim();if(!key)return;if(!by[key]||new Date(x.publishedAt||0)>new Date(by[key].publishedAt||0))by[key]=x});
    return Object.keys(by).map(function(k){return by[k]}).sort(function(a,b){return new Date(b.publishedAt||b.observedAt||0)-new Date(a.publishedAt||a.observedAt||0)}).slice(0,160)
  }
  function moneyLabel(v){return v==null?'Chưa có dữ liệu':(v<1?v.toFixed(2):v.toFixed(2).replace(/\.00$/,''))+' tỷ'}
  function areaLabel(v){return v==null?'Chưa có dữ liệu':v.toLocaleString('vi-VN')+' m²'}
  function m2Label(v){return v==null?'Chưa có dữ liệu':v.toLocaleString('vi-VN',{maximumFractionDigits:2})+' triệu/m²'}
  function listingFreshness(x){var d=new Date(x.observedAt||x.observed_at||x.publishedAt||0);if(isNaN(d.getTime()))return 'stale';var days=(Date.now()-d.getTime())/86400000;return days<=7?'fresh':days<=30?'recent':'stale'}

  function seedVan(){return {
    version:INTEL_VERSION,
    overview:{name:'KKT Vân Phong',scope:'Khoảng 150.000 ha theo quy hoạch chung',subzones:'19 phân khu',decision:'298/QĐ-TTg · 27/03/2023',sourceId:'kkt-overview',sourceUrl:OFFICIAL_SOURCES[0].url,claimStatus:'official',asOf:null},
    subzone:{name:'Ninh Hải – Dốc Lết',code:'14',area:'3.053 ha',population:'54.000 người',function:'Đô thị du lịch ven biển; cộng đồng, sinh thái và dịch vụ biển',sourceId:'doclet-zone',sourceUrl:OFFICIAL_SOURCES[1].url,claimStatus:'official',asOf:null,conflict:true},
    kcns:[
      {name:'KCN Ninh Xuân 1',area:'495,8 ha',capital:'~4.631 tỷ đồng',investor:'Becamex IDC',approval:'Chấp thuận chủ trương/nhà đầu tư',clearance:'Chưa có xác nhận hoàn tất GPMB',infrastructure:'Chưa có xác nhận vận hành',operation:'Chưa có bằng chứng vận hành',sourceId:'ninhxuan-update',sourceUrl:OFFICIAL_SOURCES[2].url,sourceDate:'2025-12-31',claimStatus:'official'},
      {name:'KCN Ninh Xuân 2',area:'490 ha',capital:'~4.033 tỷ đồng',investor:'VSIP',approval:'Chấp thuận chủ trương/nhà đầu tư',clearance:'Còn cần theo dõi GPMB',infrastructure:'Chưa có xác nhận vận hành',operation:'Chưa có bằng chứng vận hành',sourceId:'ninhxuan-update',sourceUrl:OFFICIAL_SOURCES[2].url,sourceDate:'2025-12-31',claimStatus:'official'},
      {name:'KCN Ninh Diêm 1',area:'241,5 ha',capital:'~2.834 tỷ đồng',investor:'Ninh Khánh Land',approval:'Chấp thuận chủ trương/nhà đầu tư',clearance:'Chưa có dữ liệu',infrastructure:'Đang theo dõi',operation:'Chưa có bằng chứng vận hành',sourceId:'ninhxuan-update',sourceUrl:OFFICIAL_SOURCES[2].url,sourceDate:'2025-12-31',claimStatus:'official'},
      {name:'KCN Dốc Đá Trắng',area:'288 ha',capital:'>1.807 tỷ đồng',investor:'Chưa có dữ liệu',approval:'Đang triển khai',clearance:'Còn hồ sơ chưa bàn giao theo giai đoạn',infrastructure:'Có tiến độ lấp đầy/giải ngân được báo cáo',operation:'Chưa có bằng chứng vận hành toàn khu',sourceId:'ninhxuan-progress',sourceUrl:OFFICIAL_SOURCES[3].url,sourceDate:'2026-05-20',claimStatus:'reported'}
    ],
    sources:OFFICIAL_SOURCES.map(function(s){return {id:s.id,name:s.name,url:s.url,match:s.match,status:'seed',error:'Chưa cập nhật trong phiên này',retrievedAt:null}}),
    lastRefreshAt:null,status:'Dữ liệu seed — chưa cập nhật live',
    disclaimer:'Số liệu được phân lớp theo nguồn và thời điểm; không phải kết luận pháp lý hay tư vấn đầu tư.'
  }}
  function sourceText(html){return redactPII(stripHtml(html)).slice(0,180000)}
  function relevantSource(source,body){var f=fold(body);return (source.match||[]).some(function(k){return f.indexOf(fold(k))>-1})}
  function updateVanFromLive(v,source,body,when){
    var f=fold(body);source.retrievedAt=when;
    if(!relevantSource(source,body)){source.status='parse_error';source.error='Đã tải nhưng không nhận diện được cấu trúc/thuật ngữ mong đợi';return}
    source.status='ok';source.error='';
    if(source.id==='kkt-overview'&&(/19\s*phan khu/.test(f)||/150[.,]?000/.test(f))){v.overview.asOf=when;v.overview.live=true}
    if(source.id==='doclet-zone'&&f.indexOf('dốc let')>-1){v.subzone.asOf=when;v.subzone.live=true}
    if(source.id==='ninhxuan-update'&&f.indexOf('ninh xuan')>-1){v.kcns.forEach(function(k){if(/ninh xuan/.test(fold(k.name))){k.live=true;k.retrievedAt=when}});}
    if(source.id==='ninhxuan-progress'&&f.indexOf('ninh xuan')>-1){v.kcns.forEach(function(k){if(/ninh xuan/.test(fold(k.name))){k.progressLive=true;k.retrievedAt=when}});}
  }
  async function refreshListings(){
    var found=[],statuses=[];
    for(var i=0;i<Math.min(LISTING_QUERIES.length,MAX_LISTING_REQUESTS);i++){
      var spec=LISTING_QUERIES[i],q=listingQueryText(spec),label=typeof spec==='string'?spec:spec.label,url=rssUrl(q),entry={name:'RSS · '+label,query:q,url:url,status:'loading',retrievedAt:null,error:''};statuses.push(entry);renderIntelStatus();
      try{var xml=await fetchSafe(url);found=found.concat(parseRssListings(xml,q));entry.status='ok';entry.retrievedAt=new Date().toISOString()}catch(e){entry.status='error';entry.error=text(e.message||e)}
      if(i<LISTING_QUERIES.length-1)await pause(180);
    }
    var next=dedupeListings(found);if(next.length){intel.listings=next;saveSafe('intel_listings',intel.listings)}
    intel.listingMeta={lastRefreshAt:new Date().toISOString(),status:statuses.some(function(s){return s.status==='ok'})?'Đã cập nhật một phần':'Nguồn RSS không khả dụng',sources:statuses};saveSafe('intel_listing_meta',intel.listingMeta);
  }
  async function refreshVan(){
    var v=seedVan();
    for(var i=0;i<OFFICIAL_SOURCES.length;i++){
      var s=v.sources[i],spec=OFFICIAL_SOURCES[i];renderIntelStatus();
      try{var html=await fetchSafe(spec.url);var body=sourceText(html);if(body.length<100)throw new Error('Nội dung nguồn quá ngắn');updateVanFromLive(v,s,body,new Date().toISOString())}
      catch(e){s.status='error';s.error=text(e.message||e)}
      if(i<OFFICIAL_SOURCES.length-1)await pause(180);
    }
    v.lastRefreshAt=new Date().toISOString();v.status=v.sources.some(function(s){return s.status==='ok'})?'Đã đọc nguồn chính thức một phần':'Nguồn chính thức chưa khả dụng — dùng seed';intel.van=v;saveSafe('intel_vanphong',v)
  }
  async function refreshAll(){
    if(intel.running){toast('Đang cập nhật dữ liệu, vui lòng chờ');return}
    intel.running=true;intel.listingMeta.status='Đang cập nhật';renderIntelStatus();renderListings();renderVan();
    try{await refreshListings();await refreshVan();toast('Đã cập nhật dữ liệu công khai')}catch(e){toast('Cập nhật một phần — dùng cache/fallback')}finally{intel.running=false;renderIntelStatus();renderListings();renderVan()}
  }
  function staleMeta(){var v=intel.listingMeta||{};var t=v.lastRefreshAt?new Date(v.lastRefreshAt).getTime():0;if(!t||!isFinite(t))return true;return Date.now()-t>REFRESH_MINUTES*60000}
  function statusHtml(meta){meta=meta||{};var label=meta.status||'Chưa cập nhật';var cls=intel.running?'loading':(label.indexOf('không')>-1||label.indexOf('lỗi')>-1?'error':'ok');return '<div class="intelStatus '+cls+'"><span class="statusDot"></span><b>'+escIntel(label)+'</b><span>•</span><span>Lần kiểm tra: '+escIntel(dateLabel(meta.lastRefreshAt))+'</span></div>'}
  function renderIntelStatus(){var a=document.getElementById('intelListingsStatus');if(a)a.innerHTML=statusHtml(intel.listingMeta);var b=document.getElementById('intelVanStatus');if(b)b.innerHTML=statusHtml(intel.van||{});}
  function sourceBadge(status){var map={ok:['official','official'],official:['official','official'],seed:['official','seed'],reported:['reported','reported'],conflicting:['conflicting','conflicting'],parse_error:['error','parse error'],error:['error','unavailable'],loading:['loading','loading'],'link-out':['muted','link-out only'],blocked:['error','blocked']};var x=map[status]||['muted','reported'];return '<span class="intelBadge '+x[0]+'">'+x[1]+'</span>'}
  function listingCard(x,index){var saved=Array.isArray(state.saved)&&state.saved.some(function(n){return n&&n.kind==='listing'&&n.url===x.url});return '<article class="intelListingCard"><div class="intelCardTop"><span class="intelBadge reported">Tin rao / tín hiệu</span><span class="intelBadge muted">Chưa thẩm định</span></div><h3>'+escIntel(x.title)+'</h3><p class="intelMuted">'+escIntel(x.areaName||'Khác')+' · Quan sát '+escIntel(dateLabel(x.observedAt))+'</p><div class="intelFacts"><div><b>'+escIntel(moneyLabel(x.priceBillion))+'</b><small>Giá đọc được</small></div><div><b>'+escIntel(areaLabel(x.areaM2))+'</b><small>Diện tích</small></div><div><b>'+escIntel(m2Label(x.pricePerM2))+'</b><small>Giá/m²</small></div></div><p>'+escIntel(x.summary||'Chưa có dữ liệu')+'</p><div class="intelSource"><span>'+escIntel(x.source||'Nguồn RSS')+'</span><span>'+escIntel(x.confidence||'thấp')+'</span></div><div class="actions"><button type="button" class="mini gold" data-intel-save="'+index+'">'+(saved?'✓ Đã lưu':'Lưu vào Sổ tay')+'</button><button type="button" class="mini" data-intel-detail="'+index+'">Chi tiết</button><button type="button" class="mini" data-intel-open="'+index+'">Mở nguồn</button></div></article>'}
  function filteredListings(){var list=(intel.listings||[]).slice();var f=intel.filter||{};if(f.area&&f.area!=='Tất cả')list=list.filter(function(x){return x.areaName===f.area});if(f.source&&f.source!=='Tất cả')list=list.filter(function(x){return text(x.source).indexOf(f.source)>-1});if(f.fresh==='fresh')list=list.filter(function(x){return listingFreshness(x)==='fresh'});return list}
  function listingDetail(x){
    if(!x)return;
    showSheet('<h2>Chi tiết tin rao</h2><h3>'+escIntel(x.title)+'</h3><p><b>Phân lớp:</b> Tin rao/tín hiệu thị trường · chưa thẩm định</p><div class="intelDetailGrid"><div><b>Vị trí</b><span>'+escIntel(x.areaName||'Chưa có dữ liệu')+'</span></div><div><b>Giá</b><span>'+escIntel(moneyLabel(x.priceBillion))+'</span></div><div><b>Diện tích</b><span>'+escIntel(areaLabel(x.areaM2))+'</span></div><div><b>Giá/m²</b><span>'+escIntel(m2Label(x.pricePerM2))+'</span></div><div><b>Quan sát</b><span>'+escIntel(dateLabel(x.observedAt||x.observed_at))+'</span></div><div><b>Độ tin cậy</b><span>'+escIntel(x.confidence||'thấp')+'</span></div></div><p>'+escIntel(x.summary||'Chưa có dữ liệu')+'</p><div class="intelWarning">Không coi tin rao, nhãn “xác thực”, sổ/giấy tờ do người đăng nêu là kết luận pháp lý. Hãy mở nguồn gốc và kiểm tra hồ sơ thực địa.</div><button type="button" class="primary gold" id="intelListingSourceBtn">Mở nguồn gốc</button>');
    var btn=document.getElementById('intelListingSourceBtn');if(btn)btn.addEventListener('click',function(){openUrlSafe(x.url)})
  }
  function saveListing(x){if(!x)return;if(!Array.isArray(state.saved))state.saved=[];if(!state.saved.some(function(n){return n&&n.kind==='listing'&&n.url===x.url})){var copy=Object.assign({},x,{savedAt:new Date().toLocaleString('vi-VN')});state.saved.unshift(copy);store('saved',state.saved);toast('Đã lưu tin vào Sổ tay')}else toast('Tin đã có trong Sổ tay');renderListings()}
  function bindListingEvents(root,list){
    root.querySelectorAll('[data-intel-save]').forEach(function(b){b.addEventListener('click',function(){saveListing(list[Number(b.dataset.intelSave)])})});
    root.querySelectorAll('[data-intel-detail]').forEach(function(b){b.addEventListener('click',function(){listingDetail(list[Number(b.dataset.intelDetail)])})});
    root.querySelectorAll('[data-intel-open]').forEach(function(b){b.addEventListener('click',function(){var item=list[Number(b.dataset.intelOpen)];if(item)openUrlSafe(item.url)})});
    var a=root.querySelector('#intelAreaFilter');if(a)a.addEventListener('change',function(){intel.filter.area=a.value;renderListings()});
    var s=root.querySelector('#intelSourceFilter');if(s)s.addEventListener('change',function(){intel.filter.source=s.value;renderListings()});
    var f=root.querySelector('#intelFreshFilter');if(f)f.addEventListener('change',function(){intel.filter.fresh=f.value;renderListings()})
  }
  function renderListings(){
    var root=document.getElementById('listings');if(!root)return;
    var list=filteredListings(),areas=['Tất cả','Dốc Lết / Ninh Hải','Ninh Thủy','Ninh Xuân','Khác'];
    var sourceNames=['Tất cả'].concat(Array.from(new Set((intel.listings||[]).map(function(x){return x.source}).filter(Boolean))).slice(0,8));
    var rssSources=Array.isArray(intel.listingMeta&&intel.listingMeta.sources)?intel.listingMeta.sources:[],rssOk=rssSources.filter(function(s){return s.status==='ok'}).length,rssStatus=intel.running?'loading':(rssOk?'ok':(intel.listingMeta&&intel.listingMeta.lastRefreshAt?'error':'loading'));
    var sourceCards='<div class="intelSourceItem"><div><b>Google News RSS · site-filter</b><small>Auto-read tối đa '+MAX_LISTING_REQUESTS+' query/phiên · Lần kiểm tra: '+escIntel(dateLabel(intel.listingMeta&&intel.listingMeta.lastRefreshAt))+'</small></div><div>'+sourceBadge(rssStatus)+'</div></div>'+LISTING_SOURCES.map(function(s,i){return '<div class="intelSourceItem"><div><b>'+escIntel(s.name)+'</b><small>'+escIntel(s.reason)+' · Lần kiểm tra tự động: không áp dụng (link-out only)</small></div><div>'+sourceBadge(s.status)+'<button type="button" class="mini" data-intel-source-index="'+i+'">Mở trang gốc</button></div></div>'}).join('');
    var queryButtons=LISTING_QUERIES.slice(0,MAX_LISTING_REQUESTS).map(function(spec,i){var label=typeof spec==='string'?spec:spec.label;return '<button type="button" class="mini" data-intel-query-index="'+i+'">'+escIntel(label)+'</button>'}).join('');
    root.innerHTML='<div class="intelHero"><div><span class="intelEyebrow">LISTING INTELLIGENCE · CLIENT CACHE</span><h2>Tin BĐS Dốc Lết & Ninh Xuân</h2><p>Tự động đọc search signal qua Google News RSS có site-filter; marketplace không có feed/API được cấp phép chỉ mở link-out. Không coi đây là dữ liệu pháp lý.</p></div><button type="button" class="primary gold" id="intelRefreshListings">↻ Cập nhật ngay</button></div><div id="intelListingsStatus">'+statusHtml(intel.listingMeta)+'</div><div class="intelFilterGrid"><label>Khu vực<select id="intelAreaFilter">'+areas.map(function(x){return '<option '+(intel.filter.area===x?'selected':'')+'>'+escIntel(x)+'</option>'}).join('')+'</select></label><label>Nguồn<select id="intelSourceFilter">'+sourceNames.map(function(x){return '<option '+(intel.filter.source===x?'selected':'')+'>'+escIntel(x)+'</option>'}).join('')+'</select></label><label>Độ mới<select id="intelFreshFilter"><option value="all" '+(intel.filter.fresh==='all'?'selected':'')+'>Tất cả</option><option value="fresh" '+(intel.filter.fresh==='fresh'?'selected':'')+'>Trong 7 ngày</option></select></label></div><div class="card intelCard"><div class="sectionTitle"><h3>Nguồn tin rao lớn</h3><span>Không vượt robots/ToS</span></div><p class="intelMuted">Auto-read: Google News RSS site-filter, tối đa '+MAX_LISTING_REQUESTS+' query/phiên. Các site bên dưới là link-out only; không gọi trực tiếp, không sao chép phone/ảnh/nội dung dài.</p><div class="intelSourceList">'+sourceCards+'</div><div class="intelSourceStrip"><b>Từ khóa RSS</b><span>Mở search signal gốc:</span>'+queryButtons+'</div></div><div class="sectionTitle"><h2>'+list.length+' tín hiệu</h2><span>Giá/diện tích chỉ hiển thị khi đọc được</span></div>'+(list.length?'<div class="intelListGrid">'+list.map(listingCard).join('')+'</div>':'<div class="emptyHint">Chưa có dữ liệu. Hãy cập nhật khi có mạng; nếu RSS không trả kết quả, dùng các nguồn link-out để xem tin gốc.</div>')+'<div class="intelDisclaimer">Dữ liệu tham khảo · tin rao chưa thẩm định · cần kiểm tra văn bản, quy hoạch, sổ và hồ sơ thực địa.</div>';
    var b=root.querySelector('#intelRefreshListings');if(b)b.addEventListener('click',refreshAll);
    bindListingEvents(root,list);
    root.querySelectorAll('[data-intel-source-index]').forEach(function(x){x.addEventListener('click',function(){var s=LISTING_SOURCES[Number(x.dataset.intelSourceIndex)];if(s)openUrlSafe(s.url)})});
    root.querySelectorAll('[data-intel-query-index]').forEach(function(x){x.addEventListener('click',function(){var spec=LISTING_QUERIES[Number(x.dataset.intelQueryIndex)];if(spec)openUrlSafe(rssUrl(listingQueryText(spec)))})})
  }
  function kcnStatus(k){var parts=[];if(k.approval)parts.push(k.approval);if(k.clearance)parts.push('GPMB: '+k.clearance);if(k.infrastructure)parts.push('Hạ tầng: '+k.infrastructure);return parts.join(' · ')}
  function kcnRow(k,i){return '<tr><td><b>'+escIntel(k.name)+'</b><small>'+escIntel(k.investor||'Chưa có dữ liệu')+'</small></td><td>'+escIntel(k.area||'Chưa có dữ liệu')+'</td><td>'+escIntel(k.capital||'Chưa có dữ liệu')+'</td><td>'+escIntel(kcnStatus(k))+'</td><td>'+sourceBadge(k.claimStatus||'reported')+'<small>Nguồn: '+escIntel(shortDate(k.sourceDate))+'</small><small>Đọc: '+escIntel(shortDate(k.retrievedAt))+'</small></td><td><button type="button" class="mini" data-kcn-detail="'+i+'">Mở</button></td></tr>'}
  function kcnDetail(k){
    showSheet('<h2>'+escIntel(k.name)+'</h2><div class="intelDetailGrid"><div><b>Quy mô</b><span>'+escIntel(k.area)+'</span></div><div><b>Vốn đầu tư</b><span>'+escIntel(k.capital)+'</span></div><div><b>Nhà đầu tư</b><span>'+escIntel(k.investor)+'</span></div><div><b>Chấp thuận</b><span>'+escIntel(k.approval)+'</span></div><div><b>GPMB</b><span>'+escIntel(k.clearance)+'</span></div><div><b>Hạ tầng</b><span>'+escIntel(k.infrastructure)+'</span></div><div><b>Vận hành</b><span>'+escIntel(k.operation)+'</span></div><div><b>Ngày nguồn</b><span>'+escIntel(shortDate(k.sourceDate))+'</span></div><div><b>Retrieved tại app</b><span>'+escIntel(dateLabel(k.retrievedAt))+'</span></div></div><div class="intelWarning">Đây là trạng thái theo nguồn được ghi nhận; chấp thuận đầu tư không đồng nghĩa đã GPMB, xây hạ tầng hoặc vận hành.</div><button type="button" class="primary gold" id="intelKcnSourceBtn">Mở văn bản/nguồn</button>');
    var btn=document.getElementById('intelKcnSourceBtn');if(btn)btn.addEventListener('click',function(){openUrlSafe(k.sourceUrl)})
  }
  function renderVan(){var root=document.getElementById('vanphong');if(!root)return;var v=intel.van||seedVan();var ok=(v.sources||[]).filter(function(s){return s.status==='ok'}).length;root.innerHTML='<div class="intelHero vanHero"><div><span class="intelEyebrow">VÂN PHONG INTELLIGENCE · EVIDENCE VIEW</span><h2>KKT Vân Phong</h2><p>Phân lớp quy hoạch, chấp thuận, GPMB, hạ tầng và vận hành theo nguồn; không gộp thành một điểm “tiềm năng”.</p></div><button type="button" class="primary gold" id="intelRefreshVan">↻ Cập nhật ngay</button></div><div id="intelVanStatus">'+statusHtml(v)+'</div><div class="intelKpiGrid"><div><b>'+escIntel(v.overview.scope)+'</b><small>Phạm vi quy hoạch</small></div><div><b>'+escIntel(v.overview.subzones)+'</b><small>Phân khu</small></div><div><b>'+escIntel(v.kcns.length)+'</b><small>KCN đang theo dõi</small></div><div><b>'+ok+'/'+(v.sources||[]).length+'</b><small>Nguồn đọc được live</small></div></div><div class="card intelCard"><h3>Đơn vị hành chính & nguồn</h3><p><b>Phạm vi:</b> '+escIntel(v.overview.scope)+'<br><b>Văn bản nền:</b> '+escIntel(v.overview.decision)+'<br><b>Phân khu ưu tiên:</b> '+escIntel(v.subzone.name)+' (mã '+escIntel(v.subzone.code)+')</p><div class="intelConflict">conflicting: trang tiếng Việt và tiếng Anh của KKT đang ghi khác mã phân khu/diện tích. App giữ cả hai claim và yêu cầu đối chiếu văn bản gốc.</div><div class="actions"><button type="button" class="mini gold" data-van-open="'+escIntel(v.overview.sourceUrl)+'">Mở nguồn tổng quan</button><button type="button" class="mini" data-van-open="'+escIntel(v.subzone.sourceUrl)+'">Mở Dốc Lết</button></div></div><div class="card intelCard"><div class="sectionTitle"><h3>Bảng KKT/KCN</h3><span>Ngày trên bản ghi nguồn</span></div><div class="tableWrap"><table class="intelTable"><thead><tr><th>KCN / nhà đầu tư</th><th>Quy mô</th><th>Vốn</th><th>Trạng thái tách lớp</th><th>Nguồn</th><th></th></tr></thead><tbody>'+v.kcns.map(kcnRow).join('')+'</tbody></table></div><p class="intelMuted">Không hiển thị “đang vận hành” nếu nguồn chỉ chứng minh quy hoạch hoặc chấp thuận chủ trương.</p></div><div class="card intelCard"><h3>Trạng thái nguồn</h3><div class="intelSourceList">'+(v.sources||[]).map(function(s){return '<div class="intelSourceItem"><div><b>'+escIntel(s.name)+'</b><small>'+escIntel(s.error||('Retrieved '+dateLabel(s.retrievedAt)))+'</small></div><div>'+sourceBadge(s.status)+'<button type="button" class="mini" data-van-open="'+escIntel(s.url)+'">Mở nguồn</button></div></div>'}).join('')+'</div></div><div class="intelDisclaimer">Dữ liệu tham khảo, không phải tư vấn đầu tư/pháp lý. Cập nhật live chỉ xác nhận nội dung đọc được; seed/fallback luôn giữ nhãn và ngày nguồn riêng.</div>';
    var rb=root.querySelector('#intelRefreshVan');if(rb)rb.addEventListener('click',refreshAll);root.querySelectorAll('[data-kcn-detail]').forEach(function(b){b.addEventListener('click',function(){kcnDetail(v.kcns[Number(b.dataset.kcnDetail)])})});root.querySelectorAll('[data-van-open]').forEach(function(b){b.addEventListener('click',function(){openUrlSafe(b.dataset.vanOpen)})})
  }
  function homeEntry(){var h=document.getElementById('home');if(!h||h.querySelector('.intelHomeEntry'))return;var el=document.createElement('div');el.className='card intelHomeEntry';el.innerHTML='<div class="intelEyebrow">DỮ LIỆU TỰ ĐỘNG</div><h2>Khám phá dữ liệu Ninh Hòa</h2><p>Theo dõi tin BĐS dạng tín hiệu và hồ sơ KKT Vân Phong có nguồn, thời điểm kiểm tra và cảnh báo xung đột dữ liệu.</p><div class="actions"><button type="button" class="primary gold" data-home-intel="listings">Tin BĐS</button><button type="button" class="primary soft" data-home-intel="vanphong">Vân Phong</button></div>';h.insertBefore(el,h.firstChild);el.querySelectorAll('[data-home-intel]').forEach(function(b){b.addEventListener('click',function(){window.go(b.dataset.homeIntel)})})}
  var navItems=[['home','🏠','Trang chủ'],['news','📰','Tin tức'],['listings','🏷️','Tin BĐS'],['vanphong','⚓','Vân Phong'],['check','🛡️','Kiểm tra'],['areas','📍','Khu vực'],['saved','⭐','Sổ tay'],['policy','⚖️','Chính sách']];
  var intelStyle=document.createElement('style');intelStyle.textContent=''+
    '.intelHero{display:flex;align-items:center;justify-content:space-between;gap:14px;background:linear-gradient(135deg,#062238,#0b6286);color:#fff;border-radius:24px;padding:18px;margin-bottom:12px;box-shadow:0 16px 38px rgba(6,27,44,.16)}.intelHero h2{margin:6px 0;font-size:24px}.intelHero p{color:rgba(255,255,255,.82);line-height:1.4;margin:0;max-width:520px}.intelHero .primary{white-space:nowrap}.intelEyebrow{font-size:10px;font-weight:950;letter-spacing:.8px;color:#d9b348}.intelStatus{display:flex;align-items:center;gap:7px;flex-wrap:wrap;border-radius:16px;padding:10px 12px;background:#f5f9fc;color:#4d6574;font-size:12px;margin:0 0 12px}.intelStatus.ok{background:#eefbf4;color:#0b6440}.intelStatus.error{background:#fff0f0;color:#8c2d2d}.intelStatus.loading{background:#fff8e5;color:#76520a}.statusDot{width:9px;height:9px;border-radius:50%;background:#9db0ba}.intelStatus.ok .statusDot{background:#19a866}.intelStatus.error .statusDot{background:#d64b4b}.intelStatus.loading .statusDot{background:#d09a1f}.intelFilterGrid{display:grid;grid-template-columns:1fr 1.4fr 1fr;gap:10px;margin-bottom:12px}.intelFilterGrid label{display:flex;flex-direction:column;gap:6px;font-size:12px}.intelFilterGrid select{padding:11px 10px;font-size:13px;border-radius:14px}.intelSourceStrip{display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:#fff8eb;border:1px solid #f0d999;border-radius:18px;padding:11px 12px;margin-bottom:14px;font-size:12px;color:#6b5019}.intelSourceStrip .mini{padding:7px 9px}.intelListGrid{display:grid;gap:12px}.intelListingCard{background:#fff;border:1px solid rgba(8,34,54,.09);border-radius:22px;padding:15px;box-shadow:0 10px 26px rgba(6,27,44,.07)}.intelListingCard h3{margin:9px 0 5px;font-size:17px;line-height:1.25}.intelListingCard p{line-height:1.42}.intelCardTop,.intelSource,.intelSourceItem{display:flex;gap:7px;align-items:center;justify-content:space-between;flex-wrap:wrap}.intelFacts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}.intelFacts>div{background:#f5f9fc;border-radius:15px;padding:10px}.intelFacts b{display:block;font-size:14px}.intelFacts small,.intelSourceItem small,.intelDetailGrid span,.intelKpiGrid small{display:block;color:#637783;font-size:11px;margin-top:4px}.intelMuted{font-size:12px;color:#617580;margin:5px 0}.intelSource{font-size:11px;color:#5a707c;border-top:1px solid #e6eef2;padding-top:9px}.intelBadge{display:inline-flex;align-items:center;border-radius:999px;padding:5px 8px;font-size:10px;font-weight:950}.intelBadge.official{background:#fff0b8;color:#674900;border:1px solid #e4c35a}.intelBadge.reported{background:#e8f2fb;color:#075077}.intelBadge.conflicting{background:#fff0d3;color:#85510b}.intelBadge.error{background:#ffe7e7;color:#8b2e2e}.intelBadge.loading{background:#fff8e5;color:#76520a}.intelBadge.muted{background:#eef3f5;color:#60737d}.intelDisclaimer,.intelWarning,.intelConflict{border-radius:17px;padding:12px 13px;font-size:12px;line-height:1.45}.intelDisclaimer{background:#eef6fa;border:1px solid #dbe9ef;color:#456271;margin-top:13px}.intelWarning{background:#fff8eb;border:1px solid #efd797;color:#6b5019;margin:12px 0}.intelConflict{background:#fff0f0;border:1px solid #efc2c2;color:#7e3030;margin:10px 0}.intelKpiGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:13px}.intelKpiGrid>div{background:#fff;border:1px solid rgba(8,34,54,.08);border-radius:18px;padding:12px;box-shadow:0 8px 20px rgba(6,27,44,.06)}.intelKpiGrid b{display:block;font-size:15px;line-height:1.2}.intelCard{padding:16px}.tableWrap{overflow:auto;margin:0 -4px}.intelTable{width:100%;min-width:720px;border-collapse:separate;border-spacing:0 7px;font-size:12px}.intelTable th{text-align:left;color:#6a7d88;font-size:10px;text-transform:uppercase;padding:0 8px}.intelTable td{background:#f7fbfd;padding:10px 8px;vertical-align:top;line-height:1.35}.intelTable td:first-child{border-radius:13px 0 0 13px}.intelTable td:last-child{border-radius:0 13px 13px 0}.intelTable td b,.intelTable td small{display:block}.intelSourceList{display:grid;gap:9px}.intelSourceItem{border:1px solid #e0ebf0;border-radius:15px;padding:10px 11px}.intelHomeEntry{background:linear-gradient(135deg,#fff9e8,#fff)}.intelDetailGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:12px 0}.intelDetailGrid>div{background:#f5f9fc;border-radius:15px;padding:10px}.intelDetailGrid b{display:block;font-size:11px;color:#607681}.intelDetailGrid span{font-size:13px;color:#12354a;font-weight:800}.vanHero{background:linear-gradient(135deg,#062238,#075d76)}@media(max-width:520px){.intelHero{display:block}.intelHero .primary{width:100%;margin-top:13px}.intelFilterGrid{grid-template-columns:1fr 1fr}.intelFilterGrid label:last-child{grid-column:1/-1}.intelKpiGrid{grid-template-columns:1fr 1fr}.intelFacts{grid-template-columns:1fr 1fr}.intelFacts>div:last-child{grid-column:1/-1}.intelDetailGrid{grid-template-columns:1fr 1fr}}';document.head.appendChild(intelStyle);
  function applyIntelNav(){var n=document.getElementById('nav');if(!n)return;n.innerHTML=navItems.map(function(x){return '<button type="button" data-tab="'+x[0]+'" class="'+(state.tab===x[0]?'active':'')+'"><span>'+x[1]+'</span>'+x[2]+'</button>'}).join('');n.querySelectorAll('[data-tab]').forEach(function(b){b.addEventListener('click',function(){window.go(b.dataset.tab)})})}
  var baseGo=window.go;
  window.go=function(tab){state.tab=tab;document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('active',p.id===tab)});applyIntelNav();if(tab==='listings')renderListings();else if(tab==='vanphong')renderVan();else if(typeof baseGo==='function')baseGo(tab);if(tab==='home')homeEntry();scrollTo({top:0,behavior:'smooth'})};
  var baseRender=window.render;
  window.render=function(){if(typeof baseRender==='function')baseRender();applyIntelNav();if(state.tab==='listings')renderListings();if(state.tab==='vanphong')renderVan();if(state.tab==='home')homeEntry();renderIntelStatus()};
  if(!intel.van)intel.van=seedVan();
  bindSavedListingEvents();
  setTimeout(function(){try{window.render();if(staleMeta()||!intel.van.lastRefreshAt)refreshAll()}catch(e){console.warn('Intel init',e)}},1200);
  setInterval(function(){if(!document.hidden&&staleMeta())refreshAll()},REFRESH_MINUTES*60000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&staleMeta())refreshAll()});
  window.NinhHoaIntelligence={refresh:refreshAll,renderListings:renderListings,renderVan:renderVan,version:INTEL_VERSION};
})();
