import { Plugin } from '@nuxt/types';
import * as api from '~/services/api';

const apiPlugin: Plugin = (_, inject) => {
  inject('api', api);
};

export default apiPlugin;
