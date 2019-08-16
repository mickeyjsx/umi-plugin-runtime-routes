import fs from 'fs';
import path from 'path';
import { IApi } from 'umi-types';
import _helpers from './helpers';
import * as _utils from './helpers/util';

interface Options {
  modifier: string;
}

export const helpers = _helpers;
export const utils = _utils;

export default function(api: IApi, options: Options) {
  const modifierPath = (options || {}).modifier;

  if (!modifierPath || !fs.existsSync(modifierPath)) {
    throw new Error(`[umi-plugin-runtime-routes]: 'modifier' option should be a path string to routesModifier module.`)
  }

  const filepath = path.resolve(process.cwd(), modifierPath);

  api.onOptionChange(newOpts => {
    options = newOpts;
    api.rebuildTmpFiles();
  });

  api.addEntryCodeAhead(`
    // umi-plugin-runtime-routes start
    const _routesModifier = require('${filepath}').default;
    const _pluginRoutes = require('./router').routes;
    const modifiedRoutes = _routesModifier(_pluginRoutes);
    _pluginRoutes.splice(0, routes.length, ...([].concat(modifiedRoutes)));
    // umi-plugin-runtime-routes end
  `);
};
