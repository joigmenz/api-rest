const router = require('express').Router();
const { User } = require('../../models')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jwt-simple')

router.post('/register', [
    check('username', 'The username is required.').not().isEmpty(),
    check('password', 'The password is required.').not().isEmpty(),
    check('email', 'The email no is valid.').isEmail()
], async (req, res) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
    }

    const user = await User.create(req.body);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email }});
    if (user) {
        const result = bcrypt.compareSync(req.body.password, user.password);
        if (result) {
            res.json({ success:  createToken(user) });
        } else {
            res.json({ error: 'Error en usuario y/o contraseña.'});
        }
    } else {
        res.json({  })
    }
});

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, 'secret cinema')
}

module.exports = router;