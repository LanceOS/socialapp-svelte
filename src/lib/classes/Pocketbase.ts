import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import Pocketbase from "pocketbase"
import { writable } from "svelte/store";



export const currentUser = writable();


interface IPB {
    email: string;
    password: string;
    confirmPassword?: string;
}


class PBClient {
    instance: PBClient | null = null;

    static db = new Pocketbase(PUBLIC_POCKETBASE_URL);

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }

    static auth = {

        // Signin with pocketbase auth then return session
        async signIn({ email, password }: IPB) {

            try {
                const session = await PBClient.db.collection('users').authWithPassword(
                    email,
                    password,
                );
                if (!session) {
                    throw new Error("Failed to get user")
                }
                return session;
            }
            catch (e: any) {
                throw new Error("Failed to sign in:", e)
            }

        },

        // Create new pocketbase user and then return the new session
        async register(data: IPB) {

            try {
                const response = await PBClient.db.collection('users').create(data);

                if (!response) {
                    throw new Error("Failed to create new user")
                }

                const session = await PBClient.db.collection('users').authWithPassword(
                    data.email,
                    data.password
                );

                if (!session) {
                    throw new Error("Failed to retrieve session")
                }

                return session;
            } catch (e: any) {
                throw new Error(e);
            };
        }
    }

}


export default PBClient;
