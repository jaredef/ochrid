import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
    turbopack: {
        resolveAlias: {
            'next-mdx-import-source-file': './mdx-components.js'
        }
    },
    async redirects() {
        return [
            // Redirect legacy language-specific routes (.en and .sr) to clean paths
            {
                source: '/index.en',
                destination: '/',
                permanent: true,
            },
            {
                source: '/index.sr',
                destination: '/',
                permanent: true,
            },
            {
                source: '/prologue.en',
                destination: '/prologue',
                permanent: true,
            },
            {
                source: '/prologue.sr',
                destination: '/prologue',
                permanent: true,
            },
            {
                source: '/homilies.en',
                destination: '/homilies',
                permanent: true,
            },
            {
                source: '/homilies.sr',
                destination: '/homilies',
                permanent: true,
            },
            // Generic redirect for any path ending with .en or .sr
            {
                source: '/:path*.en',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/:path*.sr',
                destination: '/:path*',
                permanent: true,
            },
        ]
    },
})