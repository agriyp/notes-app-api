import NoteList from '../components/NoteList';
import SearchNote from '../components/SearchNote';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteNote, getArchivedNotes, unarchiveNote } from '../utils/network-data';
import LocaleContext from '../context/LocaleContext';

const Archived = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const onArchivedHandler = async (id) => {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const onSearchHandler = (searchValue) => {
    setKeyword(searchValue);
    setSearchParams({ keyword: searchValue });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <>
      <div className="note-app container">
        <SearchNote searchTitle={keyword} onSearch={onSearchHandler} />
        <div className="note-wrap__notes">
          <h2>{locale === 'id' ? 'Arsip' : 'Archived'}</h2>
          <NoteList notes={filteredNotes} onDelete={onDeleteHandler} onArchived={onArchivedHandler} emptyNotesText="archive-notes" />
        </div>
      </div>
    </>
  );
};

export default Archived;
