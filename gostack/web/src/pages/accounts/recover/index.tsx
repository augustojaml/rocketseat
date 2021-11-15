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

export default function Recover() {
  const { customTheme } = useCustomTheme();
  const { recoverPassword } = useAccounts();

  const router = useRouter();

  const { token } = router.query;

  const { register, handleSubmit, getValues, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async data => {
      const newData = {
        token,
        ...data,
      };

      try {
        setIsLoading(true);
        await recoverPassword(newData, String(token));
        ToastMessage.show('Password changed successfully', 'success');
        reset();
        router.push('/accounts/signin');
      } catch (err) {
        ToastMessage.show(err, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [reset, recoverPassword, router, token],
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
            <h1>Reset password</h1>

            <InputIcon
              name="new_password"
              type="password"
              icon={FiMail}
              register={register}
              getValues={getValues}
              placeholder="Old password"
            />

            <InputIcon
              name="confirm_password"
              type="password"
              icon={FiMail}
              register={register}
              getValues={getValues}
              placeholder="Old password"
            />

            <Button isLoading={isLoading}>Save new password</Button>
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
