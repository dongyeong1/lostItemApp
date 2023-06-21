import Head from 'next/head';
import 'antd/dist/antd.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import wrapper from '../store/configureStore'
// import TopLayout from '../components/TopLayout'
const App = ({Component}) => {
    // useEffect(() => {
    //     const jssStyles = document.querySelector("#jss-server-side");
    //     if (jssStyles) {
    //       jssStyles.parentElement.removeChild(jssStyles);
    //     }
    //   }, []);
  return (
    
    <>
    <Head>
      {/* <meta charSet="utf-8" /> */}
      <title>lostItem</title>
    </Head>
    <Component />
  </>

    
  )
}

export default wrapper.withRedux(App) 