import fetch from 'isomorphic-unfetch'

import Layout from '../components/layout'
import SearchBar from '../components/searchbar'
import ResultsPanel from '../components/results-panel'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {images: [], term: '', page: 0, hasMore: false}
    this.search = this.search.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

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

  loadMore() {
    // load additional images for a previous search
    if (this.state.term) {
      const page = this.state.page + 1
      this.fetchGifs(this.state.term, page)
      this.setState({page})
    }
  }

  search(term) {
    // load images based on search term
    if (term) {
      this.setState({images: [], page: 0, term, hasMore: false})
      this.fetchGifs(term)
    }
  }

  render() {
    return (
      <Layout>
        <SearchBar onSearch={this.search} />
        <ResultsPanel
          images={this.state.images}
          onLoadMore={this.loadMore}
          hasMore={this.state.hasMore} />
      </Layout>
    )
  }
}
