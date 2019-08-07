const axios = require('axios');

const Dev = require('../models/Dev')


module.exports = {

    async index(req, res) {

        const { user } = req.headers;

        const devLogged = await Dev.findById(user);

        const devs = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: devLogged.likes } },
                { _id: { $nin: devLogged.dislikes } },
            ]
        })

        return res.json(devs);
    },

    async store(req, res) {

        const { userName } = req.body;

        const userExists = await Dev.findOne({ user: userName });

        console.log(userName)

        if (userExists)
            return res.json(userExists);

        try {
            const { data } = await axios.get(`https://api.github.com/users/${userName}`)

            const { name, bio, avatar_url: avatar } = data;

            const dev = await Dev.create({
                name: name || userName,
                user: userName,
                bio,
                avatar,
            });

            return res.json(dev);
        } catch (error) {
            console.log(error)
            return res.json({ erro: 'O usuario informado não foi encontrado' })
        }
    }
}