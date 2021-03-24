import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import TripCard from './trip-card';
import { CreateIcon } from '../icons/others/create-icon';
import { DeleteIcon } from '../icons/others/delete-icon';
import { Form, Formik, Field, FormikConfig } from 'formik';
import { session, useSession } from 'next-auth/client';
import { ApolloError, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { trip_create_and_user_addition } from '../../gql/trips.gql';
import { Prompt } from 'react-router-dom';

interface ICreateTripInput {
	name: string;
	description: string;
}

const CreateModal: FC<any> = ({ show, onClose }) => {
	const [session, loadingSession] = useSession();
	const [isDone, setIsDone] = useState(false);
	const { createTripMutation, loading } = getCreateTripMutation(setIsDone);
	const formikConfig = getForm(session, createTripMutation, onClose);

	if (show) {
		return (
			<Formik {...formikConfig}>
				<Form>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none '>
								<div className='items-start justify-between p-5 border-b border-solid rounded-t'>
									<h2 className='my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200 '>
										Create trip
									</h2>
									<p className='text-gray-400 dark:text-gray-400'>
										Add as many destinations as you want
									</p>
								</div>
								<div className='m-7'>
									<div className='mb-6'>
										<label
											htmlFor='name'
											className='block mb-2 text-sm text-gray-600 dark:text-gray-400'>
											Name
										</label>
										<Field
											type='text'
											name='name'
											placeholder='Barcelona'
											required
											className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
										/>
									</div>
									<div className='mb-6'>
										<label
											htmlFor='description'
											className='block mb-2 text-sm text-gray-600 dark:text-gray-400'>
											Descripton
										</label>
										<Field
											type='text'
											name='description'
											placeholder='Final course trip'
											required
											className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
										/>
									</div>
								</div>
								<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
									<button
										className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => onClose()}>
										Close
									</button>
									<button
										className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='submit'>
										Create trip
									</button>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		);
	} else {
		return null;
	}
};

/**
 * Gets the graphql mutation to modify the trip data
 */
const getCreateTripMutation = (
	setIsDone: Dispatch<SetStateAction<boolean>>
) => {
	const [createTripMutation, { loading }] = useMutation(
		trip_create_and_user_addition,
		{
			onCompleted: (data: any) => {
				toast.success('Success creating new trip');
				setIsDone(true);
			},
			onError: (error: ApolloError) => {
				toast.error(error.message || 'Server error');
			},
		}
	);

	return { createTripMutation, loading };
};

/**
 * Gets the formik data to build the form.
 * @param createTripMutation Graphql mutation
 */
const getForm = (
	session: any,
	createTripMutation: any,
	onClose: any
): FormikConfig<ICreateTripInput> => {
	const initialValues: ICreateTripInput = {
		name: '',
		description: '',
	};
	{
		/*Validation schema with Yup*/
	}
	const onSubmit = (values: ICreateTripInput) => {
		createTripMutation({
			variables: {
				email: session.user.email,
				tripData: {
					name: values['name'],
					description: values['description'],
				},
			},
		});
		onClose();
	};
	return {
		initialValues,
		onSubmit,
	};
};

export default CreateModal;
