import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';

type FlightsListProps = {
	list: any | null;
};

const FlightsList: FC<FlightsListProps> = ({ list }) => {
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-2'>Your favourite flights</h2>

				<table className='overflow-x-auto w-full sm:w-9/12 lg:w-4/6 table-fixed border-collapse'>
					<thead>
						<tr className='rounded-lg text-sm font-medium text-gray-700 text-left odd:bg-white'>
							<th className='px-4 py-2 bg-gray-800 text-white'>Desde</th>
							<th className='px-4 py-2 hidden sm:table-cell border-0.5 border-gray-800'>
								A
							</th>
							<th className='px-4 py-2 hidden sm:table-cell '>Sortida</th>
							<th className='px-4 py-2 hidden sm:table-cell '>Arribada</th>
							<th className='px-4 py-2 hidden sm:table-cell '>Price</th>
						</tr>
					</thead>

					{list.map(obj => (
						<tbody
							className='text-sm font-normal text-gray-700'
							key={obj.url_reference}>
							<tr className='hover:bg-gray-100 border-b border-gray-200 py-10'>
								<td className='px-4 py-2 lg:table-cell font-bold md:text-lg '>
									<p className='cursor-pointer'>{obj.fly_from}</p>
								</td>

								<td className='px-4 py-2 hidden sm:table-cell'>{obj.fly_to}</td>

								<td className='px-4 py-2'>{obj.date_to}</td>

								<td className='px-4 py-2 hidden sm:table-cell'>
									<p className='cursor-pointer'>{obj.date_from}</p>
								</td>

								<td className='px-4 py-2 hidden sm:table-cell'>{obj.price}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
};

export default FlightsList;
