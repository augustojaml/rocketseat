import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
    req: req,
    accessToken: process.env.PRISMIC_PERMANENT_ACCESS_TOKEN,
  });

  return prismic;
}
