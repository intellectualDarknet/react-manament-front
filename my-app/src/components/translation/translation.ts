import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';

// Пример
// <p>
//   <Trans i18nKey="description">
//     Edit <code>12333</code> and save to reload
//   </Trans>
// </p>
// прописываем переводы храняться по обьекту снизу и становяться доступны по ключу

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          learn: 'Learn React',
          description: 'Edit <1>src/App.js</1> and save to reload',
        },
      },
      ru: {
        translation: {
          learn: 'Изучи Реакт',
          description: 'Поставь буквы гг вп изи бризи',
        },
      },
    },
  });

const ret = i18next.t('key');
console.log(ret);
