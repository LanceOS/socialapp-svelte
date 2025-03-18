import express from "express"


const router = express.Router()


router.get("/create_post", (req: express.Request, res: express.Response) => {
    res.status(200).send("Success")
})



export default router;