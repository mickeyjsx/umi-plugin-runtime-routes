import { IApi } from 'umi-types';
import plugin, { helpers, utils } from '../index';

let api: IApi;

describe('Index', () => {
  beforeEach(() => {
    api = {
      addEntryCodeAhead: jest.fn(),
      onOptionChange: jest.fn(),
      rebuildTmpFiles: jest.fn(),
    } as any;
  });

  it('should throw error when not passing modifier', function () {
    expect(() => { plugin(api, undefined as any); }).toThrow(`[umi-plugin-runtime-routes]: 'modifier' option should be a path string to routesModifier module.`);
  });

  it('should throw error when not passing modifier', function () {
    expect(() => { plugin(api, {} as any); }).toThrow(`[umi-plugin-runtime-routes]: 'modifier' option should be a path string to routesModifier module.`);
  });

  it('should throw error when modifier path point a nonexistent module', function () {
    expect(() => { plugin(api, { modifier: './path/to/foo' }); }).toThrow(`[umi-plugin-runtime-routes]: 'modifier' option should be a path string to routesModifier module.`);
  });

  it('should call addEntryCodeAhead()', function () {
    plugin(api, { modifier: './src/index.ts' });
    expect(api.addEntryCodeAhead).toBeCalled();
  });

  describe('Helpers', () => {
    it('should have members', function () {
      expect(Object.keys(helpers).length).toBeGreaterThan(0);
    });
  });

  describe('Utils', () => {
    it('should have members', function () {
      expect(Object.keys(utils).length).toBeGreaterThan(0);
    });
  });
});
