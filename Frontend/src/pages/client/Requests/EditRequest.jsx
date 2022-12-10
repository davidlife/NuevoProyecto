import React, { useCallback } from "react";
import { Link, redirect, useParams, useLoaderData } from 'react-router-dom';
import { doRequest, parseFormData } from '@/api/utilities';
import { findOne, updateRequests, findAll as findAllRequests } from '@/api/v1/request';
import { Divider } from '@/components/Divider';
import { doFetch } from '@/api/utilities/doFetch';
import {
	EditRequestForm,
	formFields as newRequestFields,
} from '@/components/Forms/EditRequestForm';

import { Logo } from '@/components/Logo';

export async function action({ request }) {

	const formData = await request.formData();
	const body = parseFormData(formData, newRequestFields);

	//body.isFragile = body.isFragile == 'true' ? true : false;
	
	if(body.isFragile === null){
		body.isFragile = 'false';
	}
	
	const dueWithoutOffset = new Date(`${body.dueDate}T${body.dueHour}.000`);
	const due = new Date(
		dueWithoutOffset.getTime() +
			dueWithoutOffset.getTimezoneOffset() * 60 * 1000,
	);

	body.due = due.toISOString();
	
	try {
		
		await doRequest({
			body,
			endpoint: findOne,
			success: 'Se ha actualizado su solicitud!',
		});

		return redirect('/client/requests');
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}


export async function action2() {	
		 
	try {		
		const response = await doFetch({
			endpoint: findAllRequests		
		});
		return response.data.payload;
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}


export function EditRequest(valor) {

	const {id} = useParams();
	const requestsxx = useLoaderData();

	const requestsx =requestsxx[id-1];

	return (
		<section className="flex flex-col items-center justify-center px-6 py-8">
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-3xl">
				<div className="flex flex-col p-8 space-y-4">
					<div className="flex w-full justify-between">
						<h1 className="flex align-center text-2xl text-gray-900">
							<Logo spin /> &nbsp; - Editar Solicitud #{id}
						</h1>
						<Link
							to="/client/requests"
							className="pt-2 text-slate-500 italic cursor-pointer hover:underline"
						>
							Volver
						</Link>
					</div>
					<Divider />

					<EditRequestForm requests={id} reqx={requestsx} />
				</div>
			</div>
		</section>
	);
}
