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
            team: 'Our team:',
            ivan: 'Ivan',
            veronika: 'Veronika',
            alexey: 'Alexey',
            descrveronika: 'FrontEnd developer',
            descralexey: 'FrontEnd developer',
            descrivan: 'FrontEnd developer, Teamlead',
          },
          header: {
            boards: 'BOARDS',
            edit: 'EDIT PROFILE',
          },
          notFound: 'The page not found',

          deleteModal: {
            delete: 'Delete',
            yes: 'Yes',
            no: 'No',
            message: 'This board will be deleted. Are you sure?',
          },
          board: {
            back: 'Back',
            addColumn: 'Add column',
            changeTitle: 'Change title',
            addTask: 'Add task',
            deleteColumn: 'Delete column',
            title: 'Enter new {{item}} title',
            createColumn: 'Create column',
            deleteColumnMessage: 'Are you sure, you want to delete this {{item}}?',
          },
          boards: {
            edit: 'Edit board name',
            renameBoard: 'Rename board',
            enterName: 'Enter new name',
            cancel: 'Cancel',
            rename: 'Rename',
            delete: 'Delete',
            addBoard: 'Add new board',
            name: 'Please enter name of the board.',
            add: 'Add',
            myBoards: 'My boards',
          },
          auth: {
            signIn: 'Sign In',
            signUp: 'Sign Up',
            backToMain: 'Back to main page',
            main: 'Main page',
            register: 'Register',
            notRegistered: 'Not registered?',
            alreadyRegistered: 'Already registered?',
            mismatch: 'password mismatch',
          },
          user: {
            data: 'User data:',
            name: 'Name:',
            login: 'Login:',
            password: 'Password',
            repeat: 'Repeat password',
            edit: 'Edit',
            submit: 'Submit',
            message: 'This user will be deleted. Are you sure?',
            errorRequired: 'this field is required',
            errorLength: '{{item}} {{should}} be more than {{minCount}} symbols and less than {{maxCount}}',
            errorLetters: 'this field should contain only letters',
            errorSignIn: '{{item}} is not valid',
          },
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
            team: 'Наша команда:',
            ivan: 'Иван',
            veronika: 'Вероника',
            alexey: 'Алексей',
            descrveronika: 'FrontEnd developer',
            descralexey: 'FrontEnd developer',
            descrivan: 'FrontEnd developer, Teamlead',
          },
          header: {
            boards: 'ДОСКИ',
            edit: 'РЕДАКТИРОВАТЬ ПРОФИЛЬ',
          },
          notFound: 'Страница не найдена',

          deleteModal: {
            delete: 'Удалить',
            yes: 'Да',
            no: 'Нет',
            message: 'Эта доска будет удалена, вы уверены?',
          },
          board: {
            back: 'Назад',
            addColumn: 'Добавить колонку',
            changeTitle: 'Изменить заголовок',
            addTask: 'Добавить задание',
            deleteColumn: 'Удалить колонку',
            title: 'Введите новый заголовок {{itemRu}}',
            createColumn: 'Создать колонку',
            deleteColumnMessage: 'Are you sure, you want to delete this {{itemRu}}?',
          },
          boards: {
            edit: 'Редактировать доску',
            renameBoard: 'Переименовать доску',
            enterName: 'Введите новое имя',
            cancel: 'Отмена',
            rename: 'Переименовать',
            delete: 'Удалить',
            addBoard: 'Добавить новую доску',
            name: 'Пожалуйста, введите имя доски.',
            add: 'Добавить',
            myBoards: 'Мои доски',
          },
          auth: {
            signIn: 'Войти',
            signUp: 'Регистрация',
            backToMain: 'Назад на главную',
            main: 'Главная страница',
            register: 'Зарегистрироваться',
            notRegistered: 'Не зарегистрированы?',
            alreadyRegistered: 'Уже зарегистрированы?',
            mismatch: 'пароль не совпадает',
          },
          user: {
            data: 'Данные пользователя:',
            name: 'Имя:',
            login: 'Логин:',
            password: 'Пароль',
            repeat: 'Повторите пароль',
            edit: 'Редактировать',
            submit: 'Подтвердить',
            message: 'Этот пользователь будет удален. Вы уверены?',
            errorRequired: 'это поле обязательно',
            errorLength: '{{itemRu}} {{shouldRu}} содержать более чем {{minCount}} символа и менее чем {{maxCount}}',
            errorLetters: 'это поле должно содержать только буквы',
            errorSignIn: 'Вы ввели неверный {{itemRu}}',
          },
        },
      },
    },
  });
