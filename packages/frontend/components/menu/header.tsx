import { FC, useContext } from 'react';
import { SearchIcon } from '../icons/header/search-icon';
import { HistoryIcon } from '../icons/header/history-icon';
import { FavouritesIcon } from '../icons/header/favourites-icon';
import { TripsIcon } from '../icons/header/trips-icon';
import { MenuIcon } from '../icons/header/menu-icon';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { LoginIcon } from '../icons/header/login-icon';
import { LogoutIcon } from '../icons/header/logout-icon';
import { useApolloClient } from '@apollo/react-hooks';

const Header: FC<any> = () => {
	const [session, loading] = useSession();

	return (
		<div className='pb-6'>
			<nav className='bg-gray-800 '>
				<div className='max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 '>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center '>
							<div className='flex-shrink-0'>
								<Link href='/'>
									<img
										className='h-6 w-16 cursor-pointer'
										src='https://i.ibb.co/bvBzR4N/aaa.png'
									/>
								</Link>
							</div>
							<h2 className='text-white px-2 py-1 rounded-md text-lg font-medium pl-6'>
								tfgjoanoliete
							</h2>
							<div className='hidden md:block absolute right-0 pr-4'>
								<div className='ml-5 flex items-baseline space-x-4'>
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
													<p className='pl-1'>Search history</p>
												</a>
											</Link>

											<Link href='/favourites'>
												<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-900'>
													<FavouritesIcon className='fill-current text-white' />
													<p className='pl-1'>Favourites</p>
												</a>
											</Link>

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
												<a
													className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-90'
													onClick={e => {
														e.preventDefault();
														signIn();
													}}>
													<LoginIcon className='fill-current text-white' />
													<p className='pl-1'>Login</p>
												</a>
											</Link>
										</>
									)}

									{session && (
										<>
											<Link href='/api/auth/signout'>
												<a
													className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between focus:bg-gray-90'
													onClick={e => {
														e.preventDefault();
														signOut();
													}}>
													<LogoutIcon className='fill-current text-white' />
													<p className='pl-1'>Logout</p>
												</a>
											</Link>
										</>
									)}
								</div>
							</div>
						</div>
						<MenuIcon className='md:hidden h-1_75 fill-current text-white cursor-pointer' />
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
