import { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import ProductList from './components/ProductList.jsx';
import { session, logout } from './api.js';

export default function App() {
  const [auth, setAuth] = useState(() => session.get());

  // The API layer fires this event when the session can no longer be refreshed
  useEffect(() => {
    const onLogout = () => setAuth(null);
    window.addEventListener('auth:logout', onLogout);
    return () => window.removeEventListener('auth:logout', onLogout);
  }, []);

  const handleLogin = (data) => {
    session.set({ user: data.user, tokens: data.tokens });
    setAuth(session.get());
  };

  const handleLogout = async () => {
    try {
      await logout(); // revokes the refresh token on the server
    } catch {
      /* even if the request fails, clear the local session */
    }
    session.clear();
    setAuth(null);
  };

  return (
    <>
      <div className="ocean-life" aria-hidden="true">
        <span className="bubble bubble-one" />
        <span className="bubble bubble-two" />
        <span className="bubble bubble-three" />
        <span className="bubble bubble-four" />
        <span className="bubble bubble-five" />
        <span className="bubble bubble-six" />
        <span className="bubble bubble-seven" />
        <span className="bubble bubble-eight" />
        <span className="bubble bubble-nine" />
        <span className="bubble bubble-ten" />
        <span className="bubble bubble-eleven" />
        <span className="bubble bubble-twelve" />
        <span className="bubble bubble-thirteen" />
        <span className="bubble bubble-fourteen" />
        <span className="bubble bubble-fifteen" />
        <span className="bubble bubble-sixteen" />
        <span className="bubble bubble-seventeen" />
        <span className="bubble bubble-eighteen" />
        <span className="bubble bubble-nineteen" />
        <span className="bubble bubble-twenty" />
        <span className="ocean-fish fish-one">🐠</span>
        <span className="ocean-fish fish-two">🐟</span>
        <span className="ocean-fish fish-three">🐡</span>
        <span className="ocean-fish fish-four">🐠</span>
        <span className="ocean-shark shark-one">🦈</span>
        <span className="ocean-shark shark-two">🦈</span>
        <span className="ocean-shark shark-three">🦈</span>
      </div>
      <div className="app-content">
        {!auth ? (
          <Login onLogin={handleLogin} />
        ) : (
          <ProductList user={auth.user} onLogout={handleLogout} />
        )}
      </div>
    </>
  );
}
