import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/'

export class YouTube extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  async getVideo(id: string, key: string) {
    const data = await this.get('videos?part=snippet%2CcontentDetails&', {
      id: id,
      key: key,
    })
    return data
  }

  async getPlaylist(playlistId: string, key: string) {
    const data = await this.get('playlistItems?part=snippet&maxResults=200&', {
      playlistId: playlistId,
      key: key,
    })
    return data
  }

  async getPlaylists(channelId: string, key: string) {
    const data = await this.get(
      'playlists?part=snippet%2CcontentDetails&maxResults=50',
      {
        channelId: channelId,
        key: key,
      }
    )
    return data
  }
  
  async getLatest(playlistId: string, key: string) {
    const data = await this.get('playlistItems?part=snippet&maxResults=5&', {
      playlistId: playlistId,
      key: key,
    })
    return data
  }
}

export const dataSources = () => ({
  YouTube: new YouTube(),
})
