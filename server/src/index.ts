import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

// Resolvers
import { PersonResolver } from './resolvers/persons';
import { PassResolver } from './resolvers/passes';

// Entities
import { Person } from './entities/Person';
import { Pass } from './entities/Pass';

// Dynamic imports
import { MyContext } from './typings/context';

(async () => {
  const app = express();

  // Typeorm
  const conn = await createConnection({
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'persons-passes',
    synchronize: true,
    logging: true,
    entities: [Person, Pass],
    migrations: ['src/migrations/*.*'],
  });

  // Apollo Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PersonResolver, PassResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: true,
  });

  app.listen(4000, () => {
    console.log(`Graphql server is running on port 4000. Du u jb`);
  });
})().catch((e) =>
  console.log(
    `------------------------------------------------
            Server felt with error: ${e}
------------------------------------------------
  `
  )
);
