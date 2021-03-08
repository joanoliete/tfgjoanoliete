import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils';

const options = {
	providers: [
		Providers.Email({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	database: process.env.DATABASE_URL,
	pages: {
		// signIn: '/api/auth/signin',  // Displays signin buttons
		// signOut: '/api/auth/signout', // Displays form with sign out button
		// error: '/api/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/api/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},
	callbacks: {
		signIn: async (user, account, profile) => {
			return Promise.resolve(true);
		},
		redirect: async (url, baseUrl) => {
			return Promise.resolve(`${baseUrl}/dashboard`);
		},
		session: async (session, user) => {
			if (user) {
				session.user.id = user.id;
			}
			return Promise.resolve(session);
		},
		jwt: async (token, user, account, profile, isNewUser) => {
			return Promise.resolve(token);
		},
	},
	debug: false,
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
	NextAuth(req, res, options);