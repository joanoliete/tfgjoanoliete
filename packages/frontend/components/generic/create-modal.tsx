import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import TripCard from './trip-card';
import { CreateIcon } from '../icons/others/create-icon';
import { DeleteIcon } from '../icons/others/delete-icon';
import { Form, Formik, Field, FormikConfig } from 'formik';

interface ICreateTripInput {
	name: string;
	description: string;
}

const CreateModal: FC<any> = ({ show, onClose }) => {
	const formikConfig = getFormikConfig();

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
											id='name'
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
											type='description'
											name='description'
											id='description'
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
										type='submit'
										onClick={() => onClose() && onClose()}>
										Save Changes
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
const getFormikConfig = (): FormikConfig<ICreateTripInput> => {
	return;
};

export default CreateModal;
