import React from 'react';

const Badge: React.FC<{ children: React.ReactNode; className: string }> = ({
	children,
	className,
}) => {
	return (
		<span
			className={`absolute bg-yellow-400 text-center  rounded-full text-black font-bold ${className}`}
		>
			{children}
		</span>
	);
};

export default Badge;
