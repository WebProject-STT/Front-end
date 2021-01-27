export const categoryNotIncludeAll = ['정치', '경제', '사회', '생활/문화', '세계', 'IT/과학'].sort();
const categoryTemp = [...categoryNotIncludeAll];
categoryTemp.splice(0, 0, '전체');
export const categoryIncludeAll = [...categoryTemp];

export const postsData = [
	{
		id: 1,
		category: 'IT/과학',
		title: 'title1',
		date: '2021.01.18',
	},
	{
		id: 2,
		category: 'IT/과학',
		title: 'title2',
		date: '2021.01.18',
	},
	{
		id: 3,
		category: 'IT/과학',
		title: 'title3',
		date: '2021.01.18',
	},
	{
		id: 4,
		category: '경제',
		title: 'title4',
		date: '2021.01.18',
	},
	{
		id: 5,
		category: '사회',
		title: 'title5',
		date: '2021.01.18',
	},
	{
		id: 6,
		category: '정치',
		title: 'title6',
		date: '2021.01.18',
	},
	{
		id: 7,
		category: '정치',
		title: 'title7',
		date: '2021.01.18',
	},
	{
		id: 8,
		category: '생활/문화',
		title: 'title8',
		date: '2021.01.18',
	},
	{
		id: 9,
		category: '정치',
		title: 'title9',
		date: '2021.01.18',
	},
	{
		id: 10,
		category: '경제',
		title: 'title10',
		date: '2021.01.18',
	},
];
