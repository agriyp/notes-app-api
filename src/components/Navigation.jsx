import { Link } from 'react-router-dom';
import { IoLanguage } from 'react-icons/io5';
import { MdOutlineLightMode, MdOutlineNoteAdd, MdOutlineArchive } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { HiOutlineHome } from 'react-icons/hi';
import { func, string } from 'prop-types';

const Navigation = ({ logout, name, toggleLocale, toggleTheme }) => {
  return (
    <header>
      <nav className="container">
        <Link to="/notes" className="logo">
          NOTEAPPS
        </Link>
        <ul>
          {name === null ? null : (
            <li>
              <Link className="icon-btn" to="/notes" title="Home">
                <HiOutlineHome />
              </Link>
            </li>
          )}
          {name === null ? null : (
            <li>
              <Link className="icon-btn" to="/notes/archived" title="Arsip">
                <MdOutlineArchive />
              </Link>
            </li>
          )}
          {name === null ? null : (
            <li>
              <Link className="icon-btn" to="/notes/new" title="Buat Catatan">
                <MdOutlineNoteAdd />
              </Link>
            </li>
          )}
          <li>
            <button className="icon-btn" onClick={toggleTheme} title="UI Mode">
              <MdOutlineLightMode />
            </button>
          </li>
          <li>
            <button className="icon-btn" onClick={toggleLocale} title="Language">
              <IoLanguage />
            </button>
          </li>
          {logout === (null || undefined) ? null : (
            <li>
              <button className="icon-btn__wrap" onClick={logout} title="Logout">
                <span className="icon-btn">
                  <TbLogout />
                </span>
                {name}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Navigation.propTypes = {
  logout: func,
  name: string,
  toggleLocale: func.isRequired,
  toggleTheme: func.isRequired,
};

export default Navigation;
