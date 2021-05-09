import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { automatize_queries } from '../../../gql/queries.gql';
import ResultCard from '../Results/result-card';

type AutomaticListProps = {
	selectedQueries: any | null;
};

const AutomaticList: FC<AutomaticListProps> = ({ selectedQueries }) => {
	const { data, loading } = useQuery(automatize_queries, {
		variables: {
			queries: selectedQueries as string,
		},
	});

	const multipleSearch = data && !loading ? data.automatize_queries : null;

	return (
		<div className='bg-white pb-10 px-4 rounded-md w-full flex-grow pt-6'>
			<div className='items-center flex flex-col justify-center'>
				{multipleSearch ? (
					<>
						<h2 className='py-2 text-2xl inset-0'>Best flights!</h2>
						<ul className='space-y-3'>
							{[...multipleSearch].reverse().map(object => (
								<ResultCard object={object}></ResultCard>
							))}
						</ul>
					</>
				) : (
					<h2 className='text-2xl inset-0 p-4'>Searching results</h2>
				)}
			</div>
		</div>
	);
};

export default AutomaticList;
