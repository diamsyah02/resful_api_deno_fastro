import {
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
} from "../controllers/UserController.ts"

export const UserRoutes = async (server: any) => {
    server.get("/user", getUsers)
    server.get("/user/:id", getUser)
    server.put("/user/:id", updateUsers)
    server.delete("/user/:id", deleteUsers)
}

/**
 * Diamsyah M Dida
 * restful api dengan deno fastro
 */