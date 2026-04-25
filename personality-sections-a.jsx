// personality-sections-a.jsx
const { useState } = React;

// ── Shared primitives ─────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: C.card, borderRadius: 12, padding: 24, ...style }}>{children}</div>;
}
function QuoteBlock({ children, author, accent = 'indigo' }) {
  return (
    <div className={accent === 'violet' ? 'grad-border-violet' : 'grad-border'} style={{ borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <p style={{ fontSize: 16, fontStyle: 'italic', color: C.text, lineHeight: 1.75 }}>{children}</p>
      {author && <p style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>— {author}</p>}
    </div>
  );
}
function EyebrowTitle({ eyebrow, title, subtitle, color = C.indigo }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {eyebrow && <div style={{ fontSize: 10, letterSpacing: 4, color: C.muted, textTransform: 'uppercase', marginBottom: 8 }}>{eyebrow}</div>}
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }} className="grad-text">{title}</h1>
      {subtitle && <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 620 }}>{subtitle}</p>}
    </div>
  );
}
function Tag({ children, color = C.indigo }) {
  return <span style={{ background: color + '22', color, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase' }}>{children}</span>;
}
function SectionLabel({ children, color = C.violet }) {
  return <div style={{ fontSize: 10, letterSpacing: 3, color, textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{children}</div>;
}

function Tabs({ tabs, panels }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', gap: 2, borderBottom: `1px solid ${C.border}`, marginBottom: 24, overflowX: 'auto' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ padding: '10px 18px', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              color: active === i ? C.indigo : C.muted,
              borderBottom: `2px solid ${active === i ? C.indigo : 'transparent'}`,
              transition: 'all 0.2s', marginBottom: -1 }}>
            {t}
          </button>
        ))}
      </div>
      <div className="section-in" key={active}>{panels[active]}</div>
    </div>
  );
}

function Accordion({ title, children, accent = C.indigo, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid ${open ? accent + '55' : C.border}`, borderRadius: 10, marginBottom: 8, overflow: 'hidden', transition: 'border-color 0.25s' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', background: open ? accent + '11' : 'transparent', border: 'none', cursor: 'pointer', color: C.text, fontWeight: 600, fontSize: 13, transition: 'background 0.2s' }}>
        <span>{title}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s', color: accent, fontSize: 16 }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '4px 18px 16px', color: C.muted, fontSize: 13, lineHeight: 1.75 }} className="section-in">
          {children}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 0 — ВВЕДЕНИЕ
// ══════════════════════════════════════════════════════════
function Section0() {
  return (
    <div className="section-in">
      <EyebrowTitle
        eyebrow="Введение в книгу"
        title="Структура Личности"
        subtitle="Л. Майкл Холл, Боб Боденхамер, Ричард Болстэд, Марго Хэмблетт. Crown House Publishing, 2001."
      />
      <QuoteBlock author="Ключевая идея книги">
        «Личность — не "предмет", а процесс. Когда мы обсуждаем личность, мы говорим о системе реагирования и взаимоотношений — о наборе поведений. Это хорошая новость: личность может быть перестроена и перепрограммирована.»
      </QuoteBlock>

      {/* 3 вопроса */}
      <SectionLabel>Три центральных вопроса книги</SectionLabel>
      <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
        {[
          { n: '01', q: 'Как мы активно создаём паттерны личности?', d: 'Книга раскрывает, как мы создаём паттерны опыта через когнитивную систему внутренних репрезентаций, и контексты, в которых такое паттернирование возрастает.' },
          { n: '02', q: 'На каких уровнях формируются убеждения и ценности, определяющие поведение?', d: 'Исследуются более высокие уровни (метауровни), на которых мы вырабатываем убеждения и ценности, управляющие нашими манерами поведения — незаметно, как операционная система.' },
          { n: '03', q: 'Какие стратегии изменят паттерны и перепрограммируют личность?', d: 'Представлены стратегии, которые изменят поведения на каждой стадии формирования личности, особенно на стадии формирования сердцевинных убеждений.' },
        ].map(({ n, q, d }) => (
          <div key={n} style={{ background: C.card, borderRadius: 12, padding: 20, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: C.indigo, opacity: 0.2, lineHeight: 1, flexShrink: 0, width: 48, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{q}</p>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65 }}>{d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Авторы */}
      <SectionLabel>Авторы</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 32 }}>
        {[
          { name: 'Л. Майкл Холл', role: 'PhD, исследователь и моделировщик, основатель Нейросемантики, создал Модель Метасостояний в 1994 году' },
          { name: 'Боб Боденхамер', role: 'D.Min, соучредитель Нейросемантики, директор Института Нейросемантики в Gastonia, NC' },
          { name: 'Ричард Болстэд', role: 'Тренер НЛП, разработчик Семинара Трансформации Коммуникаций, Новая Зеландия' },
          { name: 'Марго Хэмблетт', role: 'Тренер НЛП, соавтор книги. Посвятила жизнь трансформации личности через НЛП (1945–2001)' },
        ].map(({ name, role }) => (
          <div key={name} className="card-hover" style={{ background: C.card, borderRadius: 10, padding: 18, borderTop: `2px solid ${C.indigo}` }}>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{name}</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{role}</div>
          </div>
        ))}
      </div>

      {/* Структура книги */}
      <Card>
        <SectionLabel color={C.cyan}>Структура книги</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { c: C.indigo, t: 'Часть I: Модели НЛП и НС (Главы 1–12)', d: 'Теоретические и практические модели для понимания структуры личности: Метамодель, Метасостояния, Стратегии, RESOLVE, Ценности и убеждения, Персональные Силы, Паттерны трансформации' },
            { c: C.cyan, t: 'Часть II: Расстройства и трансформация (Главы 13–25)', d: 'Конкретные личностные расстройства — Шизофрения, Паранойя, Депрессия, ПРЛ, Нарциссизм, ОКР, Аддикция и другие — и их трансформация с помощью НЛП/НС' },
          ].map(({ c, t, d }) => (
            <div key={t} style={{ borderLeft: `3px solid ${c}`, paddingLeft: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 13, color: C.text }}>{t}</div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 1 — МЕТАМОДЕЛЬ И ЛИЧНОСТЬ
// ══════════════════════════════════════════════════════════
function Section1() {
  const [activeProcess, setActiveProcess] = useState(null);
  const processes = [
    {
      name: 'Удаление', emoji: '✂', color: C.indigo,
      def: 'Процесс, при котором мы обращаем внимание на одни аспекты опыта и игнорируем другие. Удаление защищает нас от информационной перегрузки, но может скрывать важные детали.',
      examples: ['«Я тревожусь» (что именно вызывает тревогу? о чём? когда?)','«Он меня не понимает» (как именно? в чём именно?)', '«Мне плохо» (когда? где? по сравнению с чем?)'],
      questions: ['Что именно? Кто конкретно?', 'Как именно это происходит?', 'Когда? Где? В каком контексте?'],
    },
    {
      name: 'Искажение', emoji: '🔀', color: C.violet,
      def: 'Процесс изменения восприятия реальности — чтение мыслей, причинно-следственные связи, номинализации. Искажение позволяет планировать будущее, но может создавать иллюзии.',
      examples: ['«Он злится на меня» (чтение мыслей)', '«Ты заставляешь меня чувствовать себя виноватым» (причинно-следственная связь)', '«Моя депрессия не проходит» (номинализация)'],
      questions: ['Откуда ты знаешь, что он думает/чувствует?', 'Как именно X вызывает Y?', 'Как именно ты депрессируешь?'],
    },
    {
      name: 'Обобщение', emoji: '∞', color: C.cyan,
      def: 'Процесс, при котором один опыт начинает представлять целую категорию. Обобщение позволяет быстро обучаться, но может создавать ограничивающие убеждения.',
      examples: ['«Я всегда всё делаю не так»', '«Мужчины никогда не слушают»', '«Невозможно доверять людям»'],
      questions: ['Всегда? Все? Никогда?', 'Было ли хоть раз иначе?', 'Что мешает... в данном случае?'],
    },
  ];

  return (
    <div className="section-in">
      <EyebrowTitle eyebrow="Глава 1" title="Метамодель и Личность" subtitle="Как язык формирует нашу карту реальности — и что это означает для понимания личности." />

      <QuoteBlock author="Холл, Боденхамер">
        «Личность» — это номинализация: глагол «личностировать» превратился в существительное. На самом деле личность — это процесс, а не вещь. Деноминализация возвращает нам доступ к этому процессу.»
      </QuoteBlock>

      <SectionLabel>Деноминализация «личности»</SectionLabel>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
          <div style={{ background: C.card2, borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>📦</div>
            <Tag color={C.muted}>Номинализация (существительное)</Tag>
            <div style={{ fontSize: 18, fontWeight: 700, margin: '10px 0', color: C.text }}>«Личность»</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Застывший процесс. Создаёт иллюзию фиксированной «вещи», которую нельзя изменить.</div>
          </div>
          <div style={{ fontSize: 28, color: C.indigo }}>→</div>
          <div style={{ background: `linear-gradient(135deg, ${C.indigo}22, ${C.cyan}22)`, borderRadius: 10, padding: 16, textAlign: 'center', border: `1px solid ${C.indigo}44` }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>⚡</div>
            <Tag color={C.cyan}>Деноминализация (глагол)</Tag>
            <div style={{ fontSize: 18, fontWeight: 700, margin: '10px 0', color: C.text }}>«Личностировать»</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Живой процесс. Открывает возможность изменения, перестройки и перепрограммирования.</div>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: C.card2, borderRadius: 8, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
          <strong style={{ color: C.violet }}>Принцип НЛП:</strong> Вопросы деноминализации — «Как именно ты это делаешь?», «Когда это происходит?», «Как бы ты хотел делать это иначе?» — возвращают нас от замороженного «предмета» к живому процессу, которым можно управлять.
        </div>
      </Card>

      <SectionLabel>Три процесса моделирования — нажмите на каждый</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {processes.map((p) => (
          <button key={p.name} onClick={() => setActiveProcess(activeProcess?.name === p.name ? null : p)}
            style={{ background: activeProcess?.name === p.name ? p.color + '22' : C.card, border: `2px solid ${activeProcess?.name === p.name ? p.color : C.border}`, borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'all 0.25s', textAlign: 'center', color: C.text }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{p.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: activeProcess?.name === p.name ? p.color : C.text }}>{p.name}</div>
          </button>
        ))}
      </div>
      {activeProcess && (
        <div className="section-in" style={{ background: activeProcess.color + '11', border: `1px solid ${activeProcess.color}44`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <Tag color={activeProcess.color}>{activeProcess.name}</Tag>
          <p style={{ marginTop: 12, marginBottom: 16, color: C.text, lineHeight: 1.7, fontSize: 14 }}>{activeProcess.def}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: activeProcess.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Примеры из речи</div>
              {activeProcess.examples.map((e, i) => <div key={i} style={{ fontSize: 12, color: C.muted, marginBottom: 4, paddingLeft: 12, borderLeft: `2px solid ${activeProcess.color}55` }}>{e}</div>)}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: activeProcess.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Вопросы Метамодели</div>
              {activeProcess.questions.map((q, i) => <div key={i} style={{ fontSize: 12, color: C.muted, marginBottom: 4, paddingLeft: 12, borderLeft: `2px solid ${activeProcess.color}55` }}>«{q}»</div>)}
            </div>
          </div>
        </div>
      )}

      <SectionLabel>Метамодель и структура личности</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {[
          { t: 'Восстановление удалённого', d: 'Вопросы метамодели помогают восстановить скрытую информацию о паттернах личности — «Что именно вызывает у вас тревогу?»' },
          { t: 'Деноминализация', d: 'Превращение «вещей» обратно в процессы: «депрессия» → «как вы депрессируете?», «тревожность» → «как вы тревожитесь?»' },
          { t: 'Временно́е индексирование', d: 'Когда именно? Всегда ли это так? Было ли раньше иначе? — разрушает тотальные обобщения.' },
          { t: 'Индексирование по контексту', d: 'Где это происходит? Со всеми людьми или только с некоторыми? — обнаруживает исключения из ограничивающих убеждений.' },
        ].map(({ t, d }) => (
          <div key={t} style={{ background: C.card, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.indigo, marginBottom: 6 }}>{t}</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 2 — МЕТАСОСТОЯНИЯ И ЛИЧНОСТЬ
// ══════════════════════════════════════════════════════════
function Section2() {
  const [examples, setExamples] = useState(null);

  const domains = [
    {
      name: 'Метамодель', sub: 'Лингвистический домен', color: C.indigo,
      desc: 'Метамодель — инструмент работы с языком и мышлением. Она исследует, как Удаление, Искажение и Обобщение создают «поверхностную структуру» речи из «глубинной структуры» опыта.',
      key: 'Язык — это карта, а не территория. Слова никогда полностью не передают опыт.',
    },
    {
      name: 'Метапрограммы', sub: 'Перцептивный домен', color: C.violet,
      desc: 'Метапрограммы — это устойчивые фильтры восприятия, которые определяют, как человек сортирует и обрабатывает информацию. Примеры: «к» vs «от», глобальный vs детальный, ориентация на людей vs задачи.',
      key: 'Метапрограммы — это застывшие метасостояния. Именно метасостояния создают метапрограммы.',
    },
    {
      name: 'Метасостояния', sub: 'Рефлексивный домен', color: C.cyan,
      desc: 'Метасостояния — это состояния о состояниях. Когда мы думаем или чувствуем что-то по отношению к нашему первичному состоянию, мы создаём метасостояние. Этот рефлексивный уровень формирует личность.',
      key: 'Наслоение мыслей-о-мыслях и чувств-о-чувствах создаёт устойчивые личностные паттерны.',
    },
  ];

  const stateExamples = [
    { ps: 'Страх', ms: 'Страх страха → Фобия', ms2: 'Принятие страха → Смелость', color: '#ef4444' },
    { ps: 'Гнев', ms: 'Стыд за гнев → Подавленность', ms2: 'Любопытство к гневу → Самопонимание', color: '#f97316' },
    { ps: 'Радость', ms: 'Вина за радость → Депрессия', ms2: 'Радость от обучения → Энтузиазм', color: '#eab308' },
    { ps: 'Тревога', ms: 'Тревога о тревоге → Паническое расстройство', ms2: 'Спокойствие о тревоге → Резилентность', color: '#8b5cf6' },
  ];

  return (
    <div className="section-in">
      <EyebrowTitle eyebrow="Глава 2" title="Метасостояния и Личность" subtitle="Три метадомена НЛП и то, как рефлексивное сознание формирует личностные паттерны." />

      <QuoteBlock>
        «Метапрограммы — это застывшие метасостояния. Метасостояния создают метапрограммы. Личность — это кристаллизованные метасостояния, которые мы развиваем на протяжении жизни.»
      </QuoteBlock>

      <SectionLabel>Три метадомена НЛП</SectionLabel>
      <Tabs
        tabs={domains.map(d => d.name)}
        panels={domains.map(d => (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} key={d.name}>
            <div>
              <Tag color={d.color}>{d.sub}</Tag>
              <p style={{ marginTop: 12, color: C.text, lineHeight: 1.75, fontSize: 14 }}>{d.desc}</p>
            </div>
            <div style={{ background: d.color + '11', border: `1px solid ${d.color}33`, borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: d.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Ключевой принцип</div>
              <p style={{ color: C.text, fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>«{d.key}»</p>
            </div>
          </div>
        ))}
      />

      <SectionLabel style={{ marginTop: 32 }}>Первичные состояния vs Метасостояния</SectionLabel>
      <div style={{ background: C.card, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr 1fr', gap: 0, alignItems: 'stretch' }}>
          <div style={{ padding: '0 16px 0 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.indigo, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Первичное состояние</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>Непосредственный, прямой опыт: страх, гнев, радость, печаль, любопытство. Реакция на внешние события.</div>
          </div>
          <div style={{ background: C.border, margin: '0 16px' }} />
          <div style={{ padding: '0 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.violet, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Ограничивающее метасост.</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>Негативная реакция на первичное состояние — создаёт петли и усиливает проблему.</div>
          </div>
          <div style={{ padding: '0 0 0 16px', borderLeft: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Ресурсное метасост.</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>Позитивная реакция на первичное состояние — трансформирует и обогащает опыт.</div>
          </div>
        </div>
      </div>

      <SectionLabel>Интерактивные примеры — нажмите на эмоцию</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: examples ? 16 : 0 }}>
        {stateExamples.map(se => (
          <button key={se.ps} onClick={() => setExamples(examples?.ps === se.ps ? null : se)}
            style={{ background: examples?.ps === se.ps ? se.color + '22' : C.card, border: `2px solid ${examples?.ps === se.ps ? se.color : C.border}`, borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: C.text, fontWeight: 600, fontSize: 14, transition: 'all 0.2s' }}>
            {se.ps}
          </button>
        ))}
      </div>
      {examples && (
        <div className="section-in" style={{ background: examples.color + '0d', border: `1px solid ${examples.color}44`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ borderLeft: `3px solid #ef4444`, paddingLeft: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', letterSpacing: 2, marginBottom: 6 }}>ОГРАНИЧИВАЮЩЕЕ МЕТАСОСТОЯНИЕ</div>
              <div style={{ fontSize: 14, color: C.text }}>{examples.ms}</div>
            </div>
            <div style={{ borderLeft: `3px solid ${C.success}`, paddingLeft: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.success, letterSpacing: 2, marginBottom: 6 }}>РЕСУРСНОЕ МЕТАСОСТОЯНИЕ</div>
              <div style={{ fontSize: 14, color: C.text }}>{examples.ms2}</div>
            </div>
          </div>
        </div>
      )}

      <SectionLabel>Как метасостояния формируют личность</SectionLabel>
      <div style={{ display: 'grid', gap: 10 }}>
        {[
          { t: 'Наслоение мыслей-о-мыслях', d: 'Каждая новая мысль о состоянии добавляет «слой» к нашему опыту. Эти слои накапливаются и со временем становятся устойчивыми паттернами — чертами личности.' },
          { t: 'Кристаллизация паттернов', d: 'Когда метасостояние повторяется достаточно часто, оно «затвердевает» в метапрограмму — автоматический фильтр восприятия, который определяет, как человек воспринимает реальность.' },
          { t: 'Рефлексивное сознание', d: 'Способность думать о своих мыслях и чувствовать по отношению к своим чувствам — это то, что отличает человека. Именно эта рефлексивность создаёт как расстройства, так и ресурсы.' },
        ].map(({ t, d }) => (
          <Accordion key={t} title={t}>{d}</Accordion>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 3 — СТРАТЕГИИ И ПРОЕКТИРОВАНИЕ
// ══════════════════════════════════════════════════════════
function Section3() {
  const [activeEmotion, setActiveEmotion] = useState(null);

  const vakoItems = [
    { k: 'V', name: 'Визуальный', color: '#6366f1', ex: 'Внутренние образы, картины, воспоминания, фантазии. «Я вижу своё будущее».' },
    { k: 'A', name: 'Аудиальный', color: '#22d3ee', ex: 'Внутренний голос, звуки, мелодии. «Что-то говорит мне, что я не справлюсь».' },
    { k: 'K', name: 'Кинестетический', color: '#a78bfa', ex: 'Ощущения, эмоции в теле, движения. «Я чувствую тяжесть в груди».' },
    { k: 'O', name: 'Аудиально-Дигитальный', color: '#34d399', ex: 'Внутренний диалог, логика, самоговорение. «Я говорю себе, что должен...».' },
  ];

  const emotions = [
    { name: 'Страх', color: '#22c55e', opp: 'Принятие', desc: 'Мобилизует для защиты от опасности. Противоположная эмоция — принятие.' },
    { name: 'Удивление', color: '#38bdf8', opp: 'Ожидание', desc: 'Дезориентирует, заставляет переоценить ситуацию. Связана с вниманием.' },
    { name: 'Печаль', color: '#6366f1', opp: 'Радость', desc: 'Сигнализирует о потере. Способствует рефлексии и переработке утраты.' },
    { name: 'Отвращение', color: '#84cc16', opp: 'Доверие', desc: 'Защищает от потенциально вредных объектов или идей.' },
    { name: 'Гнев', color: '#ef4444', opp: 'Страх', desc: 'Мобилизует для преодоления препятствий. Связан с угрозой ценностям.' },
    { name: 'Ожидание', color: '#f97316', opp: 'Удивление', desc: 'Направляет к желаемому. Связано с любопытством и предвкушением.' },
    { name: 'Радость', color: '#eab308', opp: 'Печаль', desc: 'Сигнализирует об осуществлении ценностей и потребностей.' },
    { name: 'Принятие', color: '#14b8a6', opp: 'Отвращение', desc: 'Способствует интеграции и связи. Основа доверия и близости.' },
  ];

  return (
    <div className="section-in">
      <EyebrowTitle eyebrow="Главы 3–4" title="Стратегии и Проектирование Личности" subtitle="Личность как организованная последовательность внутренних репрезентаций и 8 первичных эмоций по Платчику." />

      <QuoteBlock accent="violet">
        «Личность — это "энергетическое голографическое силовое поле". Она переживается не абстрактно, а в теле — через кинестетическое чувство "быть собой". Каждая репрезентация, каждый субмодальный сдвиг меняет это поле.»
      </QuoteBlock>

      {/* VAKO */}
      <SectionLabel>Модель VAKO — строительные блоки личности</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {vakoItems.map(({ k, name, color, ex }) => (
          <div key={k} className="card-hover" style={{ background: C.card, borderRadius: 12, padding: 20, borderTop: `3px solid ${color}`, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color, marginBottom: 8 }}>{k}</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: C.text }}>{name}</div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ex}</div>
          </div>
        ))}
      </div>

      {/* TOTE */}
      <SectionLabel>Модель TOTE — структура любой стратегии</SectionLabel>
      <Card style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', padding: '8px 0' }}>
          {[
            { label: 'Вход', sub: 'Триггер / стимул', color: C.muted },
            { label: '→', sub: '', color: C.border, arrow: true },
            { label: 'ТЕСТ', sub: 'Сравнение с эталоном', color: C.indigo },
            { label: '→', sub: '', color: C.border, arrow: true },
            { label: 'ОПЕРАЦИЯ', sub: 'Действие по изменению', color: C.violet },
            { label: '→', sub: '', color: C.border, arrow: true },
            { label: 'ТЕСТ', sub: 'Соответствие достигнуто?', color: C.indigo },
            { label: '→', sub: '', color: C.border, arrow: true },
            { label: 'ВЫХОД', sub: 'Завершение стратегии', color: C.success },
          ].map((item, i) =>
            item.arrow ? (
              <div key={i} style={{ fontSize: 20, color: C.border, flexShrink: 0 }}>→</div>
            ) : (
              <div key={i} style={{ background: item.color + '22', border: `1px solid ${item.color}55`, borderRadius: 8, padding: '12px 14px', textAlign: 'center', flexShrink: 0, minWidth: 90 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: item.color }}>{item.label}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 4, lineHeight: 1.4 }}>{item.sub}</div>
              </div>
            )
          )}
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: C.card2, borderRadius: 8, fontSize: 12, color: C.muted, lineHeight: 1.65 }}>
          <strong style={{ color: C.cyan }}>Применение:</strong> Любой поведенческий паттерн личности — это TOTE-петля. Понять стратегию = понять Тест (эталон), Операцию (действие) и критерий Выхода. Изменить личность = изменить Тест, Операцию или критерий.
        </div>
      </Card>

      {/* Plutchik wheel */}
      <SectionLabel>8 первичных эмоций Платчика — нажмите на каждую</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: activeEmotion ? 16 : 24 }}>
        {emotions.map(em => (
          <button key={em.name} onClick={() => setActiveEmotion(activeEmotion?.name === em.name ? null : em)}
            style={{ background: activeEmotion?.name === em.name ? em.color + '33' : C.card, border: `2px solid ${activeEmotion?.name === em.name ? em.color : C.border}`, borderRadius: 10, padding: '16px 12px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: em.color }} />
            <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{em.name}</div>
            <div style={{ fontSize: 10, color: C.muted }}>↔ {em.opp}</div>
          </button>
        ))}
      </div>
      {activeEmotion && (
        <div className="section-in" style={{ background: activeEmotion.color + '11', border: `1px solid ${activeEmotion.color}44`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: activeEmotion.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{activeEmotion.name}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 8 }}>{activeEmotion.desc}</div>
              <div style={{ fontSize: 12, color: activeEmotion.color }}>Противоположная эмоция: {activeEmotion.opp}</div>
            </div>
          </div>
        </div>
      )}

      <SectionLabel>Олицетворение (Embodiment) личности</SectionLabel>
      <Card>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>
          Личность не существует абстрактно — она <strong style={{ color: C.text }}>переживается в теле</strong>. Кинестетическое чувство «быть собой» является основой личности. Это означает, что изменение в позе, дыхании, движении напрямую влияет на личностные состояния. НЛП и НС работают с телесным олицетворением паттернов: изменение субмодальностей внутренних образов, изменение физиологии — это не отдельные техники, а прямая работа со «структурой личности».
        </p>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 4 — R.E.S.O.L.V.E.
// ══════════════════════════════════════════════════════════
function Section4() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      letter: 'R', label: 'Ресурсное состояние для практика',
      color: C.indigo,
      what: 'Прежде чем начать работу с клиентом, практик сам входит в ресурсное состояние: ассоциированное состояние любопытства, принятия, экологичного намерения.',
      presup: 'Карта — не территория. Состояние практика напрямую влияет на состояние клиента через невербальную коммуникацию.',
      example: 'Вспомнить случай, когда ты был максимально в ресурсе. Войти в это состояние физиологически — поза, дыхание, взгляд.',
    },
    {
      letter: 'E', label: 'Establish Rapport — Установление раппорта',
      color: '#818cf8',
      what: 'Создание атмосферы доверия и психологической безопасности. Подстройка по физиологии, голосу, паттернам речи. Использование языка клиента.',
      presup: 'Сопротивление указывает на недостаток раппорта. Раппорт — не техника, а состояние подлинного присутствия.',
      example: 'Отражение темпа речи, позы, ключевых слов клиента. «Вы сказали, что чувствуете "давление" — расскажите больше об этом давлении».',
    },
    {
      letter: 'S', label: 'Specificity — Определение желаемого результата',
      color: C.violet,
      what: 'Переход от «проблемы» к чётко сформулированному желаемому результату. Что именно клиент хочет вместо того, что имеет?',
      presup: 'Люди имеют все необходимые ресурсы. Задача практика — помочь клиенту сформулировать, куда он хочет прийти.',
      example: 'Вопросы: «Чего вы хотите вместо этого? Как вы поймёте, что достигли желаемого? Что изменится, когда цель будет достигнута?»',
    },
    {
      letter: 'O', label: 'Opening up the Model of the World',
      color: C.cyan,
      what: 'Расширение карты мира клиента. Исследование убеждений, ограничений, ресурсов. Метамодельные вопросы для восстановления удалённой информации.',
      presup: 'Все действия мотивируются позитивными намерениями. За любым «плохим» поведением — позитивная цель.',
      example: 'Деноминализация, вопросы к обобщениям («Всегда ли это так?»), поиск исключений, исследование убеждений о возможности изменения.',
    },
    {
      letter: 'L', label: 'Leading to Desired State',
      color: '#34d399',
      what: 'Применение конкретных паттернов НЛП для ведения клиента от проблемного состояния к желаемому. Выбор техники определяется моделью персональных сил.',
      presup: 'Человек — нейролингвистическая система. Изменение в одной части влияет на целое. Наименьшее изменение создаёт максимальный эффект.',
      example: 'Рефрейминг, работа с якорями, изменение субмодальностей, V-K диссоциация, метасостояние ресурсом — в зависимости от паттерна клиента.',
    },
    {
      letter: 'V', label: 'Verify — Верификация изменения',
      color: '#fbbf24',
      what: 'Проверка того, что изменение произошло и является экологичным. Тест в проблемном контексте. Подстройка к будущему.',
      presup: 'Все результаты — полезная обратная связь. Нет неудач, есть только обратная связь.',
      example: 'Мысленное «возвращение» в проблемную ситуацию: что теперь происходит? Подстройка к будущему: «Представьте себя через месяц в этой же ситуации...»',
    },
    {
      letter: 'E', label: 'Ecological Exit — Экологичный выход',
      color: '#f43f5e',
      what: 'Завершение сессии с учётом экологии: как изменение повлияет на все области жизни? Проверка на вторичные выгоды и непреднамеренные последствия.',
      presup: 'Человек — система. Изменение в одной части всегда влияет на целое. Экологичность — забота о благополучии всей системы.',
      example: '«Как это изменение повлияет на ваши отношения? Вашу работу? Кто ещё будет затронут? Что может стать проблемой?» — Переговоры частей при необходимости.',
    },
  ];

  const presups = [
    { t: 'Карта — не территория', d: 'Наша модель реальности никогда не является самой реальностью. У каждого человека — своя уникальная карта мира, и именно с ней мы работаем, а не с «объективной реальностью».' },
    { t: 'Сопротивление = недостаток раппорта', d: 'Когда клиент «сопротивляется», это не проблема клиента — это сигнал для практика, что нужно больше раппорта, иной подход, иной темп.' },
    { t: 'Все действия имеют позитивное намерение', d: 'За каждым поведением — даже деструктивным — стоит позитивная цель. Задача практика — найти это намерение и найти лучший способ его удовлетворить.' },
    { t: 'Люди имеют все необходимые ресурсы', d: 'Клиент уже обладает всеми ресурсами, необходимыми для изменения. Задача практика — помочь получить доступ к ним в нужном контексте.' },
    { t: 'Человек — нейролингвистическая система', d: 'Изменение в одной части системы влияет на целое. Наименьшее изменение в правильном месте может запустить цепную реакцию трансформации.' },
    { t: 'Все результаты — полезная обратная связь', d: 'Нет неудач — есть только результаты и обратная связь. Это пресуппозиция, которая трансформирует любой «провал» в информацию для следующего шага.' },
  ];

  return (
    <div className="section-in">
      <EyebrowTitle eyebrow="Глава 5" title="Модель R.E.S.O.L.V.E." subtitle="Семь последовательных шагов эффективного НЛП-вмешательства — полный алгоритм работы с клиентом." />

      <QuoteBlock>
        «Модель РЕШЕНИЯ искусно отражает последовательный ряд ключевых задач, формирующих важную часть работы над изменением. Она объединяет все ключевые навыки НЛП-практика в единый элегантный процесс.»
      </QuoteBlock>

      {/* Step navigator */}
      <SectionLabel>7 шагов — нажмите для подробностей</SectionLabel>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', padding: '4px 0' }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ width: 42, height: 42, borderRadius: '50%', background: step === i ? s.color : C.card, border: `2px solid ${step === i ? s.color : C.border}`, cursor: 'pointer', fontWeight: 900, fontSize: 16, color: step === i ? '#fff' : C.muted, flexShrink: 0, transition: 'all 0.2s' }}>
            {s.letter}
          </button>
        ))}
      </div>

      <div className="section-in" key={step} style={{ background: steps[step].color + '11', border: `1px solid ${steps[step].color}44`, borderRadius: 14, padding: 28, marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: steps[step].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff', flexShrink: 0 }}>
            {steps[step].letter}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: C.text }}>{steps[step].label}</div>
            <Tag color={steps[step].color}>Шаг {step + 1} из 7</Tag>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: steps[step].color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Что делать</div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{steps[step].what}</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: steps[step].color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Пресуппозиция НЛП</div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontStyle: 'italic' }}>«{steps[step].presup}»</p>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: steps[step].color + '11', borderRadius: 8, borderLeft: `3px solid ${steps[step].color}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: steps[step].color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Практика</div>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{steps[step].example}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'space-between' }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            style={{ background: 'none', border: `1px solid ${C.border}`, cursor: step === 0 ? 'default' : 'pointer', color: step === 0 ? C.border : C.muted, padding: '7px 16px', borderRadius: 8, fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>
            ← Назад
          </button>
          <button onClick={() => setStep(Math.min(6, step + 1))} disabled={step === 6}
            style={{ background: step === 6 ? 'none' : steps[step].color, border: `1px solid ${step === 6 ? C.border : steps[step].color}`, cursor: step === 6 ? 'default' : 'pointer', color: step === 6 ? C.border : '#fff', padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, opacity: step === 6 ? 0.4 : 1 }}>
            Вперёд →
          </button>
        </div>
      </div>

      <SectionLabel>6 ключевых пресуппозиций НЛП для работы с клиентами</SectionLabel>
      {presups.map(({ t, d }) => <Accordion key={t} title={t}>{d}</Accordion>)}
    </div>
  );
}

Object.assign(window, { Section0, Section1, Section2, Section3, Section4 });
