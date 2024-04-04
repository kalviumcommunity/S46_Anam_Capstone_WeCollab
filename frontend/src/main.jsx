import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const getCookie = (cookieName) => {
  const cDecoded = decodeURIComponent(document.cookie)
  const cArray = cDecoded.split("; ")
  console.log(cArray)
  let result;

  cArray.map(cookie => {
    if(cookie.indexOf(cookieName) === 0){
      result = cookie.substring(cookieName.length+1)
    }
  })

  return result
}

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_URI,
});

const authLink = setContext((operation, previousContext) => {
  if (operation.operationName.startsWith("update") || operation.operationName.startsWith("delete") || operation.operationName.startsWith("create")){
    const token = getCookie('token');
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include"
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </React.StrictMode>
)
