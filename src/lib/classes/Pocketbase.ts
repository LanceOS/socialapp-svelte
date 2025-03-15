import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import Pocketbase from "pocketbase"

interface IPB {
    email: string;
    password: string;
}


class PBClient {
    instance: PBClient | null = null;

    static db = new Pocketbase(PUBLIC_POCKETBASE_URL)

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }


    static auth = {

        async signIn({ email, password }: IPB) {

            try {
                const session = await PBClient.db.collection('users').authWithPassword(
                    email,
                    password,
                );

                if (session) return session;
            }
            catch (err) {
                throw new Error(err);
            }
        },


        async register(data: IPB) {

            try {
                await PBClient.db.collection('users').create(data);

                const session = await PBClient.db.collection('users').authWithPassword(
                    data.email,
                    data.password
                )

                if (session) return session;
            }
            catch (err) {
                throw new Error(err)
            }
        }
    }
}


export default PBClient;
