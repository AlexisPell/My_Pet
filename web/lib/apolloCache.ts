import { InMemoryCache, makeVar } from '@apollo/client';

// Итого: Можно описать как общие поля у type, так и клиентские
// Описанные клиентские поля резолвятся в read() {} и остаются только на фронте.
// Через мутацию на бэк улетят только !@client поля
// т.о. можно модифицировать любые поля при их queryingе и в течении работы с ними
// впоследствии, используя хук makeVar()

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

export const localPnp = makeVar([]);
