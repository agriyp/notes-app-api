import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/network-data';

const AddNote = () => {
  const navigate = useNavigate();
  const addNoteHandler = async ({ title, body }) => {
    await addNote({ title, body });
    navigate('/notes');
  };

  return (
    <>
      <div className="note-app container">
        <div className="note-wrap__input">
          <NoteInput addNote={addNoteHandler} />
        </div>
      </div>
    </>
  );
};

export default AddNote;
