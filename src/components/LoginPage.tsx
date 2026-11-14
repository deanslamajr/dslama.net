import { NextPage } from 'next';
import Router from 'next/router';
import { Box, Button, Text } from 'grommet';
import { Form as FinalForm } from 'react-final-form';

import { Header } from './header';
import { SeoHead } from './SeoHead';
import { Container } from './About.styles';
import { initialLoginValues, LoginFields, useLogin } from './LoginForm';
import {
  useFetchViewerQuery,
  useLogoutMutation,
} from '../graphql/generated/ops';

export const LoginPage: NextPage = () => {
  const { data: viewerData } = useFetchViewerQuery({
    ssr: false,
    fetchPolicy: 'network-only',
  });
  const [logout] = useLogoutMutation({ refetchQueries: ['FetchViewer'] });
  const { loading, onSubmit, displayMessage } = useLogin({
    onSuccessfulLogin: () => Router.push('/'),
  });

  return (
    <>
      <SeoHead
        title="dslama.net - login"
        description="Log in to edit the site"
        path="/login"
        noIndex
      />
      <Container>
        <Header summary="login" />
        {viewerData?.viewer ? (
          <Box gap="medium" align="center">
            <Text>Logged in as {viewerData.viewer.username}.</Text>
            <Button label="logout" onClick={() => logout()} />
          </Box>
        ) : (
          <FinalForm
            onSubmit={onSubmit}
            initialValues={initialLoginValues}
            render={({ handleSubmit, pristine, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Box width="medium" gap="small">
                  <LoginFields message={displayMessage} />
                  <Button
                    type="submit"
                    primary
                    label="login"
                    disabled={pristine || submitting || loading}
                  />
                </Box>
              </form>
            )}
          />
        )}
      </Container>
    </>
  );
};
