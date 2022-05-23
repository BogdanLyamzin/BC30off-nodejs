const jwt = require("jsonwebtoken");

const {User} = require("../models/User");

const {createError} = require("../helpers");

/*
1. Извлечь из заголовков заголовок Authorization.
2. Разделить полученную строку на 2 части, в первой должно быть 
слово "Bearer", а во второй - токен.
3. Проверяем, равно ли первое слово "Bearer".
3.1. Если нет - выбрасываем 401 ошибку.
4. Если да - проверяем токен на валидность.
4.1. Если нет - выбрасываем 401 ошибку.
5. Если да - находит пользователя в базе с таким id. 
5.1. Если его нет - выбрасываем 401 ошибку.
6. Если он есть - добавляем его в объект req и передаем обработку дальше. 
*/

const {SECRET_KEY} = process.env;

const auth = async(req, res, next) => {
    try {
        const {authorization} = req.headers;
        const [bearer, token] = authorization.split(" ");
        if(bearer !== "Bearer"){
            throw createError(401)
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);
            if(!user || (user.token !== token)){
                throw createError(401);
            }
            req.user = user;
            next();
        } catch (error) {
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

module.exports = auth;