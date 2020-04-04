import { NextPage } from 'next';
import Head from 'next/head';

import { formatDate } from '../../utils';

import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { Header } from '../../components/header';
import {
  CardLink,
  Details,
  OuterContainer,
  Quote,
  ShadowCard,
  Title,
} from '../../components/Card';

import { withApollo } from '../../graphql/with-apollo';

import {
  useFetchReadingsQuery,
  FetchReadingsQuery,
} from '../../graphql/queries/fetchReadings.graphql';

const ReadingsPage: NextPage = () => {
  const { data, loading, error } = useFetchReadingsQuery();

  return (
    <>
      <Head>
        <title>dslama.net - readings</title>
      </Head>
      <LoadingErrorOrRender<FetchReadingsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const {
            readings,
            summary,
          } = (queryResult as FetchReadingsQuery).readingsPage;

          return (
            <div>
              <div>
                <Header summary={summary || ''} />
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default withApollo(ReadingsPage);
