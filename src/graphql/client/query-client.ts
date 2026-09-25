import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      // Queries pause while offline instead of running and failing.
      //
      // This is what keeps *connectivity* out of *error* state. Under 'always'
      // an offline query fires anyway, burns its retries in a couple of
      // seconds and settles terminally in `error` — which is indistinguishable
      // from a real server failure, so a brief signal drop rendered a
      // "Something went wrong" state that then needed a manual retry to clear.
      //
      // Paused is the honest state: the request has not been attempted, so
      // `isError` stays false, cached data keeps rendering, and reconnecting
      // resumes it with no user action. `queryCache.onOnline()` walks *every*
      // query — inactive ones included — and calls `retryer.continue()`, so
      // this self-heals even for sections whose component has unmounted.
      //
      // Genuine failures (5xx, malformed response, timeouts with signal) still
      // reach `error` and still surface the retry UI. That is the separation:
      // no connection is not an error, a broken response is.
      networkMode: 'online',
    },
    mutations: {
      retry: 0,
      // Deliberately the opposite of queries above, and this asymmetry is the
      // point: pausing a read is harmless, pausing a write is not.
      //
      // `retry` cannot prevent a pause — it is only consulted after a
      // rejection, while pausing happens before the request is ever attempted
      // — so under 'online' every mutation would hang offline instead of
      // rejecting, with its spinner up, and then replay via
      // `resumePausedMutations()` whenever connectivity returned, possibly
      // minutes later after the user had already retried by hand. On
      // `createDraftOrderFromCart` / `completeDraftOrderAfterPayment` that is a
      // duplicate-order and double-charge risk.
      //
      // 'always' keeps mutations rejecting into their existing catch blocks,
      // exactly as they behaved before connectivity was wired up.
      networkMode: 'always',
    },
  },
});