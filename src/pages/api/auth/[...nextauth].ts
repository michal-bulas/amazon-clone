import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions = {
	providers: [
		CredentialProvider({
			type: 'credentials',
			credentials: {},
			authorize: (credentials) => {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				// database look up
				if (email === 'test@test.com' && password === 'test') {
					return { id: '1234', name: 'Test', email: 'test@test.com' };
				}
				// login fail
				return null;
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	pages: {
		signIn: '../../signin',
	},
};

export default NextAuth(authOptions);
