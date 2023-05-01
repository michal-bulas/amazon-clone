/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['fakestoreapi.com'],
	},
	env: { stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY },
};

module.exports = nextConfig;
