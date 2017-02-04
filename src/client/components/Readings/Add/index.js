import React from 'react';
import axios from 'axios';

import Add from './Add';

export default class AddContainer extends React.Component {
  constructor(props) {
    super(props);

    this.defaultServerState = {
      serverResult: {
        message: '',
        error: null
      }
    };

    this.defaultFormState = {
      author: '',
      title: '',
      quote: '',
      publishDate: '',
      publication: '',
      url: ''
    };

    this.defaultState = Object.assign({}, this.defaultFormState, this.defaultServerState);;
    this.state = this.defaultState;

    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onSubmit(event) {
    // prevent page refresh
    event.preventDefault();

    try {
      // data validation

      // - empty inputs
      // @todo

      // - publish date incorrect format
      const publishDate = new Date(this.state.publishDate).valueOf();
      if (!publishDate) {
        throw new Error('Invalid date!');
      }


      // data to push to dynamoDB
      const readingData = {
        author: this.state.author,
        title: this.state.title,
        quote: this.state.quote,
        publishDate: publishDate,
        publication: this.state.publication,
        url: this.state.url
      };

      // push data to dynamoDB
      axios.post('/api/readings', readingData)
        .then(res => {
          this.setState({ serverResult: {
            message: 'Success!',
            error: null
          }})
          // clear form values
          this.setState(this.defaultFormState);
        })
        .catch(err => {
          throw err;
        });
    }
    catch(error) {
      this.setState({ serverResult: {
          message: error.message,
          error 
        }
      });
    }
  }

  _onChange(element, event) {
    this.setState({ [element]: event.target.value });
  }

  render() {
    return (
      <Add
        serverResult={this.state.serverResult}
        submitHandler={this._onSubmit}
        changeHandler={this._onChange}
        author={this.state.author}
        title={this.state.title}
        quote={this.state.quote}
        publishDate={this.state.publishDate}
        publication={this.state.publication}
        url={this.state.url}
        />
    );
  }
}