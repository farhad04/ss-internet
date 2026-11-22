// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));

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
document.addEventListener('keydown', event => { if (event.key === 'Escape') hidePopup(); });

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

// Admin editor: demo-local storage, but applies Notice and Offer text to visible page.
const unlockBtn = document.getElementById('adminUnlock');
const adminEditor = document.getElementById('adminEditor');
const pinInput = document.getElementById('adminPin');
unlockBtn?.addEventListener('click', () => {
  if (pinInput?.value === '2468') { adminEditor?.classList.remove('hidden'); pinInput.value = ''; loadSiteContent(); }
  else alert('PIN ভুল। Demo PIN: 2468');
});
const noticeTitleInput = document.getElementById('noticeTitle');
const noticeMessageInput = document.getElementById('noticeMessage');
const offerTextInput = document.getElementById('offerText');
const saveContentBtn = document.getElementById('saveSiteContent');
const resetContentBtn = document.getElementById('resetSiteContent');
function applySiteContent(c) {
  const firstNotice = document.querySelector('#notices .notice-card');
  if (firstNotice) { const h=firstNotice.querySelector('h3'); const q=firstNotice.querySelector('p'); if(h && c.noticeTitle) h.textContent=c.noticeTitle; if(q && c.noticeMessage) q.textContent=c.noticeMessage; }
  const offerIntro=document.querySelector('#offers .section-heading > p:last-child'); if(offerIntro && c.offerText) offerIntro.textContent=c.offerText;
}
function loadSiteContent(){ try { const c=JSON.parse(localStorage.getItem('ssInternetSiteContentDemo')||'{}'); if(noticeTitleInput)noticeTitleInput.value=c.noticeTitle||''; if(noticeMessageInput)noticeMessageInput.value=c.noticeMessage||''; if(offerTextInput)offerTextInput.value=c.offerText||''; applySiteContent(c); } catch(e){} }
saveContentBtn?.addEventListener('click', () => { const c={noticeTitle:noticeTitleInput?.value||'',noticeMessage:noticeMessageInput?.value||'',offerText:offerTextInput?.value||''}; try{localStorage.setItem('ssInternetSiteContentDemo',JSON.stringify(c));applySiteContent(c);alert('Saved এবং Notice/Offer আপডেট হয়েছে (এই ব্রাউজারে)।');}catch(e){alert('সেভ করা যায়নি।');} });
resetContentBtn?.addEventListener('click', () => { try{localStorage.removeItem('ssInternetSiteContentDemo');}catch(e){} if(noticeTitleInput)noticeTitleInput.value='';if(noticeMessageInput)noticeMessageInput.value='';if(offerTextInput)offerTextInput.value='';alert('Demo content reset হয়েছে। পেজ রিফ্রেশ করে মূল কনটেন্ট দেখুন।');location.reload(); });
loadSiteContent();
