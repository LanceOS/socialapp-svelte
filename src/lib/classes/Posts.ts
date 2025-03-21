import App from "./App.js";
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

    // getting current user
    static user = App.user.retrieve();

    // creating new post
    static async create(data: IPost) {

        try {

            if (!this.user) throw new Error("Must be a user")

            const post = {
                body: data.body,
                likes: 0,
                dislikes: 0,
                comments: 0,
                user: this.user?.id,
                isEdited: false,
            }
            // create new post in pocketbase
            const postResponse = await PBClient.db.collection("post").create(post);
            if (!postResponse) throw new Error("Failed to create post!")


            // if the user has images to upload upload them individually. 
            if (data.images) {
                for (let i = 0; i < data.images.length; i++) {
                    await PBClient.db.collection('post_images').create({
                        image: data.images[i],
                        post: postResponse.id
                    })
                }
            }

            return;
        }
        catch (e) {
            throw new Error(e)
        }
    }
}

export default Posts;