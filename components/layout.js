import Meta from '../components/meta'

export default (props) => (
  <div>
    <Meta />
    <div>{props.children}</div>
    <style jsx>
    {`
      div {
        display: flex;
        justify-content: center;
        width: 800px;
        margin: auto;
      }
      div > div{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `}
    </style>
  </div>
)
