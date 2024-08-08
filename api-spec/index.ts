import { c } from './libs/contract';
import { v1Contract } from './v1';

export const C = c.router(v1Contract, { pathPrefix: '/api' });
