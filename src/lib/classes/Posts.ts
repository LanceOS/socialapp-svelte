import Auth from "../classes/Auth.js"
import PBClient from "./Pocketbase.js";


interface IPost {
    body: string;
    images?: object[];
}


class Posts {
    instance: Posts | null = null;

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }


    static async create(data: IPost) {
        const user = Auth.user.retrieve()

        try {

            if (!user) throw new Error("Must be a user")

            const post = {
                body: data.body,
                likes: 0,
                dislikes: 0,
                comments: 0,
                user: user?.id,
                isEdited: false,
            }


            const postResponse = await PBClient.db.collection("post").create(post);


            if (data.images) {
                for (let i = 0; i < data.images.length; i++) {
                    console.log("Current images:", data.images[i])
                    await PBClient.db.collection('post_images').create({
                        image: data.images[i],
                        post: postResponse.id
                    })
                }
            }


        }
        catch (e) {
            throw new Error(e)
        }
    }
}

export default Posts;