import React from 'react'
import styled from 'styled-components'

import { media } from '../../../style/style-utils'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`

const Input = styled.input`
  width: 45%;
  margin: 0.75rem auto;

  ${media.phoneMax`
    width: 85%;
    margin: 0.5rem auto;
  `}

  height: ${props => props.placeholder === 'title' || props.placeholder === 'url' ? '5em' : ''};
  height: ${props => props.placeholder === 'quote' ? '30em' : ''};
`

const ServerResponse = styled.div`
  width: 25%;
  height: 1em;
  margin: .25rem auto;
  color: ${props => props.error ? 'red' : 'green'};

  ${media.phoneMax`
    width: 65%;
    height: 2em;
  `}
`

class Add extends React.Component {
  render () {
    const {
      serverResult,
      submitHandler,
      changeHandler,
      author,
      title,
      quote,
      publishDate,
      publication,
      url } = this.props

    return (
      <Form onSubmit={submitHandler}>
        <Input
          value={author}
          type='text'
          onChange={(e) => changeHandler('author', e)}
          placeholder='author'
        />
        <Input
          as='textarea'
          value={title}
          onChange={(e) => changeHandler('title', e)}
          placeholder='title'
        />
        <Input
          as='textarea'
          value={quote}
          onChange={(e) => changeHandler('quote', e)}
          placeholder='quote'
        />
        <Input
          value={publishDate}
          type='text'
          onChange={(e) => changeHandler('publishDate', e)}
          placeholder='publishDate'
        />
        <Input
          value={publication}
          type='text'
          onChange={(e) => changeHandler('publication', e)}
          placeholder='publication'
        />
        <Input
          as='textarea'
          value={url}
          onChange={(e) => changeHandler('url', e)}
          placeholder='url'
        />
        <ServerResponse error={serverResult.error}>{serverResult.message}</ServerResponse>
        <Input type='submit' value='Add Reading' />
      </Form>
    )
  }
}

export default Add
