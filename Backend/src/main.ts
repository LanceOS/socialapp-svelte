import express from "express"

import PostRoutes from "./routes/Posts"


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Success")
})

app.use("/api/posts", PostRoutes)

app.listen(9000, () => {
    console.log("Listening on port 9000")
})
