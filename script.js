// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
function setMenuOpen(open){mainNav?.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menuToggle?.setAttribute('aria-expanded',String(open));}
menuToggle?.addEventListener('click', () => setMenuOpen(!mainNav?.classList.contains('open')));
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

// Hero banner slider: alternate the original banner and Refer & Earn banner.
const heroSlides=[...document.querySelectorAll('.hero-banner-slide')];
const heroDots=[...document.querySelectorAll('.hero-banner-dot')];
let heroIndex=0;
function showHeroBanner(i){if(!heroSlides.length)return;heroIndex=(i+heroSlides.length)%heroSlides.length;heroSlides.forEach((slide,n)=>slide.classList.toggle('active',n===heroIndex));heroDots.forEach((dot,n)=>dot.classList.toggle('active',n===heroIndex));}
heroDots.forEach(dot=>dot.addEventListener('click',()=>showHeroBanner(Number(dot.dataset.banner))));
document.querySelector('.hero-banner-arrow.prev')?.addEventListener('click',()=>showHeroBanner(heroIndex-1));
document.querySelector('.hero-banner-arrow.next')?.addEventListener('click',()=>showHeroBanner(heroIndex+1));
if(heroSlides.length>1){window.setInterval(()=>showHeroBanner(heroIndex+1),6000);}

// Offer popup: show once ever per browser using persistent localStorage.
// Set the seen flag immediately, so refreshing cannot trigger it again.
const popup = document.getElementById('offerPopup');
const closePopup = document.getElementById('popupClose');
const popupSeenKey = 'ssInternetFreeOfferSeen_v3';
let popupAlreadySeen = false;
try {
  popupAlreadySeen = localStorage.getItem(popupSeenKey) === '1';
} catch (e) {
  popupAlreadySeen = false;
}
if (popup && !popupAlreadySeen) {
  try { localStorage.setItem(popupSeenKey, '1'); } catch (e) {}
  window.setTimeout(() => {
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
  }, 350);
}
function hidePopup() {
  popup?.classList.remove('show');
  popup?.setAttribute('aria-hidden', 'true');
}
closePopup?.addEventListener('click', hidePopup);
popup?.addEventListener('click', event => { if (event.target === popup) hidePopup(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { hidePopup(); setMenuOpen(false); } });

// Offers slider, cycling automatically with manual dots.
const slides = [...document.querySelectorAll('.offer-slide')];
const dots = [...document.querySelectorAll('.slider-dot')];
let currentSlide = 0;
function showOfferSlide(index){slides.forEach((s,i)=>s.classList.toggle('active',i===index));dots.forEach((d,i)=>d.classList.toggle('active',i===index));currentSlide=index;}
dots.forEach(dot=>dot.addEventListener('click',()=>showOfferSlide(Number(dot.dataset.slide))));
if(slides.length>1){setInterval(()=>showOfferSlide((currentSlide+1)%slides.length),6500);}
// Light/dark mode preference persists across visits.
const themeToggle=document.getElementById('themeToggle');
let savedTheme='dark';try{savedTheme=localStorage.getItem('ssInternetTheme')||'dark';}catch(e){}
if(savedTheme==='light')document.body.classList.add('light-mode');
function updateThemeButton(){if(themeToggle)themeToggle.textContent=document.body.classList.contains('light-mode')?'☾':'☼';}
updateThemeButton();themeToggle?.addEventListener('click',()=>{document.body.classList.toggle('light-mode');const t=document.body.classList.contains('light-mode')?'light':'dark';try{localStorage.setItem('ssInternetTheme',t);}catch(e){}updateThemeButton();});
// Connection request and complaint forms prepare WhatsApp messages (no data stored on this site).
function openWhatsAppMessage(message){window.open('https://wa.me/8801817348720?text='+encodeURIComponent(message),'_blank','noopener');}
document.getElementById('connectionForm')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);openWhatsAppMessage(`SS Internet New Connection Request\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nAddress: ${d.get('address')}\nPackage: ${d.get('package')}`);});
document.getElementById('complaintForm')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);openWhatsAppMessage(`SS Internet Complaint\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nIssue: ${d.get('issue')}\nDetails: ${d.get('details')||'Not specified'}`);});

