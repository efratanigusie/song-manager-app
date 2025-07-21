 const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 for the backend

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies

// In-memory "database" for songs
let songs = [
    {
        id: '1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        year: '1975'
    },
    {
        id: '2',
        title: 'Hotel California',
        artist: 'Eagles',
        album: 'Hotel California',
        year: '1976'
    },
    {
        id: '3',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        album: 'Thriller',
        year: '1982'
    },
    {
        id: '4',
        title: 'Like a Rolling Stone',
        artist: 'Bob Dylan',
        album: 'Highway 61 Revisited',
        year: '1965'
    },
    {
        id: '5',
        title: 'Smells Like Teen Spirit',
        artist: 'Nirvana',
        album: 'Nevermind',
        year: '1991'
    }
];

// Helper to generate a unique ID (for new songs)
const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};

// API Endpoints

// GET all songs
app.get('/api/songs', (req, res) => {
    res.json(songs);
});

// GET a single song by ID
app.get('/api/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === req.params.id);
    if (song) {
        res.json(song);
    } else {
        res.status(404).send('Song not found');
    }
});

// CREATE a new song
app.post('/api/songs', (req, res) => {
    const { title, artist, album, year } = req.body;
    if (!title || !artist || !album || !year) {
        return res.status(400).send('Missing required song fields: title, artist, album, year');
    }
    const newSong = {
        id: generateId(),
        title,
        artist,
        album,
        year
    };
    songs.push(newSong);
    res.status(201).json(newSong);
});

// UPDATE an existing song
app.put('/api/songs/:id', (req, res) => {
    const { id } = req.params;
    const { title, artist, album, year } = req.body;

    let songFound = false;
    songs = songs.map(song => {
        if (song.id === id) {
            songFound = true;
            return {
                ...song,
                title: title || song.title,
                artist: artist || song.artist,
                album: album || song.album,
                year: year || song.year
            };
        }
        return song;
    });

    if (songFound) {
        res.json(songs.find(s => s.id === id));
    } else {
        res.status(404).send('Song not found');
    }
});

// DELETE a song
app.delete('/api/songs/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = songs.length;
    songs = songs.filter(song => song.id !== id);

    if (songs.length < initialLength) {
        res.status(204).send(); // No Content
    } else {
        res.status(404).send('Song not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
