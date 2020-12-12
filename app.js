export default (express, bodyParser, fs, crypto, http, mongodb, path, cors) => {
    const app = express();
    const __dirname = path.resolve();
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'public'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
    app.use(express.urlencoded());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        next()
    });

    app.use(cors());
    app.options('*', cors());

    app 
        .get('/wordpress/wp-json/wp/v2/posts/1', (req, res) => res.status(200).json({title: {id: 1, rendered: "itmo282167"}}))
        .post('/render/', (req, res) => {
            const {random2, random3} = req.body;

            let { addr } = req.query;

            console.log(addr);
            
            res.render('random', {random2: random2, random3: random3,});
        })
        .get('/wordpress/', (req, res) => res.status(200).render('wordpress'))
        .get('/login/', (req, res) => res.send('itmo282167'))
        .all('*', (req, res) => {
            res.send('itmo282167');
        });


    return app;
}