# NgSantoral

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨


## Start the app

To start the development server run `nx serve NgSantoral`. Open your browser and navigate to http://localhost:4200/. Happy coding!


## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)



-------------------------------

# NgSantoral

## Configuration

Copy certs on /apps/frontend/nginx/certs & /apps/frontend/assets/certs

### Prisma

For local access, modify /root/.env file
For Github Actions, add it as a secret

* DATABASE_URL="mysql://root:pwd@localhost:3306/santoral"

Change the URL as needed

### Api

#### Environment variables

For local access, modify /apps/backend/.env.local file
For Github Actions, add them as secrets

AUTH0_ISSUER_URL=YOUR_AUTH0_ISSUER_URL       (GH Secrete: AUTH0_ISSUER)
AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE           (GH Secrete: AUTH0_AUDIENCE)
AUTH0_CLIENT_ID=YOUT_AUTH0_CLIEND_ID         (GH Secrete: AUTH0_CLIENT_ID)

#### Certificates

Copy the certificates `cert.pem` and `key.pem` to the folder /apps/backend/src/assets/certs.
For Github Actions, add the content of each file as a secret (`API_NEST_CERT` and `API_NEST_CERT_KEY`)

### App

#### Environment variables

For local access, modify /apps/frontend/.env.local file
For Github Actions, add them as secrets

NG_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN        (GH Secrete: AUTH0_DOMAIN)
NG_APP_AUTH0_CLIENT_ID=YOUT_AUTH0_CLIEND_ID  (GH Secrete: AUTH0_CLIENT_ID)
NG_APP_AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE    (GH Secrete: AUTH0_AUDIENCE)
# Only needed For local access
NG_APP_API_BASE_URL=https://localhost:443/api

#### Certificates

Copy the `nginx.crt` and `nginx.key` to the folder /apps/frontend/nginx/certs.
For Github Actions, add the content of each file as a secret (`APP_NGINX_CERT` and `APP_NGINX_CERT_KEY`)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Running in local

Run `npm run start:backend` and `npm run start:frontend` to start both applications. Then, to enable communication between each of them, access
the API application in the browser (https://localhost/api) in order to trust the certificates.
Then you can access http://localhost:4200 normally.

## DB

npx prisma migrate reset
npx prisma format
ts-node prisma/data-migrations/XXX.ts

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
`npx nx g --project frontend @nx/angular:component component-name`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
