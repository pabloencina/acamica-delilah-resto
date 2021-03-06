
import { InvalidIdError, NotFoundError } from "../error.js"
import jsonwebtoken from "jsonwebtoken";
import { findUserByEmailAndPasswordDB } from "../repositories/userRepository.js"
import { findAdministratorByUserIdDB } from "../repositories/administratorRepository.js";
import { findCustomerByUserIdDB } from "../repositories/customerRepository.js";


export const postLogin = async (request, response) => {

    try {

        const email = request.body.email;
        const password = request.body.password;

        let userRecovered = await findUserByEmailAndPasswordDB(email, password)

        if (userRecovered === null) {
            throw new NotFoundError("Wrong email or password");
        }
        
        let administratorRecovered = await findAdministratorByUserIdDB(userRecovered.userId);

        if (administratorRecovered === null) {
            userRecovered.admin = false
        } else {
            userRecovered.admin = true
        }

        // Agregar el coustemerId al objeto UserRecovered
        let customerRecovered = await findCustomerByUserIdDB(userRecovered.userId)
        
        
        if (customerRecovered === null) {
            userRecovered.customerId = 0
        } else {
            userRecovered.customerId = customerRecovered.customerId
        }

        const secretJWT = "ponerAlgoSuperComplicadoConNumuerosYCaracteres1234"
        
        const token = jsonwebtoken.sign(
            userRecovered,
            secretJWT,
            {
                expiresIn: "120m"
            }
        );

        response.status(200).json(token);

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof NotFoundError) {
            response.status(404).json({ error: error.message })
        } else {
            response.status(500).json({ error: error.message });
        }
    }

}



