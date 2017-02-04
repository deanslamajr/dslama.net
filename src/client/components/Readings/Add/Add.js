import React from 'react';
import cssModules from 'react-css-modules';

import styles from './add.css';

class Add extends React.Component {
  render() {
    const {
      serverResult,
      publishDateHandler,
      submitHandler, 
      changeHandler,
      author,
      title,
      quote,
      publishDate,
      publication,
      url } = this.props;

    const serverResultClasses = ['server-message'];
    if (serverResult.error) {
      serverResultClasses.push('error');
    }
    else {
      serverResultClasses.push('success');
    }

    return (
      <form styleName='container' onSubmit={submitHandler}>
        <input type='text' value={author} onChange={changeHandler.bind(this, 'author')} placeholder='author' styleName='form-element' />
        <textarea value={title} onChange={changeHandler.bind(this, 'title')} placeholder='title' styleName='form-element' />
        <textarea value={quote} onChange={changeHandler.bind(this, 'quote')} placeholder='quote' styleName='form-element' />        
        <input value={publishDate} type='text' onChange={changeHandler.bind(this, 'publishDate')} placeholder='publishDate' styleName='form-element' />
        <input value={publication} type='text' onChange={changeHandler.bind(this, 'publication')} placeholder='publication' styleName='form-element' />
        <textarea value={url} onChange={changeHandler.bind(this, 'url')} placeholder='url' styleName='form-element' />
        <div styleName={serverResultClasses.join(' ')}>{serverResult.message}</div>
        <input type='submit' value='Add Reading' styleName='form-element' />
      </form>
    );
  }
}

export default cssModules(Add, styles, { allowMultiple: true });