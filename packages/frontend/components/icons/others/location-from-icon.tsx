import { ComponentProps, FC } from 'react';

export const LocationFromIcon: FC<ComponentProps<'svg'>> = props => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		version='1.1'
		width='24'
		height='24'
		viewBox='0 0 24 24'>
		<path d='M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z' />
	</svg>
);
