const express = require('express')
const next = require('next')
const fetch = require('isomorphic-fetch');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/', async (req, res) => {
      fetch('https://ansible-template-engine.herokuapp.com/form').then(res => res.json())
        .then(json => handle(req, res))

    })

    server.get('*', async (req, res) => {
      return handle(req, res)
    })


    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })