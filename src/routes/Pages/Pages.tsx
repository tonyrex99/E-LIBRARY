import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import { getPageHeight } from './utils';

function renderRoutes(routeConfig: typeof routes) {
  return Object.values(routeConfig).map(({ path, component: Component, nested }) => (
    <Route key={path} path={path} element={<Component />}>
      {nested && renderRoutes(nested)}
    </Route>
  ));
}

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>{renderRoutes(routes)}</Routes>
    </Box>
  );
}

export default Pages;
