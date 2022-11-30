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
          loading: 'Loading...',
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
            veronika: 'Veronika',
            alexey: 'Alexey',
            ivan: 'Ivan',
            taras: 'Taras',
            descrveronika: 'FrontEnd developer',
            descralexey: 'FrontEnd developer',
            descrivan: 'FrontEnd developer, Teamlead',
            descrtaras: 'Mentor',
            textveronika: 'Veronika was responsible for Front page, Profile page, Boards management, translation.',
            textalexey:
              'Alexey was responsible for API interaction and toast popups, setted up project for development and plugged localization.',
            textivan: 'Ivan was responsible for backend deployment, board page with columns and tasks.',
            texttaras: 'Taras shared his wisdom and advised about best practice of organizing project and teamwork.',
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
            createNewColumnPlaceholder: 'Column title',
            createNewTaskTitlePlaceholder: 'Task title',
            createNewTaskDescriptionPlaceholder: 'Task description',
            changeTitle: 'Change title',
            addTask: 'Add task',
            deleteColumn: 'Delete column',
            columnNewTitle: 'Column title',
            newColumnTitle: 'Enter title of new column',
            newTask: 'Enter title and description of new task',
            createColumn: 'Create column',
            createTask: 'Create task',
            deleteMessage: 'Are you sure, you want to delete this {{item}}?',
            unchoisen: '☚ Choose a bord there and come back!',
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
            allBoards: 'All boards',
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
          loading: 'Загрузка...',
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
            taras: 'Тарас',
            descrveronika: 'FrontEnd developer',
            descralexey: 'FrontEnd developer',
            descrivan: 'FrontEnd developer, Teamlead',
            descrtaras: 'Mentor',
            textveronika: 'Вероника разработала главную страницу, страницу пользователя, страницу досок, перевод.',
            textalexey:
              'Алексей был ответственен за связь с API и toast popups, настроил проект для разработки и подключил локализацию.',
            textivan: 'Иван был ответсвенен за размещение backend-а, разработал страницу доски с колонками и задачами.',
            texttaras:
              'Тарас делился мудростью, советами и best practice относительно командной работы и огранизации проекта.',
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
            createNewColumnPlaceholder: 'Заголовок колонки',
            createNewTaskTitlePlaceholder: 'Заголовок задачи',
            createNewTaskDescriptionPlaceholder: 'Описание задачи',
            changeTitle: 'Изменить заголовок',
            addTask: 'Добавить задачу',
            deleteColumn: 'Удалить колонку',
            columnNewTitle: 'Заголовок колонки',
            newColumnTitle: 'Введите заголовок новой колонки',
            newTask: 'Введите заголовок и описание новой задачи',
            createColumn: 'Создать колонку',
            createTask: 'Создать задачу',
            deleteMessage: 'Вы уверены, что хотите удалить эту {{itemRu}}?',
            unchoisen: '☚ Выберите доску там и возвращайтесь!',
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
            allBoards: 'Все доски',
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
