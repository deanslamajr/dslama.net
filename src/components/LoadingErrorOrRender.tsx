import { ApolloError } from '@apollo/client';
import {Spinner } from "grommet";

interface LoadingErrorOrRenderProps<T> {
  error?: ApolloError;
  errorRender?: (error: ApolloError) => JSX.Element;
  isLoading: boolean;
  queryResult: T | undefined | null;
  render: (props: { queryResult: T | undefined | null }) => JSX.Element;
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
    return errorRender
      ? errorRender(error)
      : <>'Something broke!'</>;
  }

  return render({
    queryResult,
  });
};
