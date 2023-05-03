import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SignIn = () => {
	const router = useRouter();

	const signInHandler = async (
		type: string,
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const callbackUrl = `${window.location.origin}/`;

		if (type === 'credentials') {
			const email = event.currentTarget.email.value;
			const password = event.currentTarget.password.value;

			await signIn(type, { email, password, callbackUrl });
		} else {
			await signIn(type, { callbackUrl });
		}
	};

	return (
		<div className='flex flex-col h-screen w-screen justify-center items-center bg-gray-100'>
			<Image
				src='/amazon_logo_dark.png'
				alt='Amazon Logo'
				width={150}
				height={50}
				onClick={() => router.push('/')}
				className='cursor-pointer object-contain h-auto w-auto mb-6'
			/>
			<div className='flex flex-col sm:shadow-xl px-8 pb-8 pt-5 bg-white rounded-xl space-y-4 '>
				<h1 className='text-3xl mb-2'>Sign in</h1>
				<form
					onSubmit={signInHandler.bind(null, 'credentials')}
					className='flex flex-col space-y-2'
				>
					<label htmlFor='email'>Email</label>
					<input
						name='email'
						type='email'
						placeholder='test@test.com'
						className='input'
					/>

					<label htmlFor='password'>Password</label>
					<input
						name='password'
						type='password'
						placeholder='test'
						className='input'
					/>

					<button
						type='submit'
						className='button'
					>
						Sign in
					</button>
				</form>

				<p className='text-sm'>
					<b>Test Account</b>
					<br />
					<b> Email:</b> test@test.com
					<br />
					<b> Password:</b> test
				</p>

				<hr />

				<form onSubmit={signInHandler.bind(null, 'google')}>
					<button
						type='submit'
						className='flex p-4 border rounded-lg space-x-3 '
					>
						<Image
							src='https://authjs.dev/img/providers/google.svg'
							alt='Google Logo'
							loading='lazy'
							height='24'
							width='24'
						/>

						<span>Sign in with Google</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
