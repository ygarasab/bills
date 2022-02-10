import express from 'express'
import { getBillInfo } from './lib/bill.js'

const app = express()
app.get('/', (_, res) => res.send('Home'));

app.get('/boleto/:line', (req, res) => {

  try
  {
    res.send(getBillInfo(req.params.line));
  }
  catch(e)
  {
    res.status(400).send('Erro no processamento da linha digitável - ' + e.message)
  }

})

app.listen(8080, () => console.log('Running on http://localhost:8080'))
