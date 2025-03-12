const API_URL = 'http://localhost:3000/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
	fetchTasks();
	
	document.getElementById('taskForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		
		const form = e.target;
		const taskData = {
			title: document.getElementById('title').value,
			description: document.getElementById('description').value
		};
	
		// Verifica se é uma edição
		if (form.dataset.id) {
			await fetch(`${API_URL}/${form.dataset.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...taskData,
				})
			});
			delete form.dataset.id;
		} else {
			await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(taskData)
			});
		}
	
		fetchTasks();
		form.reset();
	});
});

async function fetchTasks() {
	const response = await fetch(API_URL);
	const tasks = await response.json();
	
	const taskList = document.getElementById('taskList');
	taskList.innerHTML = tasks.map(task => `
		<div class="task ${task.completed ? 'completed' : ''}">
			<div class="task-content">
				<h3>${task.title}</h3>
				<p>${task.description}</p>
			</div>
			<div class="task-actions">
				<button class"edit-btn" onclick="editTask(${task.id})">Edit</button>
				<button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
			</div>
		</div>
	`).join('');
	}

	window.deleteTask = async (id) => {
		await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
		fetchTasks();
	};

	window.editTask = async (id) => {
		const response = await fetch(`${API_URL}/${id}`, );
		const task = await response.json();
		
		const form = document.getElementById('taskForm');
		form.dataset.id = task.id;
		
		document.getElementById('title').value = task.title;
		document.getElementById('description').value = task.description;
		
		form.querySelector('button[type="submit"]').textContent = 'Update Task';
		
		const cancelBtn = document.createElement('button');
		cancelBtn.type = 'button';
		cancelBtn.textContent = 'Cancel';
		cancelBtn.onclick = () => {
			form.reset();
			delete form.dataset.id;
			cancelBtn.remove();
			form.querySelector('button[type="submit"]').textContent = 'Add Task';
		};
		form.appendChild(cancelBtn);
	};
	