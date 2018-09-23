import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 3rem 2rem 2rem;
  font-size: 1.1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: center;
`

function Header ({ summary }) {
  return (
    <Container>
      { summary }
    </Container>
  )
}

export default Header