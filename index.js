const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('toCaps' , (text)=>{
	return text.toUpperCase();
});

app.set('view engine' , 'hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
	let date = new Date().toString();
	let log = `${date}:  REQUEST: ${req.url}`
	console.log(log);
	res.render('maintenance.hbs');});

app.get('/' , (req,res)=>{
	var currentDate = new Date();
	res.render('home.hbs' ,{
		pageTitle: `Home Page`,
		welcomeMessage: `Welcome to home page`,
		capsMessage: `this is the home page`,
		currentYear: currentDate.getFullYear(),
	});})

app.get('/about' , (req,res)=>{
	var currentDate = new Date();
	res.render('about.hbs', {
		pageTitle: 'About page',
		currentYear: currentDate.getFullYear(),
	});});

app.get('/bad' , (req,res)=>{
	res.send({
		error: "404 PAGE AIN'T FOUND"
	});});

app.listen(port , ()=>{
	console.log(`SERVER IS UP ON PORT: ${port}`);
});