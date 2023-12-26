import NoteItem from './NoteItem';
import { arrayOf, object, func, oneOf } from 'prop-types';

const NoteList = ({ notes, onDelete, onArchived, emptyNotesText }) => {
  if (notes.length === 0) {
    switch (emptyNotesText) {
      case 'active-notes':
        return (
          <div className="note-list__empty">
            <p>Tidak ada catatan</p>
          </div>
        );
      case 'archive-notes':
        return (
          <div className="note-list__empty">
            <p>Arsip tidak ada</p>
          </div>
        );
      default:
        return (
          <div className="note-list__empty">
            <p>Tidak ada catatan</p>
          </div>
        );
    }
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} id={note.id} onDelete={onDelete} onArchived={onArchived} {...note} />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: arrayOf(object).isRequired,
  onDelete: func.isRequired,
  onArchived: func.isRequired,
  emptyNotesText: oneOf(['active-notes', 'archive-notes']).isRequired,
};

export default NoteList;
