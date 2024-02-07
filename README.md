# Project-Delog
Implementation of a blog with category features in Velog, a spurt project.

This project uses the [Udacity Nanoderee Style](https://udacity.github.io/git-styleguide/) as a git commit message rule.

## Technical Stack

- Language
  - JavaScript
  - Pug
- Framework
  - Express.js
- Database
  - MySQL
- ORM
  - Prisma ORM
- Infrastructure
  - Docker & Docker-Compose
- Test
  - Jest

## Run Application with docker

1. Git clone repository

```
git clone https://github.com/juintination/Project-Delog.git

cd Project-Delog
```

2. Build docker image

```
docker build -t delog-image .
```

3. Run with docker enviornment

```
npm run docker:up
```

4. Remove docker environment

```
npm run docker:down
```
