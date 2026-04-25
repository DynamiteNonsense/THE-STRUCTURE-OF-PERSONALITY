// personality-app.jsx
const { useState, useEffect } = React;

const SECTIONS = [Section0, Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9];

function App() {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  const navigate = (id) => {
    setCurrent(id);
    setVisited(prev => new Set([...prev, id]));
  };

  const SectionComponent = SECTIONS[current];

  return (
    <AppShell current={current} visited={visited} onNav={navigate}>
      <SectionComponent key={current} />
    </AppShell>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
