import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (!items.length) return false;
      return items;
    },
    merge(existing, incoming, { args }) {
      const merged = existing ? existing.slice() : [];
      const { skip, first } = args;
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
