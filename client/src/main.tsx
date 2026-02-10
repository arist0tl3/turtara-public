import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from './theme/ThemeProvider';
import App from './App';
import './index.css';

const { VITE_GRAPHQL_ENDPOINT } = import.meta.env;

const link = new HttpLink({ uri: VITE_GRAPHQL_ENDPOINT });

const setAuthorizationLink = setContext((request, previousContext) => {
  return {
    headers: {
      ...previousContext.headers,
      authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
    },
  };
});

export const client = new ApolloClient({
  link: setAuthorizationLink.concat(link),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function renderApp(): void {
  root.render(
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LocalizationProvider>
    </ApolloProvider>,
  );
}

function init(): void {
  renderApp();
}

init();
