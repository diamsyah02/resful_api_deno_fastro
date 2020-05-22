import {
    Fastro,
    FastroError
} from "./deps.ts"
import { AuthRoutes } from "./routes/AuthRoutes.ts"
import { UserRoutes } from "./routes/UserRoutes.ts"

const server = new Fastro()

AuthRoutes(server)
UserRoutes(server)

await server.listen({ port: 3000 }, (err, addr) => {
    if (err) throw FastroError("SERVER_ERROR", err)
    console.log("Server running on:", addr)
})

/**
 * Diamsyah M Dida
 * restful api dengan deno fastro
 */