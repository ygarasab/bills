import express from 'express'

const app = express()
app.get('/', (_, res) => res.send('Home'));

app.listen(8080, () => console.log('Running on http://localhost:8080'))
