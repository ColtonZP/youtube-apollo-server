import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/'

export class YouTube extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  async getVideo(id, key) {
    const data = await this.get('videos?part=snippet%2CcontentDetails&', {
      id: id,
      key: key
    })
    return data
  }
}

export const dataSources = () => ({
  YouTube: new YouTube(),
})
