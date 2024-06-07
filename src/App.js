import React, { useEffect } from 'react';
import { publicRoutes } from './routes';
import { useRoutes, useLocation, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ScrollToTop from 'react-scroll-to-top';
import { Toaster } from 'react-hot-toast';  
import Routing from './routes/route.js';

  const queryClient = new QueryClient()

  const AppRoutes  = ({routes}) => {
    let linkRoutes = []
    routes.map((route) => {
      if(route.rout){
        // return <Route exact path={route.route} element={route.component} key={route.key} />
        const rtr = {path: route.rout, element: route.component};
        linkRoutes.push(rtr);
      }
    })
    return useRoutes(linkRoutes);
  }


const App = () => {

  const { pathname } = useLocation();
  useEffect(() => {
    const scrollToTop = () => {
      if (window.scrollY > 0) {
        // window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, 0);
      }
    };
    scrollToTop();
  }, [pathname])

  return (
    <div className="App">
      {/* <Routes>
        {getRoutes(publicRoutes)}
      </Routes> */}
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Toaster containerStyle={{
          top: 90,
          left: 10,
          bottom: 20,
          right: 20,
        }} position="top-right" />
        {/* <AppRoutes routes = {publicRoutes} /> */}

        <Routing />
      </QueryClientProvider>
    </div>
  );
}

export default App;
