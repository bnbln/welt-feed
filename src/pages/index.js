import React from 'react'
import { graphql } from 'gatsby'
import Background from '../components/Background';
import Home from '../components/Home';
import "../styles/App.css"



const IndexPage = ({ data }) => (
  <div>
    <Home data={data} />
    <Background colors={["#00518B", "#003a5a", "#003a5a", "#00518B"]} />
  </div>
)

export default IndexPage


export const query = graphql`
query MyQuery {
  welt: allFeedWelt {
    feed: edges {
      article: node {
        id
        title
        welt {
          topic
          source
        }
        enclosure {
          url
        }
        content
      }
    }
  }
}
`


