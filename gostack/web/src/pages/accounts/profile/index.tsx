import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCamera, FiMail, FiUser } from 'react-icons/fi';
import { Button } from '../../../components/Button';
import { InputIcon } from '../../../components/InputIcon';
import { ToggleTheme } from '../../../components/ToggleTheme';
import { useAccounts } from '../../../hooks/useAccounts';
import { ToastMessage } from '../../../_support/ToastMessage';
import { AvatarInput, Container, Header } from './styled';

export default function Profile() {
  const router = useRouter();
  const { user, updateAvatar, resetPassword } = useAccounts();

  const { register, handleSubmit, getValues, setValue, reset } = useForm();
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async data => {
      try {
        setIsLoading(true);
        const profileUser = {
          user_id: user.id,
          ...data,
        };

        await resetPassword(profileUser);
        ToastMessage.show('User created with success', 'success');
        reset();
        router.push('/');
      } catch (err) {
        ToastMessage.show(err, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [reset, resetPassword, router, user?.id],
  );

  const handleChangeAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const avatarUser = await updateAvatar(e);
        ToastMessage.show('Avatar successfully changed', 'success');
        setAvatar(avatarUser);
      } catch (err) {
        ToastMessage.show(err, 'error');
      }
    },
    [updateAvatar],
  );

  useEffect(() => {
    setValue('name', user?.name);
    setValue('email', user?.email);
  }, [setValue, user?.email, user?.name]);

  useEffect(() => {
    setAvatar(
      user && user?.avatar_url !== null
        ? user?.avatar_url
        : '/assets/default-user.png',
    );
  }, [user]);

  return (
    <>
      <Container>
        <Header>
          <div>
            <Link href="/">
              <a>
                <FiArrowLeft />
              </a>
            </Link>
            <ToggleTheme />
          </div>
        </Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AvatarInput>
            <img
              src={avatar}
              alt={user && user?.name ? user?.name : 'Default User'}
            />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleChangeAvatar} />
            </label>
          </AvatarInput>
          <h1>My profile</h1>
          <div className="profile">
            <InputIcon
              name="name"
              icon={FiUser}
              register={register}
              getValues={getValues}
              placeholder="Name"
              disabled
            />
            <InputIcon
              name="email"
              icon={FiMail}
              register={register}
              getValues={getValues}
              placeholder="E-mail"
              disabled
            />
          </div>
          <InputIcon
            name="old_password"
            icon={FiMail}
            register={register}
            getValues={getValues}
            placeholder="Current password"
            type="password"
          />
          <InputIcon
            name="new_password"
            icon={FiMail}
            register={register}
            getValues={getValues}
            placeholder="New password"
            type="password"
          />
          <InputIcon
            name="confirm_password"
            icon={FiMail}
            register={register}
            getValues={getValues}
            placeholder="Confirm password"
            type="password"
          />
          <Button isLoading={isLoading}>Confirm changes</Button>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { AppGoBarber } = ctx.req.cookies;

  if (!AppGoBarber) {
    return {
      redirect: {
        destination: '../accounts/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
