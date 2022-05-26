# BizWhiz

A business management app

## scripts

`npm start` - start the server (no hot reload)

`npm run dev` - start the server with nodemon (hot reload)

`npm test` - run test suites

`npm run lint` - run eslint

## migrations

`sequelize db:migrate` - migrate database (development)

`sequelize db:migrate --env test` - migrate test database (development)

`heroku run sequelize db:migrate -a bizwhiz-staging` - migrate database (staging)

`heroku run NODE_ENV=test sequelize db:migrate -a bizwhiz-staging` - migrate test database (staging)

`heroku run sequelize db:migrate -a bizwhiz` - migrate database (production)

`heroku run NODE_ENV=test sequelize db:migrate -a bizwhiz` - migrate test database (production)
