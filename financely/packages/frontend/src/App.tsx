import { useState } from 'react';
import { useDeals } from './hooks/useDeals';

export default function App() {
  const { data } = useDeals();
  const [dark, setDark] = useState(true);
  return (
    <div className={dark ? 'dark' : ''}>
      <header className="p-4 bg-navy text-white flex justify-between">
        <h1>Financely</h1>
        <button
          className="bg-muted-green px-4 py-1 rounded"
          onClick={() => setDark(!dark)}
        >
          Toggle Theme
        </button>
      </header>
      <main className="p-4">
        <h2 className="text-muted-green">Deals</h2>
        <ul>
          {data?.deals.map((d: any) => (
            <li key={d.id}>{d.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
