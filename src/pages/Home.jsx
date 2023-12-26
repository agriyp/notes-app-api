import NoteList from '../components/NoteList';
import SearchNote from '../components/SearchNote';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { archiveNote, deleteNote, getActiveNotes } from '../utils/network-data';
import LocaleContext from '../context/LocaleContext';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onArchivedHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
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
          <h2>{locale === 'id' ? 'Daftar Catatan' : 'Note List'}</h2>
          <NoteList notes={filteredNotes} onDelete={onDeleteHandler} onArchived={onArchivedHandler} emptyNotesText="active-notes" />
        </div>
      </div>
    </>
  );
};

export default Home;
