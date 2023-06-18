![PR OPEN: Tests checker](https://github.com/Erartria/OTUS_react/actions/workflows/PRStyleAndTestsChecker.yml/badge.svg)
![PUSH TO MASTER: deploy to GH pages](https://github.com/Erartria/OTUS_react/actions/workflows/PushMasterDeployToGhPages.yml/badge.svg)
![PUSH ANY: deploy to Chromatic](https://github.com/Erartria/OTUS_react/actions/workflows/PushAnyDeployToChromatic.yml/badge.svg)

# Otus ReactJS lessons

## Lesson 2
To run calculator just type `npm run start:lesson_2` at terminal;
To run tests for lesson 2, just use `npm run test:lesson_2`;

## Initialized React application

### Scripts
```json
"scripts": {
    "storybook:start": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "deploy:gh-pages": "npm run build && gh-pages -d build",
    "deploy:chromatic": "npx chromatic --project-token=chpt_a36ecc0344f9f14",
    "test:loki": "npx loki test",
    "test": "jest",
    "update:loki": "npx loki update",
    "lint": "npx eslint --ext .js,.jsx,.ts,.tsx --fix ./",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",

    "start:lesson_2": "npx ts-node lesson_2/src",
    "test:lesson_2": "npx jest --verbose lesson_2/tests"
  }
```
To start project just write `npm start` command at terminal

### Libs and features

1. Husky - lib for prechecking local commits and pushes
2. Loki - lib for testing screenshots
3. elsint - lib for checking code style
4. jest - testing lib
5. storybook - preview for UI components

