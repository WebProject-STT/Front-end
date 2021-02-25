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

export async function postContents(contents, userToken) {
	const contentsData = new FormData();
	for (let elem in contents) {
		contentsData.append(elem, contents[elem]);
	}
	const response = await axios.post('http://52.78.77.73:8080/contents', contentsData, {
		headers: {
			memberId: userToken,
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}

export async function updateContentsFile(contentsId, updateData, userToken) {
	const contentsData = new FormData();
	for (let elem in updateData) {
		contentsData.append(elem, updateData[elem]);
	}
	const response = await axios.post(`http://52.78.77.73:8080/contents/${contentsId}`, contentsData, {
		headers: {
			memberId: userToken,
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}

export async function updateContents(contentsId, contents, userToken) {
	const response = await axios.put(`http://52.78.77.73:8080/contents/${contentsId}`, {
		data: contents,
		headers: {
			memberId: userToken,
		},
	});
	return response.data;
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
