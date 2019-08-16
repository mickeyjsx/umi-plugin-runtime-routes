import { IRoute } from 'umi-types';

export type Routes = IRoute[];

// Iterate routes and modify routes
export function routesFilter(routes: Routes, callback: (route: IRoute) => boolean): Routes {
  const resultRoutes: Routes = [].concat(routes as any);
  const notHandledRoutes: Routes = [];
  notHandledRoutes.push(...resultRoutes.map(route => {
    route._container = resultRoutes;
    return route;
  }));

  for (let i = 0; i < notHandledRoutes.length; i++) {
    const currentRoute = notHandledRoutes[i];
    const needKeepRoute = !!callback(currentRoute);
    if (!needKeepRoute) {
      const currentRouteIndex = currentRoute._container.findIndex((route: IRoute) => route === currentRoute);
      currentRoute._container.splice(currentRouteIndex, 1);
      continue;
    }
    if (currentRoute.routes || currentRoute.childRoutes) {
      const childRoutes: Routes = currentRoute.routes || currentRoute.childRoutes;
      if (!Array.isArray(childRoutes)) {
        continue;
      }
      notHandledRoutes.push(...childRoutes.map(route => {
        route._container = childRoutes;
        return route;
      }));
    }
  }

  return resultRoutes;
}
