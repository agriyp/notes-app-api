import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';
import parse from 'html-react-parser';
import { useContext } from 'react';
import LocaleContext from '../context/LocaleContext';

function NoteItemBody({ id, title, body, createdAt }) {
  const navigate = useNavigate();
  const { showFormattedDate } = useContext(LocaleContext);
  const onDetailHandle = (id) => {
    navigate(`/notes/detail/${id}`);
  };

  return (
    <div className="note-item__body">
      <h3 onClick={() => onDetailHandle(id)} className="note-item__title">
        {title}
      </h3>
      <p onClick={() => onDetailHandle(id)} className="note-item__created_at">
        {showFormattedDate(createdAt)}
      </p>
      <div onClick={() => onDetailHandle(id)} className="note-item__desc">
        {parse(body)}
      </div>
    </div>
  );
}

NoteItemBody.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  createdAt: string.isRequired,
};

export default NoteItemBody;
