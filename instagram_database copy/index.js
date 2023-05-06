import { router as userRoutes } from "./routes/users.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as postRoutes } from "./routes/posts.js";
import express from "express";
const app = express()
const port = 5000

// middleware
app.use(userRoutes)
app.use(authRoutes)
app.use(postRoutes)
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.get('/' ,(req, res) => {
    res.send('Home Page')
})

app.all('*', (req, res) => {
    res.status(404).send('Page Not Found !!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})