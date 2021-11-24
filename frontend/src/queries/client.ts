import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GEYSER_SUBGRAPH_ENDPOINT } from '../constants'


export const client = new ApolloClient({
  uri:GEYSER_SUBGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
})
