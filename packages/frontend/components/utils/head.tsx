import { FC } from 'react';
import NextHead from 'next/head';

type HeadProps = {
	title: string;
	description?: string;
	url?: string;
	noindex?: boolean;
};

const Head: FC<HeadProps> = ({ title, description, url, noindex = false }) => {
	return (
		<NextHead>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:url' content={url} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			{noindex && <meta name='robots' content='noindex' />}
		</NextHead>
	);
};

export default Head;
