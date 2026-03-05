// ══════════════════════════════════════════════════════
//  PAIRS DATABASE
//  Each pair: { name, pipValue (per std lot), type }
//  type = 'jpy' → multiplier 100, else → 10000
//  For metals/crypto, custom multipliers are used
// ══════════════════════════════════════════════════════
const PAIRS = [
  // ── Forex Majors ─────────────────────────────────
  { name: 'EUR/USD', pipValue: 10, type: 'standard', group: 'Forex Majors' },
  { name: 'GBP/USD', pipValue: 10, type: 'standard', group: 'Forex Majors' },
  { name: 'USD/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Majors' },
  { name: 'USD/CHF', pipValue: 10, type: 'standard', group: 'Forex Majors' },
  { name: 'AUD/USD', pipValue: 10, type: 'standard', group: 'Forex Majors' },
  { name: 'NZD/USD', pipValue: 10, type: 'standard', group: 'Forex Majors' },
  { name: 'USD/CAD', pipValue: 10, type: 'standard', group: 'Forex Majors' },

  // ── Forex Minors / Crosses ───────────────────────
  { name: 'EUR/GBP', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'EUR/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Crosses' },
  { name: 'EUR/AUD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'EUR/CHF', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'EUR/NZD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'EUR/CAD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'GBP/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Crosses' },
  { name: 'GBP/AUD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'GBP/CAD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'GBP/CHF', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'GBP/NZD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'AUD/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Crosses' },
  { name: 'AUD/CAD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'AUD/CHF', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'AUD/NZD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'NZD/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Crosses' },
  { name: 'NZD/CAD', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'NZD/CHF', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'CAD/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Crosses' },
  { name: 'CAD/CHF', pipValue: 10, type: 'standard', group: 'Forex Crosses' },
  { name: 'CHF/JPY', pipValue: 9.1, type: 'jpy', group: 'Forex Crosses' },

  // ── Forex Exotics ────────────────────────────────
  { name: 'USD/SGD', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/HKD', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/ZAR', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/TRY', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/MXN', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/SEK', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/NOK', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/DKK', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/PLN', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/CZK', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'USD/HUF', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'EUR/TRY', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'EUR/SEK', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'EUR/NOK', pipValue: 10, type: 'standard', group: 'Forex Exotics' },
  { name: 'EUR/PLN', pipValue: 10, type: 'standard', group: 'Forex Exotics' },

  // ── Metals ───────────────────────────────────────
  { name: 'XAU/USD', pipValue: 1, type: 'metal', group: 'Metals' },
  { name: 'XAG/USD', pipValue: 5, type: 'metal', group: 'Metals' },

  // ── Crypto ───────────────────────────────────────
  { name: 'BTC/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'ETH/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'SOL/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'BNB/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'XRP/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'ADA/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'DOGE/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'DOT/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'AVAX/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'LINK/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'MATIC/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'UNI/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'LTC/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'SHIB/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
  { name: 'PEPE/USD', pipValue: 1, type: 'crypto', group: 'Crypto' },
];

// Pip multiplier by type
function getPipMultiplier(type) {
  if (type === 'jpy') return 100;
  if (type === 'metal') return 10;   // XAU 1 pip = 0.1
  if (type === 'crypto') return 1;   // crypto 1 pip = $1
  return 10000; // standard forex
}

// ══════════════════════════════════════════════════════
//  DOM ELEMENTS
// ══════════════════════════════════════════════════════
const form = document.getElementById('calcForm');
const pairSearchEl = document.getElementById('pairSearch');
const pairInput = document.getElementById('pairInput');
const pairDropdown = document.getElementById('pairDropdown');
const pairBadge = document.getElementById('pairBadge');
const balanceInput = document.getElementById('balance');
const riskInput = document.getElementById('riskPercent');
const entryInput = document.getElementById('entryPrice');
const slInput = document.getElementById('slPrice');
const tpInput = document.getElementById('tpPrice');
const spreadInput = document.getElementById('spread');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const resultsSection = document.getElementById('results');

const slPipEl = document.getElementById('slPipDistance');
const tpPipEl = document.getElementById('tpPipDistance');
const rrEl = document.getElementById('rrRatio');
const riskEl = document.getElementById('riskAmount');
const lotEl = document.getElementById('lotSize');
const profitEl = document.getElementById('potentialProfit');
const sumPair = document.getElementById('sumPair');
const sumEntry = document.getElementById('sumEntry');
const sumSL = document.getElementById('sumSL');
const sumTP = document.getElementById('sumTP');
const sumLot = document.getElementById('sumLot');
const sumRisk = document.getElementById('sumRisk');
const sumProfit = document.getElementById('sumProfit');
const sumSpread = document.getElementById('sumSpread');

// ══════════════════════════════════════════════════════
//  SEARCHABLE PAIR SELECTOR
// ══════════════════════════════════════════════════════
let selectedPair = PAIRS[0]; // default EUR/USD

function renderDropdown(filter = '') {
  const q = filter.toLowerCase().replace(/[\s\/]/g, '');
  const filtered = q
    ? PAIRS.filter(p => p.name.toLowerCase().replace('/', '').includes(q))
    : PAIRS;

  if (filtered.length === 0) {
    pairDropdown.innerHTML = '<div class="pair-no-results">No pairs found</div>';
    return;
  }

  // Group by category
  const groups = {};
  filtered.forEach(p => {
    if (!groups[p.group]) groups[p.group] = [];
    groups[p.group].push(p);
  });

  let html = '';
  for (const [group, pairs] of Object.entries(groups)) {
    html += `<div class="pair-group-label">${group}</div>`;
    pairs.forEach(p => {
      const active = p.name === selectedPair.name ? ' active' : '';
      html += `<div class="pair-option${active}" data-name="${p.name}">
        <span>${p.name}</span>
        <span class="pair-tag">${p.type === 'jpy' ? 'JPY' : p.type === 'metal' ? 'Metal' : p.type === 'crypto' ? 'Crypto' : ''}</span>
      </div>`;
    });
  }
  pairDropdown.innerHTML = html;

  // Attach click handlers
  pairDropdown.querySelectorAll('.pair-option').forEach(el => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-name');
      selectedPair = PAIRS.find(p => p.name === name);
      pairBadge.textContent = selectedPair.name;
      pairInput.value = '';
      closeDropdown();
    });
  });
}

function openDropdown() {
  pairSearchEl.classList.add('open');
  renderDropdown(pairInput.value);
}

function closeDropdown() {
  pairSearchEl.classList.remove('open');
}

// Events
pairInput.addEventListener('focus', openDropdown);
pairInput.addEventListener('input', () => {
  if (!pairSearchEl.classList.contains('open')) openDropdown();
  renderDropdown(pairInput.value);
});

// Click on wrapper to focus input
pairSearchEl.querySelector('.pair-input-wrapper').addEventListener('click', () => {
  pairInput.focus();
});

// Close on click outside
document.addEventListener('click', (e) => {
  if (!pairSearchEl.contains(e.target)) closeDropdown();
});

// Close on Escape
pairInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    pairInput.value = '';
    closeDropdown();
    pairInput.blur();
  }
});

// Initialize
renderDropdown();

// ══════════════════════════════════════════════════════
//  FORMATTER
// ══════════════════════════════════════════════════════
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// ══════════════════════════════════════════════════════
//  CALCULATE
// ══════════════════════════════════════════════════════
let lastResult = null;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const balance = parseFloat(balanceInput.value);
  const riskPct = parseFloat(riskInput.value);
  const entry = parseFloat(entryInput.value);
  const sl = parseFloat(slInput.value);
  const tp = parseFloat(tpInput.value);
  const spread = parseFloat(spreadInput.value) || 0;

  if ([balance, riskPct, entry, sl, tp].some(v => isNaN(v) || v <= 0)) return;
  if (spread < 0) return;
  if (entry === sl) return;

  const pipMult = getPipMultiplier(selectedPair.type);
  const pipValue = selectedPair.pipValue;
  const pairName = selectedPair.name;

  // Pip distances (spread adds to effective SL, reduces net TP)
  const slPipsRaw = Math.abs(entry - sl) * pipMult;
  const tpPipsRaw = Math.abs(tp - entry) * pipMult;
  const slPips = slPipsRaw + spread;
  const tpPips = Math.max(0, tpPipsRaw - spread);
  const rrRatio = slPips > 0 ? tpPips / slPips : 0;

  // Financials
  const riskAmount = balance * (riskPct / 100);
  const lotSize = riskAmount / (slPips * pipValue);
  const profit = riskAmount * rrRatio;

  lastResult = { pairName, entry, sl, tp, spread, slPips, tpPips, rrRatio, riskAmount, lotSize, profit };

  // Animate results
  animateValue(slPipEl, `${slPips.toFixed(1)} pips`);
  animateValue(tpPipEl, `${tpPips.toFixed(1)} pips`);
  animateValue(rrEl, `1 : ${rrRatio.toFixed(1)}`);
  animateValue(riskEl, usd.format(riskAmount));
  animateValue(lotEl, lotSize.toFixed(2));
  animateValue(profitEl, usd.format(profit));

  // Trade summary
  sumPair.textContent = pairName;
  sumEntry.textContent = entryInput.value;
  sumSL.textContent = slInput.value;
  sumTP.textContent = tpInput.value;
  sumSpread.textContent = spread.toFixed(1) + ' pips';
  sumLot.textContent = lotSize.toFixed(2);
  sumRisk.textContent = usd.format(riskAmount);
  sumProfit.textContent = usd.format(profit);

  // Reset copy button
  copyBtn.classList.remove('copied');
  copyBtn.querySelector('span').textContent = 'Copy Trade Setup';

  resultsSection.classList.remove('hidden');
});

// ══════════════════════════════════════════════════════
//  ANIMATION
// ══════════════════════════════════════════════════════
function animateValue(el, newText) {
  el.style.transform = 'scale(0.85)';
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = newText;
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
  }, 150);
}

document.querySelectorAll('.result-value').forEach(el => {
  el.style.transition = 'transform .25s ease, opacity .25s ease';
});

// ══════════════════════════════════════════════════════
//  COPY TO CLIPBOARD
// ══════════════════════════════════════════════════════
copyBtn.addEventListener('click', () => {
  if (!lastResult) return;
  const r = lastResult;
  const text = [
    `📊 Trade Setup — ${r.pairName}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `Entry:           ${r.entry}`,
    `Stop Loss:       ${r.sl}`,
    `Take Profit:     ${r.tp}`,
    `Spread:          ${r.spread.toFixed(1)} pips`,
    `SL Distance:     ${r.slPips.toFixed(1)} pips (incl. spread)`,
    `TP Distance:     ${r.tpPips.toFixed(1)} pips`,
    `Risk : Reward:   1:${r.rrRatio.toFixed(1)}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `Risk Amount:     ${usd.format(r.riskAmount)}`,
    `Lot Size:        ${r.lotSize.toFixed(2)}`,
    `Potential Profit: ${usd.format(r.profit)}`,
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.classList.add('copied');
    copyBtn.querySelector('span').textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('span').textContent = 'Copy Trade Setup';
    }, 2000);
  });
});

// ══════════════════════════════════════════════════════
//  RESET
// ══════════════════════════════════════════════════════
resetBtn.addEventListener('click', () => location.reload());
