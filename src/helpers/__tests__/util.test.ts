import { IRoute } from 'umi-types';
import { Routes, routesFilter } from '../util';

let routes: Routes;

describe('Util', () => {
  describe('routesFilter', () => {
    beforeEach(() => {
      routes = [
        { path: '/a', right: 1 },
        { path: '/b', right: 10, },
        {
          path: '/c',
          right: 7,
          routes: [
            { path: '/d', right: 9 },
            { path: '/e', right: 11 },
            { path: '/f', right: 6},
          ],
        },
        {
          path: '/g',
          right: 9,
          routes: [
            {
              path: '/h',
              right: 10,
              childRoutes: [
                { path: '/i', right: 11 },
              ],
            },
            {
              path: '/j',
              right: 6,
              routes: [
                { path: '/k', right: 4 },
              ],
            },
          ],
        },
      ];
    });

    it('should return origin routes if callback always return true', function () {
      const result = routesFilter(routes, () => true);
      expect(result).toEqual([
        expect.objectContaining({ path: '/a', right: 1 }),
        expect.objectContaining({ path: '/b', right: 10, }),
        expect.objectContaining({
          path: '/c',
          right: 7,
          routes: [
            expect.objectContaining({ path: '/d', right: 9 }),
            expect.objectContaining({ path: '/e', right: 11 }),
            expect.objectContaining({ path: '/f', right: 6}),
          ],
        }),
        expect.objectContaining({
          path: '/g',
          right: 9,
          routes: [
            expect.objectContaining({
              path: '/h',
              right: 10,
              childRoutes: [
                expect.objectContaining({ path: '/i', right: 11 }),
              ],
            }),
            expect.objectContaining({
              path: '/j',
              right: 6,
              routes: [
                expect.objectContaining({ path: '/k', right: 4 }),
              ],
            }),
          ],
        }),
      ]);
    });

    it('should return empty routes if callback always return false', function () {
      const result = routesFilter(routes, () => false);
      expect(result).toEqual([]);
    });

    it('should only keep route which its right is greater than 9', function () {
      const modifiedRoutes = routesFilter(routes, (route: IRoute) => {
        return route.right >= 9;
      });
      expect(modifiedRoutes).toEqual([
        expect.objectContaining({ path: '/b', right: 10, }),
        expect.objectContaining({
          path: '/g',
          right: 9,
          routes: [
            expect.objectContaining({
              path: '/h',
              right: 10,
              childRoutes: [
                expect.objectContaining({ path: '/i', right: 11 }),
              ],
            }),
          ],
        }),
      ]);
    });
  });
});
