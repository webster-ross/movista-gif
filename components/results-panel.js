import InfiniteScroll from 'react-infinite-scroller'
import Gif from './gif'

export default (props) => {
  let key = 0
  const images = props.images.map(
    image => <Gif gif={image.gif} still={image.still} key={key++} />
  )

  return (
    <div>
      <InfiniteScroll
        loadMore={props.onLoadMore}
        hasMore={props.hasMore}
        initialLoad={false}>
        <span>{images}</span>
      </InfiniteScroll>
      <style jsx>
      {`
        span {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 20px;
        }
      `}
      </style>
    </div>
  )
}
