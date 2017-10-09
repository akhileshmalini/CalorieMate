# Caloire Mate

Friendly Pix Web is a sample app demonstrating how to build a JavaScript/Web app with the Firebase Platform.

Friendly Pix is a place where you can share photos, follow friends, comment on photos...




## Create and configure your Firebase Project

1. In a console run `npm install` to install all Build/Deploy tools dependencies.
2. Create a Firebase project using the [Firebase Console](https://firebase.google.com/console).
3. In a console run `firebase use --add` and, when prompted, select the Firebase Project you have just created. This will make sure the Firebase CLI is configured to use your particular project.


## Start a local development server

You can start a local development server by running:

```bash
npm run serve
```

This will start `firebase serve` and make sure your Javascript files are transpiled automatically to ES5.

> This is currently broken on 
ws. On Windows please run the following commands separately instead: `bower install`, `babel -w public\scripts -s --retain-lines -d public/scripts-es5` and `firebase serve`.

Then open [http://localhost:5000](http://localhost:5000)

> Note: Cloud Functions cannot yet be ran locally. Deploy the app to deploy and enable the Cloud Functions.


## Deploy the app

Before deploying your code you need to build it for production. Run:

```bash
npm run build
```

This will install all runtime dependencies and transpile the Javascript code to ES5 and install Cloud Functions dependencies.
Then run:

```bash
firebase deploy
```

Then this deploys a new version of your code that will be served from `https://<PROJECT_ID>.firebaseapp.com`


## Contributing

We'd love that you contribute to the project. Before doing so please read our [Contributor guide](CONTRIBUTING.md).


## License

© Google, 2011. Licensed under an [Apache-2](LICENSE) license.
