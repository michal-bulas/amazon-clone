import { StarIcon } from '@heroicons/react/24/solid';

interface StarsProps {
	rate: number;
}

const Stars: React.FC<StarsProps> = ({ rate }) => {
	return (
		<div className='flex'>
			{Array(Math.round(rate))
				.fill(Math.round(rate))
				.map((_, index) => (
					<StarIcon
						key={index}
						className='h-5 text-yellow-500'
					/>
				))}{' '}
		</div>
	);
};

export default Stars;
