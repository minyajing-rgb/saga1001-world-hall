const shortcuts = [
  {id:'bunny',name:'Bunny Crystal Oracle',caption:'神谕与仪式',href:'https://bunny.saga1001.com/',intro:'原创水晶神谕卡与温柔的日常反思。'},
  {id:'plot',name:'PLOT',caption:'自我与关系',href:'https://plot.saga1001.com/',intro:'从关系里的信号，找到更清楚的下一步。'},
  {id:'dreamplot',name:'DreamPlot',caption:'梦境与自我',href:'https://dreamplot.saga1001.com/book',intro:'《梦频日记》：从梦与现实的对应，走向自我理解。'},
  {id:'dharma',name:'Dharma Atlas',caption:'佛教与智慧',href:'https://dharma.saga1001.com/',intro:'沿着圣地、人物与经典的足迹探索佛陀的世界。'},
  {id:'bible',name:'From John to Jesus',caption:'信仰与文明',href:'https://bible.saga1001.com/',intro:'从文本史与视觉研究重新走一遍圣经故事。'},
  {id:'healing',name:'Earth Healing',caption:'自然与疗愈',href:'https://healing.saga1001.com/',intro:'从自然、时间与故事里寻找照顾身心的方式。'}
];
const brandMarks = {bunny:'B',plot:'P✦',dreamplot:'梦',dharma:'D',bible:'J',healing:'H'};
const brandArt = {
  bunny:'<img class="product-preview" src="./assets/product-bunny.jpg" alt="" loading="lazy"/>',
  plot:'<img class="product-preview" src="./assets/product-plot.jpg" alt="" loading="lazy"/>',
  dreamplot:'<img class="product-preview" src="./assets/product-dreamplot.jpg" alt="" loading="lazy"/>',
  dharma:'<img class="product-preview" src="./assets/product-dharma.jpg" alt="" loading="lazy"/>',
  bible:'<img class="product-preview" src="./assets/product-bible.jpg" alt="" loading="lazy"/>',
  healing:'<img class="product-preview" src="./assets/product-healing.jpg" alt="" loading="lazy"/>'
};
const shortcutIcon = p => `<span class="shortcut-icon shortcut-icon--${p.id}" aria-hidden="true">${brandMarks[p.id]}</span>`;
const brandCard = p => `<a href="${p.href}" class="brand-world brand-world--${p.id}" target="_blank" rel="noopener noreferrer" aria-label="打开 ${p.name} 官方网站"><div class="brand-world-art" aria-hidden="true">${brandArt[p.id]}</div><div class="brand-world-copy"><small>${p.caption}</small><h3>${p.name}</h3><p>${p.intro}</p><span>打开产品 <b aria-hidden="true">↗</b></span></div></a>`;
const shortcutLink = p => `<a href="${p.href}" class="dock-item shortcut-item" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.name}">${shortcutIcon(p)}<strong>${p.name}</strong><small>${p.caption} ↗</small></a>`;
const topics = [
  {name:'Mindfulness',count:'1.2K posts',icon:'✦'},
  {name:'AI & Spirituality',count:'856 posts',icon:'✦'},
  {name:'Daily Growth',count:'642 posts',icon:'✦'},
  {name:'Art & Creation',count:'521 posts',icon:'✦'}
];
const prompts = [
  ['◉','Talk about my feelings','I want to talk about how I feel today.'],
  ['✤','Explore Buddhism','I want to explore a Buddhist idea.'],
  ['♧','Get a Tarot reading','I would like a reflective card prompt.'],
  ['☾','Improve my sleep','I want a gentle wind-down idea.'],
  ['▧','Ask anything…','']
];
const app = document.querySelector('#app');
let activeCommunityTab = 'Featured';
let messages = [];
let activePoster = null;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route = () => decodeURIComponent(location.hash.replace(/^#\/?/,'')) || 'home';
const to = id => {location.hash = id === 'home' ? '#/' : `#/${id}`; window.scrollTo(0,0);};
function icon(name){const paths={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',menu:'<path d="M5 6h14M5 12h14M5 18h14"/>',home:'<path d="m3 10 9-7 9 7v10H6V10"/><path d="M9 20v-7h6v7"/>',chat:'<path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-9a9 9 0 0 1 18-1Z"/><path d="M8 10h8M8 14h5"/>',worlds:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',library:'<path d="M4 5h7v15H4zM13 4l6-1 2 15-6 1z"/>',me:'<circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',send:'<path d="m4 4 17 8-17 8 3-8zM7 12h14"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',back:'<path d="m15 5-7 7 7 7"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>'};return paths[name]?`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`:name;}

function topbar({overlay=false,mobile=false}={}){
 return `<header class="topbar ${overlay?'on-hero':''}">
  <a class="brand" href="#/" aria-label="SAGA1001 home">SAGA1001</a>
  <nav class="desktop-links" aria-label="Main navigation"><a href="#/worlds">Worlds</a><a href="#/products">Products</a><a href="#/chat">AI Chat</a><a href="#/community">Community</a><a href="#/about">About</a></nav>
  <div class="head-actions"><button class="search-trigger" aria-label="Search" data-action="search">${icon('search')} <span>Search</span></button><button class="tiny-icon" aria-label="Open worlds" data-action="worlds">${icon('worlds')}</button><button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="saga-mobile-menu" data-action="menu">${icon('menu')}</button></div>
 </header>`;
}
function bottomNav(current){
 return `<nav class="bottom-nav" aria-label="Mobile navigation">${[['home','Home'],['chat','Chat'],['worlds','Worlds'],['library','Library'],['me','Me']].map(([id,label])=>`<a href="#/${id==='home'?'':id}" class="${current===id?'active':''}"${current===id?' aria-current="page"':''}><span>${icon(id)}</span><small>${label}</small></a>`).join('')}</nav>`;
}
function footer(){return `<footer class="footer"><div><strong>SAGA1001</strong><span>AI for a more conscious, kinder, and more alive humanity.</span></div><p>Different paths · One home · A kinder world · A brighter you</p><small>© ${new Date().getFullYear()} SAGA1001</small></footer>`;}
const worlds = [
 {id:'portal',name:'Portal',caption:'Start here',zh:'从这里开始',intro:'让好奇带路，找到属于你的探索方向。',detail:'关系、梦境、文化与日常反思。从一个当下的问题开始，选择适合你的产品与内容。',products:['plot','dreamplot']},
 {id:'bunny',name:'Bunny',caption:'Companion',zh:'温柔陪伴',intro:'在 Bunny 的世界，为自己留一点温柔。',detail:'探索 Bunny Crystal Oracle 的原创水晶神谕卡与日常反思，给今天一个新的观察角度。',products:['bunny']},
 {id:'buddhism',name:'Buddhism',caption:'Wisdom',zh:'佛教与智慧',intro:'沿着人物、圣地与经典，走进智慧的世界。',detail:'从 Dharma Atlas 出发，阅读佛教文化、人物与经典的来源，让理解多一个视角。',products:['dharma']},
 {id:'bible',name:'Bible',caption:'Faith',zh:'信仰与文明',intro:'在文本与历史之间，重新发现故事。',detail:'从施洗约翰到耶稣，沿着文本、历史与视觉研究，探索圣经故事与文明。',products:['bible']},
 {id:'tarot',name:'Tarot',caption:'Insight',zh:'象征与洞察',intro:'借一张牌，看看当下的自己。',detail:'这里从象征与反思进入。当前可体验 Bunny 原创水晶神谕卡；它是独立牌组，区别于传统塔罗。',products:['bunny']},
 {id:'astrology',name:'Astrology',caption:'Cosmos',zh:'星辰与自我',intro:'仰望星空，也回到自己的生活。',detail:'从星盘与象征开始，探索自己的节奏与关系。前往星盘灵境，查看当前开放的星盘体验。',products:[],url:'https://astro.saga1001.com/',productName:'星盘灵境'},
 {id:'healing',name:'Healing',caption:'Wellness',zh:'身心与安宁',intro:'慢一点，为此刻的自己留出空间。',detail:'从自然的故事与轻柔的呼吸练习出发，找到适合自己的休息节奏。',products:['healing'],breathing:true},
 {id:'garden',name:'Garden',caption:'Life',zh:'自然与生命',intro:'在植物、季节与自然里，发现日常的小事。',detail:'Garden 连接 Earth Healing 的自然与植物内容。把一次散步、一株植物、一段季节变化，变成今天的观察。',products:['healing']}
];
function worldMark(w,extra='') {return `<span class="hall-medallion hall-medallion--${w.id} ${extra}" aria-hidden="true">${w.id==='bunny'?'<img src="/assets/bunny-world.jpg" alt="" width="1774" height="887" decoding="async">':`<img src="/assets/portals/${w.id}.svg" alt="" width="100" height="100" decoding="async">`}</span>`;}
function portalLink(w){return `<a class="hall-portal" href="#/realm/${w.id}" aria-label="${w.name} · ${w.zh}">${worldMark(w)}<strong>${w.name}</strong><small>${w.caption}</small></a>`;}
function worldCard(w){return `<a class="hall-world-card" href="#/realm/${w.id}">${worldMark(w)}<div><span>${w.caption}</span><h3>${w.name}</h3><p>${w.intro}</p></div><span class="hall-card-arrow" aria-hidden="true">→</span></a>`;}
function home(){return `<div class="page home-page">
 <a class="hall-skip" href="#discover" data-section-link="discover">跳至世界目录</a>
 <main>
  <section class="v21-hero world-hall" aria-label="SAGA1001 世界大厅" data-design-version="world-hall-v2-20261021">
   <img class="hall-scene" src="/assets/world-hall-hero.jpg" alt="双重金色光环环绕云端城堡，瀑布流入山谷与湖泊" width="1672" height="941" fetchpriority="high" decoding="async">
   <div class="hall-atmosphere" aria-hidden="true"></div>
   ${topbar({overlay:true})}
   <div class="hall-copy">
    <h1><span>A Kinder World</span><span>A Brighter You</span></h1>
    <p class="hall-subtitle">用 AI 连接内在、彼此与更大的世界</p>
    <p class="hall-description">Explore AI companions, timeless wisdom and practical tools<br class="hall-desktop-break"> for a more conscious, kinder, and more alive humanity.</p>
    <div class="hall-actions"><a class="hall-button hall-button-primary" href="#/chat">Chat with SAGA</a><a class="hall-button hall-button-light" href="#/worlds">Explore Worlds</a></div>
   </div>
   <p class="hall-aside">Different paths<br>One home<br><strong>SAGA1001</strong></p>
   <nav class="hall-portals" aria-label="八个探索世界">${worlds.map(portalLink).join('')}</nav>
   <a class="hall-mobile-more" href="#/worlds">探索全部 8 个世界 <span aria-hidden="true">↗</span></a>
   <a class="hall-inspiration" href="#/realm/healing"><span><small>Daily Inspiration · 每日灵感</small><strong>A small step, a brighter you.</strong><em>停一停，留意今天让你微笑的一件小事。</em></span><b aria-hidden="true">↗</b></a>
   <a class="hall-scroll" href="#discover" data-section-link="discover">Scroll to explore<span aria-hidden="true">⌄</span></a>
  </section>
  <section id="discover" class="hall-directory">
   <div class="hall-section-heading"><p class="section-kicker">DIFFERENT PATHS · ONE HOME</p><h2>八个世界。<br><span>从你的好奇开始。</span></h2><p>陪伴、智慧、信仰、星辰与自然。选择一种视角，慢慢探索。</p></div>
   <div class="hall-world-grid">${worlds.map(worldCard).join('')}</div>
  </section>
  <section class="hall-bunny-feature"><a class="hall-bunny-image" href="#/realm/bunny" aria-label="探索 Bunny 世界"><img src="/assets/bunny-world.jpg" alt="花园里温柔的白色 Bunny，远处是阳光、城堡与瀑布" width="1774" height="887" loading="lazy"></a><div><p class="section-kicker">MEET BUNNY</p><h2>A little wonder.<br>A little more you.</h2><p>给日常一点温柔，也给自己一种新的看法。<br>和 Bunny 一起，探索原创水晶神谕卡与反思灵感。</p><a class="hall-button hall-button-primary" href="#/realm/bunny">进入 Bunny 世界 <span aria-hidden="true">→</span></a></div></section>
  <section id="products" class="v21-worlds hall-products"><div class="hall-section-heading"><p class="section-kicker">TOOLS FOR YOUR JOURNEY</p><h2>把好奇，带回生活。</h2><p>六款独立产品，通向不同的真实体验。</p></div><div class="world-grid brand-world-grid">${shortcuts.map(brandCard).join('')}</div><a class="hall-text-link" href="/products/">探索全部产品与内容 <span aria-hidden="true">→</span></a></section>
  <section class="hall-closing"><p class="section-kicker">A KINDER WORLD · A BRIGHTER YOU</p><h2>每一种探索，<br>都可以从今天开始。</h2><a class="hall-button hall-button-primary" href="#/chat">和 SAGA 聊聊 <span aria-hidden="true">→</span></a><a class="hall-text-link" href="/about/">了解 SAGA1001</a></section>
 </main>${footer()}${bottomNav('home')}</div>`;}
function worldUiGlyph(name){
 const paths={
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  star:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  card:'<rect x="6" y="3" width="13" height="18" rx="3"/><path d="m12.5 8 1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2 1.2-2.8Z"/><path d="M3 7v10a3 3 0 0 0 3 3"/>',
  moon:'<path d="M20.7 13.2A8.8 8.8 0 0 1 10.8 3.3 9 9 0 1 0 20.7 13.2Z"/><path d="M17 3v4M15 5h4"/>',
  chat:'<path d="M21 11.4a8.5 8.5 0 0 1-8.5 8.5 9.1 9.1 0 0 1-3.4-.7L3 21l1.8-5.6a8.5 8.5 0 1 1 16.2-4Z"/><path d="M8 11h8M8 14h5"/>',
  leaf:'<path d="M20 3c-1 8-1 16-10 16a7 7 0 0 1-7-7C3 5 13 5 20 3Z"/><path d="m3 21 12-12"/>',
  book:'<path d="M12 5v15M3 4h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3V4Z"/>',
  arrow:'<path d="m8 4 8 8-8 8"/>',
  send:'<path d="m4 4 17 8-17 8 3-8-3-8Z"/><path d="M7 12h13"/>'
 };
 return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.star}</svg>`;
}
function bunnyWorldPage(){return `<div class="page inner-page product-detail-page wh-product-page wh-bunny-page">
 <div class="mobile-app-head"><a href="#/worlds" aria-label="返回全部世界">${icon('back')}</a><strong>Bunny</strong><a class="wh-head-link" href="#/library" aria-label="浏览内容库">${icon('library')}</a></div>
 ${topbar()}
 <main class="wh-world-detail-main">
  <a class="detail-back wh-desktop-back" href="#/worlds">← 返回世界大厅</a>
  <section class="bunny-hero" aria-labelledby="bunny-heading"><img src="/assets/bunny-world.jpg" alt="Bunny 的花园世界：白色小兔、花朵、阳光和远处的云端城堡" width="1774" height="887" fetchpriority="high"><div class="bunny-hero-copy"><span class="bunny-world-label">BUNNY WORLD</span><h1 id="bunny-heading">Bunny</h1><p>一点日常灵感，<br>一个温柔看见自己的时刻。</p></div></section>
  <div class="bunny-actions"><a class="btn cyan" href="https://bunny.saga1001.com/" target="_blank" rel="noopener noreferrer">打开 Bunny 产品 <span aria-hidden="true">↗</span></a><a class="btn ghost" href="#bunny-about" data-section-link="bunny-about">了解更多</a></div>
  <nav class="bunny-section-nav" aria-label="Bunny 页面内容"><a href="#bunny-about" data-section-link="bunny-about">About</a><a href="#bunny-features" data-section-link="bunny-features">Features</a><a href="#bunny-screenshots" data-section-link="bunny-screenshots">Screenshots</a><a href="#bunny-community" data-section-link="bunny-community">Community</a></nav>
  <section id="bunny-about" class="bunny-content-section"><p class="wh-overline">CRYSTAL ORACLE · SELF-REFLECTION</p><h2>一张卡，<br>一次与自己的温柔对话。</h2><p>Bunny Crystal Oracle 以原创水晶神谕卡为入口，用牌面、意象和问题，陪你整理当下的感受，开启关系思考与日常小仪式。</p></section>
  <section id="bunny-features" class="bunny-content-section"><h2>从一点好奇开始。</h2><div class="bunny-feature-list"><article><span>${worldUiGlyph('card')}</span><div><h3>原创水晶神谕卡</h3><p>从一张牌的意象，找到反思的起点。</p></div></article><article><span>${worldUiGlyph('heart')}</span><div><h3>看见当下的感受</h3><p>把问题带回自己的经历与选择。</p></div></article><article><span>${worldUiGlyph('star')}</span><div><h3>一点日常仪式感</h3><p>留一个安静的时刻，听听自己的声音。</p></div></article></div></section>
  <section id="bunny-screenshots" class="bunny-content-section"><h2>A glimpse of Bunny.</h2><div class="bunny-gallery"><figure><a href="https://bunny.saga1001.com/" target="_blank" rel="noopener noreferrer"><img src="/assets/product-bunny.jpg" alt="Bunny Crystal Oracle 独立产品网站截图" width="840" height="520" loading="lazy"></a><figcaption>产品网站预览</figcaption></figure><figure><img src="/assets/bunny-world.jpg" alt="Bunny 世界的花园场景插画" width="1774" height="887" loading="lazy"><figcaption>Bunny 世界视觉</figcaption></figure></div></section>
  <section id="bunny-community" class="bunny-content-section bunny-community-card"><span class="wh-overline">DIFFERENT PATHS · ONE HOME</span><h2>让好奇继续。</h2><p>继续探索 SAGA 的内容、故事与其他世界。</p><a class="wh-inline-link" href="#/community">前往 Community ${worldUiGlyph('arrow')}</a></section>
  <p class="bunny-product-note">Bunny Crystal Oracle 是独立的反思与娱乐产品。功能、账号和付费内容请在 Bunny 官网查看。</p>
 </main>${footer()}${bottomNav('worlds')}</div>`;}
function chat(){
 const starterPrompts=[
  ['heart','Talk about my feelings','I want to talk about how I feel today.','mint'],
  ['star','Explore Buddhism','I want to explore a Buddhist idea.','amber'],
  ['card','Try a card reflection','I would like a reflective card prompt.','violet'],
  ['moon','A gentle wind-down','I want a gentle wind-down idea before sleep.','lilac'],
  ['chat','Ask anything…','','purple']
 ];
 return `<div class="page app-page chat-page wh-app-page wh-chat-page">
  <div class="mobile-app-head"><a href="#/" aria-label="返回世界大厅">${icon('back')}</a><strong><span class="wh-brand-spark" aria-hidden="true">✧</span> SAGA</strong><a class="wh-head-link" href="#/worlds" aria-label="探索世界">${icon('worlds')}</a></div>
  ${topbar()}
  <main class="chat-main wh-chat-main">
   ${messages.length?`<div class="wh-chat-session"><span class="wh-preview-pill">体验预览 · 预设回复</span><a href="#/worlds">探索独立产品 ${worldUiGlyph('arrow')}</a></div><div class="message-list" role="log" aria-live="polite" aria-relevant="additions text">${messages.map(m=>`<div class="message ${m.from}"><span class="wh-message-name">${m.from==='user'?'You':'SAGA · Preview'}</span>${esc(m.text)}</div>`).join('')}</div>`:`<div class="chat-welcome"><div class="saga-avatar wh-saga-avatar">${worldUiGlyph('star')}</div><h1>Hi, I'm SAGA</h1><p>为更温柔、更明亮的你。<br>今天，想从什么开始探索？</p><span class="wh-preview-pill">体验预览 · 预设回复</span><div class="prompt-list wh-prompt-list" aria-label="选择一个话题">${starterPrompts.map(([glyph,label,prompt,tone])=>`<button type="button" data-prompt="${esc(prompt)}"><span class="wh-prompt-symbol wh-tone-${tone}">${worldUiGlyph(glyph)}</span>${label}<span class="wh-prompt-arrow">${worldUiGlyph('arrow')}</span></button>`).join('')}</div></div>`}
   <form class="chat-form"><input name="message" autocomplete="off" placeholder="Message SAGA…" aria-label="向 SAGA 发送消息" required maxlength="2000"/><button type="submit" class="send" aria-label="发送消息">${worldUiGlyph('send')}</button></form>
   <small class="chat-note">当前为预设回复体验，尚未连接通用 AI 服务。<br>产品体验可从 <a href="#/worlds">Worlds</a> 继续。</small>
  </main>${bottomNav('chat')}
 </div>`;
}
function worldsPage(){return `<div class="page inner-page hall-worlds-page">${topbar()}<main class="hall-directory"><div class="hall-section-heading"><p class="section-kicker">EXPLORE YOUR WORLDS</p><h1>Different paths.<br>One home.</h1><p>八个探索方向，每一扇门都从你的好奇开始。</p></div><div class="hall-world-grid">${worlds.map(worldCard).join('')}</div><p class="hall-directory-note">世界是探索主题。你可以在主题介绍中，继续进入对应的独立产品。</p><a class="hall-text-link" href="/products/">查看六款独立产品 →</a></main>${footer()}${bottomNav('worlds')}</div>`;}
function realmPage(id){if(id==='bunny')return productPage('bunny');const w=worlds.find(item=>item.id===id);if(!w)return worldsPage();return `<div class="page inner-page hall-realm-page">${topbar()}<main class="hall-realm-main"><a class="hall-text-link" href="#/worlds">← 返回世界大厅</a><header class="hall-realm-header">${worldMark(w)}<p class="section-kicker">${w.caption} · ${w.zh}</p><h1>${w.name}</h1><p>${w.detail}</p>${w.status?`<span class="hall-status">${w.status}</span>`:''}</header>${w.url?`<a class="hall-external-realm" href="${w.url}" target="_blank" rel="noopener noreferrer"><span>ASTROLOGY · COSMOS</span><strong>${w.productName} ↗</strong><small>进入独立产品，探索星盘与自我。</small></a>`:''}<div class="world-grid brand-world-grid">${shortcuts.filter(p=>w.products.includes(p.id)).map(brandCard).join('')}</div>${w.breathing?'<a class="hall-breath-link" href="/apps/chromatic-breathing/"><span>一次温柔的呼吸休息</span><strong>Chromatic Breathing <b aria-hidden="true">↗</b></strong><small>了解颜色引导的呼吸 App</small></a>':''}<a class="hall-text-link" href="#/chat">带着一个问题，和 SAGA 聊聊 →</a></main>${footer()}${bottomNav('worlds')}</div>`;}
function mePage(){return `<div class="page inner-page hall-me-page">${topbar()}<main class="hall-realm-main"><header class="hall-realm-header"><span class="hall-me-icon">${icon('me')}</span><p class="section-kicker">YOUR SAGA</p><h1>为自己，留一个空间。</h1><p>从今天的一次提问、一个梦或一张卡，开始属于你的探索。</p></header><div class="hall-me-links"><a href="#/chat"><strong>和 SAGA 聊聊</strong><span>对话体验预览 →</span></a><a href="#/library"><strong>我的探索书架</strong><span>文化、自然与知识 →</span></a><a href="https://dreamplot.saga1001.com/book" target="_blank" rel="noopener noreferrer"><strong>记住一个梦</strong><span>前往 DreamPlot ↗</span></a></div><p class="hall-directory-note">SAGA 个人账户正在筹备。各产品的账号与记录在对应的产品网站管理。</p></main>${bottomNav('me')}</div>`;}

function community(){
 const tabData={
  Featured:{title:'Share your journey.',line:'Inspire each other.',copy:'从一个想法出发，与更大的世界相遇。',href:'#/library',cta:'探索内容',heading:'Explore Topics',items:[
   ['leaf','Mindfulness & Nature','自然与日常','https://healing.saga1001.com/'],
   ['chat','AI & Self-reflection','体验预览','#/chat'],
   ['moon','Dreams & Stories','梦境与记录','https://dreamplot.saga1001.com/book'],
   ['book','Culture & Wisdom','经典与文化','https://dharma.saga1001.com/']
  ]},
  Latest:{title:'A world in the making.',line:'Follow the story.',copy:'查看 SAGA 的项目动态与创作进展。',href:'/press/',cta:'查看最新动态',heading:'Updates & Reading',items:[
   ['star','SAGA / Bunny · WMF 2027','项目入选公告','/press/wmf-soft-landing-2027/'],
   ['book','DreamPlot · 梦频日记','作品与试读','https://dreamplot.saga1001.com/book'],
   ['card','Bunny Crystal Oracle','探索原创卡牌','https://bunny.saga1001.com/']
  ]},
  Events:{title:'Different paths.',line:'A place to meet.',copy:'从公开项目动态，了解我们正在参与的交流。',href:'/press/wmf-soft-landing-2027/',cta:'查看项目动态',heading:'Around SAGA',items:[
   ['star','WMF 2027 Soft Landing','参与安排见公告','/press/wmf-soft-landing-2027/'],
   ['chat','Collaborate with SAGA','探讨合作','/partners/'],
   ['book','Public updates','阅读全部动态','/press/']
  ]},
  Creators:{title:'Ideas begin with people.',line:'Meet the creator.',copy:'认识 SAGA 的创始人，以及这些世界背后的想法。',href:'/about/',cta:'认识 Joyce',heading:'People & Stories',items:[
   ['star','Joyce · Founder','认识创始人','/about/'],
   ['book','DreamPlot · 梦频日记','个人叙事与记录','https://dreamplot.saga1001.com/book'],
   ['chat','SAGA media kit','品牌与创作资料','/media-kit/']
  ]}
 };
 const data=tabData[activeCommunityTab]||tabData.Featured;
 return `<div class="page app-page community-page wh-app-page wh-community-page">
  <div class="mobile-app-head"><a href="#/" aria-label="返回世界大厅">${icon('back')}</a><strong>Community</strong><a class="wh-head-link" href="#/library" aria-label="浏览内容库">${icon('library')}</a></div>
  ${topbar()}
  <main class="community-main wh-community-main">
   <div class="community-heading"><p class="section-kicker">PEOPLE · STORIES · IDEAS</p><h1>Community</h1><p>不同的旅程，在这里相遇。</p></div>
   <div class="tabs wh-community-tabs" role="group" aria-label="内容分类">${['Featured','Latest','Events','Creators'].map(t=>`<button type="button" class="${activeCommunityTab===t?'active':''}" aria-pressed="${activeCommunityTab===t}" data-community-tab="${t}">${t}</button>`).join('')}</div>
   <section class="community-banner" aria-label="${esc(data.title)}"><div><h2>${data.title}<br>${data.line}</h2><p>${data.copy}</p><a class="btn light" href="${data.href}">${data.cta} <span aria-hidden="true">↗</span></a></div></section>
   <section class="popular wh-topics"><h2>${data.heading}</h2>${data.items.map(([glyph,name,caption,href])=>`<a class="wh-topic-link" href="${href}"${href.startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}><span class="wh-topic-symbol">${worldUiGlyph(glyph)}</span><span class="wh-topic-copy"><strong>${name}</strong><small>${caption}</small></span><span class="wh-topic-arrow">${worldUiGlyph('arrow')}</span></a>`).join('')}</section>
   <p class="community-note"><span aria-hidden="true">✧</span> 社区互动功能正在筹备，当前可浏览内容与产品。</p>
  </main>${bottomNav('community')}
 </div>`;
}
function library(){return `<div class="page inner-page">${topbar()}<main class="content-wrap"><div class="page-title"><p class="section-kicker">SAGA1001 · EXPLORE</p><h1>沿着好奇心继续走。</h1><p>进入信仰、自然与自我探索的独立产品。</p></div><div class="world-grid worlds-page-grid brand-world-grid">${shortcuts.filter(p=>['dharma','bible','healing'].includes(p.id)).map(brandCard).join('')}</div></main>${footer()}${bottomNav('library')}</div>`;}
function about(){return `<div class="page inner-page">${topbar()}<main class="content-wrap"><div class="page-title"><p class="section-kicker">WHY SAGA EXISTS</p><h1>AI for a more conscious,<br/>kinder, more alive humanity.</h1><p>SAGA1001 is a home for many ways to ask, reflect, learn and create.</p></div><div class="about-story"><div class="about-art"></div><div><h2>One home. Many paths.</h2><p>We bring companions, cultural traditions, practical tools and creative worlds together so a question can become a meaningful next step.</p><p>Our approach starts with curiosity, compares perspectives and leaves room for real life to answer back.</p><a class="btn primary" href="#/worlds">Explore the worlds →</a></div></div><div class="principles"><div><strong>01</strong><h3>Begin with a question</h3><p>There is room for uncertainty and wonder.</p></div><div><strong>02</strong><h3>Explore many lenses</h3><p>Notice what different traditions and tools reveal.</p></div><div><strong>03</strong><h3>Bring it back to life</h3><p>Try a small action. Reflect on what changes.</p></div></div></main>${footer()}${bottomNav('home')}</div>`;}
function productCard(p){return `<article class="product-hall-card"><a href="#/world/${p.id}" class="product-hall-preview" aria-label="查看 ${p.name} 介绍"><img src="./assets/product-${p.id}.jpg" alt="${p.name} 产品网站预览" loading="lazy"/></a><div class="product-hall-copy"><small>${p.caption} · 可访问</small><h3>${p.name}</h3><p>${p.intro}</p><div><a href="#/world/${p.id}">查看介绍 →</a><a href="${p.href}" target="_blank" rel="noopener noreferrer">打开产品 ↗</a></div></div></article>`;}
function products(){return `<div class="page inner-page product-hall-page">${topbar()}<main class="content-wrap"><div class="page-title"><p class="section-kicker">THE PRODUCT HALL</p><h1>真实体验，<span>从这里开始。</span></h1><p>这里只展示可访问的 SAGA1001 身心灵产品。每个产品有自己的独立网站。</p></div><div class="product-hall-grid">${shortcuts.map(productCard).join('')}</div></main>${footer()}${bottomNav('worlds')}</div>`;}
function productPage(id){
 if(id==='bunny')return bunnyWorldPage();
 const p=shortcuts.find(item=>item.id===id);
 if(!p)return products();
 return `<div class="page inner-page product-detail-page wh-product-page">${topbar()}<main class="content-wrap"><a class="detail-back" href="#/products">← 返回产品大厅</a><div class="product-detail-grid"><div><p class="section-kicker">${p.caption} · SAGA1001</p><h1>${p.name}</h1><p>${p.intro}</p><p>在独立产品中继续探索，查看当前的功能与内容。</p><a class="btn primary" href="${p.href}" target="_blank" rel="noopener noreferrer">打开 ${p.name} ↗</a></div><img src="/assets/product-${p.id}.jpg" alt="${p.name} 产品网站预览"/></div></main>${footer()}${bottomNav('worlds')}</div>`;
}
let searchQuery='';
function searchPage(){const q=searchQuery.trim().toLowerCase();const found=worlds.filter(w=>(w.name+w.zh+w.caption+w.intro).toLowerCase().includes(q));const foundProducts=shortcuts.filter(p=>(p.name+p.caption+p.intro).toLowerCase().includes(q));return `<div class="page inner-page hall-search-page">${topbar()}<main class="hall-directory"><div class="hall-section-heading"><p class="section-kicker">FOLLOW YOUR CURIOSITY</p><h1>你想探索什么？</h1></div><form class="hall-search-form" role="search"><input name="query" type="search" value="${esc(searchQuery)}" placeholder="搜索世界、产品或主题" aria-label="搜索世界、产品或主题"><button class="hall-button hall-button-primary" type="submit">搜索</button></form><p class="hall-search-count" role="status">${q?`找到 ${found.length} 个世界、${foundProducts.length} 个产品`:'从八个世界和六款产品开始探索'}</p><div class="hall-world-grid">${found.map(worldCard).join('')}</div>${foundProducts.length?`<div class="world-grid brand-world-grid">${foundProducts.map(brandCard).join('')}</div>`:''}${!found.length&&!foundProducts.length?'<p class="hall-directory-note">暂时没有匹配的内容，试试“Bunny”“梦境”或“自然”。</p>':''}</main>${footer()}${bottomNav('worlds')}</div>`;}
function modal(){return activePoster!==null?`<div class="modal" role="dialog" aria-modal="true" aria-label="Joyce / GGC Vision poster ${activePoster}"><button class="modal-close" data-action="close-poster" aria-label="Close">×</button><img src="./assets/vision-${String(activePoster).padStart(2,'0')}.jpg" alt="Joyce / GGC Vision poster ${activePoster}"/><div class="modal-controls"><button data-action="prev-poster">← Previous</button><span>${activePoster} / 10</span><button data-action="next-poster">Next →</button></div></div>`:'';}
function render(){const r=route();let html=r==='home'?home():r==='chat'||r.startsWith('chat?')?chat():r==='worlds'?worldsPage():r==='me'?mePage():r==='search'?searchPage():r.startsWith('realm/')?realmPage(r.split('/')[1]):r.startsWith('world/')?productPage(r.split('/')[1]):r==='community'?community():r==='library'?library():r==='products'?products():r==='about'?about():home();app.innerHTML=html+modal();document.title=`${r==='home'?'World Hall':r.startsWith('world/')?shortcuts.find(p=>p.id===r.split('/')[1])?.name||'Products':r[0].toUpperCase()+r.slice(1)} · SAGA1001`;}
function responseFor(text){const t=text.toLowerCase();if(/sleep|rest|睡/.test(t))return 'Let us slow down together. What has your evening felt like? We can begin with one small wind-down step: put your phone down for a minute, breathe gently, and notice what your body needs.';if(/feel|emotion|难过|心情/.test(t))return 'I am here with you. If you had to give this feeling a name, what would it be? There is no need to solve everything at once.';if(/buddh|佛/.test(t))return 'A gentle place to begin is this: what changes when you notice an experience without immediately judging it? Tell me what you are curious about, and we can explore it together.';if(/tarot|card|抽卡/.test(t))return 'Here is a reflection prompt: The Star — where is a small light already present in your life? You can use this symbol to think, not as a prediction.';return 'Thank you for sharing that. What part of it feels most important to you right now? We can explore it one step at a time.';}
document.addEventListener('click',e=>{const sectionLink=e.target.closest('[data-section-link]');if(sectionLink){const section=document.getElementById(sectionLink.dataset.sectionLink);if(section){e.preventDefault();section.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}return;}const a=e.target.closest('[data-action]');if(a){const action=a.dataset.action;if(action==='menu'){document.body.classList.toggle('menu-open');let menu=document.querySelector('.mobile-menu');if(!menu){menu=document.createElement('div');menu.className='mobile-menu';menu.id='saga-mobile-menu';menu.setAttribute('role','dialog');menu.setAttribute('aria-modal','true');menu.setAttribute('aria-label','Navigation');menu.innerHTML='<button data-action="menu" aria-label="Close menu">×</button><a href="#/worlds">Worlds</a><a href="#/products">Products</a><a href="#/chat">AI Chat</a><a href="#/community">Community</a><a href="#/about">About</a><a href="#/library">Library</a><a href="#/search">Search</a>';document.body.append(menu);}menu.hidden=!document.body.classList.contains('menu-open');document.querySelectorAll('.hamburger').forEach(b=>b.setAttribute('aria-expanded',String(!menu.hidden)));if(!menu.hidden)menu.querySelector('button')?.focus();else document.querySelector('.hamburger')?.focus();}else if(action==='worlds')to('worlds');else if(action==='scroll')document.querySelector('#discover')?.scrollIntoView({behavior:'smooth'});else if(action==='search'){to('search');}else if(action==='voice'){alert('Voice input is coming soon. Type your question to begin.');}else if(action==='close-poster'){activePoster=null;render();}else if(action==='prev-poster'){activePoster=activePoster===1?10:activePoster-1;render();}else if(action==='next-poster'){activePoster=activePoster===10?1:activePoster+1;render();}return;}const homePrompt=e.target.closest('[data-hero-prompt]');if(homePrompt){const t=homePrompt.dataset.heroPrompt;messages.push({from:'user',text:t},{from:'saga',text:responseFor(t)});to('chat');return;}const promptButton=e.target.closest('[data-prompt]');if(promptButton){const t=promptButton.dataset.prompt;if(t){messages.push({from:'user',text:t},{from:'saga',text:responseFor(t)});render();}else document.querySelector('.chat-form input')?.focus();return;}const ct=e.target.closest('[data-community-tab]');if(ct){activeCommunityTab=ct.dataset.communityTab;render();return;}const topic=e.target.closest('[data-topic]');if(topic){to('chat');setTimeout(()=>{const input=document.querySelector('.chat-form input');if(input)input.value=`I want to explore ${topic.dataset.topic}.`;},0);return;}const poster=e.target.closest('[data-poster]');if(poster){activePoster=Number(poster.dataset.poster);render();return;}if(e.target.closest('.mobile-menu a')){document.body.classList.remove('menu-open');document.querySelector('.mobile-menu').hidden=true;}});
document.addEventListener('submit',e=>{if(e.target.matches('.hall-search-form')){e.preventDefault();searchQuery=e.target.elements.query.value;render();document.querySelector('.hall-search-form input')?.focus();return;}if(e.target.matches('.hero-question')){e.preventDefault();const t=e.target.elements.question.value.trim();if(t){messages.push({from:'user',text:t},{from:'saga',text:responseFor(t)});to('chat');}return;}if(e.target.matches('.chat-form')){e.preventDefault();const input=e.target.elements.message;const t=input.value.trim();if(!t)return;messages.push({from:'user',text:t},{from:'saga',text:responseFor(t)});render();document.querySelector('.message-list')?.scrollIntoView({block:'end'});}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(activePoster!==null){activePoster=null;render();}if(document.body.classList.contains('menu-open')){document.body.classList.remove('menu-open');document.querySelector('.mobile-menu').hidden=true;const trigger=document.querySelector('.hamburger');trigger?.setAttribute('aria-expanded','false');trigger?.focus();}}if(e.key==='Tab'&&document.body.classList.contains('menu-open')){const items=[...document.querySelector('.mobile-menu').querySelectorAll('a,button')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
window.addEventListener('hashchange',()=>{activePoster=null;document.body.classList.remove('menu-open');const menu=document.querySelector('.mobile-menu');if(menu)menu.hidden=true;render();window.scrollTo(0,0);});
render();
