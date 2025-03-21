import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import Pocketbase from "pocketbase"


// User validation
class App {
    static db = new Pocketbase(PUBLIC_POCKETBASE_URL)

    static user = {
        // check if user is logged in
        isAuthed() {
            return App.db.authStore.isValid;
        },
        // return the user object
        retrieve() {
            if (App.db.authStore.isValid) {
                return App.db.authStore.record;
            }
        }
    }
}

export default App;