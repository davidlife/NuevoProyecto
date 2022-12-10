import { base } from '../../utilities/axios';
import { v1Tag } from '../constants';

const controller = `/${v1Tag}/request`;

export const findAll = () =>
	new Promise((resolve, reject) => {
		base
			.get(`${controller}/find-all`)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});

	
	export const updateRequests = (id) =>

	new Promise((resolve, reject) => {
		base
			.get(`${controller}/find-edit/${id}`)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});


	export const findOne = (body) =>
	new Promise((resolve, reject) => {
		base
			.put(`${controller}/find-one/${window.location.pathname.split('/')[3]}`, body)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});

export const addNewRequest = (body) =>
	new Promise((resolve, reject) => {
		base
			.post(`${controller}/`, body)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
