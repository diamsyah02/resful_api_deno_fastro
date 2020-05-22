import { 
    login,
    register
} from "../controllers/AuthController.ts"

export const AuthRoutes = async (server: any) => {
    server.post("/login", login)
    server.post("/register", register)
}

/**
 * Diamsyah M Dida
 * restful api dengan deno fastro
 */