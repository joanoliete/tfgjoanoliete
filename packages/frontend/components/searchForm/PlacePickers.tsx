import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { LocationFromIcon } from '../icons/others/location-from-icon';
import { LocationToIcon } from '../icons/others/location-to-icon';

const PlacePickers: FC<any> = ({}) => {
	//Fer servir el context de busqueda per agafar l'estat default i els setters per afegir en el onchange
	return (
		<div className='flex flex-wrap pr-4 justify-center'>
			<div className='flex justify-center sm:py-4 sm:pl-4 pl-0'>
				<div className='bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 flex'>
					<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
						<LocationFromIcon className='fill-current text-gray-800' />
					</span>
					<input
						type='text'
						placeholder='From?'
						className='flex-shrink flex-grow flex-auto outline-none'></input>
				</div>
			</div>

			<div className='flex justify-center p-4'>
				<div className='bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 flex'>
					<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
						<LocationToIcon className='fill-current text-gray-800' />
					</span>
					<input
						type='text'
						placeholder='Where to go?'
						className='flex-shrink flex-grow flex-auto outline-none'></input>
				</div>
			</div>
		</div>
	);
};

export default PlacePickers;
