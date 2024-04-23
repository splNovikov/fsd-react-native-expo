import { withErrorBoundary } from 'react-error-boundary';
import { withSuspense } from 'shared/lib/react';
import { FullPageError } from 'shared/ui/full-page-error';
import { QueryClientProvider, Routing } from 'app/providers';
import { Loading } from 'shared/ui/loading';

function Providers() {
  return (
    <QueryClientProvider>
      <Routing />
    </QueryClientProvider>
  );
}

const SuspensedProvider = withSuspense(Providers, {
  fallback: <Loading />,
});
export const Provider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ({ error }) => <FullPageError error={error} />,
});
