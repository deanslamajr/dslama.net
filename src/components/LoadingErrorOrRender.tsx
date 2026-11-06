import { ApolloError } from '@apollo/client';
import { Spinner } from 'grommet';

interface LoadingErrorOrRenderProps<T> {
  error?: ApolloError;
  errorRender?: (error: ApolloError) => JSX.Element;
  isLoading: boolean;
  queryResult: T | undefined | null;
  render: (props: { queryResult: T }) => JSX.Element;
}

export const LoadingErrorOrRender = <T,>({
  error,
  errorRender,
  isLoading,
  queryResult,
  render,
}: React.PropsWithChildren<LoadingErrorOrRenderProps<T>>) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    if (errorRender) {
      return errorRender(error);
    }
    return (
      <>
        Something broke.
        {process.env.NODE_ENV !== 'production' && ` ${error.message}`}
      </>
    );
  }

  if (queryResult === null || queryResult === undefined) {
    return null;
  }

  return render({ queryResult });
};
