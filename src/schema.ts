import {makeExecutableSchema, gql} from 'apollo-server'

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
    video(id: String!, key: String!): Video
    playlist(playlistId: String!, key: String!, maxResults: Int!): Playlist
    playlists(channelId: String!, key: String!, maxResults: Int!): Playlist
    latest(playlistId: String!, key: String!, maxResults: Int!): Playlist
    comments(videoId: String!, key: String!, pageToken: String): Comments
  }
`

const resolvers = {
	Query: {
		video(_: any, {id, key}, {dataSources}) {
			return dataSources.YouTube.getVideo(id, key)
		},

		playlist(_: any, {playlistId, key, maxResults}, {dataSources}) {
			return dataSources.YouTube.getPlaylist(playlistId, key, maxResults)
		},

		playlists(_: any, {channelId, key, maxResults}, {dataSources}) {
			return dataSources.YouTube.getPlaylists(channelId, key, maxResults)
		},

		latest(_: any, {playlistId, key, maxResults}, {dataSources}) {
			return dataSources.YouTube.getLatest(playlistId, key, maxResults)
		},

		comments(_: any, {videoId, key, pageToken}, {dataSources}) {
			return dataSources.YouTube.getComments(videoId, key, pageToken)
		},
	},
}

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})
