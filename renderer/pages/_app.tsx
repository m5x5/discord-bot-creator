import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { HomeProvider } from '../components/home/HomeContext';
import { globalCss } from '../stitches.config';
import '../styles/style.scss';

const globalStyles = globalCss({
  body: {
    backgroundColor: '$gray800 !important',
  },
});

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
