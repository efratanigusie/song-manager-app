import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongsRequest, deleteSongRequest } from '../redux/slices/songsSlice'; // This import needs to be correct!
import styled from '@emotion/styled';
import { css } from '@emotion/react';

// --- Styled Components for SongList ---

const ListContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: #fff;
`;

const ListTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #666;
`;

const ErrorText = styled.div`
  color: red;
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  font-weight: bold;
`;

const NoSongsText = styled.p`
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 30px;
`;

const SongsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  background-color: #f2f2f2;
  color: #555;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ActionsCell = styled(TableCell)`
  text-align: center;
  white-space: nowrap; /* Prevent buttons from wrapping */
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin: 0 4px; /* Space between buttons */
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #ffc107; /* Warning yellow */
  color: white;
  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #dc3545; /* Danger red */
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  color: black;
  cursor: pointer;
  font-weight: normal;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #e2e6ea;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.active && css`
    background-color: #007bff;
    color: white;
    font-weight: bold;
    &:hover {
      background-color: #0056b3;
    }
  `}
`;

// --- SongList Component ---
const SongList = ({ onEditSong }) => {
    const dispatch = useDispatch();
    const { list: songs, loading, error } = useSelector((state) => state.songs);

    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, [dispatch]); // Removed extra newline here

    const handleDelete = (songId) => {
        if (window.confirm('Are you sure you want to delete this song?')) {
            dispatch(deleteSongRequest(songId));
        }
    };

    if (loading && songs.length === 0) {
        return <LoadingText>Loading songs...</LoadingText>;
    }

    if (error) {
        return <ErrorText>Error: {error}</ErrorText>;
    }

    // Pagination Logic
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    const totalPages = Math.ceil(songs.length / songsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    onClick={() => paginate(i)}
                    active={currentPage === i} // Pass active prop for styling
                    disabled={loading}
                >
                    {i}
                </PageButton>
            );
        }
        return pageNumbers;
    };

    return (
        <ListContainer>
            <ListTitle>Song List</ListTitle>
            {songs.length === 0 && !loading ? (
                <NoSongsText>No songs available. Click "Add New Song" to get started!</NoSongsText>
            ) : (
                <>
                    <SongsTable>
                        <thead>
                            <tr>
                                <TableHeader>Title</TableHeader>
                                <TableHeader>Artist</TableHeader>
                                <TableHeader>Album</TableHeader>
                                <TableHeader>Year</TableHeader>
                                <TableHeader css={{ textAlign: 'center' }}>Actions</TableHeader> {/* Using css prop for a specific style */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentSongs.map((song) => (
                                <TableRow key={song.id}>
                                    <TableCell>{song.title}</TableCell>
                                    <TableCell>{song.artist}</TableCell>
                                    <TableCell>{song.album}</TableCell>
                                    <TableCell>{song.year}</TableCell>
                                    <ActionsCell>
                                        <EditButton
                                            onClick={() => onEditSong(song)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </EditButton>
                                        <DeleteButton
                                            onClick={() => handleDelete(song.id)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </DeleteButton>
                                    </ActionsCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </SongsTable>

                    <PaginationContainer>
                        <PageButton
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                        >
                            Previous
                        </PageButton>
                        {renderPageNumbers()}
                        <PageButton
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                        >
                            Next
                        </PageButton>
                    </PaginationContainer>
                </>
            )}
        </ListContainer>
    );
};

export default SongList;