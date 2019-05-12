const limit = 20

export default {
  async search(term, page = 0) {
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=DkUlx2MPVS8JcGmSyLIgHWB5uBleQdKp&q=${term}&limit=20&offset=${page * 20}`)

      if (res.ok) {
        const {data} = await res.json()
        const images = []

        data.forEach(image => {
          const still = image.images.original_still.url
          const gif = image.images.original.url
          images.push({still, gif})
        })

        return images
      }
      else throw 'Connection Error'
    }
    catch (e) {
      throw 'Connection Error'
    }
  }
}
