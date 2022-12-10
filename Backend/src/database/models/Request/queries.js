import { Request } from '@models/Request';

export async function findRequestsByUser(userId) {
	return await Request.find({ fromOwner: userId });
}

export async function findRequestsId(id) {
	console.log(id);
	return await Request.findOne(id);
}

export async function findRequestsById(id, body) {
	//console.log(id, body)
	return await Request.updateOne(id,body);
}

export async function saveRequest(userId, body) {
	const {
		isFragile,
		width,
		height,
		depth,
		weight,
		due,
		fromCity,
		fromAddress,
		toCity,
		toAddress,
		toOwner,
		toOwnerId,
	} = body;

	const payload = {
		fromOwner: userId,
		isFragile,
		width,
		height,
		depth,
		weight,
		due,
		fromCity,
		fromAddress,
		toCity,
		toAddress,
		toOwner,
		toOwnerId,
	};

	const request = new Request(payload);
	await request.save();
	return request;
}




