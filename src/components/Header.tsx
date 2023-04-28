import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '@/store/slices/cartSlice';
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const items = useSelector(selectItems);

	const signInHandler = async (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		await signIn();
	};

	const signOutHandler = async (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		await signOut();
	};

	return (
		<header>
			<div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
				<div className='mt-2 mx-3 flex items-center flex-grow sm:flex-grow-0'>
					<Image
						src='/amazon_logo.png'
						alt='Amazon Logo'
						width={75}
						height={20}
						onClick={() => router.push('/')}
						className='cursor-pointer object-contain h-auto w-auto'
					/>
				</div>

				<div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
					<input
						type='text'
						className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4'
					/>
					<MagnifyingGlassIcon className='h-12 p-4' />
				</div>

				<div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
					<div
						className='link'
						onClick={!session ? signInHandler : signOutHandler}
					>
						<p>{session ? `Hello, ${session.user?.name}` : 'Sign In'}</p>
						<p className='font-extrabold md:text-sm'>Account & Lists</p>
					</div>

					<div className='link'>
						<p>Returns</p>
						<p className='font-extrabold md:text-sm'>& Orders</p>
					</div>

					<div
						onClick={() => router.push('/checkout')}
						className='link relative flex items-center'
					>
						<span className='absolute top-0 left-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
							{items.length}
						</span>
						<ShoppingCartIcon className='h-10' />
						<p className='hidden md:inline font-extrabold md:text-sm mt-2'>
							Cart
						</p>
					</div>
				</div>
			</div>

			<div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
				<p className='link flex items-center font-bold'>
					<Bars3Icon className='h-6 mr-1' />
					All
				</p>
				<p className='link font-bold'>Today&#39;s Deals</p>
				<p className='link font-bold'>Customer Service</p>
				<p className='link font-bold'>Registry</p>
				<p className='link font-bold hidden lg:inline-flex'>Gift Cards</p>
				<p className='link font-bold hidden lg:inline-flex'>Sell</p>
			</div>
		</header>
	);
};

export default Header;
