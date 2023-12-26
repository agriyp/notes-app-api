import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getNote } from '../utils/network-data';
import { useContext, useEffect, useState } from 'react';
import LocaleContext from '../context/LocaleContext';

const DetailNote = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const { showFormattedDate, locale } = useContext(LocaleContext);

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNotes(data);
    });
  }, []);

  return (
    <div className="note-app container">
      <div className="note-wrap__notes">
        <h2 className="note-item__detail__header">{locale === 'id' ? 'Rincian Catatan' : 'Detailed Note'}</h2>
        <div className="note-item__detail">
          <div className="note-item__body">
            <h3 className="note-item__title no-underline">{notes.title}</h3>
            <p className="note-item__created_at">{showFormattedDate(notes.createdAt)}</p>
            <div className="note-item__desc">{typeof notes.body === 'string' && parse(notes.body)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNote;
