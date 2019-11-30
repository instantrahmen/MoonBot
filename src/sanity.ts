import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'skhbh4q5',
  dataset: 'bikeshop',
  // token: 'sanity-auth-token', // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});
