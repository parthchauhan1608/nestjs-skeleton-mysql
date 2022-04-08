import { I18n } from 'i18n';
import * as EN from '../language/en.json';

const i18n = new I18n();
i18n.configure({
    locales: ['en'],
    staticCatalog: {
        en: EN
    },
    defaultLocale: 'en',
    api: {
        __: 't',
    },
    register: global,
    header: 'accept-language',
});

export default i18n; 