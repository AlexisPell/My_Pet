import 'reflect-metadata';
import 'colors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

// Resolvers
import { PersonResolver } from './resolvers/persons';
import { PlanResolver } from './resolvers/plans';

// Entities
import { Person } from './entities/Person';
import { AccessPoint } from './entities/AccessPoint';
import { Plan } from './entities/Plan';

// Non-server functions and declatations
dotenv.config({ path: path.join(__dirname, '../config.env') });

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
    entities: [Person, Plan, AccessPoint],
    migrations: ['src/migrations/*.*'],
  });
  // await conn.dropDatabase();

  // Apollo Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PersonResolver, PlanResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: true,
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server is running on ${process.env.BACKEND_GRAPHQL} on PORT ${process.env.PORT}`.blue.bold
    );
  });
})().catch((e) =>
  console.log(
    `------------------------------------------------
            Server felt with error: ${e}
------------------------------------------------
  `.bgMagenta.bold
  )
);
