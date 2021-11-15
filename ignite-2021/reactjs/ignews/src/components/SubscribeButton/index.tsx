import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

import ReactLoading from 'react-loading';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface ISubscribeButton {
  priceId: string;
}

interface ISubscribeResponse {
  sessionId: string;
}

export function SubscribeButton({ priceId }: ISubscribeButton) {
  const [session] = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post<ISubscribeResponse>('/subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return !isLoading ? (
    <>
      <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
      >
        Subscribe now
      </button>
    </>
  ) : (
    <>
      <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
      >
        <ReactLoading type="spin" color="#61dafd" height={30} width={30} />
      </button>
    </>
  );
}
