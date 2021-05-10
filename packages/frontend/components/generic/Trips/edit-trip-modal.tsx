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
import { object as YupObject, string as YupString } from 'yup';
import { session, useSession } from 'next-auth/client';
import { ApolloError, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import {
	trip_create_and_user_addition,
	trip_find_all_of_user,
	trip_modify,
} from '../../../gql/trips.gql';
import { Prompt } from 'react-router-dom';
import { FormValidations } from '../../../utils';
import { favourite_flights_by_user_find_all } from '../../../gql/favourites.gql';
import DatePickerFieldEdit from '../../utils/DatePickerFormEdit';
interface IModifyTripInput {
	name: string;
	description: string;
	destinations: Array<IDestination>;
}

interface IDestination {
	city: string;
	date: Date;
	flight_associated: any;
}

const EditTripModal: FC<any> = ({ show, onClose, object }) => {
	const [session, loadingSession] = useSession();
	const [isDone, setIsDone] = useState(false);
	const { modifyTripMutation, loading } = getModifyTripMutation(
		setIsDone,
		session
	);
	const formikConfig = getForm(object, modifyTripMutation, onClose);

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
											Edit trip
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
												{errors.name ? (
													<div className='text-red-700 text-md'>
														{errors.name}
													</div>
												) : null}
											</div>
											<label
												htmlFor='description'
												className='block mb-2 text-sm text-gray-600 dark:text-gray-400'>
												Description
											</label>
											<Field
												type='text'
												name='description'
												placeholder='Final course trip'
												required
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
																		className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
																		name={`destinations[${index}].city`}
																	/>
																	<label
																		className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
																		htmlFor={`destinations[${index}].arrival_date`}>
																		Date
																	</label>
																	<DatePickerFieldEdit
																		name={`destinations[${index}].arrival_date`}
																	/>
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
											Save changes
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
const getModifyTripMutation = (
	setIsDone: Dispatch<SetStateAction<boolean>>,
	session: any
) => {
	const [modifyTripMutation, { loading }] = useMutation(trip_modify, {
		refetchQueries: [
			{
				query: trip_find_all_of_user,
				variables: {
					email: session.user.email,
				},
			},
		],
		onCompleted: (data: any) => {
			toast.success('Saved changes succesfully!');
			setIsDone(true);
		},
		onError: (error: ApolloError) => {
			toast.error(error.message || 'Server error');
		},
	});

	return { modifyTripMutation, loading };
};

/**
 * Gets the formik data to build the form.
 * @param modifyTripMutation Graphql mutation
 */
const getForm = (
	object: any,
	modifyTripMutation: any,
	onClose: any
): FormikConfig<IModifyTripInput> => {
	const initialValues: IModifyTripInput = {
		name: object.name || '',
		description: object.description || '',
		destinations: object.destinations || [''],
	};

	const validationSchema = YupObject().shape({
		name: YupString().min(3, 'Minimum 3 characters allowed'),
		description: YupString().test(
			'create.description',
			'Description not valid',
			(value: any) => FormValidations.descriptionValidation(value || '')
		),
	});

	const onSubmit = (values: IModifyTripInput) => {
		values.destinations.forEach(element => {
			delete element.flight_associated;
		});

		modifyTripMutation({
			variables: {
				tripId: object._id,
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
		validationSchema,
		onSubmit,
		validateOnChange: false,
	};
};

export default EditTripModal;
