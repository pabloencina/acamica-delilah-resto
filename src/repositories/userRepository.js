import db from '../db/index.js';
//import { validateAdminstrator } from "../security/validateRoles.js"

export const findAllUsersDB = async () => {

    try {

        const usersDB = await db.query(
            "SELECT * FROM User",
            { type: db.QueryTypes.SELECT }
        );
        console.log(usersDB);
        return usersDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const findUserByIdDB = async (userId) => {

    try {

        const user = await db.query(
            "SELECT * FROM User WHERE userId = ?",
            { type: db.QueryTypes.SELECT, replacements: [userId] }
        );

        if (user.length == 0) {
            return null;
        }

        return user;

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}

export const findUserByEmailAndPasswordDB = async (email, password) => {

    try {

        const users = await db.query(
            "SELECT * FROM User WHERE email = ? AND password = ?",
            { type: db.QueryTypes.SELECT, replacements: [email, password] }
        );

        if (users.length == 0) {
            return null;
        }

        return users[0];

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}

export const saveUserDB = async (user) => {

    try {

        const responseDB = await db.query(
            "INSERT INTO User (userId, name, surname, email, phone, password) values(?,?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [null, user.name, user.surname, user.email, user.phone, user.password],
            }
        );
        user.userId = responseDB[0];
        return user;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}


export const findAllUserEmailDB = async () => {

    try {

        const UserEmaildDB = await db.query(
            "SELECT email FROM User",
            { type: db.QueryTypes.SELECT }
        );

        let userEmails = [];

        for (let i = 0; i < UserEmaildDB.length; i++) {
            
            userEmails.push(UserEmaildDB[i].email);
            
        }


        return userEmails;


    } catch (error) {

        console.error(error.message);
        throw error;

    }
}