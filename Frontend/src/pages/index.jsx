import { ProtectedRoute, SessionRoute } from '@/components/Routes';
import { Navigate, Outlet } from 'react-router-dom';
import { SignIn, action as signInAction } from './auth/SignIn';
import { SignUp, action as signUpAction } from './auth/SignUp';
import { Requests, loader as requestsLoader } from './client/Requests';
import { action2 } from './client/Requests/EditRequest';
import {  useParams } from 'react-router-dom';
import {
	NewRequest,
	action as newRequestAction,
} from './client/Requests/NewRequest';

import {
	EditRequest,
	action as editRequestAction,
} from './client/Requests/EditRequest';

function RootLayout() {
	return (
		<main className="w-screen h-screen bg-gray-100">
			<Outlet />
		</main>
	);
}

export const appRoutes = [
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Navigate to="/auth" replace /> },
			{
				path: 'auth',
				children: [
					{ index: true, element: <Navigate to="/auth/sign-in" replace /> },
					{
						path: 'sign-in',
						element: <SessionRoute route={<SignIn />} />,
						action: signInAction,
					},
					{
						path: 'sign-up',
						element: <SessionRoute route={<SignUp />} />,
						action: signUpAction,
					},
				],
			},
			{
				path: 'client',
				children: [
					{ index: true, element: <Navigate to="/client/requests" replace /> },
					{
						path: 'requests',
						children: [
							{
								index: true,
								loader: requestsLoader,
								element: <ProtectedRoute route={<Requests />} />,
							},
							{
								path: 'new',
								element: <ProtectedRoute route={<NewRequest />} />,
								action: newRequestAction,
							},
							{
								path: 'edit/:id',
								element: <ProtectedRoute route={<EditRequest />} />,
								action: editRequestAction,
							},
							{
								path: ':id',
								element: <ProtectedRoute route={<EditRequest />} />,
								loader: action2,
							},
							
							
						],
					},
				],
			},
		],
	},
];
