const { subDays, format } = require('date-fns');
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
});

module.exports = withNextra({
  async redirects() {
    // Get today's date
    const today = new Date();
    // Subtract 13 days from today's date
    const thirteenDaysAgo = subDays(today, 13);
    
    // Format the date using date-fns
    const destination = format(thirteenDaysAgo, "MMMM/do").toLowerCase();
    
    return [
      {
        source: '/',
        destination: `/${destination}`,
        permanent: false,
      },
    ];
  },
  i18n: {
    locales: ['en', 'sr'],
    defaultLocale: 'en'
  }
});