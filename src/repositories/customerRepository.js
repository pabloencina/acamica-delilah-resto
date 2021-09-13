import { response } from 'express';
import { getCustomers } from '../controllers/customerController.js';
import db from '../db/index.js'
import { Customer } from '../entities/customer.js';
console.log(Customer)

export const findAllCustomersDB = async () => {
    
    try {

        const customersDB = await db.query(
            "SELECT * FROM Customer",
            { type: db.QueryTypes.SELECT }
        );
        console.log(customersDB);
        return customersDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const findCustomerByIdDB = async (customerId) => {

    try {

        const customer = await db.query(
            "SELECT * FROM Customer WHERE customerId = ?",
            { type: db.QueryTypes.SELECT, replacements: [customerId] }
        );

        if (customer.length == 0) {
            return null;
        }

        return customer ;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const saveProductDB = async (customer) => {

    try {

        const customersDB = await db.query(
            "INSERT INTO Customer (customerId, address, user, userId, name, surname, email, phone, password) values(?,?,?,?,?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [customer.customerId, customer.address, customer.user, customer.userId, customer.name, customer.surname, customer.email, customer.phone, customer.password],
            }
        );
        return customersDB;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}

/*
export const updateProductDB = async (productId, product) => {

    try {

        const result = await db.query(
            "UPDATE Product SET productNumber = ?, productName = ?, productPrice = ?, productPhoto = ? WHERE productId = ?",
            {
                type: db.QueryTypes.UPDATE,
                replacements: [product.productNumber, product.productName, product.productPrice, product.productPhoto, productId],
            }
        );
        console.log(result)
        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}


export const deleteProductDB = async (productId) => {

    try {

        const result = await db.query(
            "DELETE FROM Product WHERE productId = ?",
            { type: db.QueryTypes.DELETE, replacements: [productId] }
        );

        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}
*/