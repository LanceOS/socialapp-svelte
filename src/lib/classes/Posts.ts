



interface IPost {
    body: string;
    image?: string;
}


class Posts {
    instance: Posts | null = null;

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }


    static async create(data: IPost) {

    }
}

export default Posts;