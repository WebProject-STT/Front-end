import axios from 'axios';

export async function getCategoryList() {
	const response = await axios.get('http://52.78.77.73:8080/category');
	return response.data;
}
