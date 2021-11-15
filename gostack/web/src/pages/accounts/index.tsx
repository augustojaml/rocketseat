import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../../components/Button';
import { InputIcon } from '../../components/InputIcon';
import { ToggleTheme } from '../../components/ToggleTheme';
import { useCustomTheme } from '../../global/useCustomTheme';
import { Container, Background, ContentForm, Perfil } from './styled';
import { useAccounts } from '../../hooks/useAccounts';
import { ToastMessage } from '../../_support/ToastMessage';

export default function SignUp() {
  const { customTheme } = useCustomTheme();
  const { register, handleSubmit, getValues, reset } = useForm();
  const { signUp } = useAccounts();
  const router = useRouter();

  const [isHairdresser, setIsHairdresser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async data => {
      setIsLoading(true);
      const newUser = {
        ...data,
        isHairdresser,
      };
      try {
        await signUp(newUser);
        ToastMessage.show('User created with success', 'success');
        reset();
        router.push('/accounts/signin');
      } catch (err) {
        ToastMessage.show(err, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [isHairdresser, reset, router, signUp],
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
            <Perfil>
              <button
                type="button"
                onClick={() => setIsHairdresser(false)}
                className={!isHairdresser ? 'active' : ''}
              >
                I'm a customer
              </button>
              <button
                type="button"
                onClick={() => setIsHairdresser(true)}
                className={isHairdresser ? 'active' : ''}
              >
                I'm a hairdresser
              </button>
            </Perfil>
            <InputIcon
              name="name"
              icon={FiUser}
              register={register}
              getValues={getValues}
              placeholder="Name"
            />

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
            <Button isLoading={isLoading}>Register</Button>
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
