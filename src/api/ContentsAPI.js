import axios from 'axios';

export async function postContents(contents, userToken) {
	const contentsData = new FormData();
	for (let elem in contents) {
		contentsData.append(elem, contents[elem]);
	}
	console.log(contentsData);
	const response = await axios.post('http://52.78.77.73:8080/contents', contentsData, {
		headers: {
			memberId: userToken,
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}
