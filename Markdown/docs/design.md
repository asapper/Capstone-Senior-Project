# Project Design
In this page you will find a detailed description of the design of our project.

---

## Design Overview
Following is an overview of our product, which is comprised of five different actors:

- FLIC button: single click (only event used in this product), double-click, and hold click.
- Raspberry Pi: listens for button events and communicates them to the server.
- Server: handles communication from Raspberry Pi, Mobile and web applications.
- Mobile application: provides a mobile interface for the users.
- Web application: provides a desktop web interface for the users.

![Design overview diagram](https://s13.postimg.org/y9ztxcgqv/Design_overview.png "Design overview diagram")

### Detail
The FLIC button, once clicked, communicates with the Raspberry Pi, which in turn listens to button events and communicates them to the server through a known API. The server stores these button events and handles them appropriately. The mobile and web applications communicate with the server to perform different operations.


## File Structure
Our file structure is divided into separate modules, which translate to containers inside Docker. The project is divided into the main categories, which are:

- Markdown: folder including this documentation :)
- database: folder including all the files used to configure MongoDB.
- pushstock-app: folder containing the source code for our server and front-end components.
- raspberry-pi: folder including the source code for our button controller.

The entire file structure is as follows:

```
.
├── Markdown
│   ├── docs
│   │   ├── about.md
│   │   ├── design.md
│   │   ├── guide.md
│   │   ├── img
│   │   │   ├── Database\ diagram.png
│   │   │   ├── Design\ overview.png
│   │   │   └── Layer\ architecture.png
│   │   ├── index.md
│   │   └── setup.md
│   └── mkdocs.yml
├── database
│   ├── Dockerfile
│   ├── create_mongo_admin.js
│   ├── create_mongo_users.js
│   ├── delete_unused_buttons.js
│   ├── mongo-daily-config.sh
│   └── mongo-init-config.sh
├── docker-compose.yml
├── pushstock-app
│   ├── Dockerfile
│   ├── build_mobile_app.sh
│   ├── mobile-app
│   │   ├── config.xml
│   │   ├── ionic.config.json
│   │   ├── package.json
│   │   ├── resources
│   │   │   ├── android
│   │   │   │   ├── icon
│   │   │   │   │   ├── drawable-hdpi-icon.png
│   │   │   │   │   ├── drawable-ldpi-icon.png
│   │   │   │   │   ├── drawable-mdpi-icon.png
│   │   │   │   │   ├── drawable-xhdpi-icon.png
│   │   │   │   │   ├── drawable-xxhdpi-icon.png
│   │   │   │   │   └── drawable-xxxhdpi-icon.png
│   │   │   │   └── splash
│   │   │   │       ├── drawable-land-hdpi-screen.png
│   │   │   │       ├── drawable-land-ldpi-screen.png
│   │   │   │       ├── drawable-land-mdpi-screen.png
│   │   │   │       ├── drawable-land-xhdpi-screen.png
│   │   │   │       ├── drawable-land-xxhdpi-screen.png
│   │   │   │       ├── drawable-land-xxxhdpi-screen.png
│   │   │   │       ├── drawable-port-hdpi-screen.png
│   │   │   │       ├── drawable-port-ldpi-screen.png
│   │   │   │       ├── drawable-port-mdpi-screen.png
│   │   │   │       ├── drawable-port-xhdpi-screen.png
│   │   │   │       ├── drawable-port-xxhdpi-screen.png
│   │   │   │       └── drawable-port-xxxhdpi-screen.png
│   │   │   ├── icon.png
│   │   │   ├── ios
│   │   │   │   ├── icon
│   │   │   │   │   ├── icon-40.png
│   │   │   │   │   ├── icon-40@2x.png
│   │   │   │   │   ├── icon-40@3x.png
│   │   │   │   │   ├── icon-50.png
│   │   │   │   │   ├── icon-50@2x.png
│   │   │   │   │   ├── icon-60.png
│   │   │   │   │   ├── icon-60@2x.png
│   │   │   │   │   ├── icon-60@3x.png
│   │   │   │   │   ├── icon-72.png
│   │   │   │   │   ├── icon-72@2x.png
│   │   │   │   │   ├── icon-76.png
│   │   │   │   │   ├── icon-76@2x.png
│   │   │   │   │   ├── icon-83.5@2x.png
│   │   │   │   │   ├── icon-small.png
│   │   │   │   │   ├── icon-small@2x.png
│   │   │   │   │   ├── icon-small@3x.png
│   │   │   │   │   ├── icon.png
│   │   │   │   │   └── icon@2x.png
│   │   │   │   └── splash
│   │   │   │       ├── Default-568h@2x~iphone.png
│   │   │   │       ├── Default-667h.png
│   │   │   │       ├── Default-736h.png
│   │   │   │       ├── Default-Landscape-736h.png
│   │   │   │       ├── Default-Landscape@2x~ipad.png
│   │   │   │       ├── Default-Landscape@~ipadpro.png
│   │   │   │       ├── Default-Landscape~ipad.png
│   │   │   │       ├── Default-Portrait@2x~ipad.png
│   │   │   │       ├── Default-Portrait@~ipadpro.png
│   │   │   │       ├── Default-Portrait~ipad.png
│   │   │   │       ├── Default@2x~iphone.png
│   │   │   │       └── Default~iphone.png
│   │   │   └── splash.png
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── app.module.ts
│   │   │   │   └── main.ts
│   │   │   ├── index.html
│   │   │   └── theme
│   │   │       └── variables.scss
│   │   ├── tsconfig.json
│   │   └── tslint.json
│   ├── public
│   │   ├── README.md
│   │   ├── angular-cli.json
│   │   ├── e2e
│   │   │   ├── app.e2e-spec.ts
│   │   │   ├── app.po.ts
│   │   │   ├── dist
│   │   │   │   └── out-tsc
│   │   │   │       ├── angular-client
│   │   │   │       │   └── src
│   │   │   │       │       └── app
│   │   │   │       │           ├── buttons
│   │   │   │       │           │   ├── button-form.component.js
│   │   │   │       │           │   ├── button-form.component.js.map
│   │   │   │       │           │   ├── button-summary.component.js
│   │   │   │       │           │   └── button-summary.component.js.map
│   │   │   │       │           └── shared
│   │   │   │       │               └── models
│   │   │   │       │                   ├── button.js
│   │   │   │       │                   └── button.js.map
│   │   │   │       ├── app
│   │   │   │       │   ├── app.component.js
│   │   │   │       │   ├── app.component.js.map
│   │   │   │       │   ├── app.module.js
│   │   │   │       │   ├── app.module.js.map
│   │   │   │       │   ├── buttons
│   │   │   │       │   │   ├── button-form.component.js
│   │   │   │       │   │   ├── button-form.component.js.map
│   │   │   │       │   │   ├── button-summary.component.js
│   │   │   │       │   │   └── button-summary.component.js.map
│   │   │   │       │   └── shared
│   │   │   │       │       └── models
│   │   │   │       │           ├── button.js
│   │   │   │       │           └── button.js.map
│   │   │   │       ├── main.js
│   │   │   │       └── main.js.map
│   │   │   └── tsconfig.json
│   │   ├── karma.conf.js
│   │   ├── package.json
│   │   ├── protractor.conf.js
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── app-routing.module.ts
│   │   │   │   ├── app.component.css
│   │   │   │   ├── app.component.html
│   │   │   │   ├── app.component.spec.ts
│   │   │   │   ├── app.component.ts
│   │   │   │   ├── app.module.ts
│   │   │   │   ├── authorization
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── unauthorized.component.html
│   │   │   │   │   └── unauthorized.component.ts
│   │   │   │   ├── buttons
│   │   │   │   │   ├── button-assign.component.html
│   │   │   │   │   ├── button-assign.component.ts
│   │   │   │   │   ├── button-detail.component.html
│   │   │   │   │   ├── button-detail.component.ts
│   │   │   │   │   ├── button-form.component.html
│   │   │   │   │   ├── button-form.component.ts
│   │   │   │   │   ├── button-table.component.html
│   │   │   │   │   ├── button-table.component.ts
│   │   │   │   │   ├── button-unassign.component.html
│   │   │   │   │   └── button-unassign.component.ts
│   │   │   │   ├── employees
│   │   │   │   │   ├── employee-detail.component.html
│   │   │   │   │   ├── employee-detail.component.ts
│   │   │   │   │   ├── employee-form.component.html
│   │   │   │   │   ├── employee-form.component.ts
│   │   │   │   │   ├── employee-table.component.html
│   │   │   │   │   └── employee-table.component.ts
│   │   │   │   ├── guards
│   │   │   │   │   ├── admin.ts
│   │   │   │   │   └── login.ts
│   │   │   │   ├── home
│   │   │   │   │   ├── home.component.html
│   │   │   │   │   ├── home.component.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── login
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.ts
│   │   │   │   ├── register
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── register.component.html
│   │   │   │   │   └── register.component.ts
│   │   │   │   ├── services
│   │   │   │   │   ├── alert.service.ts
│   │   │   │   │   ├── api-settings.ts
│   │   │   │   │   ├── authentication.service.ts
│   │   │   │   │   ├── button.service.ts
│   │   │   │   │   ├── employee.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── task.service.ts
│   │   │   │   ├── shared
│   │   │   │   │   └── models
│   │   │   │   │       ├── alert.ts
│   │   │   │   │       ├── button.ts
│   │   │   │   │       ├── employee.ts
│   │   │   │   │       └── task.ts
│   │   │   │   └── tasks
│   │   │   │       ├── task-form.component.html
│   │   │   │       ├── task-form.component.ts
│   │   │   │       ├── task-reassign.component.html
│   │   │   │       ├── task-reassign.component.ts
│   │   │   │       ├── task-table.component.html
│   │   │   │       └── task-table.component.ts
│   │   │   ├── assets
│   │   │   ├── environments
│   │   │   │   ├── environment.prod.ts
│   │   │   │   └── environment.ts
│   │   │   ├── favicon.ico
│   │   │   ├── icon.png
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   ├── polyfills.ts
│   │   │   ├── styles.css
│   │   │   ├── test.ts
│   │   │   └── tsconfig.json
│   │   └── tslint.json
│   ├── server
│   │   ├── api
│   │   │   ├── button.views.js
│   │   │   ├── controller.js
│   │   │   ├── employee.views.js
│   │   │   ├── rpi.views.js
│   │   │   ├── task.views.js
│   │   │   ├── urls.js
│   │   │   └── views.js
│   │   ├── app
│   │   │   └── models
│   │   │       ├── button.js
│   │   │       ├── employee.js
│   │   │       └── task.js
│   │   ├── auth
│   │   │   ├── urls.js
│   │   │   └── views.js
│   │   ├── config
│   │   │   ├── cert.pem
│   │   │   ├── key.pem
│   │   │   ├── main.js
│   │   │   ├── passport.js
│   │   │   └── urls.js
│   │   ├── controllers
│   │   │   └── authentication.js
│   │   ├── coverage
│   │   │   ├── base.css
│   │   │   ├── index.html
│   │   │   ├── prettify.css
│   │   │   ├── prettify.js
│   │   │   ├── server
│   │   │   │   ├── api
│   │   │   │   │   ├── button.views.js.html
│   │   │   │   │   ├── controller.js.html
│   │   │   │   │   ├── employee.views.js.html
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── rpi.views.js.html
│   │   │   │   │   ├── task.views.js.html
│   │   │   │   │   ├── urls.js.html
│   │   │   │   │   └── views.js.html
│   │   │   │   ├── app
│   │   │   │   │   └── models
│   │   │   │   │       ├── button.js.html
│   │   │   │   │       ├── employee.js.html
│   │   │   │   │       ├── index.html
│   │   │   │   │       └── task.js.html
│   │   │   │   ├── auth
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── urls.js.html
│   │   │   │   │   └── views.js.html
│   │   │   │   ├── config
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── main.js.html
│   │   │   │   │   ├── passport.js.html
│   │   │   │   │   └── urls.js.html
│   │   │   │   ├── controllers
│   │   │   │   │   ├── authentication.js.html
│   │   │   │   │   └── index.html
│   │   │   │   ├── index.html
│   │   │   │   └── server.js.html
│   │   │   ├── sort-arrow-sprite.png
│   │   │   └── sorter.js
│   │   ├── package.json
│   │   ├── server.js
│   │   └── test
│   │       ├── button.spec.js
│   │       ├── config.js
│   │       └── task.spec.js
│   ├── wait-for-it.sh
│   └── wait-for-mongo.sh
├── raspberry-pi
│   └── flicbutton-config
│       ├── armv6l
│       │   ├── flic.sqlite3
│       │   └── flicd
│       └── python
│           ├── __pycache__
│           │   └── fliclib.cpython-34.pyc
│           ├── fliclib.py
│           ├── fliclib.pyc
│           ├── my_client.py
│           ├── my_scan_wizard.py
│           ├── my_script.sh
│           └── passthrough_daemon.sh
└── startup_script.sh
```


## Layer Architecture Design
We chose to use a modular design so that each component could depend as little as possible on other major components. Thus, the coupling between components (i.e., the Raspberry Pi and the server) was kept at a minimum, while each component was given a substantial set of responsibilities. Our architectural design is as follows:

![Layer architecture diagram](https://s18.postimg.org/f39jcdzbd/Layer_architecture.png "Layer architecture diagram")

The API in our server is the only actor allowed to make changes to the database; this allows us to control all interactions with the database. The API is the only communication point between the server and the mobile/web applications and the Raspberry Pi. The mobile/web applications' communication with the API is handled through the use of services, which provide us with reusable pieces of code. Beyond that, the mobile/web applications are divided into components, which further embrace the modular design we adopted. The Raspberry Pi directly communicates with the API to communicate the event of a single button click.

## Detailed Design
Following is the detailed design for the layer presented above.

### Database
Our database consists of three main schemas:

- Button: represents the FLIC button used by workers
- Employee: represents the Administrator and Maintenance workers
- Task: represents the requests being made by button events

![Database diagram](https://s1.postimg.org/m1mkofzrj/Database_diagram.png "Database diagram") 

---

On the following page you can find a guide to setup and start using the product.
