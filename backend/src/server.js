const express = require('express');
const cors = require('cors');
const tasksRouter = require('./tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});