// imports
const express = require('express');
const morgan = require('morgan');
const {check, validationResult} = require('express-validator'); // validation middleware
const epdao = require('./dao/episodedao');
const usdao = require('./dao/userdao');
const sedao = require('./dao/seriesdao');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
},
    function(username,password,done){
    usdao.getUser(username,password).then(({user,check})=>{
        
        if(!user){
            return done(null,false,{message:'Incorrect username'});
        } 
    if (!check){
        return done(null,false,{message:'Incorrect password'});
    } 
    return done(null,user);});
}));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(username,done) {
    usdao.getUserByUsername(username).then(user => {
      done(null, user);
    });
  });

// init
const app = express(); 
const port = 3000;
// set-up logging
app.use(morgan('tiny'));
// process body content as JSON
app.use(express.json());
// set up the 'client' component as a static website
app.use(express.static('client'));

app.use(session({ // set up here express session
    secret: "first never follows",
    resave: false,
    saveUninitialized: false,
    }));
app.use(passport.initialize());
app.use(passport.session());

// === REST API endpoints ===/

//-------------------- PODCAST -------------------- 
// GET /api/top3
// Prende i 3 migliori podcast
// Request body: vuota
// Response body: array che contiene i top-3 podcast
app.get('/api/top3', (req, res) => {
    sedao.getTopSeries()
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/series
// Prende tutti i podcast
// Request body: vuota
// Response body: array che contiene tutti i podcast

app.get('/api/series', (req, res) => {
    sedao.getSeries()
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/getseries/:user
// Prende tutti i podcast di un utente
// Request body: vuota
// Response body: array che contiene tutti i podcast dell'utente

app.get('/api/getseries/:user', (req, res) => {
    sedao.getSeriesByUser(req.params.user)
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});
// GET /api/getseries/title/:title
// Prende il podcast con un determinato titolo
// Request body: vuota 
// Response body: podcast trovato

app.get('/api/getseries/title/:title', (req, res) => {
    sedao.getSeriesByTitle(req.params.title)
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/series/:code
// Prende un podcast con un determinato codice
// Request body:  vuota
// Response body: podcast trovato

app.get('/api/series/:code', (req, res) => {
    console.log(req.params.code);
    sedao.getSeriesById(req.params.code)
        .then((series) => {res.json(series)})
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/search/series/:form
// Prende tutti i podcast filtrati con un testo
// Request body:  vuota
// Response body: array che contiene tutti i podcast trovati

app.get('/api/search/series/:form',  (req, res) => {
    sedao.searchSeries(req.params.form)
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/allEpisodes
// Prende tutti gli episodi
// Request body: vuota
// Response body: array che contiene tutti gli episodi

app.get('/api/allEpisodes', (req, res) => {
    epdao.getEpisodes()
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/search/episodes/:form/:cat
// Prende tutti i podcast di una determinata categoria filtrati con un testo 
// Request body: vuota
// Response body: array che contiene tutti i podcast trovati

app.get('/api/search/episodes/:form/:cat',  (req, res) => {
    epdao.searchEpisode(req.params.cat,req.params.form)
        .then((ep) => res.json(ep) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/isfollowed/:code/:user
// Prende tutti i podcast
// Request body: vuota
// Response body: username e codice presenti nel DB o vuoto in caso di assenza di follow

app.get('/api/isfollowed/:code/:user', (req, res) => {
    sedao.isFollowed(req.params.code,req.params.user)
        .then((ep) => {
            res.header("Content-Type",'application/json'); 
            res.send(ep);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/cat
// Prende tutti le categorie
// Request body: vuota
// Response body: array che contiene tutte le categorie

app.get('/api/cat', (req, res) => {
    sedao.getCategories()
        .then((ep) => res.json(ep) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// POST /api/newpod
// Crea un nuovo podcast
// Request body: campi podcast title,desc,cat,image,user
// Response body: vuoto
app.post('/api/newpod', [
    check('title').notEmpty(),
    check('desc').notEmpty(),
    check('cat').notEmpty(),
    check('image').notEmpty(),
    check('user').notEmpty(),
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const serie = req.body;
    sedao.addSeries(serie)
        .then((id) => res.status(201).header('Location', `/series/${id}`).end())
        .catch((err) => res.status(503).json({ error: err }));
    
});

// POST /api/follow
// Fa seguire un podcast a un utente
// Request body: code,user
// Response body: vuoto

app.post('/api/follow', [
    check('code').notEmpty(),
    check('user').notEmpty()
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
   
    sedao.addFollow(req.body.code,req.body.user)
        .then((id) =>res.status(201).header('Location',`/users/:username/follow/series/${id}`).end())
        .catch((err) => {res.status(503).json({ error: err})});
    
});

// PUT /api/updatepod
// Aggiorna un podcast
// Request body: code,title,desc,cat,image
// Response body: vuoto

app.put('/api/updatepod',[
    check('code').notEmpty()
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    sedao.updateSeries(req.body.code,req.body.title,req.body.desc,req.body.cat,req.body.image)
        .then((result) => {
            if(result.error)
                res.status(404).json(result);
            else
                res.status(200).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});

// DELETE /api/delpod
// Elimina un podcast
// Request body: id del podcast da eliminare
// Response body: vuoto
app.delete('/api/delpod',  (req,res) => {
    sedao.deleteSeries(req.body.code)
        .then((result) =>  {
            if(result.result)
                res.status(404).json(result);
            else
             res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});
// DELETE /api/unfollow
// Elimina il follow di un utente a un podcast
// Request body: code,user
// Response body: vuoto
app.delete('/api/unfollow', (req,res) => {
    sedao.deleteFollow(req.body.code, req.body.user)
        .then((result) =>  {
            if(result.error)
                res.status(404).json(result);
            else
             res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});


//-------------------USERS-------------------

// GET /api/getuser/:user
// Prende un utente in base all username
// Request body: vuoto
// Response body: oggetto utente 
app.get('/api/getuser/:user', (req, res) => {
    usdao.getUserDataByUsername(req.params.user)
        .then((series) => res.json(series) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// POST /users
// Crea un nuovo utente
// Request body: campi utente Username,Email,Password,Name,Surname,Birthday,Type
// Response body: vuoto

app.post('/users', [
    check('Username').notEmpty(),
    check('Email').notEmpty(),
    check('Name').notEmpty(),
    check('Surname').notEmpty(),
    check('Password').notEmpty(),
    check('Birthday').notEmpty(),
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    usdao.createUser(req.body)
        .then((id) => {res.status(201).header('Location', `/user/${id}`).end()})
        .catch((err) => {
            res.status(503).json({ error: err })
        });
    
});

//-----------------EPISODES-----------------

// GET /api/:code/episodes'
// Prende tutti gli episodi da una serie
// Request body: vuota
// Response body: array che contiene tutti gli episodi trovati

app.get('/api/:code/episodes', (req, res) => {
    epdao.getEpisodesFromSeries(req.params.code)
        .then((ep) => res.json(ep) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/episodes/code/:ep
// Prende l'episodio con un determinato codice
// Request body: vuota
// Response body: episodio trovato

app.get('/api/episodes/code/:ep', (req, res) => {
    epdao.getEpisodeByCode(req.params.ep)
        .then((ep) => res.json(ep) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/issaved/:epcode/:code/:user
// Controlla se un episodio di una certa serie è stato salvato da un certo utente
// Request body: vuota
// Response body: episodio salvato o vuoto se non è salvato
app.get('/api/issaved/:epcode/:code/:user', (req, res) => {
    epdao.isSaved(req.params.epcode,req.params.code,req.params.user)
        .then((ep) => {
            res.header("Content-Type",'application/json'); 
            res.send(ep);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/isbought/:epcode/:code/:user
// Controlla se un episodio di una certa serie è stato comprato da un certo utente
// Request body: vuota
// Response body: episodio comprato

app.get('/api/isbought/:epcode/:code/:user', (req, res) => {
    epdao.isBought(req.params.epcode,req.params.code,req.params.user)
        .then((ep) => {
            res.header("Content-Type",'application/json'); 
            res.send(ep);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /api/comments/:ep
// Prende tutti i commenti di un episodio
// Request body: vuota
// Response body: array che contiene tutti i commenti

app.get('/api/comments/:ep', (req, res) => {
    epdao.getComment(req.params.ep)
        .then((com) =>res.json(com) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});
// GET /api/getcomm/:code
// Prende un commento con un determinato codice
// Request body: vuota
// Response body: commento trovato

app.get('/api/getcomm/:code', (req, res) => {
    epdao.getCommentByCode(req.params.code)
        .then((com) =>res.json(com) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// POST /api/buyep
// Compra un episodio
// Request body: pod,ep,user
// Response body: vuoto

app.post('/api/buyep', [
    check('pod').notEmpty(),
    check('ep').notEmpty(),
    check('user').notEmpty(),
  ],  (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    epdao.PurchaseEpisode(req.body.pod,req.body.ep,req.body.user)
        .then((id) =>res.status(201).header('Location',`/users/:username/follow/series/${id}`).end())
        .catch((err) => { res.status(503).json({ error: err})});
});

// POST /api/newep
// Crea un nuovo episodio
// Request body: title,audio,desc,sponsor,price,date,podtitle,pcode,user
// Response body: vuoto

app.post('/api/newep', [
    check('title').notEmpty(),
    check('desc').notEmpty(),
    check('audio').notEmpty(),
    check('date').notEmpty(),
    check('podtitle').notEmpty(),
    check('user').notEmpty(),
    check('pcode').notEmpty(),
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const ep = req.body;
    epdao.addEpisode(ep)
        .then((id) => {res.status(201).header('Location', `/series/${id}`).end()})
        .catch((err) => res.status(503).json({ error: err }));
    
});
// POST /api/save
// Salva un episodio
// Request body: epcode,code,user
// Response body: id del podcast

app.post('/api/save',[
    check('code').notEmpty(),
    check('user').notEmpty(),
    check('epcode').notEmpty()
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    epdao.SaveEpisode(req.body.epcode,req.body.code,req.body.user)
        .then((id) =>res.status(201).header('Location',`api/save/${id}`).end())
        .catch((err) => {res.status(503).json({ error: err})});
    
});


// POST /api/newcomm
// Crea un nuovo commento
// Request body: msg,ep,user
// Response body: id del commento

app.post('/api/newcomm', [
    check('msg').notEmpty(),
    check('ep').notEmpty(),
    check('user').notEmpty(),
  ],  (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    epdao.addComment(req.body.msg,req.body.ep,req.body.user)
        .then((id) =>res.status(201).header('Location',`/series/:code/episode${id}`).end())
        .catch((err) => {res.status(503).json({ error: err})});
    
});

// DELETE /api/delep
// Elimina un episodio
// Request body: codice dell'episodio da eliminare
// Response body: vuoto
app.delete('/api/delep',  (req,res) => {
    epdao.deleteEpisode(req.body.code)
        .then((result) =>  {
            if(result.error)
                res.status(404).json(result);
            else
             res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});


// DELETE /api/unsave
// Elimina dai salvati un podcast di un utente
// Request body: epcode,code,user
// Response body: vuoto
app.delete('/api/unsave', [
    check('epcode').notEmpty(),
    check('code').notEmpty(),
    check('user').notEmpty()
  ], (req,res) => {
    epdao.UnsaveEpisode(req.body.epcode,req.body.code,req.body.user)
        .then((result) =>  {
            if(result.error)
                res.status(404).json(result);
            else
             res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});


// DELETE /api/delcomm
// Elimina un certo commento
// Request body: code
// Response body: vuoto
app.delete('/api/delcomm',  (req,res) => {
    epdao.deleteComment(req.body.code)
        .then((result) =>  {
            if(result)
                res.status(404).json(result);
            else
             res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});

// PUT /api/updatecommen
// Aggiorna un commento
// Request body: code,text
// Response body: vuoto

app.put('/api/updatecomment',[
    check('code').notEmpty(),
    check('text').notEmpty(),
  ],  (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    console.log(req.body.code, req.body.text);
    epdao.updateComment(req.body.code, req.body.text)
        .then((result) => {
            if(result)
                res.status(404).json(result);
            else
                res.status(200).end();
        })
        .catch((err) => {
            console.log(err);res.status(500).json({
            
            errors: [{'param': 'Server', 'msg': err}],
        })});
});
// PUT /api/updateepisode
// Aggiorna un podcast
// Request body: title,audio,desc,date,sponsor,price,code
// Response body: vuoto

app.put('/api/updateepisode', (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    epdao.updateEpisode(req.body.title,req.body.audio,req.body.desc,req.body.date,req.body.sponsor,req.body.price,req.body.code)
        .then((result) => {
            if(result.error)
                res.status(404).json(result);
            else
                res.status(200).end();
        })
        .catch((err) =>{
            res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],  
        })});
        
});


//-----------SESSIONS---------------
// POST /sessions 
app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
    
        // success, perform the login
        req.login(user, function(err) {
          if (err) { return next(err); }
          // req.user contains the authenticated user
          return res.json(req.user);
        });
    })(req, res, next);
  });

// DELETE /sessions/current 
app.delete('/api/sessions/current', function(req, res){
    req.logout();
    res.end();
  });

app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname,'client/index.html'));
})
// activate server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));



