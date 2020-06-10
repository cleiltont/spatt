const arr = [
	{id: '1', title: 'Projeto 1'},
	{id: '2', title: 'Projeto 2'},
	{id: '3', title: 'Projeto 3'},
];

arr.map(item => item.id === '5' ? item.title = 'muda' : null);
// const a = arr.id['1'];

console.log(arr);