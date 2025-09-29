const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for playing cards
let cards = [
    {
        id: 1,
        suit: 'Hearts',
        value: 'Ace'
    },
    {
        id: 2,
        suit: 'Spades',
        value: 'King'
    },
    {
        id: 3,
        suit: 'Diamonds',
        value: 'Queen'
    },
    {
        id: 4,
        suit: 'Clubs',
        value: 'Jack'
    }
];

// Counter for generating unique IDs
let nextId = 5;

// Valid suits and values for validation
const validSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const validValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Playing Card Collection API',
        endpoints: {
            'GET /cards': 'List all cards',
            'GET /cards/:id': 'Get a specific card by ID',
            'POST /cards': 'Add a new card',
            'DELETE /cards/:id': 'Delete a card by ID'
        }
    });
});

// GET all cards
app.get('/cards', (req, res) => {
    res.status(200).json({
        count: cards.length,
        cards: cards
    });
});

// GET a specific card by ID
app.get('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    
    if (isNaN(cardId)) {
        return res.status(400).json({
            error: 'Invalid ID format. ID must be a number.'
        });
    }
    
    const card = cards.find(c => c.id === cardId);
    
    if (!card) {
        return res.status(404).json({
            error: `Card with ID ${cardId} not found`
        });
    }
    
    res.status(200).json(card);
});

// POST - Add a new card
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;
    
    // Validate required fields
    if (!suit || !value) {
        return res.status(400).json({
            error: 'Missing required fields. Both "suit" and "value" are required.'
        });
    }
    
    // Validate suit
    if (!validSuits.includes(suit)) {
        return res.status(400).json({
            error: `Invalid suit. Valid suits are: ${validSuits.join(', ')}`
        });
    }
    
    // Validate value
    if (!validValues.includes(value)) {
        return res.status(400).json({
            error: `Invalid value. Valid values are: ${validValues.join(', ')}`
        });
    }
    
    // Check for duplicate card
    const duplicate = cards.find(c => c.suit === suit && c.value === value);
    if (duplicate) {
        return res.status(409).json({
            error: `Card ${value} of ${suit} already exists in the collection`
        });
    }
    
    // Create new card
    const newCard = {
        id: nextId++,
        suit: suit,
        value: value
    };
    
    cards.push(newCard);
    
    res.status(201).json({
        message: 'Card added successfully',
        card: newCard
    });
});

// DELETE a card by ID
app.delete('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    
    if (isNaN(cardId)) {
        return res.status(400).json({
            error: 'Invalid ID format. ID must be a number.'
        });
    }
    
    const cardIndex = cards.findIndex(c => c.id === cardId);
    
    if (cardIndex === -1) {
        return res.status(404).json({
            error: `Card with ID ${cardId} not found`
        });
    }
    
    const deletedCard = cards[cardIndex];
    cards.splice(cardIndex, 1);
    
    res.status(200).json({
        message: `Card with ID ${cardId} deleted successfully`,
        deletedCard: deletedCard
    });
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: {
            'GET /': 'API information',
            'GET /cards': 'List all cards',
            'GET /cards/:id': 'Get a specific card by ID',
            'POST /cards': 'Add a new card',
            'DELETE /cards/:id': 'Delete a card by ID'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Playing Card Collection API is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET    /              - API information');
    console.log('  GET    /cards         - List all cards');
    console.log('  GET    /cards/:id     - Get a specific card');
    console.log('  POST   /cards         - Add a new card');
    console.log('  DELETE /cards/:id     - Delete a card');
});

module.exports = app;