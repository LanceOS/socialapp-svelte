

class Posts {
    instance: Posts | null = null;

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }
}

export default Posts;