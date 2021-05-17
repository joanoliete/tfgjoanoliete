import { IonMenu } from '@ionic/react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { menuController } from '@ionic/core';
import { FavouritesIcon } from '../icons/header/favourites-icon';
import { HistoryIcon } from '../icons/header/history-icon';
import { LoginIcon } from '../icons/header/login-icon';
import { LogoutIcon } from '../icons/header/logout-icon';
import { SearchIcon } from '../icons/header/search-icon';
import { TripsIcon } from '../icons/header/trips-icon';
import { DeleteIcon } from '../icons/others/delete-icon';

const MenuMobile: FC = () => {
	const [session, loading] = useSession();
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = async () => {
			(await menuController.isOpen('menuMob')) &&
				menuController.close('menuMob');
		};

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	return (
		<IonMenu
			side='end'
			menuId='mobilemenu'
			contentId='mobilemenuContent'
			maxEdgeStart={80}
			type='push'
			className='absolute'>
			<div className='relative bg-gray-800 text-white-dark z100 h-screen w-full overflow-y-auto'>
				<DeleteIcon
					className='absolute top-4 right-2 h-1_5 fill-current text-white cursor-pointer'
					onClick={() => menuController.toggle('mobilemenu')}
				/>

				<ul className='pt-16'>
					<Link href='/'>
						<a className=' text-gray-300  hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
							<SearchIcon className='fill-current text-white' />
							<p className='pl-1'>Search</p>
						</a>
					</Link>

					{session && (
						<>
							<Link href='/history'>
								<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
									<HistoryIcon className='fill-current text-white' />
									<p className='pl-1'>History</p>
								</a>
							</Link>
						</>
					)}

					{session && (
						<>
							<Link href='/favourites'>
								<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
									<FavouritesIcon className='fill-current text-white' />
									<p className='pl-1'>Favourites</p>
								</a>
							</Link>
						</>
					)}

					{session && (
						<>
							<Link href='/trips'>
								<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
									<TripsIcon className='fill-current text-white' />
									<p className='pl-1'>Trips</p>
								</a>
							</Link>
						</>
					)}

					{!session && (
						<>
							<Link href='/api/auth/signin'>
								<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
									<LoginIcon className='fill-current text-white' />
									<p className='pl-1'>Sign in</p>
								</a>
							</Link>
						</>
					)}

					{session && (
						<>
							<Link href='/api/auth/signout'>
								<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
									<LogoutIcon className='fill-current text-white' />
									<p className='pl-1'>Logout</p>
								</a>
							</Link>
						</>
					)}
				</ul>
			</div>
		</IonMenu>
	);
};

export default MenuMobile;
