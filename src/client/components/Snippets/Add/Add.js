import React from 'react';
import cssModules from 'react-css-modules';

import styles from './add.css';

class Add extends React.Component {
  render() {
    const { 
      submitHandler, 
      changeHandler,
      author,
      title,
      quote,
      publishDate,
      publication,
      url,
      imagePath } = this.props;

    return (
      <form styleName='container' onSubmit={submitHandler}>
        <input type='text' value={author} onChange={changeHandler.bind(this, 'author')} placeholder='author' styleName='form-element' />
        <textarea value={title} onChange={changeHandler.bind(this, 'title')} placeholder='title' styleName='form-element' />
        <textarea value={quote} onChange={changeHandler.bind(this, 'quote')} placeholder='quote' styleName='form-element' />        
        { /* @todo teplace with a date picker */ }
        <input value={publishDate} type='text' onChange={changeHandler.bind(this, 'publishDate')} placeholder='publishDate' styleName='form-element' />
        <input value={publication} type='text' onChange={changeHandler.bind(this, 'publication')} placeholder='publication' styleName='form-element' />
        <input value={url} type='text' onChange={changeHandler.bind(this, 'url')} placeholder='url' styleName='form-element' />
        { /*<input value={imagePath} type='text' onChange={changeHandler.bind(this, 'imagePath')} placeholder='imagePath' styleName='form-element' /> */ }
        <input type='submit' value='Add Snippet' styleName='form-element' />
      </form>
    );
  }
}

export default cssModules(Add, styles, { allowMultiple: true });