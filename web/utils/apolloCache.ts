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
  },
});

// export const someVar = makeVar<any[]>([]);
