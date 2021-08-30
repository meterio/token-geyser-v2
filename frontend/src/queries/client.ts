import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GEYSER_SUBGRAPH_ENDPOINT } from '../constants'

const uri = GEYSER_SUBGRAPH_ENDPOINT

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
})
