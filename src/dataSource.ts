import {RESTDataSource} from 'apollo-datasource-rest'

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/'

export class YouTube extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = BASE_URL
	}

	async getVideo(id: string, key: string) {
		return await this.get('videos?part=snippet%2CcontentDetails&', {
			id,
			key,
		})
	}

	async getPlaylist(playlistId: string, key: string, maxResults: number) {
		return await this.get('playlistItems?part=snippet&', {
			playlistId,
			key,
			maxResults
		})
	}

	async getPlaylists(channelId: string, key: string, maxResults: number) {
		return await this.get(
			'playlists?part=snippet%2CcontentDetails&',
			{
				channelId,
				key,
				maxResults
			}
		)
	}

	async getLatest(playlistId: string, key: string, maxResults: number) {
		return await this.get('playlistItems?part=snippet&', {
			playlistId,
			key,
			maxResults,
		})
	}

	async getComments(videoId: string, key: string, pageToken: string) {
		return await this.get('commentThreads?part=snippet&', {
			videoId,
			key,
			pageToken
		})
	}

	// Todo: postComment
	// Todo: serachChannel
	// Todo: getAllVideos

	// async postComment() {
	//   return await this.post()
	// }

}

export const dataSources = () => ({
	YouTube: new YouTube(),
})
