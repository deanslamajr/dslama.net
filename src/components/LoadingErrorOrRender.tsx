import { ApolloError } from 'apollo-client';

import { Spinner } from './spinner';

interface LoadingErrorOrRenderProps<T> {
  error: ApolloError | undefined;
  isLoading: boolean;
  queryResult: T | undefined;
  render: (props: { queryResult: T }) => JSX.Element;
}

export const LoadingErrorOrRender = <T,>({
  error,
  isLoading,
  queryResult,
  render,
}: React.PropsWithChildren<LoadingErrorOrRenderProps<T>>) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error || !queryResult) {
    return null;
  }

  return render({
    queryResult,
  });
};
