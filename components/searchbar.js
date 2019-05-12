export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
    this.updateInput = this.updateInput.bind(this)
    this.search = this.search.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  updateInput(event) {
    this.setState({text: event.target.value})
  }

  search() {
    this.props.onSearch(this.state.text.trim())
    this.setState({text: ''})
  }

  handleKeyPress(event) {
    const keyCode = event.which || event.keyCode
    if (keyCode == 13) this.search()
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          value={this.state.text}
          onChange={this.updateInput}
          onKeyPress={this.handleKeyPress} />
        <button onClick={this.search}>Search</button>
        <style jsx>
        {`
          div {
            padding-top: 200px;
            margin: auto;
          }
        `}
        </style>
      </div>
    )
  }
}
