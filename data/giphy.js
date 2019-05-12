async fetchGifs(term, page = 0) {
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

      if (page) this.setState({images: this.state.images.concat(images)})
      else this.setState({images, term, hasMore: data.length == 20})
    }
    else {
      console.error("BAD");
      //TODO display error
    }
  }
  catch (e) {
    console.error("BAD2");
    console.error(e)
    this.setState({hasMore: true})
    //TODO display error
  }
}
