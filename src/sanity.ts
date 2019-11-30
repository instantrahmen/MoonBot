import sanityClient from '@sanity/client';

export const sanityConfig = {
  projectId: 'skhbh4q5',
  dataset: 'production',
  useCdn: true,
};
export const client = sanityClient(sanityConfig);
