import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { HomeProvider } from '../components/home/HomeContext';
import { globalStyles } from '../stitches.config';

function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <>
      <HomeProvider>
        <Component {...pageProps} />
      </HomeProvider>
    </>
  );
}

export default MyApp;
