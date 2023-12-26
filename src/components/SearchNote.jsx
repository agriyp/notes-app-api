import { string, func } from 'prop-types';
import { useContext } from 'react';
import LocaleContext from '../context/LocaleContext';

const SearchNote = ({ searchTitle, onSearch }) => {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="note-search__wrap">
      <input className="note-search" type="text" placeholder={locale === 'id' ? 'Cari judul catatan ...' : 'Search title note ...'} value={searchTitle} onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
};

SearchNote.propTypes = {
  searchTitle: string.isRequired,
  onSearch: func.isRequired,
};

export default SearchNote;
