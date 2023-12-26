import { string, func } from 'prop-types';
import { useContext } from 'react';
import LocaleContext from '../context/LocaleContext';

const DeleteButton = ({ id, onDelete }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <button className="note-item__delete" onClick={() => onDelete(id)}>
      {locale === 'id' ? 'Hapus' : 'Delete'}
    </button>
  );
};

DeleteButton.propTypes = {
  id: string.isRequired,
  onDelete: func.isRequired,
};

export default DeleteButton;
