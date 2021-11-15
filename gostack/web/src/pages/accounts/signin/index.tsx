import { useForm } from 'react-hook-form';
import { FiMail, FiLogIn, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Button';
import { InputIcon } from '../../../components/InputIcon';
import { ToggleTheme } from '../../../components/ToggleTheme';
import { useCustomTheme } from '../../../global/useCustomTheme';
import { Container, Background, ContentForm } from './styled';

import { useAccounts } from '../../../hooks/useAccounts';
import { ToastMessage } from '../../../_support/ToastMessage';

export default function SignIn() {
  const { customTheme } = useCustomTheme();
  const { signIn, user } = useAccounts();
  const router = useRouter();

  const { register, handleSubmit, getValues, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async data => {
      try {
        setIsLoading(true);
        await signIn(data);
        ToastMessage.show('Authentication performed successfully ', 'success');
        reset();
        router.push('/');
      } catch (err) {
        ToastMessage.show(err, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [reset, router, signIn],
  );

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <>
      <Container>
        <ContentForm>
          <img
            src={
              customTheme.type === 'dark'
                ? '/assets/logo-dark.png'
                : '/assets/logo-light.png'
            }
            alt="AppGoBarber"
          />
          <form className="formSignIn" onSubmit={handleSubmit(onSubmit)}>
            <ToggleTheme />
            <h1>Login</h1>
            <InputIcon
              name="email"
              icon={FiMail}
              register={register}
              getValues={getValues}
              placeholder="E-mail"
            />

            <InputIcon
              name="password"
              type="password"
              icon={FiLock}
              register={register}
              getValues={getValues}
              placeholder="Password"
            />
            <Button isLoading={isLoading}>Login</Button>

            <a href="/accounts/forgot">I forgot my password</a>
          </form>
          <Link href="/accounts">
            <a href="#">
              <FiLogIn />
              Create an account
            </a>
          </Link>
        </ContentForm>
        <Background image="signin" />
      </Container>
    </>
  );
}
