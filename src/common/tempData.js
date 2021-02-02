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

export const contents = [
	{
		id: 1,
		date: '2021.01.10',
		title: '제목1',
		keyword: ['#경제', '#사회'],
		description: '설명 설명 설명',
		subject: ['subject1', 'subject2'],
		subject_detail: [
			'지난달, 미국 바이든 대통령이 ‘바이 아메리칸(buy American)’ 행정명령에 서명했습니다. 바이 아메리칸은 연방정부가 공공물품을 조달할 때 미국산 제품을 우선 사용해야 한다는 규정입니다. 예를 들어 백악관에 들일 구내식당 의자 300개를 주문하려면, 미국에 있는 공장에서 만든 ‘메이드 인 USA’ 의자만 살 수 있다는 거예요.',
			'미국 연방정부는 약 65만 대에 달하는 정부 차량을 모두 전기차로 대체하겠다는 계획을 밝혔습니다. 바이 아메리칸 행정명령에 따라 대부분 미국 기업에서 만든 전기차로 구매될 것으로 보이는데요. 올해 하반기, 새로운 전기차인 ‘아이오닉5’를 미국 시장에 선보이려던 현대차는 난감한 상황입니다. 현대차는 아직 미국에 전기차 생산 공장이 없거든요.',
		],
		origin:
			'1월 한 달 동안 코스피, 코스닥에서 개인투자자가 순매수한 금액은 25조 8,549억 원. 작년 한 해 동안 약 63조 8천억 원을 순매수했는데, 작년 매수액의 40%를 올해 한 달 만에 달성한 거예요. 순매수한 금액의 절반은 삼성전자, 삼성전자우로 몰렸습니다. 개인투자자가 주식을 사들일 때, 기관투자자와 외국인투자자는 차익 실현을 위한 매도세를 보였습니다. 지난주에는 코스피, 코스닥과 미국 주요 지수가 연속 하락했습니다. 과열된 분위기를 식히는 ‘조정’이 찾아온 게 아니냐는 분석이 이어졌어요. 증시가 무한정 상승세를 보일 수 없는 만큼 개인투자자들도 신중하게 주식을 매수해야 할 타이밍입니다. 실적이나 호재가 주가에 충분히 반영된 종목보다는 주가 상승 여력이 남아있는 주식을 발굴하는 게 좋겠어요.',
	},
];
