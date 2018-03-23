var express = require('express');
var morgan = require('morgan');
var path = require('path');
//var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser= require('body-parser');
var session= require('express-session');

var config={
    user:'piyushrj100',
    database:'piyushrj100',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret :'SomeRandomVAlue',
    cookie: {maxAge: 1000*60*60*24*30}
}));
    

var articles={
 'article-one': {
               title:'Article One | Piyush Raja',
               heading:'Article One',
               date:'February 11, 2016',
               content:`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </p>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>`},
 'article-two':{ 
     title:'Article Two | Piyush Raja',
               heading:'Article Two',
               date:'February 10, 2016',
               content:`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </p>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>`
               
 },
 'article-three':{
     title:'Article Three | Piyush Raja',
               heading:'Article Three',
               date:'February 9, 2016',
               content:`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </p>`
               
 }
};
function createTemplate(data)
{
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmlTemplate=`
<!doctype html>
<html lang="en">
    <head>
               <meta name="viewport" content="width=device-width, initial-scaled=1" />
        <title>
           ${title}
        </title>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div>
            <a href="/">Home</a></div>
            <hr/>
            <h1>${heading}</h1>
            <div>${date.toDateString()}</div>
            <div class="container">
               ${content}
              </div>
            
        
    </body>
</html> 
`;
return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000, 512,'sha512');
    return ["pkbd", "10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashString);
});
    app.post('/create-user',function(req,res){
       //username password
       var username = req.body.username;
       var password = req.body.password;
       var salt=crypto.randomBytes(128).toString('hex');
       var dbString = hash(password,salt);
       /*pool.query('INSERT INTO  "user" (username,password) VALUES ($1, $2)', [username, dbString], function (err, result){
         if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('User successfully created: ' +username);
        }  
       });*/
    });
app.post('/login', function(req,res){
    var username = req.body.username;
       var password = req.body.password;
       
       /*pool.query('SELECT * from "user" WHERE username =$1', [username], function (err, result){
         if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
              res.send(403).send('No user');    
            }else{
                var dbString=result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedpassword=hash(password, salt);
                if(hashedpassword===dbString){
                    req.session.auth = {userId: result.rows[0].id};
                    res.send('Credentials correct!');
                    
                }else{
                     res.send(403).send('Invalid username and password'); 
                    
                }
           
        } 
        }
       });*/
});
app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('you are logged in' +req.session.auth.userId.toString());
       
       
   } else{
       req.send('you are not logged in');
   }
});
app.get('/log-out',function(req,res){
  delete req.session.auth;
  res.send('logged out');
  
});
/*var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return the request with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});*/
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
/*app.get('/articles/:articleName',function(req,res){
   // var articleName=req.params.articleName;
    pool.query("SELECT * FROM article  WHERE title=$1",[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(484).send("Article not found");
            }else{
                var articleData=result.rows[0];
                  res.send(createTemplate(articleData));
            }
            
        }
    });
 
});*/
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name', function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
