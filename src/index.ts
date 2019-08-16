import fs from 'fs';
import path from 'path';
import { IApi } from 'umi-types';
import _helpers from './helpers';
import * as _utils from './helpers/util';

interface Options {
  modifier: string;
}

const throwConfigError = () => {
  throw new Error(`[umi-plugin-runtime-routes]: 'modifier' option should be a path string to routesModifier module.`)
};

export const helpers = _helpers;
export const utils = _utils;

export default function(api: IApi, options: Options) {
  const modifierPath = (options || {}).modifier;

  if (!modifierPath || !fs.existsSync(modifierPath)) {
    throwConfigError();
  }

  const filepath = path.resolve(process.cwd(), modifierPath);

  api.addEntryCodeAhead(`
    const routesModifier = require('${filepath}').default;
    const modifiedRoutes = routesModifier(window.g_routes);
    window.g_routes.splice(0, window.g_routes.length, ...modifiedRoutes);
  `);
};
