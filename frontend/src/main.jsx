import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, Observable, from} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Toaster } from "sonner"

const getCookie = (cookieName) => {
  const cDecoded = decodeURIComponent(document.cookie)
  const cArray = cDecoded.split("; ")
  let result;

  cArray.map(cookie => {
    if(cookie.indexOf(cookieName) === 0){
      result = cookie.substring(cookieName.length+1)
    }
  })

  return result
}

const setCookie = (cookieName,value,daysToLive) => {
  const date = new Date()
  date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
  let expires = "expires=" + date.toUTCString()
  document.cookie = `${cookieName}=${value}; ${expires}; path=/`
}

const setTokenCookieLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let subscription;

      subscription = forward(operation).subscribe({
        next: (response) => {
          const token = response?.data?.token;

          if (token) {
            setCookie('token', token, 1); 
          }

          observer.next(response);
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => {
          if (subscription) subscription.unsubscribe();
        },
      });
  });
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_URI,
});

const authLink = setContext((operation, previousContext) => {
  if (operation.operationName.startsWith("Update") || operation.operationName.startsWith("Delete") || operation.operationName.startsWith("Create")){
    const token = getCookie('token');
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  }
});

const link = from([
  setTokenCookieLink,
  authLink,
  httpLink,
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials: "include"
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
        <Toaster/>
    </ApolloProvider>
  </React.StrictMode>
)
