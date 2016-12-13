import React, { Component } from 'react';
import './searchInput.css';

import Paper from 'material-ui/Paper';
import Search from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';

class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    }
  }

  onChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit(this.state.inputText);
    }
  }

  onButtonClick = () => {
    this.onSubmit(this.state.inputText);
  }

  onSubmit = (text) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(text.trim());
    }
  }

  render() {
    return (
      <Paper className="search-container" >
        <input className="input" onChange={this.onChange} onKeyPress={this.onKeyPress} />
        {this.props.loading ?
          <CircularProgress /> :
          <Search className="search" onTouchTap={this.onButtonClick} />
        }
      </Paper>
    );
  }
}

export default SearchInput;
