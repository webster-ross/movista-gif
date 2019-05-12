export default (props) => (
  <div>
    <div className="gif" />
    <style jsx>
    {`
      div {
        width: 150px;
        height: 150px;
        margin: 20px;
        overflow: hidden;
      }
      .gif {
        width: 150px;
        height: 150px;
        background: url(${props.still});
        background-position: center;
        background-size: cover;
      }
      .gif:hover {
        background: url(${props.gif});
        background-position: center;
        background-size: cover;
      }
    `}
    </style>
  </div>
)
