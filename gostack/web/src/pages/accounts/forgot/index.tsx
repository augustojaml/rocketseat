import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '../../../components/Button';
import { InputIcon } from '../../../components/InputIcon';
import { ToggleTheme } from '../../../components/ToggleTheme';
import { useCustomTheme } from '../../../global/useCustomTheme';
import { Container, Background, ContentForm } from './styled';

import { useAccounts } from '../../../hooks/useAccounts';
import { ToastMessage } from '../../../_support/ToastMessage';

export default function Forgot() {
  const { customTheme } = useCustomTheme();
  const { forgot } = useAccounts();

  const router = useRouter();

  const { register, handleSubmit, getValues, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async data => {
      try {
        setIsLoading(true);
        await forgot(data);
        ToastMessage.show(
          'Password recovery request sent. Check your email',
          'success',
        );
        reset();
        router.push('/accounts/signin');
      } catch (err) {
        ToastMessage.show(err, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [forgot, reset, router],
  );
  return (
    <>
      <Container>
        <Background image="signup" />
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
            <h1>Forgot password</h1>
            <InputIcon
              name="email"
              icon={FiMail}
              register={register}
              getValues={getValues}
              placeholder="Email"
            />

            <Button isLoading={isLoading}>Recover Password</Button>
          </form>
          <Link href="/accounts/signin">
            <a>
              <FiArrowLeft />
              Back to login
            </a>
          </Link>
        </ContentForm>
      </Container>
    </>
  );
}
