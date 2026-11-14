import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import { initialLoginValues, LoginFields, useLogin } from './LoginForm';
import { Modal } from './Modal';

type LoginModalProps = {
  message?: string;
  onCloseClick: () => void;
  onSuccessfulLogin: () => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({
  message,
  onCloseClick,
  onSuccessfulLogin,
}) => {
  const { loading, onSubmit, displayMessage } = useLogin({
    message,
    onSuccessfulLogin,
  });

  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={initialLoginValues}
      render={({ handleSubmit, pristine, submitting, valid }) => (
        <Modal
          disableSave={pristine || submitting || !valid}
          isLoading={loading}
          onSaveClick={handleSubmit}
          onClose={onCloseClick}
          primaryButtonLabel="Login">
          <form onSubmit={handleSubmit}>
            <LoginFields message={displayMessage} />
          </form>
        </Modal>
      )}
    />
  );
};
