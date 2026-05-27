/* =====================
   PhamilyFoneClone
   app.js
   ===================== */

// ── FAMILY MEMBERS DATA ──
const members = {
  mod: {
    label: 'You',
    avatar: '👑',
    cls: 'mod',
    status: 'active',
    statusLabel: 'This Device',
    perm: 'open',
    wifi: false,
    last: 'Now',
    duration: '—'
  },
  dad: {
    label: 'Dad',
    avatar: 'D',
    cls: 'dad',
    status: 'active',
    statusLabel: 'Active · 12m',
    perm: 'open',
    wifi: false,
    last: '12 min ago',
    duration: '—'
  },
  k1: {
    label: 'Member 1',
    avatar: '1',
    cls: 'k1',
    status: 'active',
    statusLabel: 'On Call · 4:32',
    perm: 'locked',
    wifi: true,
    last: 'Now',
    duration: '4:32'
  },
  k2: {
    label: 'Member 2',
    avatar: '2',
    cls: 'k2',
    status: 'ping',
    statusLabel: 'Calling You!',
    perm: 'supervised',
    wifi: true,
    last: 'Right now',
    duration: '—'
  },
  k3: {
    label: 'Member 3',
    avatar: '3',
    cls: 'k3',
    status: 'idle',
    statusLabel: 'Idle',
    perm: 'locked',
    wifi: true,
    last: 'Yesterday',
    duration: '—'
  }
};

// ── CURRENT TALK MODE ──
let currentMode = 'walkie';

// ── OPEN TALK SHEET ──
function openSheet(mode) {
  currentMode = mode;
  const isWalkie = mode === 'walkie';

  const title = document.getElementById('sheetTitle');
  const allBtn = document.getElementById('sheetAllBtn');
  const sheet = document.getElementById('sheet');
  const overlay = document.getElementById('sheetOverlay');
  const sheetMembers = document.getElementById('sheetMembers');

  if (title) title.textContent = isWalkie
    ? '🎙️ Tap to Talk — Who?'
    : '💬 Tap to Text — Who?';

  if (allBtn) allBtn.textContent = isWalkie
    ? '📢 Talk to Everyone'
    : '📢 Text Everyone';

  if (sheet) {
    sheet.className = `sheet open ${isWalkie ? 'walkie-mode' : 'texty-mode'}`;
  }

  const dotMap = { active: 'g', ping: 'o', idle: 'd' };
  const statusMap = { active: 'Online', ping: 'Calling you!', idle: 'Idle' };

  if (sheetMembers) {
    sheetMembers.innerHTML = Object.entries(members)
      .filter(([id]) => id !== 'mod')
      .map(([id, m]) => `
        <div class="sheet-member" onclick="closeSheet()">
          <div class="sm-av ${m.cls}">
            ${m.avatar}
            <div class="sm-dot ${dotMap[m.status]}"></div>
          </div>
          <div class="sm-info">
            <div class="sm-name">${m.label}</div>
            <div class="sm-status">${statusMap[m.status]}</div>
          </div>
          <button class="sm-action">
            ${isWalkie ? '🎙️ Talk' : '💬 Text'}
          </button>
        </div>
      `).join('');
  }

  if (overlay) overlay.classList.add('open');
}

// ── CLOSE TALK SHEET ──
function closeSheet() {
  const sheet = document.getElementById('sheet');
  const overlay = document.getElementById('sheetOverlay');
  if (sheet) sheet.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// ── OPEN MEMBER DETAIL ──
function openDetail(id) {
  const m = members[id];
  if (!m) return;

  const titleEl = document.getElementById('detailTitle');
  const bodyEl = document.getElementById('detailBody');
  const page = document.getElementById('detailPage');

  if (titleEl) titleEl.textContent = m.label;

  const isKid = ['k1', 'k2', 'k3'].includes(id);
  const isDad = id === 'dad';

  const pillMap = {
    active: { cls: 'active', dot: 'g' },
    ping: { cls: 'ping', dot: 'o' },
    idle: { cls: 'idle', dot: 'd' }
  };

  const pm = pillMap[m.status] || pillMap.idle;

  const permOptions = ['locked', 'supervised', 'open'].map(opt => {
    const labels = {
      locked: '🔒 Locked',
      supervised: '👁️ Supervised',
      open: '✅ Open'
    };
    const selected = m.perm === opt ? `sel-${opt}` : '';
    return `
      <div class="perm-opt ${selected}"
           onclick="setPerm('${id}', '${opt}', this)">
        ${labels[opt]}
      </div>
    `;
  }).join('');

  if (bodyEl) {
    bodyEl.innerHTML = `

      <div class="d-av-block">
        <div class="d-av ${m.cls}">${m.avatar}</div>
        <div class="d-pill ${pm.cls}">
          <div class="pill-dot ${pm.dot}"></div>
          ${m.statusLabel}
        </div>
      </div>

      ${id !== 'mod' ? `
      <div class="act-grid">
        <div class="act-btn walkie"
             onclick="closeDetail(); openSheet('walkie')">
          <div class="ico">🎙️</div>
          <div class="lbl">Walkie Talkie</div>
        </div>
        <div class="act-btn texty"
             onclick="closeDetail(); openSheet('texty')">
          <div class="ico">💬</div>
          <div class="lbl">Texty Talkie</div>
        </div>
        <div class="act-btn listen">
          <div class="ico">👂</div>
          <div class="lbl">Listen In</div>
        </div>
        <div class="act-btn">
          <div class="ico">🚫</div>
          <div class="lbl">End Call</div>
        </div>
      </div>` : ''}

      ${isKid ? `
      <div class="dsec">
        <div class="dsec-title">Permission Level</div>
        <div class="perm-sel">${permOptions}</div>
      </div>` : ''}

      <div class="dsec">
        <div class="dsec-title">Status</div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">📶</span> Connection
          </div>
          <div class="drow-val">
            ${m.wifi ? 'WiFi Only' : 'Full Network'}
          </div>
        </div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">🕐</span> Last Active
          </div>
          <div class="drow-val">${m.last}</div>
        </div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">⏱️</span> Call Duration
          </div>
          <div class="drow-val">${m.duration}</div>
        </div>
      </div>

      ${isKid ? `
      <div class="dsec">
        <div class="dsec-title">Moderator Controls</div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">🔔</span> Ping Alerts
          </div>
          <div class="toggle on"
               onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">📵</span> Block Outside Calls
          </div>
          <div class="toggle ${m.perm === 'locked' ? 'on' : ''}"
               onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">⏰</span> Daily Call Limit
          </div>
          <div class="drow-val">30 min</div>
        </div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">📍</span> Bar Position
          </div>
          <div class="drow-val">
            Slot ${id === 'k1' ? 1 : id === 'k2' ? 2 : 3} · Fixed
          </div>
        </div>
      </div>` : ''}

      ${isDad ? `
      <div class="dsec">
        <div class="dsec-title">Co-Moderator Privacy</div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">🔐</span> Lateral Privacy
          </div>
          <div class="drow-val">Negotiated</div>
        </div>
        <div class="drow">
          <div class="drow-lbl">
            <span class="ico">👁️</span> See My Activity
          </div>
          <div class="toggle"
               onclick="this.classList.toggle('on')"></div>
        </div>
      </div>` : ''}

    `;
  }

  if (page) page.classList.add('open');
}

// ── CLOSE MEMBER DETAIL ──
function closeDetail() {
  const page = document.getElementById('detailPage');
  if (page) page.classList.remove('open');
}

// ── SET PERMISSION LEVEL ──
function setPerm(id, perm, el) {
  if (!members[id]) return;
  members[id].perm = perm;

  const allOpts = el.closest('.perm-sel')
    .querySelectorAll('.perm-opt');

  allOpts.forEach(opt => {
    opt.className = 'perm-opt';
  });

  el.classList.add(`sel-${perm}`);
}

// ── DISMISS PING ALERT ──
function dismissPing() {
  const alert = document.getElementById('pingAlert');
  if (alert) {
    alert.style.opacity = '0';
    alert.style.transform = 'translateY(-8px)';
    alert.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => alert.remove(), 300);
  }
}

// ── ANSWER PING ──
function answerPing() {
  dismissPing();
  openSheet('walkie');
}
