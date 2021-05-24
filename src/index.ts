require('@google-cloud/debug-agent').start({
  serviceContext: { enableCanary: true },
})

import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server'

import { schema } from './schema'
import { dataSources } from './dataSource'

const server = new ApolloServer({
  schema,
  dataSources,
  introspection: true,
  playground: true,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});