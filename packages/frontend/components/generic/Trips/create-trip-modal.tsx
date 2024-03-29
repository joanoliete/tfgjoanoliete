import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';

import { CreateIcon } from '../../icons/others/create-icon';
import { DeleteIcon } from '../../icons/others/delete-icon';
import { Form, Formik, Field, FormikConfig, FieldArray } from 'formik';
import { Prompt } from 'react-router-dom';
import { object as YupObject, string as YupString } from 'yup';
import { FormValidations } from '../../../utils/index';
import { session, useSession } from 'next-auth/client';
import { ApolloError, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import {
	trip_create_and_user_addition,
	trip_find_all_of_user,
} from '../../../gql/trips.gql';
import { favourite_flights_by_user_find_all } from '../../../gql/favourites.gql';
import DatePickerFieldCreate from '../../utils/DatePickerFormCreate';

interface ICreateTripInput {
	name: string;
	description: string;
	destinations: Array<IDestination>;
}

interface IDestination {
	city: string;
	date: Date;
	flight_associated: any;
}

const CreateTripModal: FC<any> = ({ show, onClose }) => {
	const [session, loadingSession] = useSession();
	const [isDone, setIsDone] = useState(false);
	const { createTripMutation, loading } = getCreateTripMutation(
		setIsDone,
		session
	);

	const { data } = useQuery(favourite_flights_by_user_find_all, {
		variables: {
			email: session.user.email,
		},
	});

	const favouriteFlightsList = data
		? data.favourite_flights_by_user_find_all
		: null;

	const options = [];
	options.push(
		<option value={''} selected disabled hidden>
			Choose an associated flight
		</option>
	);
	{
		favouriteFlightsList
			? favouriteFlightsList.forEach(element => {
					options.push(
						<option key={element.id} value={JSON.stringify(element)}>
							{element.flyFrom +
								' - ' +
								element.flyTo +
								'   ' +
								new Date(element.utc_departure).toLocaleString().split(',')[0] +
								' - ' +
								new Date(element.utc_arrival).toLocaleString().split(',')[0]}
						</option>
					);
			  })
			: null;
	}

	const formikConfig = getForm(session, createTripMutation, onClose);

	if (show) {
		return (
			<Formik {...formikConfig}>
				{({ errors }) => (
					<Form>
						<div className='justify-center items-center flex-grow  overflow-auto fixed inset-0 z-50 outline-none focus:outline-none'>
							<div className='relative w-auto my-6 mx-auto max-w-3xl'>
								<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  '>
									<div className='p-5 border-b border-solid rounded-t'>
										<h2 className='my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200 '>
											Create trip
										</h2>
										<p className='text-gray-400 dark:text-gray-400'>
											Add as many destinations as you want, and associate your
											favourite flights
										</p>
									</div>
									<div className='m-7'>
										<div className='pb-2'>
											<div className='mb-2'>
												<label
													htmlFor='name'
													className='block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold'>
													Name
												</label>
												<Field
													type='text'
													name='name'
													placeholder='Europe trip'
													className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
												/>
												{errors.name ? (
													<div className='text-red-700 text-md'>
														{errors.name}
													</div>
												) : null}
											</div>
											<label
												htmlFor='description'
												className='block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold'>
												Description
											</label>
											<Field
												type='text'
												name='description'
												placeholder='Final course trip'
												className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
											/>
											{errors.description ? (
												<div className='text-red-700 text-md'>
													{errors.description}
												</div>
											) : null}
										</div>
										<div className='mb-2 flex justify-center'>
											<FieldArray name='destinations'>
												{fieldArrayProps => {
													const { push, remove, form } = fieldArrayProps;
													const { values } = form;
													const { destinations } = values;
													return (
														<div>
															{destinations.map((destination, index) => (
																<div key={index}>
																	<label className='block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold text-center pt-2'>
																		Destination {index + 1}
																	</label>

																	<label
																		className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
																		htmlFor={`destinations[${index}].city`}>
																		City
																	</label>
																	<Field
																		type='text'
																		placeholder='Barcelona'
																		className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
																		name={`destinations[${index}].city`}
																	/>
																	<label
																		className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
																		htmlFor={`destinations[${index}].arrival_date`}>
																		Date
																	</label>
																	<DatePickerFieldCreate
																		name={`destinations[${index}].arrival_date`}
																	/>
																	<label
																		className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
																		htmlFor={`destinations[${index}].flight_associated`}>
																		Flight
																	</label>
																	<div className='relative '>
																		<svg
																			className='w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none fill-current blue'
																			xmlns='http://www.w3.org/2000/svg'
																			viewBox='0 0 412 232'>
																			<path
																				d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
																				fill='#648299'
																				fill-rule='nonzero'
																			/>
																		</svg>
																		<Field
																			className='form-control  w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500 appearance-none'
																			as='select'
																			name={`destinations[${index}].flight_associated`}>
																			{options}
																		</Field>
																	</div>

																	<div className='pt-2 w-full inline-flex justify-center'>
																		<button
																			type='button'
																			className='flex bg-gray-800 rounded-full font-bold  p-2  text-white  hover:bg-gray-700 text-xl'
																			onClick={() => remove(index)}>
																			<DeleteIcon className='inline fill-current white cursor-pointer'></DeleteIcon>
																		</button>
																	</div>
																</div>
															))}
															<div className='pt-4 w-full inline-flex justify-center'>
																<button
																	type='button'
																	className=' w-full inline-flex justify-center bg-gray-800 rounded-full font-bold text-white px-2 py-2 hover:bg-gray-700 text-xl '
																	onClick={() => push('')}>
																	<CreateIcon className='fill-current white cursor-pointer ' />
																</button>
															</div>
														</div>
													);
												}}
											</FieldArray>
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
				)}
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
	setIsDone: Dispatch<SetStateAction<boolean>>,
	session: any
) => {
	const [createTripMutation, { loading }] = useMutation(
		trip_create_and_user_addition,
		{
			refetchQueries: [
				{
					query: trip_find_all_of_user,
					variables: {
						email: session.user.email,
					},
				},
			],
			onCompleted: (data: any) => {
				toast.success('Success creating new trip!');
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
		destinations: [],
	};

	const validationSchema = YupObject().shape({
		name: YupString().test('create.name', 'Name not valid', (value: any) =>
			FormValidations.nameValidation(value || '')
		),
		description: YupString().test(
			'create.description',
			'Description not valid',
			(value: any) => FormValidations.descriptionValidation(value || '')
		),
	});

	const onSubmit = (values: ICreateTripInput) => {
		values['destinations'].forEach((x, index) => {
			values['destinations'][index].flight_associated = JSON.parse(
				values['destinations'][index].flight_associated
			);
		});

		createTripMutation({
			variables: {
				email: session.user.email,
				tripData: {
					name: values['name'],
					description: values['description'],
					destinations: values['destinations'],
				},
			},
		});
		onClose();
	};
	return {
		initialValues,
		onSubmit,
		validationSchema,
		validateOnChange: false,
	};
};

export default CreateTripModal;
