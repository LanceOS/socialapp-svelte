import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import Pocketbase from "pocketbase"

interface IPB {
    email: string;
    password: string;
    confirmPassword?: string;
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
            const session = await PBClient.db.collection('users').authWithPassword(
                email,
                password,
            );
            
            if (session) return session;
        },


        async register(data: IPB) {

            try {

                const response = await PBClient.db.collection('users').create(data);
            
                const session = await PBClient.db.collection('users').authWithPassword(
                    data.email,
                    data.password
                )
            
                console.log("Created new user:", response)
                console.log("Returning user session:", session)
                if (session) return session;
            } catch(e) {
                console.log(e)
            }
        }
    }
}


export default PBClient;
