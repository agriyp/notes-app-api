import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddNote from '../pages/AddNote';
import DetailNote from '../pages/DetailNote';
import Archived from '../pages/Archived';
import Navigation from './Navigation';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import { getUserLogged, putAccessToken } from '../utils/network-data';
import Login from '../pages/Login';
import { LocaleProvider } from '../context/LocaleContext';
import Register from '../pages/Register';

const NoteApp = () => {
  const [authedUser, setAuthUser] = useState(null);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthUser(data);
      setInitializing(false);
    });
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthUser(data);
  };

  const onLogout = () => {
    setAuthUser(null);

    putAccessToken('');
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const showFormattedDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    theme === 'light' ? document.body.setAttribute('data-theme', theme) : document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const contextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
      theme,
      toggleTheme,
      showFormattedDate,
    };
  }, [locale, theme]);

  if (initializing) {
    return (
      <div className="note-app container">
        <div className="note-wrap__loading">
          <h3>Loading ...</h3>
        </div>
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={contextValue}>
        <Navigation name={authedUser} toggleLocale={toggleLocale} toggleTheme={toggleTheme} />
        <div className="note-app container">
          <main>
            <Routes>
              <Route path="/*" element={<Login loginSuccess={onLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={contextValue}>
      <Navigation logout={onLogout} name={authedUser.name} toggleLocale={toggleLocale} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/notes" element={<Home />} />
        <Route path="/notes/new" element={<AddNote />} />
        <Route path="/notes/detail/:id" element={<DetailNote />} />
        <Route path="/notes/archived" element={<Archived />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LocaleProvider>
  );
};

export default NoteApp;
