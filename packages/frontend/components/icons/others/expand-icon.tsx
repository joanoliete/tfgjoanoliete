import { ComponentProps, FC } from 'react';

export const ExpandIcon: FC<ComponentProps<'svg'>> = props => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		height='24'
		viewBox='0 0 24 24'
		width='24'>
		<path d='M0 0h24v24H0z' fill='none' />
		<path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
	</svg>
);
