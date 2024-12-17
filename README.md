# Project Setup

## Running project
1. Run `npm install` for installing necessary dependencies
2. Then run `npm run start` or `npm run start:dev` for developer

# Project Architecture

```
/nest-starter/
├── Dockerfile
├── README.md
├── docker-compose.yml
├── emails
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│   └── schema.prisma
├── scripts
│   └── generateSecret.js
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── auth
│   ├── dto
│   │    └── login.dto.ts
│   │    └── other potensial dto files...
│   ├── common
│   │   ├── filters
│   │   │   └── validation.filter.ts
│   │   │   └── other potensial filter files...
│   │   └── helpers
│   │       ├── prisma-transaction.helper.ts
│   │       └── response.helper.ts
│   │       └── other potensial global helpers files...
│   ├── config
│   │   ├── configuration.ts
│   │   └── mail.config.ts
│   ├── controllers
│   │   └── file.controller.ts
│   ├── helpers
│   │   ├── bcrypt.helper.ts
│   │   ├── date.helper.ts
│   │   ├── file-upload.helper.ts
│   │   ├── file.helper.ts
│   │   ├── number.helper.ts
│   │   └── string.helper.ts
│   │   └── other potensial helper files...
│   ├── i18n
│   │   └── en
│   │       └── translation.json
│   ├── main.ts
│   └── prisma
│       ├── prisma.module.ts
│       └── prisma.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── uploads
```

## Directory Structure Overview

### `/src`
- Main source code
    - **auth/**             : Compilation of all authentication logics and services
    - **dto/**
        - `login.dto.ts`    : DTO for login parameters validation and verification
    - **common/**           : Shared libs and services for apps
        - **filter/**       : Using custom filter exceptions and other http filtering
            - `validation.filter.ts`        : for validation on http bad request exceptions
        - **helpers/**      : Global helper services
            - `prisma-transaction.helper.ts`    :   Prisma client services
            - `response.helper.ts`              :   Global response format to the client/front-end
            - `other potensial helpers...`
    - **config/**           : Apps configuration
        - `configuration.ts`        : database configurations
        - `main.config.ts`          : SMTP configuration if needed
        - `other potensial config files...`
    - **controllers/**      : Specific route operations
        - `file.controller.ts`      : Processing file upload
    - **helpers**           : Specific local functions operation
        - `bcrypt.helper.ts`        : Generating and comparing hash strings
        - `date.helper.ts`          : Formatting and generating timestamps
        - `file-upload.helper.ts`   : Filtering file upload before storing in local storage or remote one
        - `file.helper.ts`          : Showing stored files by returning file url and others
        - `number.helper.ts`        : Generating random number and formatting number with commas
        - `string.helper.ts`        : Generating random string and other string functions
    - **i18n/**
        - **en/**
            - `translation.json`    : Compilation of translated phrases based on parent directory
    - **prisma/**
        - `prisma.module.ts`        : Prisma ORM Query module
        - `prisma.service.ts`       : Prisma ORM Query Client running functions

### `/scripts`
- Global purposes scripts outside main `/src`
    - `generateSecret.js`       : Generating bcrypt for console purposes

### `/prisma`
- Prisma ORM configuration and models
    - `schema.prisma`           : Base Prisma model usage (one file compilation)

### `/emails`
- All necessary email assets, templates, and services

### `/uploads`
- All uploaded files for local storing logic