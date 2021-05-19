import { makeExecutableSchema, gql } from 'apollo-server'

const typeDefs = gql`
  type MaxRes {
    url: String
  }

  type Thumbnail {
    maxres: MaxRes
  }

  type VideoSnippet {
    description: String
    title: String!
    thumbnails: Thumbnail
  }

  type Item {
    id: ID!
    snippet: VideoSnippet
  }

  type Video {
    items: [Item]
  }

  type Query {
    getVideo(id: String!, key: String!): Video
  }
`

const resolvers = {
  Query: {
    getVideo(_: any, { id, key }, { dataSources }) {
      return dataSources.YouTube.getVideo(id, key)
    },
  },
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
