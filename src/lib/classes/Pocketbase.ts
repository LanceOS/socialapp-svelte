import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import Pocketbase from "pocketbase"

interface IPB {
    email: string;
    password: string;
}


class PBClient {
    instance: PBClient | null = null;

    static pb = new Pocketbase(PUBLIC_POCKETBASE_URL)

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }


    static auth = {

        async login({ email, password }: IPB) {
            const session = await PBClient.pb.collection('users').authWithPassword(
                email,
                password,
            );

            console.log(session)

            if (session) return session;
        },


        async register(data: IPB) {
            await PBClient.pb.collection('users').create(data);

            const session = await PBClient.pb.collection('users').authWithPassword(
                data.email,
                data.password
            )

            if (session) return session;
        }
    }
}


export default PBClient;