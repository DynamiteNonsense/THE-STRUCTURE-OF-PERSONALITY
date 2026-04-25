// personality-shell.jsx
const { useState, useEffect } = React;

const C = {
  bg: '#0c0c1d',
  card: '#161630',
  card2: '#1a1a3e',
  indigo: '#6366f1',
  cyan: '#22d3ee',
  violet: '#a78bfa',
  text: '#e2e8f0',
  muted: '#94a3b8',
  border: '#1e1e42',
  success: '#34d399',
  warning: '#fbbf24',
};

// ── Icons (Lucide-compatible SVG) ─────────────────────────
function Ico({ path, path2, vb = '0 0 24 24', size = 18, color = 'currentColor', fill = 'none', sw = 2 }) {
  return (
    <svg width={size} height={size} viewBox={vb} fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={path} />
      {path2 && <path d={path2} />}
    </svg>
  );
}

const Icons = {
  Brain:         (p) => <Ico {...p} path="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.89A3 3 0 1 1 9.5 2Z" path2="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.89A3 3 0 1 0 14.5 2Z" />,
  BookOpen:      (p) => <Ico {...p} path="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" path2="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
  Layers:        (p) => <Ico {...p} path="M2 20 12 14 22 20M2 15 12 9 22 15M12 2 2 7l10 5 10-5-10-5z" />,
  GitBranch:     (p) => <Ico {...p} path="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" path2="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9" />,
  Target:        (p) => <Ico {...p} path="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" path2="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  Heart:         (p) => <Ico {...p} path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  Zap:           (p) => <Ico {...p} path="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  Wrench:        (p) => <Ico {...p} path="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  AlertTriangle: (p) => <Ico {...p} path="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" path2="M12 9v4M12 17h.01" />,
  User:          (p) => <Ico {...p} path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" path2="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />,
  Menu:          (p) => <Ico {...p} path="M3 12h18M3 6h18M3 18h18" />,
  X:             (p) => <Ico {...p} path="M18 6 6 18M6 6l12 12" />,
  ChevDown:      (p) => <Ico {...p} path="M6 9l6 6 6-6" />,
  ChevRight:     (p) => <Ico {...p} path="M9 18l6-6-6-6" />,
  ChevLeft:      (p) => <Ico {...p} path="M15 18l-6-6 6-6" />,
  Check:         (p) => <Ico {...p} path="M20 6 9 17l-5-5" />,
  ArrowRight:    (p) => <Ico {...p} path="M5 12h14M12 5l7 7-7 7" />,
  Circle:        (p) => <Ico {...p} path="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />,
  Star:          (p) => <Ico {...p} path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
};

// ── Nav config ────────────────────────────────────────────
const NAV = [
  { id: 0, label: 'Введение',                 sub: 'Обзор книги',              Icon: Icons.Brain },
  { id: 1, label: 'Метамодель',               sub: 'Гл. 1 · Язык и личность', Icon: Icons.BookOpen },
  { id: 2, label: 'Метасостояния',            sub: 'Гл. 2 · Рефлексия',       Icon: Icons.Layers },
  { id: 3, label: 'Стратегии',               sub: 'Гл. 3–4 · VAKO & TOTE',   Icon: Icons.GitBranch },
  { id: 4, label: 'R.E.S.O.L.V.E.',          sub: 'Гл. 5 · Модель решения',  Icon: Icons.Target },
  { id: 5, label: 'Ценности и убеждения',    sub: 'Гл. 6 · Метауровни',      Icon: Icons.Heart },
  { id: 6, label: 'Персональные силы',       sub: 'Гл. 7 · Юнг & навыки',    Icon: Icons.Zap },
  { id: 7, label: 'Паттерны трансформации', sub: 'Гл. 8–12 · НЛП техники',  Icon: Icons.Wrench },
  { id: 8, label: 'Расстройства личности',  sub: 'Гл. 13–24 · 12 типов',    Icon: Icons.AlertTriangle },
  { id: 9, label: 'Вы и ваша личность',     sub: 'Гл. 25 · Итог',            Icon: Icons.User },
];

// ── Progress Bar ─────────────────────────────────────────
function ProgressBar({ visited }) {
  const pct = Math.round((visited.size / 10) * 100);
  return (
    <div style={{ padding: '10px 20px', background: C.card, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <span style={{ fontSize: 11, color: C.muted, whiteSpace: 'nowrap', letterSpacing: 1 }}>ПРОГРЕСС</span>
      <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#6366f1,#22d3ee)', borderRadius: 99, transition: 'width 0.4s ease' }} />
      </div>
      <span style={{ fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>{visited.size}/10 разделов</span>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────
function Sidebar({ current, visited, onNav, open, onClose }) {
  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }} />
      )}
      <nav style={{
        width: 260, flexShrink: 0, background: C.card, borderRight: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto',
        position: window.innerWidth < 768 ? 'fixed' : 'relative',
        left: window.innerWidth < 768 ? (open ? 0 : -260) : 'auto',
        top: 0, zIndex: 50,
        transition: 'left 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: C.indigo, textTransform: 'uppercase' }}>НЛП · НС</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>Структура Личности</div>
          </div>
          {window.innerWidth < 768 && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 4 }}>
              <Icons.X size={18} color={C.muted} />
            </button>
          )}
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
          {NAV.map(({ id, label, sub, Icon }) => {
            const active = current === id;
            const done = visited.has(id);
            return (
              <button key={id} onClick={() => { onNav(id); onClose(); }} className="nav-item"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', marginBottom: 2,
                  background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                  borderLeft: `3px solid ${active ? C.indigo : 'transparent'}`,
                }}>
                <Icon size={16} color={active ? C.indigo : done ? C.violet : C.muted} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: active ? C.text : C.muted, marginBottom: 1 }}>{label}</div>
                  <div style={{ fontSize: 10, color: active ? C.muted : '#4a4a6a', letterSpacing: 0.3 }}>{sub}</div>
                </div>
                {done && !active && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.violet, flexShrink: 0 }} />
                )}
                {active && <Icons.ChevRight size={12} color={C.indigo} />}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, fontSize: 10, color: '#3a3a5a', lineHeight: 1.6 }}>
          Hall · Bodenhamer · Bolstad · Hamblett<br />
          Crown House Publishing, 2001
        </div>
      </nav>
    </>
  );
}

// ── AppShell ──────────────────────────────────────────────
function AppShell({ current, visited, onNav, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, color: C.text, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", overflow: 'hidden' }}>
      <Sidebar current={current} visited={visited} onNav={onNav} open={!isMobile || menuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 48, background: C.card, borderBottom: `1px solid ${C.border}`, flexShrink: 0, gap: 12 }}>
          {isMobile && (
            <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 4 }}>
              <Icons.Menu size={20} color={C.muted} />
            </button>
          )}
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{NAV[current].label}</div>
          <div style={{ fontSize: 11, color: C.muted }}>· {NAV[current].sub}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {current > 0 && (
              <button onClick={() => onNav(current - 1)}
                style={{ background: C.border, border: 'none', cursor: 'pointer', color: C.muted, padding: '5px 12px', borderRadius: 6, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icons.ChevLeft size={14} color={C.muted} /> Назад
              </button>
            )}
            {current < 9 && (
              <button onClick={() => onNav(current + 1)}
                style={{ background: `linear-gradient(90deg,${C.indigo},#818cf8)`, border: 'none', cursor: 'pointer', color: '#fff', padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                Далее <Icons.ChevRight size={14} color="#fff" />
              </button>
            )}
          </div>
        </div>

        <ProgressBar visited={visited} />

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 64px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { C, Icons, NAV, AppShell });
