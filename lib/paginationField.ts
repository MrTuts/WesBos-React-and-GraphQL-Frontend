import { FieldPolicy } from '@apollo/client';

import { AllProductsMeta, PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField(): FieldPolicy<
  Array<{ __ref: string }>
> {
  return {
    keyArgs: false, // tells apollo we take care of everything
    read(
      existing = [], // items already in cache,
      { args, cache } // args passed to query, cache object
    ) {
      // we either return items from cache or return undefined to make network request for the items

      // Read the number of items on the page from the cache
      const skip = Number.parseInt(args?.skip || 0);
      const first = Number.parseInt(args?.first || 0);
      const data = cache.readQuery<AllProductsMeta>({
        query: PAGINATION_QUERY,
      });
      const count = data?._allProductsMeta?.count || 0;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // items might be undefined, filter function filters them out
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if
      // there are items
      // AND there aren't enough items to satisfy how many we requested (4)
      // AND we are on the last page
      // THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      // Check if we have existing items
      if (items.length !== first) {
        // we don't have any item, we must go to the network to fetch them
        return undefined;
      }

      // if there are items, just return them from the cache
      if (items.length) {
        return items;
      }

      // fallback to network
      return undefined;
    },
    merge(existing, incoming, { args }) {
      const skip = Number.parseInt(args?.skip || 0);

      // when Apollo client fetches items from network
      const merged = existing ? [...existing] : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
