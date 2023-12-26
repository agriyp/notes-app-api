import NoteItemBody from './NoteItemBody';
import DeleteButton from './DeleteButton';
import ArchivedButton from './ArchivedButton';
import { string, bool, func } from 'prop-types';

function NoteItem({ id, title, body, archived, createdAt, onDelete, onArchived }) {
  return (
    <div className="note-item">
      <NoteItemBody id={id} title={title} body={body} createdAt={createdAt} />
      <div className="wrap-btn">
        <DeleteButton id={id} onDelete={onDelete} />
        <ArchivedButton id={id} onArchived={onArchived} archived={archived} />
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  archived: bool.isRequired,
  createdAt: string.isRequired,
  onDelete: func.isRequired,
  onArchived: func.isRequired,
};

export default NoteItem;
