import { GetServerSideProps, GetStaticProps } from 'next';
import Header from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import stripe from '../services/stripe';

import styles from './index.module.scss';

interface IProductStripe {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: IProductStripe) {
  return (
    <>
      <Header>
        <title>Home | ig.news</title>
      </Header>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            New about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_API_PRODUCT_ID);

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product: product,
    },
    revalidate: 60 * 60 * 24, // 24horas | time in seconds
  };
};
