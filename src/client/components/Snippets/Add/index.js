import React from 'react';
import axios from 'axios';

import Add from './Add';

export default class AddContainer extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      author: '',
      title: '',
      quote: '',
      publishDate: '',
      publication: '',
      url: '',
      imagePath: 'http://assets.deanslamajr.com/test.jpg'
    }

    this.state = this.defaultState;

    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onSubmit(event) {
    // prevent page refresh
    event.preventDefault();

    // do some data validation
    // e.g. do not send empty strings to the /snippets endpoint

    const snippetData = {
      author: this.state.author,
      title: this.state.title,
      quote: this.state.quote,
      publishDate: this.state.publishDate,
      publication: this.state.publication,
      url: this.state.url,
      imagePath: this.state.imagePath
    };

    axios.post('/api/snippets', snippetData)
      .then(res => {
        alert('success');
        // remove inputs
        this.setState(this.defaultState);
        // display the result of the submission
      })
      .catch(err => {
        alert('error');
        // display details of the submission error
      });
  }

  _onChange(element, event) {
    this.setState({ [element]: event.target.value });
  }

  render() {
    return (
      <Add
        submitHandler={this._onSubmit}
        changeHandler={this._onChange}
        author={this.state.author}
        title={this.state.title}
        quote={this.state.quote}
        publishDate={this.state.publishDate}
        publication={this.state.publication}
        url={this.state.url}
        imagePath={this.state.imagePath}
        />
    );
  }
}