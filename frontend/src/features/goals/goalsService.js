import axios from 'axios';

const API_URL = '/api/goals/';

//Create new  Goals
const createGoal = async (goalData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`, //'Bearer ' + token
		},
	};
	const response = await axios.post(`${API_URL}`, goalData, config); //`${API_URL}`
	return response.data;
};
//Get  user all Goals
const getGoals = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`, //'Bearer ' + token
		},
	};
	const response = await axios.get(`${API_URL}`, config);
	return response.data;
};
const goalService = {
	createGoal,
	getGoals,
};
export default goalService;
