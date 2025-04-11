import {checkPassword} from '../service/password.js'

export class Password {
    check = async (req, res) => {

        try {
            let password = req.body;
            // console.log("2 "+password);
            await checkPassword(password).then(isValid => {
            if (isValid) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })

        } catch (error) {
            console.error('Error verifying password:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });

        }

    }

}

