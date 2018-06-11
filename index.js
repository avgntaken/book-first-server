var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var books = require('google-books-search')

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))



server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views',__dirname+'/views')



server.get('/', function(request, response){
    books.search('Professional JavaScript for Web Developers', function(error, results) {
        if ( ! error ) {
            
            console.log(results)
            response.render('home.ejs', {data:results})
        } else {
            console.log(error)
            response.render('home.ejs', {data:error})
        }
    })
    //response.send('<h1>hello</h1>')
    // response.render('home.ejs')
})

server.get('/about-me', function(request, response){
    //response.send('<h1>hello</h1>')
    response.render('about.ejs')
})

server.get('/about-app', function(request, response){
    //response.send('<h1>hello</h1>')
    response.render('app.ejs')
})


server.get('/contact-us', function(request, response){
    //response.send('<h1>hello</h1>')
    response.render('contacts.ejs')
})


server.post('/', function(request,response){
    console.log(request.body)
    var searchTerm = request.body.books    
    books.search(searchTerm, function(error, results) {
        if ( ! error ) {
            
            console.log(results)
            response.render('results.ejs', {data:results})
        } else {
            console.log(error)
            response.render('results.ejs', {data:error})
        }
    })
})



var port = process.env.PORT

server.listen(port,() =>  { 
    console.log('Server running on port:'+port)

})