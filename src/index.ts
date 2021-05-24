// import { dataSources } from './dataSource'
import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server'

import { schema } from './schema'
import { dataSources } from './dataSource'

const server = new ApolloServer({
  schema,
  dataSources,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
