import React from 'react'
import styled from 'styled-components'
import { media } from '../../style/style-utils'

const Container = styled.div`
  margin: 5rem;
  text-align: center;
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  ${ media.phoneMax`
    margin: 5rem 2rem;
  ` }
`

function Error () {
  return (
    <Container>
      <div styleName='message'>500 error, our apologies.</div>
      <div styleName='message'>This error is the engineer's fault.</div>
    </Container>
  )
}

export default Error
