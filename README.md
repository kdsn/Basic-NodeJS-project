# Basic NodeJS project

---


### Indhold:
- [Indledende opsætning](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#initialize-project)
- [Server opsætning](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#server-nodejs-express-projekt-med-port-nummer)
- [Router](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#router)
- [Templet engien](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#templet-engien)
- [Database opsætning](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#database-opsætning)
- [CRUD](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#crud)
- [Session](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#session)
- [Cookie](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#cookie)
- [Import JSON](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#import-json)
- [Export JSON](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#export-json)
- [Brug af API](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#brug-af-api)
- [Tilbud af API](https://github.com/kdsn/Basic-NodeJS-project/blob/master/README.md#tilbud-af-api)

---

## Initialize project

Opret nyt tomt projekt

Lav 2 terminal vinduer, det ene kaldes "Server", det andet "Command".
ENESTE kommando i "Server", er "npm start", (eller ctrl + c, for at slutte server aktivitet)
alle andre kommandoer er i "Command"!!!

---

## Server (node.js express projekt med port nummer)

I terminalen "Command" køres:

    (npm install -g express-generator)

    express
    npm install

    npm audit fix --force
    npm audit fix --force

Det er ikke en fejl at "***npm audit fix --force***"
står der 2 gange, den retter ikke alle fejl første gang!

(bin/www)<br>
ret portnummer i linje 15 til det ønskede, samt linje 28, så den kommer til at se således ud:
```node
server.listen(port, console.log(`Server is running on port ${port}`)); 
```
I terminalen "Command" køres:

    npm install nodemon

ret node til nodemon (package.json linje 6)

I terminalen "Server" køres:

    npm start

---

## Router

(routers) <br>
omdøb filerne index til web & users til api

(app.js)<br>
Ret linje 7 & 8 fra:

```node
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
```

til:

```node                                           
var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');
```                            

Ret linje 22 & 23 fra:

```node                                                   
app.use('/', indexRouter);
app.use('/users', usersRouter);                            
```                                                       

til:

```node                                                   
app.use('/', webRouter);                
app.use('/api', apiRouter);                                  
```                                                       

for hvert endpoint indsættes og tilpasses følgende route i den relevante fil:
```node
router.get('/endpoint', function(req, res, next) {
   res.render('index', { title: 'navn'});
});
```
/endpoint rettes til det ønskede endpoint <br>
index rettes til html filen <br>
navn rettes til navnet på endpointet

---

## Templet engien

I terminalen "Command" køres:<br>

    npm uninstall jade --save
    npm install express-handlebars --save

(app.js) <br>

Fjern linje 12 og 13, erstat/tilføj med:<br>

```node 
var exphbs = require('express-handlebars');
var handlebars = exphbs.create({ extname: '.hbs',});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));
```
(views)<br>
I views folderen laves en layouts folder & .jade filer slettes.

(views/layout)<br>
Opret main.hbs i layouts folderen og indsæt:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

   <title>{{ title }}</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link href="stylesheets/style.css" rel="stylesheet">
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="/">Eksamen</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/registrer">Registration</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/beskeder">Beskeder</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main class="container my-5">

    {{{ body }}}

    </main>

    <footer class="container">
        <div class="row">
            <div class="col-12">
                <p>&copy; Copyright</p>
            </div>
        </div>
    </footer>
    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>
</html>
```
(views)<br>
Opret error.hbs i views folderen og indsæt:

```html
<h1>{{message}}</h1>
<h2>{{ error.status }}</h2>
<pre>{{ error.stack }}</pre>
```

For hvert uniked view skal der oprettes en .hbs fil i views mappen. (husk at nav rettes i main.hbs)

---  

## Database opsætning

---

## CRUD





---

## Session


---

## Cookie

## Import JSON

---

## Export JSON

---

## Brug af API

---

## Tilbud af API
