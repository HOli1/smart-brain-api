const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
  client: 'pg',
  version: '7.12',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    // port: '50068',
    password : 'test',
    database : '\'smart-brain\''
  }
});

db.select('*').from('users').then(didi => {
	console.log(didi);
});

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { res.send(database.users)});
app.post('/signin',signin.handleSignin(db, bcrypt));
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)});
app.put('/image', (req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});

app.listen(3000, () => {
	console.log('app is running on port 3000');
})

// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			password: 'apples',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'124',
// 			name: 'Sally',
// 			email: 'sally@gmail.com',
// 			password: 'bananas',
// 			entries: 0,
// 			joined: new Date()		
// 		}
// 	],

// 	login: [
// 		{
// 			id: '987',
// 			hash: '',
// 			email: 'john@gmail.com'
// 		}
// 	]
// }

	// Store hash in your password DB.
	// bcrypt.hash(password, null, null, function(err, hash) {
	// 	console.log(hash);
	// })
	// db('users')
	// 	.returning('*')
	// 	.insert({
	// 		email:email,
	// 		name:name,
	// 		joined: new Date()
	// 	})
	// 	.then(user => {
	// 		res.json(user[0]);
	// 	})





