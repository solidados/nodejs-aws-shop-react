# React-shop-cloudfront

This is a frontend starter project for nodejs-aws mentoring program. 

## Task-2
According to the task requirements, described in `2.3.1`:

| AWS CloudFront                                          | AWS S3                                               |
|---------------------------------------------------------|------------------------------------------------------|
| [CloudFront URL](https://d1o7ngvb1u66vy.cloudfront.net) | [S3-website](s3://solidados-store-bucket/index.html) |

## Technical review
It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `cdk:deploy`

This script, at first, it re-builds the project, and then it makes a CDK deploy to your bucket with any changes in your project.

### `cdk:destroy`

This script destroys AWS CloudFormation and a Bucket.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.
