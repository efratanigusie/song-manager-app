import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSongRequest, updateSongRequest } from '../redux/slices/songsSlice';

// Import css and styled from emotion
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// --- Styled Components for SongForm ---

const FormContainer = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 20px auto;
  border: 1px solid #eee;
`;

const FormTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const BaseButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px; /* Use marginLeft for spacing between buttons */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #007bff;
  color: white;
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #6c757d;
  color: white;
`;

// --- SongForm Component ---
const SongForm = ({ songToEdit, onComplete }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.songs.loading);

    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        year: ''
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (songToEdit) {
            setFormData({
                title: songToEdit.title || '',
                artist: songToEdit.artist || '',
                album: songToEdit.album || '',
                year: songToEdit.year || ''
            });
        } else {
            setFormData({
                title: '',
                artist: '',
                album: '',
                year: ''
            });
        }
        setFormErrors({});
    }, [songToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.artist.trim()) errors.artist = 'Artist is required';
        if (!formData.album.trim()) errors.album = 'Album is required';
        if (!formData.year.trim()) errors.year = 'Year is required';
        else if (isNaN(formData.year) || parseInt(formData.year) < 1000 || parseInt(formData.year) > new Date().getFullYear() + 10) {
            errors.year = 'Please enter a valid year';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (songToEdit) {
            dispatch(updateSongRequest({ id: songToEdit.id, updatedSongData: formData }));
        } else {
            dispatch(addSongRequest(formData));
        }

        if (onComplete) {
            onComplete();
        }
    };

    return (
        <FormContainer>
            <FormTitle>
                {songToEdit ? 'Edit Song' : 'Add New Song'}
            </FormTitle>
            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="title">Title:</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {formErrors.title && <ErrorText>{formErrors.title}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="artist">Artist:</Label>
                    <Input
                        type="text"
                        id="artist"
                        name="artist"
                        value={formData.artist}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {formErrors.artist && <ErrorText>{formErrors.artist}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="album">Album:</Label>
                    <Input
                        type="text"
                        id="album"
                        name="album"
                        value={formData.album}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {formErrors.album && <ErrorText>{formErrors.album}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="year">Year:</Label>
                    <Input
                        type="text"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {formErrors.year && <ErrorText>{formErrors.year}</ErrorText>}
                </InputGroup>
                <ButtonGroup>
                    <SecondaryButton type="button" onClick={onComplete} disabled={loading}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (songToEdit ? 'Update Song' : 'Add Song')}
                    </PrimaryButton>
                </ButtonGroup>
            </form>
        </FormContainer>
    );
};

export default SongForm;