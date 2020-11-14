const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

// middlewares
app.use(cors())
// graphql set up
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

app.listen(4000, () => console.log(`Server running on port 4000`))