const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};
const API = 'api/';

const TXT = {
  en: { newin: 'New in', men: 'Men', women: 'Women', sales: 'Sales', all: 'All', login: 'Login', logout: 'Logout', findus: 'Find us',
    hero: 'New Essential Tees', learn: 'Learn more', filters: 'Filters', sort: 'Sort', sortDef: 'Featured', sortLow: 'Price: low to high',
    sortHigh: 'Price: high to low', size: 'Size', anySize: 'Any size', colour: 'Colour', anyColour: 'Any colour', maxPrice: 'Max price',
    reset: 'Reset', none: 'No items match your filters.', close: 'Close', wishlist: 'Wishlist', addWish: 'Add to wishlist', inWish: 'In your wishlist',
    wishEmpty: 'Your wishlist is empty. Tap the heart on an item to save it.', pickSize: 'Choose a size', inStock: '{n} in stock', low: 'Only {n} left', out: 'Out of stock',
    colours: '{n} colours', saleTag: 'Sale', newTag: 'New', remove: 'Remove', name: 'Name', email: 'Email address', password: 'Password',
    signin: 'Sign in', signup: 'Create account', noAcc: 'No account? Create one', hasAcc: 'Already have an account? Sign in',
    badLogin: 'Wrong email or password.', exists: 'This email already has an account.', hi: 'Welcome, {n}!', bye: 'You are signed out.',
    locT: 'Select your location', location: 'Location', language: 'Language', continue: 'Continue', remember: 'Remember selection',
    getHelp: 'Get help', deliveryI: 'Delivery', returnsI: 'Returns', sizeG: 'Size guide', account: 'Account', createAcc: 'Create account',
    about: 'About', aboutUs: 'About us', contactUs: 'Contact us', region: 'Change region', rights: 'All rights reserved.' },
  fr: { newin: 'Nouveautés', men: 'Homme', women: 'Femme', sales: 'Soldes', all: 'Tout', login: 'Connexion', logout: 'Déconnexion', findus: 'Nous trouver',
    hero: 'Nouveaux t-shirts essentiels', learn: 'En savoir plus', filters: 'Filtres', sort: 'Trier', sortDef: 'En vedette', sortLow: 'Prix croissant',
    sortHigh: 'Prix décroissant', size: 'Taille', anySize: 'Toutes les tailles', colour: 'Couleur', anyColour: 'Toutes les couleurs', maxPrice: 'Prix max',
    reset: 'Réinitialiser', none: 'Aucun article ne correspond à vos filtres.', close: 'Fermer', wishlist: 'Favoris', addWish: 'Ajouter aux favoris', inWish: 'Dans vos favoris',
    wishEmpty: 'Votre liste de favoris est vide. Touchez le cœur sur un article pour le garder.', pickSize: 'Choisissez une taille', inStock: '{n} en stock', low: 'Plus que {n}', out: 'Épuisé',
    colours: '{n} couleurs', saleTag: 'Soldes', newTag: 'Nouveau', remove: 'Retirer', name: 'Nom', email: 'Adresse e-mail', password: 'Mot de passe',
    signin: 'Se connecter', signup: 'Créer un compte', noAcc: 'Pas de compte ? Créez-en un', hasAcc: 'Déjà un compte ? Connectez-vous',
    badLogin: 'E-mail ou mot de passe incorrect.', exists: 'Cet e-mail a déjà un compte.', hi: 'Bienvenue, {n} !', bye: 'Vous êtes déconnecté.',
    locT: 'Choisissez votre localisation', location: 'Localisation', language: 'Langue', continue: 'Continuer', remember: 'Mémoriser mon choix',
    getHelp: 'Aide', deliveryI: 'Livraison', returnsI: 'Retours', sizeG: 'Guide des tailles', account: 'Compte', createAcc: 'Créer un compte',
    about: 'À propos', aboutUs: 'Qui sommes-nous', contactUs: 'Nous contacter', region: 'Changer de région', rights: 'Tous droits réservés.' }
};

const INFO = {
  about: { en: ['About us', 'HVPE is a clothing brand founded in 2022. We design quality, stylish clothing for men and women and want shopping with us to be simple.'],
           fr: ['Qui sommes-nous', "HVPE est une marque de vêtements fondée en 2022. Nous créons des vêtements stylés et de qualité pour hommes et femmes, et voulons simplifier vos achats."] },
  delivery: { en: ['Delivery', [['truck-fast', 'Delivery in Port Louis on the same day'], ['box', 'Postage: a parcel may take up to 1 week to arrive'], ['store', 'Collect your order in our outlets']]],
              fr: ['Livraison', [['truck-fast', 'Livraison à Port-Louis le jour même'], ['box', "Envoi postal : un colis peut mettre jusqu'à 1 semaine à arriver"], ['store', 'Retrait de votre commande dans nos points de vente']]] },
  returns: { en: ['Returns', 'No return policy.'], fr: ['Retours', 'Aucune politique de retour.'] },
  size: { en: ['Size guide', ''], fr: ['Guide des tailles', ''] }
};

const S = { loc: store.get('loc', null), lang: store.get('lang', 'en'), cat: 'all', wish: store.get('wish', []), user: store.get('user', null),
            f: { sort: '', size: '', color: '', max: 0 }, cur: null };
const t = (k, v = {}) => (TXT[S.lang][k] || TXT.en[k] || k).replace(/\{(\w+)\}/g, (_, x) => v[x]);
const nm = o => o[S.lang];
const price = p => p.sale || p.price;
const money = n => { const l = LOCATIONS[S.loc || 'Mauritius']; return l.cur + (n * l.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
const pById = id => PRODUCTS.find(p => p.id == id);
const TEE = '<svg viewBox="0 0 100 100"><path d="M35 12 12 24l8 18 10-5v51h40V37l10 5 8-18-23-12q-15 12-30 0z" fill="currentColor"/></svg>';
const imgTag = (id, n) => { const src = (IMAGES[id] || [])[n - 1]; return src ? `<img src="${src}" alt="" onerror="this.remove()">` : '' };
let toastT; const toast = m => { const e = $('#toast'); e.textContent = m; e.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('show'), 2600) };

const stockCache = {};
function localMap(id, color) {
  return Object.fromEntries(pById(id).sizes.map(s => { let h = 0; for (const c of id + color + s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return [s, Math.max(0, h % 11 - 2)] }));
}
async function stockMap(id, color) {
  const k = id + '|' + color; if (stockCache[k]) return stockCache[k];
  let m; try { const r = await fetch(`${API}stock.php?product=${id}&color=${encodeURIComponent(color)}`); if (!r.ok) throw 0; m = (await r.json()).sizes; if (!m) throw 0 }
  catch { m = localMap(id, color) }
  return stockCache[k] = m;
}

function applyLang() {
  document.documentElement.lang = S.lang;
  $$('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  $$('[data-ph]').forEach(e => e.placeholder = t(e.dataset.ph));
  $$('.lgn').forEach(e => e.textContent = S.user ? `${t('logout')} (${S.user.name})` : t('login'));
  $('#regLbl').textContent = `${S.loc || 'Mauritius'}, ${LOCATIONS[S.loc || 'Mauritius'].cur}`;
  $('#fSize').innerHTML = `<option value="">${t('anySize')}</option>` + ['XS', 'S', 'M', 'L', 'XL'].map(s => `<option ${S.f.size == s ? 'selected' : ''}>${s}</option>`).join('');
  const cols = [...new Map(PRODUCTS.flatMap(p => p.colors).map(c => [c.en, c])).values()];
  $('#fColor').innerHTML = `<option value="">${t('anyColour')}</option>` + cols.map(c => `<option value="${c.en}" ${S.f.color == c.en ? 'selected' : ''}>${nm(c)}</option>`).join('');
  $('#fMaxLbl').textContent = money(+$('#fMax').value);
  $('#fSort').value = S.f.sort;
  renderGrid(); renderWish();
}
function openLoc() {
  $('#selLoc').innerHTML = Object.keys(LOCATIONS).map(l => `<option ${l == S.loc ? 'selected' : ''}>${l}</option>`).join('');
  $('#selLang').value = S.lang; $('#dLoc').showModal();
}
$('#selLang').onchange = e => { S.lang = e.target.value; applyLang() };
$('#fLoc').onsubmit = () => {
  S.loc = $('#selLoc').value; S.lang = $('#selLang').value;
  if ($('#rem').checked) { store.set('loc', S.loc); store.set('lang', S.lang) }
  applyLang();
};
$('#dLoc').addEventListener('cancel', e => { if (!S.loc) e.preventDefault() });

function list() {
  const f = S.f, cats = { all: () => 1, men: p => p.g == 'men', women: p => p.g == 'women', new: p => p.isNew, sale: p => p.sale };
  let a = PRODUCTS.filter(cats[S.cat]);
  if (f.max) a = a.filter(p => price(p) <= f.max);
  if (f.size) a = a.filter(p => p.sizes.includes(f.size));
  if (f.color) a = a.filter(p => p.colors.some(c => c.en == f.color));
  if (f.sort) a.sort((x, y) => (price(x) - price(y)) * (f.sort == 'low' ? 1 : -1));
  return a;
}
function renderGrid() {
  const a = list();
  $('#grid').innerHTML = a.map(p => `<article class="tile" data-id="${p.id}" tabindex="0" role="button">
    <div class="ph" style="color:${p.colors[0].hex}"><button class="th" data-wid="${p.id}" aria-label="${t('addWish')}"><i class="fa-${S.wish.some(w => w.id == p.id) ? 'solid' : 'regular'} fa-heart"></i></button>${TEE}${imgTag(p.id, 1)}${p.isNew ? `<b class="tag">${t('newTag')}</b>` : ''}${p.sale ? `<b class="tag">${t('saleTag')}</b>` : ''}</div>
    <h3>${nm(p.n)} <span>${t('colours', { n: p.colors.length })}</span></h3>
    <p>${p.sale ? `<s>${money(p.price)}</s> ${money(p.sale)}` : money(p.price)}</p></article>`).join('');
  $('#none').hidden = a.length > 0;
  $$('.tabs [data-cat]').forEach(b => b.classList.toggle('on', b.dataset.cat == S.cat));
}
function setCat(c, scroll = true) {
  S.cat = c; renderGrid();
  if (scroll) (c == 'all' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : $('#shop').scrollIntoView({ behavior: 'smooth' }));
  document.body.classList.remove('show-mobile-menu');
}
$('#ftoggle').onclick = () => $('#fbar').classList.toggle('open');
$('#fSort').onchange = e => { S.f.sort = e.target.value; renderGrid() };
$('#fSize').onchange = e => { S.f.size = e.target.value; renderGrid() };
$('#fColor').onchange = e => { S.f.color = e.target.value; renderGrid() };
$('#fMax').oninput = e => { S.f.max = +e.target.value >= 2900 ? 0 : +e.target.value; $('#fMaxLbl').textContent = money(+e.target.value); renderGrid() };
$('#fReset').onclick = () => { S.f = { sort: '', size: '', color: '', max: 0 }; $('#fMax').value = 2900; applyLang() };

const wkey = (id, color, size) => `${id}|${color}|${size || ''}`;
const inWish = (id, color, size) => S.wish.some(w => wkey(w.id, w.color, w.size) == wkey(id, color, size));
function toggleWish(id, color, size = '') {
  const i = S.wish.findIndex(w => wkey(w.id, w.color, w.size) == wkey(id, color, size));
  i < 0 ? S.wish.push({ id, color, size }) : S.wish.splice(i, 1);
  store.set('wish', S.wish); renderWish(); renderGrid();
}
function renderWish() {
  $('#cnt').textContent = S.wish.length || '';
  $('#wishBody').innerHTML = S.wish.length ? S.wish.map((w, n) => { const p = pById(w.id), ci = p.colors.findIndex(x => x.en == w.color), c = p.colors[ci];
    return `<div class="line" data-n="${n}"><div class="ph mini" style="color:${c.hex}">${TEE}${imgTag(p.id, ci + 1)}</div>
    <div><h4>${nm(p.n)}</h4><small>${nm(c)}${w.size ? ' / ' + w.size : ''}</small></div>
    <div class="rt"><button data-rm="${n}" aria-label="${t('remove')}"><i class="fa-solid fa-xmark"></i></button><b>${money(price(p))}</b></div></div>`;
  }).join('') : `<p class="none">${t('wishEmpty')}</p>`;
}
$('#wishBody').onclick = e => {
  const rm = e.target.closest('[data-rm]'), ln = e.target.closest('.line');
  if (rm) { S.wish.splice(+rm.dataset.rm, 1); store.set('wish', S.wish); renderWish(); renderGrid() }
  else if (ln) { const w = S.wish[+ln.dataset.n]; $('#dWish').close(); openProduct(w.id, w.color, w.size) }
};

async function openProduct(id, color, size) {
  Object.keys(stockCache).forEach(k => delete stockCache[k]);
  const p = pById(id), ci = Math.max(0, p.colors.findIndex(c => c.en == color));
  S.cur = { p, ci, size: size || null, map: {} };
  drawProduct(); $('#dProd').showModal(); loadStock();
}
async function loadStock() {
  const c = S.cur, ci = c.ci, m = await stockMap(c.p.id, c.p.colors[ci].en);
  if (S.cur === c && c.ci === ci) { c.map = m; drawProduct() }
}
function drawProduct() {
  const { p, ci, size, map } = S.cur, c = p.colors[ci], q = size ? map[size] : undefined, on = inWish(p.id, c.en, size);
  const msg = !size ? t('pickSize') : q === undefined ? '…' : q == 0 ? t('out') : q <= 3 ? t('low', { n: q }) : t('inStock', { n: q });
  $('#prodBody').innerHTML = `
  <div class="ph big" style="color:${c.hex}">${TEE}${imgTag(p.id, ci + 1)}</div>
  <div class="info"><h2>${nm(p.n)}</h2>
    <p class="pr">${p.sale ? `<s>${money(p.price)}</s> ` : ''}${money(price(p))}</p>
    <p class="lbl">${t('colour')}: <b>${nm(c)}</b></p>
    <div class="sw">${p.colors.map((x, i) => `<button class="${i == ci ? 'on' : ''}" data-ci="${i}" style="background:${x.hex}" title="${nm(x)}" aria-label="${nm(x)}"></button>`).join('')}</div>
    <p class="lbl">${t('size')}:</p>
    <div class="sz">${p.sizes.map(s => `<button class="${s == size ? 'on' : ''}" data-size="${s}" ${map[s] === 0 ? 'disabled' : ''}>${s}</button>`).join('')}</div>
    <p class="stock ${q === 0 ? 'bad' : q <= 3 ? 'warn' : ''}">${q > 0 ? '<i class="fa-solid fa-check"></i> ' : ''}${msg}</p>
    <button class="solid wbtn ${on ? 'on' : ''}" id="wishBtn"><i class="fa-${on ? 'solid' : 'regular'} fa-heart"></i> ${t(on ? 'inWish' : 'addWish')}</button></div>`;
}
$('#prodBody').onclick = e => {
  const b = e.target.closest('button'); if (!b) return; const c = S.cur;
  if (b.dataset.ci) { c.ci = +b.dataset.ci; c.map = {}; if (c.size) c.size = null; drawProduct(); loadStock() }
  else if (b.dataset.size) { c.size = c.size == b.dataset.size ? null : b.dataset.size; drawProduct() }
  else if (b.id == 'wishBtn') { toggleWish(c.p.id, c.p.colors[c.ci].en, c.size || ''); drawProduct() }
};
$('#grid').onclick = e => {
  const h = e.target.closest('.th');
  if (h) {
    const id = +h.dataset.wid, p = pById(id);
    if (S.wish.some(w => w.id == id)) { S.wish = S.wish.filter(w => w.id != id); store.set('wish', S.wish); renderWish(); renderGrid() }
    else toggleWish(id, p.colors[0].en);
    return;
  }
  const a = e.target.closest('.tile'); if (a) openProduct(+a.dataset.id);
};
$('#grid').onkeydown = e => { if (e.key == 'Enter' && e.target.classList.contains('tile')) e.target.click() };

let signup = false;
function drawLogin() {
  $('#loginT').textContent = t(signup ? 'signup' : 'signin'); $('#loginBtn').textContent = t(signup ? 'signup' : 'signin');
  $('#swapLogin').textContent = t(signup ? 'hasAcc' : 'noAcc'); $('#lName').hidden = !signup; $('#lName').required = signup;
}
$('#swapLogin').onclick = e => { e.preventDefault(); signup = !signup; drawLogin() };
$('#fLogin').onsubmit = e => {
  e.preventDefault(); const d = Object.fromEntries(new FormData(e.target)), users = store.get('users', {});
  if (signup) { if (users[d.email]) return toast(t('exists')); users[d.email] = { name: d.name, pass: d.pass }; store.set('users', users) }
  else if (!users[d.email] || users[d.email].pass != d.pass) return toast(t('badLogin'));
  S.user = { name: users[d.email].name, email: d.email }; store.set('user', S.user);
  $('#dLogin').close(); applyLang(); toast(t('hi', { n: S.user.name }));
};

function openInfo(k) {
  const [h, b] = INFO[k][S.lang]; $('#infoT').textContent = h;
  $('#infoB').innerHTML = k == 'size' ? `<img class="chart" src="${SITE_IMAGES.sizeChart}" alt="${h}" onerror="this.onerror=null;this.src='images/size-chart.jpg'">`
    : Array.isArray(b) ? `<ul class="opts">${b.map(x => `<li><i class="fa-solid fa-${x[0]}"></i><span>${x[1]}</span></li>`).join('')}</ul>` : `<p>${b}</p>`;
  $('#dInfo').classList.toggle('wide', k == 'size'); $('#dInfo').showModal();
}
const ACT = {
  login() { if (S.user) { S.user = null; store.set('user', null); applyLang(); return toast(t('bye')) } signup = false; drawLogin(); $('#dLogin').showModal() },
  signup() { signup = true; drawLogin(); $('#dLogin').showModal() },
  wish() { $('#dWish').showModal() },
  find() {
    $('#findBody').innerHTML = STORES.map(s => `<div class="store"><h3>${s.name}</h3><p>${s.address}</p>
      <iframe src="${s.map}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" title="${s.name}"></iframe></div>`).join('');
    $('#dFind').showModal();
  },
  region: openLoc
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-cat],[data-act],[data-info],[data-close]');
  if (e.target.matches('dialog')) return e.target.close();
  if (!el) return;
  if (el.tagName == 'A') e.preventDefault();
  if (el.dataset.close != null) el.closest('dialog').close();
  else if (el.dataset.cat) { document.body.classList.remove('show-mobile-menu'); setCat(el.dataset.cat) }
  else if (el.dataset.act) { document.body.classList.remove('show-mobile-menu'); ACT[el.dataset.act]() }
  else if (el.dataset.info) openInfo(el.dataset.info);
});

$('#menu-open-button').onclick = () => document.body.classList.toggle('show-mobile-menu');
$('#menu-close-button').onclick = () => $('#menu-open-button').click();
const onScroll = () => $('#hdr').classList.toggle('solid', scrollY > innerHeight * .5 - 80);
addEventListener('scroll', onScroll); onScroll();

$('#logoImg').src = SITE_IMAGES.logo; $('.hero-section').style.backgroundImage = `url(${SITE_IMAGES.hero})`;
$('#sIg').href = STORE.instagram; $('#sTk').href = STORE.tiktok;
$('#fMail').href = 'mailto:' + STORE.email; $('#fMail').textContent = STORE.email;
$('#fTel').href = 'tel:' + STORE.phone.replace(/\s/g, ''); $('#fTel').textContent = STORE.phone;
applyLang();
if (!S.loc) openLoc();