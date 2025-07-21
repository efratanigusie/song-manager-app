import React, { useState } from 'react';
import SongList from './components/SongList';
import SongForm from './components/SongForm';
import styled from '@emotion/styled';

// --- Styled Components for App.js ---

const AppContainer = styled.div`
  font-family: sans-serif;
  margin: 20px;
  background-color: #f4f4f4;
  color: #333;
`;

const AppTitle = styled.h1`
  text-align: center;
  color: #007bff;
  margin-bottom: 30px;
  font-size: 2.5em;
`;

const AddButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AddSongButton = styled.button`
  padding: 12px 25px;
  background-color: #28a745; /* Success green */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// --- App Component ---
const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);

  const handleAddClick = () => {
    setSongToEdit(null);
    setShowForm(true);
  };

  const handleEditClick = (song) => {
    setSongToEdit(song);
    setShowForm(true);
  };

  const handleFormComplete = () => {
    setShowForm(false);
    setSongToEdit(null);
  };

  return (
    <AppContainer>
      <AppTitle>Song Management Application</AppTitle>
      <AddButtonContainer>
          <AddSongButton onClick={handleAddClick}>
              Add New Song
          </AddSongButton>
      </AddButtonContainer>

      {showForm && (
        <SongForm
          songToEdit={songToEdit}
          onComplete={handleFormComplete}
        />
      )}

      {!showForm && (
        <SongList
          onEditSong={handleEditClick}
        />
      )}
    </AppContainer>
  );
};

export default App;