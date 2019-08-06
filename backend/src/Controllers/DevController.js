module.exports = {

    index(req, res) {
        return res.json({ ok: true })
    },

    store(req, res) {
        return res.json(req.body)
    }
}