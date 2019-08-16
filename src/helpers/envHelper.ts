import { IRoute } from 'umi-types';
import { Routes, routesFilter } from './util';

function envHelper(routes: Routes, currentEnv?: string): Routes {
  if (!currentEnv || typeof currentEnv !== 'string') {
    return routes;
  }

  return routesFilter(routes, (route: IRoute) => {
    if (!route.env) {
      return true;
    }

    return (route.env as string[]).includes(currentEnv);
  });
}

export default envHelper;
