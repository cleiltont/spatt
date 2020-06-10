const express = require('express');
const server = express();

server.use(express.json());

// Mostra o tempo de cada requisição
server.use((req, res, next) => {
	console.time('Tempo');

	next();

	console.timeEnd('Tempo');
});

const projects = [];

// Verifica se o projeto ja existe
function checkProjectExist(req, res, next){
	const { id } = req.params;
	
	if(!projects[id]){
		return res.status(400).json({ message: 'Project does not exist'});
	}

	return next();
}

// Cria novo projeto
server.post('/projects', (req, res) => {
	const { id, title } = req.body;

	projects.push({ id, title, tasks: [] });
	return res.json(projects);
})

// Cria nova tarefa
server.post('/projects/:id/tasks', (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	projects[id].tasks.push(title);

	return res.json(projects);
});

// Lista todos dos projetos
server.get('/projects', (req, res) => {
	return res.json(projects);
});

// Altera titulo do projeto
server.put('/projects/:id', checkProjectExist, (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	projects[id].title = title;

	return res.json({ message: 'Alterado com sucesso'});
});

// Exclui projeto
server.delete('/projects/:id', checkProjectExist, (req, res, next) => {
	const { id } = req.params;

	projects.splice(id, 1);

	return res.json({ message: 'Excluido com sucesso'});
});


server.listen(3333, (req, res) => {
	console.log('funcionando...');
});