import { Quasar } from 'quasar'
import * as components from 'quasar'
import * as directives from 'quasar'
import langEn from 'quasar/lang/en-US'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Quasar, {
        config: {},
        components,
        directives,
        plugins: {},
        lang: langEn
    })
});
