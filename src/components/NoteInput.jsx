import { useContext, useState } from 'react';
import { func } from 'prop-types';
import LocaleContext from '../context/LocaleContext';

const NoteInput = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const maxChar = 50;
  const { locale } = useContext(LocaleContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value.slice(0, maxChar));
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    addNote({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <>
      <h2>{locale === 'id' ? 'Buat Catatan' : 'Create Note'}</h2>
      <form className="note-input" onSubmit={onSubmitEventHandler}>
        <div>
          <input type="text" placeholder={locale === 'id' ? 'Masukan judul catatan ...' : 'Enter title note ...'} value={title} onChange={handleTitleChange} required />
          <p>
            {locale === 'id' ? 'Sisa karakter' : 'Remaining characters'} <span>{maxChar - title.length}</span>
          </p>
        </div>
        <textarea
          type="text"
          placeholder={locale === 'id' ? 'Masukan isi catatan ... (mendukung input rich format)' : 'Enter body note ... (supports rich format)'}
          value={body}
          onChange={handleBodyChange}
          spellCheck="false"
          required
        ></textarea>
        <button type="submit">{locale === 'id' ? 'Tambah' : 'Add'}</button>
      </form>
    </>
  );
};

NoteInput.propTypes = {
  addNote: func.isRequired,
};

export default NoteInput;
