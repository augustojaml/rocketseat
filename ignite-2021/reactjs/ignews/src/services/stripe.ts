import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'ig.news',
    version: '1.0.0',
  },
});

export default stripe;
