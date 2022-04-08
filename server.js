function requireHTTPS(req, res, next) {
    // The 'x-forward-photo' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') +req.url);
    }
    next();
}

const express = require('express');
const app = express();
const rootDir = './dist/app2'; // output_path di angular.son
require('dotenv').config() // tidak perlu declare variable

process.env.NODE_ENV == 'production' && app.use(requireHTTPS)

// app.use(requireHTTPS);
app.use(express.static(rootDir));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: rootDir})
);

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
)