import React from 'react';
import { ApolloError, DocumentNode } from '@apollo/client';
import { Box, Button, Text } from 'grommet';

import {
  PageType,
  usePageVersionsQuery,
  useRestorePageVersionMutation,
} from '../../graphql/generated/ops';

const formatVersionDate = (epochMs: number) =>
  new Date(epochMs).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

type Props = {
  pageType: PageType;
  // The page query, refetched so the page shows the restored content.
  pageQuery: DocumentNode;
  describeError: (error: ApolloError) => string;
  onNeedsLogin: () => void;
  onRestored: () => void;
};

// Lists the newest versions. A restore copies the chosen version into a new
// version, so no version is ever lost. It asks for confirmation first.
export const HistoryPanel: React.FC<Props> = ({
  pageType,
  pageQuery,
  describeError,
  onNeedsLogin,
  onRestored,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState<number | null>(null);
  const [restoreError, setRestoreError] = React.useState<string | undefined>(
    undefined
  );

  const { data, loading, error } = usePageVersionsQuery({
    variables: { page: pageType },
    skip: !isOpen,
    fetchPolicy: 'network-only',
  });

  const [restore, { loading: restoring }] = useRestorePageVersionMutation({
    refetchQueries: [{ query: pageQuery }],
    awaitRefetchQueries: true,
    onCompleted: () => onRestored(),
    onError: restoreFailure => {
      setConfirming(null);
      if (
        restoreFailure.graphQLErrors.some(
          e => e.extensions?.code === 'UNAUTHENTICATED'
        )
      ) {
        onNeedsLogin();
        return;
      }
      setRestoreError(describeError(restoreFailure));
    },
  });

  const versions = data?.pageVersions || [];

  return (
    <Box width="100%" margin={{ top: 'medium' }} gap="small">
      <Button
        secondary
        label={isOpen ? 'Hide history' : 'Show history'}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <Box gap="xsmall" aria-live="polite">
          {loading && <Text>Loading versions…</Text>}
          {error && <Text color="status-critical">{describeError(error)}</Text>}
          {restoreError && (
            <Text color="status-critical" role="alert">
              {restoreError}
            </Text>
          )}
          {versions.map(({ version, createdAt }, index) => (
            <Box
              key={version}
              direction="row"
              align="center"
              justify="between"
              gap="small"
              wrap>
              <Text>
                Version {version} · {formatVersionDate(createdAt)}
              </Text>
              {index === 0 ? (
                <Text color="text-weak">current</Text>
              ) : confirming === version ? (
                <Box direction="row" gap="xsmall" align="center">
                  <Text>Save it as a new version?</Text>
                  <Button
                    primary
                    label="Restore"
                    disabled={restoring}
                    onClick={() =>
                      restore({ variables: { page: pageType, version } })
                    }
                  />
                  <Button
                    label="No"
                    disabled={restoring}
                    onClick={() => setConfirming(null)}
                  />
                </Box>
              ) : (
                <Button
                  label="Restore"
                  a11yTitle={`Restore version ${version}`}
                  onClick={() => {
                    setRestoreError(undefined);
                    setConfirming(version);
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
