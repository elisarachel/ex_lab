const express = require('express');
const router = express.Router();
const db = require('./database');

// Create
router.post('/', (req, res) => {
	const { title, description } = req.body;
	db.run(
		'INSERT INTO tasks (title, description) VALUES (?, ?)',
		[title, description],
		function(err) {
			if (err) return res.status(500).json({ error: err.message });
			res.status(201).json({ id: this.lastID });
		}
	);
});

// Read All
router.get('/', (req, res) => {
	db.all('SELECT * FROM tasks', (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
});

// Read One
router.get('/:id', (req, res) => {
	db.get(
		'SELECT * FROM tasks WHERE id = ?',
		[req.params.id],
		(err, row) => {
			if (err) return res.status(500).json({ error: err.message });
			res.json(row);
		}
	);
});

// Update
router.put('/:id', (req, res) => {
	const { title, description } = req.body;
	db.run(
		`UPDATE tasks 
		SET title = ?, description = ?
		WHERE id = ?`,
		[title, description, req.params.id],
		(err) => {
			if (err) return res.status(500).json({ error: err.message });
			res.json({ message: 'Task updated' });
		}
	);
});

// Delete
router.delete('/:id', (req, res) => {
	db.run(
		'DELETE FROM tasks WHERE id = ?',
		[req.params.id],
		(err) => {
			if (err) return res.status(500).json({ error: err.message });
			res.json({ message: 'Task deleted' });
		}
	);
});

module.exports = router;