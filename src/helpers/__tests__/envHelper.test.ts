import envHelper from '../envHelper';
import { Routes } from '../util';

let routes: Routes;

describe('envHelper', () => {
  beforeEach(() => {
    routes = [
      { path: '/', env: ['foo'] },
      { path: '/a', env: ['bar'] },
      { path: '/b' },
      {
        path: '/c',
        routes: [
          { path: '/d', env: ['foo'] },
          { path: '/e', env: ['foo', 'bar'] },
          { path: '/f' },
        ],
      },
      {
        path: '/g',
        env: ['foo'],
        routes: [
          { path: '/h', env: ['foo'] },
          { path: '/i', env: ['bar'] },
          { path: '/j' },
        ],
      },
      {
        path: '/k',
        env: ['bar'],
        routes: [
          { path: '/l', env: ['foo'] },
          { path: '/m', env: ['bar'] },
          { path: '/n' },
        ],
      },
    ];
  });

  it('should return origin routes if not passing an env string', function () {
    const result = envHelper(routes);
    expect(result).toEqual([
      { path: '/', env: ['foo'] },
      { path: '/a', env: ['bar'] },
      { path: '/b' },
      {
        path: '/c',
        routes: [
          { path: '/d', env: ['foo'] },
          { path: '/e', env: ['foo', 'bar'] },
          { path: '/f' },
        ],
      },
      {
        path: '/g',
        env: ['foo'],
        routes: [
          { path: '/h', env: ['foo'] },
          { path: '/i', env: ['bar'] },
          { path: '/j' },
        ],
      },
      {
        path: '/k',
        env: ['bar'],
        routes: [
          { path: '/l', env: ['foo'] },
          { path: '/m', env: ['bar'] },
          { path: '/n' },
        ],
      },
    ]);
  });

  it('should keep defined routes and route without env field when passing an env string', function () {
    const result = envHelper(routes, 'foo');
    expect(result).toEqual([
      expect.objectContaining({ path: '/', env: ['foo'] }),
      expect.objectContaining({ path: '/b' }),
      expect.objectContaining({
        path: '/c',
        routes: [
          expect.objectContaining({ path: '/d', env: ['foo'] }),
          expect.objectContaining({ path: '/e', env: ['foo', 'bar'] }),
          expect.objectContaining({ path: '/f' }),
        ],
      }),
      expect.objectContaining({
        path: '/g',
        env: ['foo'],
        routes: [
          expect.objectContaining({ path: '/h', env: ['foo'] }),
          expect.objectContaining({ path: '/j' }),
        ],
      }),
    ]);
  });

  it('should only keep route without env field when passing an env not defined', function () {
    const result = envHelper(routes, 'baz');
    expect(result).toEqual([
      expect.objectContaining({ path: '/b' }),
      expect.objectContaining({
        path: '/c',
        routes: [
          expect.objectContaining({ path: '/f' }),
        ],
      }),
    ]);
  });
});
