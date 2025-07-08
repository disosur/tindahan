import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default { 
  port: 3008, 
  fetch: app.fetch, 
} 
