import { OrderProps } from '@/types/OrderProps';
import moment from 'moment';
import Badge from './UI/Badge';

const Order = ({
	id,
	amount,
	amountShipping,
	products,
	timestamp,
	items,
}: OrderProps) => {
	return (
		<div className='relative border rounded-md mt-5'>
			<div className='flex items-center space-x-5 p-5 bg-gray-100 text-sm text-gray-600'>
				<div>
					<p className='font-bold text-xs'>Order Placed</p>
					<p>{moment.unix(timestamp).format('DD.MM.YYYY')}</p>
				</div>

				<div>
					<p className='text-xs font-bold'>Total</p>
					<p>
						${amount} -{' '}
						{amountShipping === 0
							? 'Free Delivery'
							: `Shipping $${amountShipping}`}
					</p>
				</div>

				<p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
					{products.reduce((total, product) => total + product.quantity, 0)}{' '}
					Products
				</p>
				<p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
					ORDER # {id}
				</p>
			</div>
			<div className='p-5 sm:p-10'>
				<div className='flex space-x-6 overflow-x-auto'>
					{products.map((product) => (
						<div
							key={product.image + id}
							className='relative'
						>
							<Badge className='top-0 right-0 h-5 w-5 text-sm'>
								{product.quantity}
							</Badge>
							<img
								src={product.image}
								alt='Product Photo'
								className='h-20 object-contain sm:h-32'
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Order;
