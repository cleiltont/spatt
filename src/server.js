const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

// Cria novo projeto
server.post('/projects', (req, res) => {
	const { id, title } = req.body;

	projects.push({ id, title, tasks: [] });
	return res.json(projects);
})

// Lista todos dos projetos
server.get('/projects', (req, res) => {
	return res.json(projects);
});

// Altera titulo do projeto
server.put('/projects/:id', (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	projects[id].title = title;

	return res.json({ message: 'Alterado com sucesso'});
});

// Exclui projeto
server.delete('/projects/:id', (req, res, next) => {
	const { id } = req.params;

	projects.splice(id, 1);

	return res.json({ message: 'Excluido com sucesso'});
});


server.listen(3333, (req, res) => {
	console.log('funcionando...');
});