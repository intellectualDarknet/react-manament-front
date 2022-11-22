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
          main: {
            heading: 'PROJECT MANAGER APPLICATION',
            text: `is an easy and user-friendly platform that helps to organize your complex work easily and flexibly. You can
            automate and customize your workflow and avoid unnecessary meetings as communicating to your team members are
            easier with project manager application.`,
            signIn: 'Sign in',
            signUp: 'Sign up',
            logOut: 'Log out',
            boards: 'Boards',
          },
          header: {
            boards: 'BOARDS',
            edit: 'EDIT PROFILE',
          },
          notFound: 'The page not found',
        },
        deleteModal: {
          delete: 'Delete',
          yes: 'Yes',
          no: 'No',
        },
      },
      ru: {
        translation: {
          learn: 'Изучи Реакт',
          main: {
            heading: 'МЕНЕДЖЕР ПРОЕКТОВ',
            text: `это простая и удобная платформа, которая помогает легко и гибко организовать вашу сложную работу. Вы можете автоматизировать и настроить свой рабочий процесс и избежать ненужных встреч, поскольку общение с членами вашей команды станет легче с приложением менеджер проектов.`,
            signIn: 'Войти',
            signUp: 'Зарегистрироваться',
            logOut: 'Выйти',
            boards: 'Доски',
          },
          header: {
            boards: 'ДОСКИ',
            edit: 'РЕДАКТИРОВАТЬ ПРОФИЛЬ',
          },
          notFound: 'Страница не найдена',
        },
        deleteModal: {
          delete: 'Удалить',
          yes: 'Да',
          no: 'Нет',
        },
      },
    },
  });
