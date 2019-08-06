const axios = require('axios');

const Dev = require('../models/Dev')


module.exports = {

    index(req, res) {
        return res.json({ ok: true })
    },

    async store(req, res) {

        const { userName } = req.body;

        const userExists = await Dev.findOne({ user: userName });

        if (userExists)
            return res.json(userExists);

        try {
            const { data } = await axios.get(`https://api.github.com/users/${userName}`)

            const { name, bio, avatar_url: avatar } = data;

            const dev = await Dev.create({
                name,
                user: userName,
                bio,
                avatar,
            });

            return res.json(dev);
        } catch (error) {
            return res.json({ erro: 'O usuario informado não foi encontrado' })
        }
    }
}