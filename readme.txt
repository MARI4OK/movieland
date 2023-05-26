      prepare:
- install NodeJS (18.15)
https://nodejs.org/uk

- check version:
$ node -v
$ npm -v



      init project
- $ npm init -y 



    install devDependencies
- $ npm install --save-dev parcel
or
- $ npm i parcel -D



      parcel

      Building a web app with Parcel
https://parceljs.org/getting-started/webapp/

- prepare project-files (src/index.html)
- package.json:
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel",
    "build": "parcel build",
    "cleanup": "rm -rf .parcel-cache dist",
    "dev": "npm run cleanup && parcel"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.8.3"
  }
}

- use "package.json" scripts:
- $ npm start
- $ npm run build
- $ npm run cleanup
- $ npm run dev



intall project from 
"package.json" and "package-lock.json":
- $ npm i

stop process in terminal:
- Ctrl+C


==============================================


      PostHTML
- parcel
https://parceljs.org/languages/html/#posthtml

- npm
https://www.npmjs.com/package/posthtml-include

- git
https://github.com/posthtml/posthtml-include



- $ npm i -D posthtml-include
create file ".posthtmlrc":
{
  "plugins": {
    "posthtml-include": {
      "root": "./src"
    }
  }
}


==============================================


      SCSS

https://sass-lang.com/
https://sass-lang.com/guide


- add 'scss' file:
<head>
  ...
  <title>barbershop</title>
  <link rel="stylesheet" href="./scss/main.scss">
  ...
</head>

- npm start
 "@parcel/transformer-sass" installed automatically

