const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes placeholders
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
