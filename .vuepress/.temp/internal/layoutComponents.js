import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/home/jonybang/workspace/vuepress-test/theme/404.vue")),
  "BasePage": defineAsyncComponent(() => import("/home/jonybang/workspace/vuepress-test/theme/BasePage.vue")),
}
