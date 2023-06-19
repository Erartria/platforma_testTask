![PR OPEN: Tests checker](https://github.com/Erartria/OTUS_react/actions/workflows/PRStyleAndTestsChecker.yml/badge.svg)
![PUSH TO MASTER: deploy to GH pages](https://github.com/Erartria/OTUS_react/actions/workflows/PushMasterDeployToGhPages.yml/badge.svg)
![PUSH ANY: deploy to Chromatic](https://github.com/Erartria/OTUS_react/actions/workflows/PushAnyDeployToChromatic.yml/badge.svg)

# Тестовое задание на ваканисию фронтенд-разработчика

## Описание
Необходимо реализовать компонент редактирования табличного отчёта согласно требованиям. Для реализации разрешается использовать любые библиотеки и инструменты для React.js.

## Функциональные требования для компонента

* создавать таблицу на базе конфигурации report-config.json или report-config.js,
* предоставлять возможность скрытия/отображения колонок (без изменения источника данных data.js),
* предоставлять возможность изменения наименования колонок *(в реализации необходимо кликнуть ПКМ по названию колонки - тогда появится инпут для изменения названия колонки)*
* для таблицы сделать пагинацию (20-30 записей на 1 страницу таблицы),
* при двойном клике на строку таблицы должно открываться модальное окно, в котором выведена подробная информация о записи.

### Шаги для запуска на локальной машине

* Склонируйте репозиторий на локальную машину;
```sh
git clone https://github.com/Erartria/platforma_testTask.git
```
* Установите npm-пакеты
```sh
npm i --legacy-peer-deps
```
* Запустите проект
```sh
npm start
```
### Все доступные скрипты
Файл package.json
```json
"scripts": {
    "storybook": "storybook dev -p 6006",
    "deploy:gh-pages": "npm run build && gh-pages -d build",
    "deploy:chromatic": "env-cmd npx chromatic --project-token= .env.CHROMATIC_PROJECT_TOKEN",
    "build-storybook": "storybook build",
    "test:loki": "npx loki test",
    "test": "jest",
    "update:loki": "npx loki update",
    "lint": "npx eslint --ext .js,.jsx,.ts,.tsx --fix ./",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject"
  },
```

### Libs and features

1. Husky - lib for prechecking local commits and pushes
2. Loki - lib for testing screenshots
3. elsint - lib for checking code style
4. jest - testing lib
5. storybook - preview for UI components
6. Ant design - UI for table, dropdown and etc
7. json-schema-to-ts - lib for converting json schema to intefaces
