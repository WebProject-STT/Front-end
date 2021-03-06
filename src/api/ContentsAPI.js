import axios from 'axios';

export async function getContentsList(categoryId, userToken) {
	const url = categoryId === 0 ? 'http://52.78.77.73:8080/contents' : `http://52.78.77.73:8080/contents/list/${categoryId}`;
	const response = await axios.get(url, { headers: { memberId: userToken } });
	return response.data;
}

export async function getContents(contentsId, userToken) {
	const response = await axios.get(`http://52.78.77.73:8080/contents/${contentsId}`, {
		headers: {
			memberId: userToken,
		},
	});
	return response.data[0];
}

export async function deleteContents(postList, userToken) {
	const response =
		postList.length === 1
			? await axios.delete(`http://52.78.77.73:8080/contents/${postList[0]}`, {
					headers: {
						memberId: userToken,
					},
			  })
			: await axios.delete('http://52.78.77.73:8080/contents', {
					data: { deleteList: postList },
					headers: {
						memberId: userToken,
					},
			  });
	return response.data;
}
