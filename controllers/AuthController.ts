import { md5 } from "https://deno.land/x/md5/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import { client } from '../db.ts'
import { key } from "../keys.ts"

const login = async (req: any) => {
    let parsed = JSON.parse(req.payload)
    let email = parsed.email
    let password = md5(parsed.password)

    let users = await client.query("SELECT * FROM ?? WHERE email = ?", ["user", email])
    if (users.length > 0) {
        if (bcrypt.checkpw(password, users[0]["password"])) {
            req.send({ data: users[0], key: key }, 200)
        } else {
            req.send({ message: "login unsuccessfully, because your password is wrong !" }, 400)
        }
    } else {
        req.send({ message: "login unsuccessfully, because you are not register !" }, 400)
    }
}

const register = async (req: any) => {
    let parsed = JSON.parse(req.payload)
    let fullname = parsed.fullname
    let email = parsed.email
    let salt = bcrypt.gensalt(8)
    let password = bcrypt.hashpw(md5(parsed.password), salt)

    let cekEmail = await client.query("SELECT * FROM ?? WHERE email = ?", ["user", email])
    if (cekEmail.length > 1) {
        req.send({ message: "Email is already !" }, 400)
    } else {
        let insert = await client.execute("INSERT INTO user(fullname, email, password) values(?, ?, ?)", [fullname, email, password])
        if (insert) {
            req.send({ message: "Register successfully !" }, 200)
        } else {
            req.send({ message: "Opss.. something's is wrong !" }, 400)
        }
    }
}

export {
    login,
    register
}

/**
 * Diamsyah M Dida
 * restful api dengan deno fastro
 */