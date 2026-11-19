// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));

// Offer popup: show on the first visit using a fresh version key.
// Using a new key makes the popup show for browsers that visited the earlier build.
const popup = document.getElementById('offerPopup');
const closePopup = document.getElementById('popupClose');
const popupSeenKey = 'ssInternetFreeOfferSeen_v2';
let alreadySeen = false;
try { alreadySeen = localStorage.getItem(popupSeenKey) === '1'; } catch (e) { alreadySeen = false; }
if (popup && !alreadySeen) {
  window.setTimeout(() => {
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    try { localStorage.setItem(popupSeenKey, '1'); } catch (e) {}
  }, 500);
}
function hidePopup() {
  popup?.classList.remove('show');
  popup?.setAttribute('aria-hidden', 'true');
}
closePopup?.addEventListener('click', hidePopup);
popup?.addEventListener('click', event => { if (event.target === popup) hidePopup(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') hidePopup(); });
