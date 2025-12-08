import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
 
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Optional: Add basePath if deploying to a subdirectory
    // basePath: '/mihaly-portfolio', 
};
 
export default withNextIntl(nextConfig);
