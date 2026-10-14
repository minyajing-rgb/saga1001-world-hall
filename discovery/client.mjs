/* Progressive enhancement only. Indexable text exists in HTML without this module. */
const summary=document.querySelector('#discovery-summary')?.cloneNode(true);
const rootTitle=document.title;
const routes={'#/':'/','#/worlds':'/products/','#/products':'/products/','#/about':'/about/','#/press':'/press/','#/media-kit':'/media-kit/','#/partners':'/partners/','#/press/wmf-soft-landing-2027':'/press/wmf-soft-landing-2027/','#/world/bunny':'/products/bunny-crystal-oracle/','#/world/plot':'/products/plot/','#/world/dreamplot':'/products/dreamplot/','#/world/dharma':'/products/dharma-atlas/','#/world/bible':'/products/from-john-to-jesus/','#/world/healing':'/products/earth-healing/'};
export function mountDiscovery(){
 const root=document.querySelector('#app');if(!root)return;
 function apply(){const h=location.hash;if(h&&h!=='#/'&&routes[h]){location.replace(routes[h]);return;}
  if(!h||h==='#/'){if(summary&&!root.querySelector('#discovery-summary'))root.querySelector('main')?.append(summary.cloneNode(true));document.title=rootTitle;}
  root.querySelectorAll('a[href^="#/"]').forEach(a=>{const target=routes[a.getAttribute('href')];if(target)a.setAttribute('href',target);});
  const footer=root.querySelector('.footer');if(footer&&!footer.querySelector('[data-discovery-nav]')){const nav=document.createElement('nav');nav.dataset.discoveryNav='true';nav.className='pr-footer-links';nav.innerHTML='<a href="/products/">产品与关键词指南</a><a href="/en/">English</a><a href="/apps/chromatic-breathing/">呼吸 App</a><a href="/about/">SAGA 与 Joyce</a>';footer.append(nav);}
 }
 const observer=new MutationObserver(apply);observer.observe(root,{childList:true});window.addEventListener('hashchange',apply);apply();return()=>{observer.disconnect();window.removeEventListener('hashchange',apply);};
}
const copyButton=document.querySelector('[data-copy-kit]');
copyButton?.addEventListener('click',async()=>{const status=document.querySelector('.discovery-copy-status');const en=document.documentElement.lang==='en';try{if(!navigator.clipboard?.writeText)throw Error('Clipboard not available');await navigator.clipboard.writeText(document.querySelector('#media-kit-copy').textContent);status.textContent=en?'Text copied.':'文字已复制。';}catch{status.textContent=en?'Clipboard unavailable. Select the text or use the download link.':'浏览器未允许复制，请选取下方文字或下载文本。';}});
const filters=document.querySelector('[data-discovery-filters]');
if(filters){filters.hidden=false;filters.addEventListener('click',event=>{const button=event.target.closest('[data-discovery-filter]');if(!button)return;const kind=button.dataset.discoveryFilter;filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('[data-discovery-kind]').forEach(card=>{card.hidden=kind!=='all'&&card.dataset.discoveryKind!==kind;if(!card.hidden)count++;});document.querySelector('[data-discovery-count]').textContent=count+(document.documentElement.lang==='en'?' records':' 条记录');});}
