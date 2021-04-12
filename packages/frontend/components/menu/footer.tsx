import { FC, useContext } from 'react';

const Footer: FC<any> = () => {
	return (
		<div className='pt-4 text-sm  bottom-0'>
			<div className='flex flex-wrap justify-center bg-gray-800 p-3 text-white'>
				<div className='flex flex-shrink-0 mb-4 w-full'>
					<div className='flex flex-wrap justify-center sm:py-12 sm:flex-none sm:flex-nowrap sm:w-1/2 md:w-1/2 lg:w-1/3 '>
						<img className='h-6 w-16' src='https://i.ibb.co/bvBzR4N/aaa.png' />
						<p className='pt-2 text-center sm:pl-4'>tfgjoanoliete</p>
					</div>
					<div className='hidden w-full sm:block sm:w-1/2 md:w-1/2 lg:w-1/4 pl-12 '>
						<h3 className='text-3xl py-4'>Links</h3>
						<ul>
							<li>
								<a href='#'>Terms and Conditions</a>
							</li>
							<li>
								<a href='#'>Privacy Policy</a>
							</li>
							<li>
								<a href='/aboutus'>About us</a>
							</li>
						</ul>
					</div>
					<div className='hidden w-full sm:block sm:w-1/2 md:w-1/2 lg:w-1/4 '>
						<h3 className='text-3xl py-4'>Social Media</h3>
						<ul>
							<li>
								<a href='#'>Instagram</a>
							</li>
							<li>
								<a href='#'>Twitter</a>
							</li>
						</ul>
					</div>
					<div className='hidden w-full sm:block sm:w-1/2 md:w-1/2 lg:w-1/4'>
						<h3 className='text-3xl py-4'>Help</h3>
						<ul>
							<li>
								<a href='#'>Support</a>
							</li>
							<li>
								<a href='#'>Contact us</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
