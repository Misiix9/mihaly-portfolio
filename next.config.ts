import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Optional: Add basePath if deploying to a subdirectory
    // basePath: '/mihaly-portfolio', 
};
 
export default withNextIntl(nextConfig);
