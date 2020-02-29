import { NextPage } from 'next';
import Head from 'next/head'
import styled from 'styled-components';

import {Header} from '../components/Header';

type Link = {
  name: string;
  url: string;
}

type HomeProps = {
  links: Array<Link>;
  version: number;
  pictureURL: string;
  bio: string;
  title: string;
}

const AboutContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

const Home: NextPage<HomeProps> = ({links, version, pictureURL, bio, title}) => (
  <div>
    <Head>
      <title>dslama.net</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <AboutContainer>
      <Header summary={title}></Header>
    </AboutContainer>
  </div>
)

Home.getInitialProps = async ctx => {
  const mockData = {
    links: [
      {
        name: "Twitter",
        url: "https://twitter.com/henryslama"
      }, 
      {
        name: "KeyBase",
        url: "https://keybase.io/deanslamajr"
      },
      {
        name: "GitHub",
        url: "https://github.com/deanslamajr"
      },
      {
        name: "Medium",
        url: "https://medium.com/@deanslamajr"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dean-slama-jr-9819558a/"
      }
    ],
    version: 3,
    pictureURL: "https://cdn-images-1.medium.com/max/1200/1*N6g_1y4LruXhJKEThiFUbg.jpeg",
    bio: "Intrigued by the connective power of the Internet, Dean finds obsession tinkering with and learning about the many technologies involved in the modern world wide web. Inspired by the notion of virtual worlds, Dean invents tomorrow's software, incorporating today's best practices. As a Software Development Engineer at <a href=\"https://www.concur.com\" target=\"_blank\">SAP Concur</a>, Dean helps design and implement GraphQL services that support high-trafficked, React.js web applications. He enjoys declarative, well-commented code and clean, quick user interfaces.",
    title: "Full Stack Engineer"
  };
  return mockData;
}

export default Home
