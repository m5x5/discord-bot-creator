import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { HomeProvider } from '../components/home/HomeContext';
import '../styles/style.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HomeProvider>
        <Component {...pageProps} />
      </HomeProvider>
    </>
  );
}

export default MyApp;