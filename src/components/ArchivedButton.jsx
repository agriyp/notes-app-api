import { string, func, bool } from 'prop-types';
import { useContext } from 'react';
import LocaleContext from '../context/LocaleContext';

const ArchivedButton = ({ id, onArchived, archived }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <button className="note-item__archived" onClick={() => onArchived(id)}>
      {archived && locale === 'id' && 'Batal Arsip'}
      {archived && locale === 'en' && 'Unarchive'}
      {!archived && locale === 'id' && 'Arsipkan'}
      {!archived && locale === 'en' && 'Archive'}
    </button>
  );
};

ArchivedButton.propTypes = {
  id: string.isRequired,
  onArchived: func.isRequired,
  archived: bool.isRequired,
};

export default ArchivedButton;
