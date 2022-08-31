import { createRouter } from "@/api-lib/createRouter";


export const postRouter = 
    createRouter()
    .query("post", {
        async resolve() {
            return "test"
        }
    })
    .query("get", {
        async resolve(){
            console.log("testing");

            return {
                id: 1,
                name: "Raymart"
            }
        }
    })