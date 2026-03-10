// ══════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function getUsers() {
  return JSON.parse(localStorage.getItem('fpro-users') || '{}');
}

function saveUsers(users) {
  localStorage.setItem('fpro-users', JSON.stringify(users));
}

function getUserJournal() {
  return JSON.parse(localStorage.getItem('fpro-journal') || '[]');
}

function saveUserJournal(journal) {
  localStorage.setItem('fpro-journal', JSON.stringify(journal));
}
const PAIRS = [
  {name:'EUR/USD',pipValue:10,type:'standard',group:'Forex Majors'},
  {name:'GBP/USD',pipValue:10,type:'standard',group:'Forex Majors'},
  {name:'USD/JPY',pipValue:9.1,type:'jpy',group:'Forex Majors'},
  {name:'USD/CHF',pipValue:10,type:'standard',group:'Forex Majors'},
  {name:'AUD/USD',pipValue:10,type:'standard',group:'Forex Majors'},
  {name:'NZD/USD',pipValue:10,type:'standard',group:'Forex Majors'},
  {name:'USD/CAD',pipValue:10,type:'standard',group:'Forex Majors'},
  {name:'EUR/GBP',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'EUR/JPY',pipValue:9.1,type:'jpy',group:'Forex Crosses'},
  {name:'EUR/AUD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'EUR/CHF',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'EUR/NZD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'EUR/CAD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'GBP/JPY',pipValue:9.1,type:'jpy',group:'Forex Crosses'},
  {name:'GBP/AUD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'GBP/CAD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'GBP/CHF',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'GBP/NZD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'AUD/JPY',pipValue:9.1,type:'jpy',group:'Forex Crosses'},
  {name:'AUD/CAD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'AUD/CHF',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'AUD/NZD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'NZD/JPY',pipValue:9.1,type:'jpy',group:'Forex Crosses'},
  {name:'NZD/CAD',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'NZD/CHF',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'CAD/JPY',pipValue:9.1,type:'jpy',group:'Forex Crosses'},
  {name:'CAD/CHF',pipValue:10,type:'standard',group:'Forex Crosses'},
  {name:'CHF/JPY',pipValue:9.1,type:'jpy',group:'Forex Crosses'},
  {name:'USD/SGD',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/HKD',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/ZAR',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/TRY',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/MXN',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/SEK',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/NOK',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/DKK',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/PLN',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/CZK',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'USD/HUF',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'EUR/TRY',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'EUR/SEK',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'EUR/NOK',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'EUR/PLN',pipValue:10,type:'standard',group:'Forex Exotics'},
  {name:'XAU/USD',pipValue:1,type:'metal',group:'Metals'},
  {name:'XAG/USD',pipValue:5,type:'metal',group:'Metals'},
  {name:'BTC/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'ETH/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'SOL/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'BNB/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'XRP/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'ADA/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'DOGE/USD',pipValue:1,type:'crypto',group:'Crypto'},
  {name:'LTC/USD',pipValue:1,type:'crypto',group:'Crypto'},
];

function getPipMult(type){ return type==='jpy'?100:type==='metal'?10:type==='crypto'?1:10000; }
function formatPrice(v,type){ return type==='jpy'?v.toFixed(3):type==='metal'||type==='crypto'?v.toFixed(2):v.toFixed(5); }

// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let selectedPair = PAIRS[0];
let tradeDirection = 'buy';
let lastResult = null;
let journal = getUserJournal();
let settings = JSON.parse(localStorage.getItem('fpro-settings')||'{"currency":"USD","symbol":"$","defaultRisk":1}');
let autoCalc = false;

// ══════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════
function switchTab(name, btn){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  btn.classList.add('active');
  if(name==='journal') renderJournal();
}

// ══════════════════════════════════════════
//  PAIR SELECTOR
// ══════════════════════════════════════════
const pairSel = document.getElementById('pairSel');
const pairInput = document.getElementById('pairInput');
const pairDropdown = document.getElementById('pairDropdown');
const pairBadge = document.getElementById('pairBadge');

function toggleDropdown(){
  const open = pairSel.classList.contains('open');
  open ? closeDropdown() : openDropdown();
}
function openDropdown(){ pairSel.classList.add('open'); renderPairDropdown(pairInput.value); }
function closeDropdown(){ pairSel.classList.remove('open'); }

function renderPairDropdown(filter=''){
  const q = filter.toLowerCase().replace(/[\s\/]/g,'');
  const filtered = q ? PAIRS.filter(p=>p.name.toLowerCase().replace('/','').includes(q)) : PAIRS;
  if(!filtered.length){ pairDropdown.innerHTML='<div class="no-results">No pairs found</div>'; return; }
  const groups = {};
  filtered.forEach(p=>{ if(!groups[p.group])groups[p.group]=[]; groups[p.group].push(p); });
  let html='';
  for(const[g,ps] of Object.entries(groups)){
    html+=`<div class="pair-group-hdr">${g}</div>`;
    ps.forEach(p=>{
      const active = p.name===selectedPair.name?' active':'';
      const tag = p.type==='jpy'?'JPY':p.type==='metal'?'Metal':p.type==='crypto'?'Crypto':'';
      html+=`<div class="pair-opt${active}" data-name="${p.name}"><span>${p.name}</span><span class="pair-tag">${tag}</span></div>`;
    });
  }
  pairDropdown.innerHTML=html;
  pairDropdown.querySelectorAll('.pair-opt').forEach(el=>{
    el.addEventListener('click',()=>{
      selectedPair=PAIRS.find(p=>p.name===el.dataset.name);
      pairBadge.textContent=selectedPair.name;
      pairInput.value='';
      updatePairLabel();
      closeDropdown();
      if(autoCalc) calculate();
    });
  });
}

function updatePairLabel(){
  const labels={'standard':'Standard Forex Pair','jpy':'JPY Pair (×100)','metal':'Metal (XAU/XAG)','crypto':'Cryptocurrency'};
  document.getElementById('pair-type-label').textContent=labels[selectedPair.type]||'';
}

pairInput.addEventListener('focus',openDropdown);
pairInput.addEventListener('input',()=>{ if(!pairSel.classList.contains('open'))openDropdown(); renderPairDropdown(pairInput.value); });
pairInput.addEventListener('keydown',e=>{ if(e.key==='Escape'){pairInput.value='';closeDropdown();} });
document.addEventListener('click',e=>{ if(!pairSel.contains(e.target))closeDropdown(); });
renderPairDropdown();
updatePairLabel();

// ══════════════════════════════════════════
//  DIRECTION
// ══════════════════════════════════════════
function setDir(dir){
  tradeDirection=dir;
  document.getElementById('buyBtn').classList.toggle('active',dir==='buy');
  document.getElementById('sellBtn').classList.toggle('active',dir==='sell');
  if(autoCalc) calculate();
}

// ══════════════════════════════════════════
//  RISK PRESETS
// ══════════════════════════════════════════
function setRisk(val){
  document.getElementById('riskPct').value=val;
  document.querySelectorAll('#riskPresets .preset-btn').forEach(b=>{
    b.classList.toggle('active', parseFloat(b.textContent)===val);
  });
  if(autoCalc) calculate();
}

// ══════════════════════════════════════════
//  VALIDATION
// ══════════════════════════════════════════
function clearErrors(){
  document.querySelectorAll('.field-error').forEach(e=>{ e.textContent=''; e.classList.remove('show'); });
}
function showError(id,msg){
  const el=document.getElementById(id);
  el.textContent=msg;el.classList.add('show');
}
function validate(){
  clearErrors();let ok=true;
  const b=+document.getElementById('balance').value;
  const r=+document.getElementById('riskPct').value;
  const e=+document.getElementById('entry').value;
  const s=+document.getElementById('sl').value;
  const t=+document.getElementById('tp').value;
  if(!b||b<=0){showError('err-balance','Required');ok=false;}
  if(!r||r<=0){showError('err-risk','Required');ok=false;}
  if(!e||e<=0){showError('err-entry','Required');ok=false;}
  if(!s||s<=0){showError('err-sl','Required');ok=false;}
  if(!t||t<=0){showError('err-tp','Required');ok=false;}
  if(e&&s&&e===s){showError('err-sl','Cannot equal entry');ok=false;}
  if(e&&t&&e===t){showError('err-tp','Cannot equal entry');ok=false;}
  return ok;
}

// ══════════════════════════════════════════
//  CALCULATE
// ══════════════════════════════════════════
const usd = v => settings.symbol + Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

function calculate(){
  console.log('Calculate called');
  if(!validate()){
    alert('Please fill in all required fields correctly.');
    return;
  }

  const balance = +document.getElementById('balance').value;
  const riskPct = +document.getElementById('riskPct').value;
  const entry   = +document.getElementById('entry').value;
  const sl      = +document.getElementById('sl').value;
  const tp      = +document.getElementById('tp').value;
  const spread  = +(document.getElementById('spread').value)||0;
  const commission = +(document.getElementById('commission').value)||0;

  const {pipValue,type,name} = selectedPair;
  const pipMult = getPipMult(type);

  const slPipsRaw = Math.abs(entry - sl) * pipMult;
  const tpPipsRaw = Math.abs(tp  - entry) * pipMult;
  const slPips = slPipsRaw + spread;
  const tpPips = Math.max(0, tpPipsRaw - spread);
  const rr = slPips > 0 ? tpPips / slPips : 0;

  const riskAmt = balance * (riskPct / 100);
  const rawLot  = riskAmt / (slPips * pipValue);
  const lot     = Math.floor(rawLot * 100) / 100;
  const profit  = riskAmt * rr;
  const units   = Math.round(lot * 100000);
  const commTotal = commission * lot * 2; // round trip
  const netProfit = profit - commTotal;
  const breakEven = rr > 0 ? (1/(1+rr)*100) : 0;
  const margin    = (lot * 100000 * entry) / 30; // est. 1:30 leverage

  const entryStr = formatPrice(entry,type);
  const slStr    = formatPrice(sl,type);
  const tpStr    = formatPrice(tp,type);

  lastResult = {
    pair:name, type, direction:tradeDirection,
    entry, sl, tp, spread, slPips, tpPips, rr,
    riskAmt, lot, profit, units, commTotal, netProfit,
    breakEven, margin, riskPct, balance, commission,
    entryStr, slStr, tpStr,
    timestamp: new Date().toISOString()
  };

  // Animate big lot number
  anim(document.getElementById('r-lot'), lot.toFixed(2));
  document.getElementById('r-lot-units').textContent = `${units.toLocaleString()} units`;

  // RR Meter
  const rrPct = Math.min(100, (rr / 4) * 100);
  document.getElementById('rr-fill').style.width = rrPct + '%';
  anim(document.getElementById('r-rr'), `1 : ${rr.toFixed(2)}`);

  // Stats
  anim(document.getElementById('r-risk'),     usd(riskAmt));
  anim(document.getElementById('r-profit'),   usd(profit));
  anim(document.getElementById('r-netprofit'),usd(netProfit));
  anim(document.getElementById('r-slpips'),   slPips.toFixed(1)+' pips');
  anim(document.getElementById('r-tppips'),   tpPips.toFixed(1)+' pips');
  anim(document.getElementById('r-breakeven'),breakEven.toFixed(1)+'%');

  // Direction badge
  const dirBadge = document.getElementById('result-dir-badge');
  dirBadge.textContent = tradeDirection.toUpperCase();
  dirBadge.style.color = tradeDirection==='buy' ? 'var(--green)' : 'var(--red)';

  // Show share section
  document.querySelector('.share-section').style.display = 'block';

  // Summary
  document.getElementById('s-pair').textContent        = name;
  document.getElementById('s-dir').textContent         = tradeDirection.toUpperCase();
  document.getElementById('s-dir').style.color         = tradeDirection==='buy'?'var(--green)':'var(--red)';
  document.getElementById('s-entry').textContent       = entryStr;
  document.getElementById('s-sl').textContent          = slStr;
  document.getElementById('s-tp').textContent          = tpStr;
  document.getElementById('s-spread').textContent      = spread.toFixed(1)+' pips';
  document.getElementById('s-commission').textContent  = commission>0 ? usd(commTotal)+' (rt)' : '—';
  document.getElementById('s-lot').textContent         = lot.toFixed(2);
  document.getElementById('s-units').textContent       = units.toLocaleString();
  document.getElementById('s-risk').textContent        = usd(riskAmt);
  document.getElementById('s-profit').textContent      = usd(profit);
  document.getElementById('s-netprofit').textContent   = usd(netProfit);
  document.getElementById('s-margin').textContent      = document.getElementById('tog-margin').checked ? usd(margin) : '—';

  // Show results
  document.getElementById('results').classList.add('show');
}

function anim(el, txt){
  el.style.transform='scale(.85)'; el.style.opacity='0';
  setTimeout(()=>{ el.textContent=txt; el.style.transform='scale(1)'; el.style.opacity='1'; },150);
}
document.querySelectorAll('.stat-value,.lot-num,.rr-label').forEach(el=>{
  el.style.transition='transform .25s ease, opacity .25s ease';
});

// ══════════════════════════════════════════
//  COPY BUTTONS
// ══════════════════════════════════════════
function copyLot(){
  if(!lastResult) return;
  navigator.clipboard.writeText(lastResult.lot.toFixed(2)).then(()=>{
    flashBtn('copyLotBtn','Copied!',true);
  });
}
function copySetup(){
  if(!lastResult) return;
  const r=lastResult;
  const text = [
    `📊 Trade Setup — ${r.pair} [${r.direction.toUpperCase()}]`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `Entry:      ${r.entryStr}`,
    `Stop Loss:  ${r.slStr}`,
    `Take Profit:${r.tpStr}`,
    `Lot Size:   ${r.lot.toFixed(2)}`,
    `Units:      ${r.units.toLocaleString()}`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `Risk:       ${usd(r.riskAmt)} (${r.riskPct}%)`,
    `Profit:     ${usd(r.profit)}`,
    `Net Profit: ${usd(r.netProfit)}`,
    `R:R:        1:${r.rr.toFixed(2)}`,
    `SL Pips:    ${r.slPips.toFixed(1)}`,
    `TP Pips:    ${r.tpPips.toFixed(1)}`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `Generated by ForexPro Calculator v2.0`,
  ].join('\n');
  navigator.clipboard.writeText(text).then(()=>flashBtn('copySetupBtn','Copied!',false));
}
function flashBtn(id,txt,isLot){
  const btn=document.getElementById(id);
  const orig=btn.querySelector('span')?btn.querySelector('span').textContent:btn.textContent;
  btn.classList.add('copied');
  if(btn.querySelector('span')) btn.querySelector('span').textContent=txt; else btn.textContent=txt;
  setTimeout(()=>{
    btn.classList.remove('copied');
    if(btn.querySelector('span')) btn.querySelector('span').textContent=isLot?'Copy Lot':'Share Setup';
  },2000);
}

// ══════════════════════════════════════════
//  RESET
// ══════════════════════════════════════════
function resetForm(){
  document.getElementById('balance').value='10000';
  document.getElementById('riskPct').value=settings.defaultRisk||1;
  document.getElementById('spread').value='0';
  document.getElementById('commission').value='0';
  document.getElementById('entry').value='1.10500';
  document.getElementById('sl').value='1.10000';
  document.getElementById('tp').value='1.11500';
  selectedPair=PAIRS[0];
  pairBadge.textContent='EUR/USD';
  pairInput.value='';
  setDir('buy');
  setRisk(settings.defaultRisk||1);
  clearErrors();
  document.getElementById('results').classList.remove('show');
  lastResult=null;
}

// ══════════════════════════════════════════
//  JOURNAL
// ══════════════════════════════════════════
function saveToJournal(){
  if(!lastResult){calculate(); if(!lastResult)return;}
  journal.unshift({...lastResult, id:Date.now()});
  saveUserJournal(journal);
  updateJournalBadge();
  renderJournal();
  // brief flash
  const btn=document.getElementById('saveJournalBtn');
  const orig=btn.innerHTML;
  btn.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Saved!';
  btn.style.background='var(--green)';
  setTimeout(()=>{ btn.innerHTML=orig; btn.style.background=''; },1500);
}

function renderJournal(){
  const el=document.getElementById('journalList');
  if(!journal.length){
    el.innerHTML=`<div class="journal-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <p>No trades saved yet.<br>Calculate a setup and hit "Save to Journal".</p>
    </div>`;
    document.getElementById('j-total').textContent='0';
    document.getElementById('j-risk-total').textContent='$0';
    document.getElementById('j-profit-total').textContent='$0';
    document.getElementById('j-avg-rr').textContent='—';
    return;
  }

  // Stats
  const totalRisk=journal.reduce((a,j)=>a+j.riskAmt,0);
  const totalProfit=journal.reduce((a,j)=>a+j.profit,0);
  const avgRR=journal.reduce((a,j)=>a+j.rr,0)/journal.length;
  document.getElementById('j-total').textContent=journal.length;
  document.getElementById('j-risk-total').textContent=settings.symbol+totalRisk.toFixed(2);
  document.getElementById('j-profit-total').textContent=settings.symbol+totalProfit.toFixed(2);
  document.getElementById('j-avg-rr').textContent='1:'+avgRR.toFixed(2);

  const html=journal.map(j=>{
    const dt=new Date(j.timestamp);
    const time=dt.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    return `<div class="journal-item ${j.direction}-item">
      <div>
        <div class="j-pair">${j.pair}</div>
        <span class="j-dir ${j.direction}">${j.direction.toUpperCase()}</span>
      </div>
      <div class="j-detail">
        <div class="j-detail-row">
          <span>E: ${j.entryStr}</span>
          <span>SL: ${j.slStr}</span>
          <span>TP: ${j.tpStr}</span>
        </div>
        <div class="j-detail-row">
          <span>R:R 1:${j.rr.toFixed(2)}</span>
          <span>${j.slPips.toFixed(1)}p SL</span>
          <span>${time}</span>
        </div>
      </div>
      <div class="j-lot">${j.lot.toFixed(2)}</div>
      <div class="j-profit pos">${settings.symbol}${j.profit.toFixed(2)}</div>
      <button class="j-delete" onclick="deleteJournalItem(${j.id})" title="Delete">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>`;
  }).join('');
  el.innerHTML=`<div class="journal-list">${html}</div>`;
}

function deleteJournalItem(id){
  journal=journal.filter(j=>j.id!==id);
  saveUserJournal(journal);
  updateJournalBadge();
  renderJournal();
}

function clearJournal(){
  if(!confirm('Clear all journal entries?')) return;
  journal=[];
  saveUserJournal(journal);
  updateJournalBadge();
  renderJournal();
}

function updateJournalBadge(){
  const badge=document.getElementById('journal-count-badge');
  if(journal.length>0){ badge.textContent=journal.length; badge.style.display='inline'; }
  else { badge.style.display='none'; }
}

// ══════════════════════════════════════════
//  SETTINGS
// ══════════════════════════════════════════
function setAccyCurrency(code,sym){
  settings.currency=code; settings.symbol=sym;
  localStorage.setItem('fpro-settings',JSON.stringify(settings));
  document.getElementById('currency-symbol').textContent=sym;
  document.getElementById('commission-symbol').textContent=sym;
  document.querySelectorAll('.accy-btn').forEach(b=>{
    b.classList.toggle('active',b.id==='accy-'+code);
  });
}

function setDefaultRisk(val){
  settings.defaultRisk=val;
  localStorage.setItem('fpro-settings',JSON.stringify(settings));
  document.getElementById('riskPct').value=val;
  setRisk(val);
}

function toggleAutoCalc(){
  autoCalc=document.getElementById('tog-auto').checked;
  if(autoCalc){
    ['balance','riskPct','spread','commission','entry','sl','tp'].forEach(id=>{
      document.getElementById(id).addEventListener('input',calculate);
    });
  }
}

// ══════════════════════════════════════════
//  ADDITIONAL CALCULATORS
// ══════════════════════════════════════════
function calculatePip(){
  const pair = document.getElementById('pip-pair').value;
  const lot = +document.getElementById('pip-lot').value;
  const accountCurrency = document.getElementById('pip-account-currency').value;

  // Simple pip value calculation (simplified)
  const pipValue = lot * 10; // Assuming standard lot
  document.getElementById('pip-value').textContent = `$${pipValue.toFixed(2)}`;
  document.getElementById('pip-results').style.display = 'block';
}

function calculateRR(){
  const entry = +document.getElementById('rr-entry').value;
  const sl = +document.getElementById('rr-sl').value;
  const tp = +document.getElementById('rr-tp').value;

  const risk = Math.abs(entry - sl);
  const reward = Math.abs(tp - entry);
  const rr = risk > 0 ? reward / risk : 0;

  document.getElementById('rr-ratio').textContent = `1:${rr.toFixed(2)}`;
  document.getElementById('rr-results').style.display = 'block';
}

function calculateLotSize(){
  const balance = +document.getElementById('lot-balance').value;
  const risk = +document.getElementById('lot-risk').value;
  const slPips = +document.getElementById('lot-sl-pips').value;

  const lotSize = risk / (slPips * 10); // Simplified calculation
  document.getElementById('lot-size').textContent = lotSize.toFixed(2);
  document.getElementById('lot-results').style.display = 'block';
}

function calculateMargin(){
  const lot = +document.getElementById('margin-lot').value;
  const leverage = +document.getElementById('margin-leverage').value;
  const entry = +document.getElementById('margin-entry').value;

  const margin = (lot * 100000 * entry) / leverage;
  document.getElementById('margin-required').textContent = `$${margin.toFixed(2)}`;
  document.getElementById('margin-results').style.display = 'block';
}

// Authentication UI/back-end logic removed until a proper backend is available.
// The login/signup functions and event listeners were generating confusion for users
// since the application does not yet support server-side authentication.
//
// ══════════════════════════════════════════
//  SHARE SYSTEM
// ══════════════════════════════════════════

// Generate shareable URL for current trade setup
function generateShareLink(){
  if(!lastResult) return '';
  const params = new URLSearchParams({
    pair: lastResult.pair.replace('/',''),
    dir: lastResult.direction,
    entry: lastResult.entry,
    sl: lastResult.sl,
    tp: lastResult.tp,
    risk: lastResult.riskPct
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// Copy share link to clipboard
function copyShareLink(){
  const link = generateShareLink();
  if(!link) return;
  navigator.clipboard.writeText(link).then(()=>{
    alert('Trade setup link copied!');
  }).catch(()=>{
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Trade setup link copied!');
  });
}

// Load shared trade from URL parameters
function loadSharedTrade(){
  const params = new URLSearchParams(window.location.search);
  if(params.has('pair') && params.has('dir') && params.has('entry') && params.has('sl') && params.has('tp') && params.has('risk')){
    // Set pair
    const pairName = params.get('pair').toUpperCase();
    const pair = PAIRS.find(p => p.name.replace('/','') === pairName);
    if(pair){
      selectedPair = pair;
      pairBadge.textContent = pair.name;
      updatePairLabel();
    }
    // Set direction
    const dir = params.get('dir').toUpperCase();
    if(dir === 'BUY'){
      setDir('buy');
    } else if(dir === 'SELL'){
      setDir('sell');
    }
    // Set values
    document.getElementById('entry').value = params.get('entry');
    document.getElementById('sl').value = params.get('sl');
    document.getElementById('tp').value = params.get('tp');
    document.getElementById('riskPct').value = params.get('risk');
    // Auto calculate
    setTimeout(calculate, 100);
  }
}

// Social media share functions
function shareToTwitter(){
  const link = generateShareLink();
  const url = `https://twitter.com/intent/tweet?text=Check%20this%20trade%20setup&url=${encodeURIComponent(link)}`;
  window.open(url, '_blank');
}

function shareToReddit(){
  const link = generateShareLink();
  const url = `https://www.reddit.com/submit?url=${encodeURIComponent(link)}`;
  window.open(url, '_blank');
}

function shareToTelegram(){
  const link = generateShareLink();
  const url = `https://t.me/share/url?url=${encodeURIComponent(link)}`;
  window.open(url, '_blank');
}

function shareToWhatsApp(){
  const link = generateShareLink();
  const url = `https://wa.me/?text=${encodeURIComponent(link)}`;
  window.open(url, '_blank');
}

function shareToLinkedIn(){
  const link = generateShareLink();
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
  window.open(url, '_blank');
}

function shareToDiscord(){
  const link = generateShareLink();
  navigator.clipboard.writeText(link).then(()=>{
    alert('Trade setup link copied for Discord!');
  }).catch(()=>{
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Trade setup link copied for Discord!');
  });
}

// Share the entire page
function sharePage(){
  const url = window.location.origin + window.location.pathname;
  const title = document.title;
  const text = 'Check out this free forex position size calculator!';

  if(navigator.share){
    navigator.share({
      title: title,
      text: text,
      url: url
    });
  } else {
    // Fallback to copy URL
    navigator.clipboard.writeText(url).then(()=>{
      alert('Page link copied!');
    }).catch(()=>{
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Page link copied!');
    });
  }
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
(function init(){
  // Restore settings
  document.getElementById('currency-symbol').textContent=settings.symbol;
  document.getElementById('commission-symbol').textContent=settings.symbol;
  if(settings.currency){
    document.querySelectorAll('.accy-btn').forEach(b=>{
      b.classList.toggle('active',b.id==='accy-'+settings.currency);
    });
  }
  if(settings.defaultRisk){
    document.getElementById('riskPct').value=settings.defaultRisk;
    setRisk(settings.defaultRisk);
  }

  // Load journal data
  journal = getUserJournal();

  updateJournalBadge();
  renderJournal();

  // Load shared trade if URL has parameters
  loadSharedTrade();
})();