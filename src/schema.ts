import { makeExecutableSchema, gql } from 'apollo-server'

const typeDefs = gql`
  type MaxRes {
    url: String
  }

  type Thumbnail {
    maxres: MaxRes
  }

  type ResourceID {
    videoId: String
  }

  type VideoSnippet {
    description: String
    title: String!
    thumbnails: Thumbnail
    resourceId: ResourceID
  }

  type Item {
    id: ID!
    snippet: VideoSnippet
  }

  type Video {
    items: [Item]
  }

  type Playlist {
    items: [Item]
  }

  type TopLevelSnippet {
    textOriginal: String
    authorDisplayName: String
    authorProfileImageUrl: String
  }

  type TopLevelComment {
    id: String
    snippet: TopLevelSnippet
  }

  type CommentSnippet {
    topLevelComment: TopLevelComment
  }

  type CommentItem {
    snippet: CommentSnippet
  }

  type Comments {
    nextPageToken: String
    items: [CommentItem]
  }

  type Query {
    getVideo(id: String!, key: String!): Video
    getPlaylist(playlistId: String!, key: String!): Playlist
    getPlaylists(channelId: String!, key: String!): Playlist
    getLatest(playlistId: String!, key: String!): Playlist
    getComments(videoId: String!, key: String!, pageToken: String): Comments
  }
`

const resolvers = {
  Query: {
    getVideo(_: any, { id, key }, { dataSources }) {
      return dataSources.YouTube.getVideo(id, key)
    },

    getPlaylist(_: any, { playlistId, key }, { dataSources }) {
      return dataSources.YouTube.getPlaylist(playlistId, key)
    },

    getPlaylists(_: any, { channelId, key }, { dataSources }) {
      return dataSources.YouTube.getPlaylists(channelId, key)
    },

    getLatest(_: any, { playlistId, key }, { dataSources }) {
      return dataSources.YouTube.getLatest(playlistId, key)
    },

    getComments(_: any, { videoId, key, pageToken }, { dataSources }) {
      return dataSources.YouTube.getComments(videoId, key, pageToken)
    },
  },
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
