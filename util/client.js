//@format
//@flow

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { getToken } from "./token";
import keys from "../config/keys";
import NavigationService from "./NavigationService";

const httpLink = createHttpLink({ uri: keys.apiEndpoint });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({ headers: { Authorization: `Bearer ${getToken()}` } });
  return forward(operation);
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("---graphQLErrors", graphQLErrors);
    const errorCodes = graphQLErrors.map(({ extensions }) => extensions.code);
    if (errorCodes.includes("UNAUTHENTICATED")) {
      console.log("the request was unauthenticated");
      NavigationService.navigate("loggedOut", { userName: "Lucy" });
    }
  }
  if (networkError) {
    console.log("---networkError", networkError);
  }
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      bet: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Bet", id: args.id }),
    },
  },
});
const client = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: { errorPolicy: "all", fetchPolicy: "cache-and-network" },
    query: { errorPolicy: "all", fetchPolicy: "cache-and-network" },
    mutation: { errorPolicy: "all", fetchPolicy: "cache-and-network" },
  },
  dataIdFromObject: (object) => object.id || null,
});

export default client;
