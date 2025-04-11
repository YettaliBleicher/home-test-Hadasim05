import dotenv from 'dotenv';
dotenv.config();

const correctPassword = process.env.GROCERY_PASSWORD; // סיסמה שנמצאת בקובץ .env

const checkPassword = async function (password) {
    console.log("3 "+JSON.stringify(password) );
    let ps = password.password;
    console.log(ps["password"]);
    console.log(correctPassword);

        if (ps === correctPassword) {
            console.log(correctPassword);
            return true;
        } else {
            return false;
        }
};

export {checkPassword};
