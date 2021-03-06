import { Customer } from "../entities/customer.js"

import { User } from "../entities/user.js"

import { BusinessError, InvalidIdError, InvalidObjectError, NotFoundError } from "../error.js"

import {
    findAllCustomersDB,
    findCustomerByIdDB,
    //findCustomerByUserIdDB,
    saveCustomerDB,
} from "../repositories/customerRepository.js"

import { findAllUserEmailDB, saveUserDB } from "../repositories/userRepository.js";
import { validateId } from "./idValidator.js";


export const getCustomers = async (request, response) => {

    try {

        let customers = await findAllCustomersDB();
        //Buscar todos los usuarios 
        //En bucle recorrer todos los customers y agregarle el usuario que corresponde
        response.status(200).json(customers);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }
}


export const getCustomerById = async (request, response) => {
    //Traer el cliente por Id.
    try {

        const customerId = validateId(request.params.customerId)

        const customerDB = await findCustomerByIdDB(customerId)

        if (customerDB === null) {
            throw new NotFoundError("Can't find customer.customerId = " + customerId)
        }

        response.status(200).json(customerDB);

    } catch (error) {
        if (error instanceof NotFoundError) {
            response.status(404).json({ error: error.message })
        }
        response.status(500).json({ error: "Try later..." })

    }


}

export const postCustomers = async (request, response) => {

    try {

        const body = request.body;
        const userBody = request.body.user;

        User.validate(userBody);

        const userEmails = await findAllUserEmailDB();

        if (userEmails.includes(userBody.email)) {
            throw new BusinessError("User with email: " + userBody.email + " already exist in the dataBase.");
        }


        const user = new User(null, userBody.name, userBody.surname, userBody.email, userBody.phone, userBody.password, false);

        let userSaved = await saveUserDB(user);

        Customer.validate(body);

        const customer = new Customer(null, body.address, userSaved);

        let customerSaved = await saveCustomerDB(customer);

        response.status(201).json(customerSaved);

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}



