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
