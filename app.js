export default (express, bodyParser, createReadStream, crypto, http, mongo, path) => {
    
    const app = express()
    const author = 'itmo282167'
    const __dirname = path.resolve()

    const parseUrlEncodedBody = bodyParser.urlencoded({ extended: false })

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'pug'))
    app.use(express.static(path.join(__dirname, 'pug')))

    app.use(parseUrlEncodedBody)

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

        next()
    })

    app.get('/login/', (req, res) => {
        res.send(author)
    })

    app.get('/wordpress/wp-json/wp/v2/posts/1', (req, res) => {
        res.status(200).json({ title: { id: 1, rendered: author } })
    })

    app.post('/render/', (req, res) => {
        const { random2, random3 } = req.body;

        res.render('random', { random2, random3 });
    })
    
    app.get('/wordpress/', (req, res) => {
        res.status(200).render('wordpress')
    })
    
    app.all('*', (req, res) => {
        res.send(author)
    })

    return app
}