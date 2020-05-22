import { md5 } from "https://deno.land/x/md5/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import { client } from "../db.ts"
import { key } from "../keys.ts"

const getUsers = async (req: any) => {
    let keyHeader = req.headers.get("diamsyah-key")
    if (keyHeader == key) {
        let users = await client.query("SELECT * FROM user")
        if (users.length > 0) {
            req.send({ data: users }, 200)
        } else {
            req.send({ message: "Data not found !" }, 404)
        }
    } else {
        req.send({ message: "Token invalid" }, 401)
    }
}

const getUser = async (req: any) => {
    let keyHeader = req.headers.get("diamsyah-key")
    if (keyHeader == key) {
        let user = await client.query("SELECT * FROM ?? WHERE id = ?", ["user", req.parameter.id])
        if (user.length > 0) {
            req.send({ data: user[0] }, 200)
        } else {
            req.send({ message: "Data not found !" }, 404)
        }
    } else {
        req.send({ message: "Token invalid" }, 401)
    }
}

const updateUsers = async (req: any) => {
    let keyHeader = req.headers.get("diamsyah-key")
    if (keyHeader == key) {
        let parsed = JSON.parse(req.payload)
        let fullname = parsed.fullname
        let email = parsed.email
        await client.execute("UPDATE user SET fullname = ?, email = ? WHERE id = ?", [fullname, email, req.parameter.id])
        req.send({ message: "Update successfully !" }, 200)
    } else {
        req.send({ message: "Token invalid" }, 401)
    }
}

const deleteUsers = async (req: any) => {
    let keyHeader = req.headers.get("diamsyah-key")
    if (keyHeader == key) {
        await client.execute("DELETE FROM user WHERE ?? = ?", ["id", req.parameter.id])
        req.send({ message: "Delete successfully !" }, 200)
    } else {
        req.send({ message: "Token invalid" }, 401)
    }
}

export {
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
}

/**
 * Diamsyah M Dida
 * restful api dengan deno fastro
 */