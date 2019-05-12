import fetch from 'isomorphic-unfetch'
import giphy from '../data/giphy'

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

  async loadMore() {
    // load additional images for a previous search term
    if (this.state.term) {
      const page = this.state.page + 1

      try {
        const images = await giphy.search(this.state.term, page)
        this.setState({images: this.state.images.concat(images), page})
      }
      catch (e) {
        this.setState({hasMore: true})
        alert(e)
      }
    }
  }

  async search(term) {
    // load images based on search term
    if (term) {
      this.setState({images: [], page: 0, term, hasMore: false})

      try {
        const images = await giphy.search(term)
        this.setState({images, term, hasMore: images.length == 20})
      }
      catch (e) {
        this.setState({hasMore: true})
        alert(e)
      }
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
