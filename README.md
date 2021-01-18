# To Do List

To start this project,I have tried to use Monorepo similar structure.

## Installation
Firstly,there is folder name - packages which consist of two projects(Frontend,Backend).

```bash
npm i -g @nestjs/cli
```

Go to packages/to-do-frontend

```bash
npm run install
```

```bash
npm run start
```

Go to packages/backend

```bash
npm run install
```

```bash
npm run start
```

Note: For backend,please create .env file in root folder

```bash
MYSQL_DATABASE=testdb
MYSQL_PASSWORD=
MYSQL_USER=root
MYSQL_HOST=127.0.0.1
NODE_ENV=development
```
