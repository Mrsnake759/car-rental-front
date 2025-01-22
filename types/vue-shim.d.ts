import { NuxtApp } from '@nuxt/types/app';
import * as Api from '~/services/api';

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: typeof Api;
  }
  interface Context {
    $api: typeof Api;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof Api;
  }
}
