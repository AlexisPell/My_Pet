import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // someVar: {
        //   read: () => {
        //     return someVar();
        //   },
        // },
      },
    },
    Plans: {
      merge: true,
      keyFields: ['id'],
    },
    Plan: {
      merge: true,
      keyFields: ['id'],
    },
  },
});

// export const someVar = makeVar<any[]>([]);
