const router = require('express').Router()

const { Film } = require('../../models')

router.get('/', async (req, res) => {
    const films = await Film.findAll({});
    res.json(films);
});

router.post('/', async (req, res) => {
    const film = await Film.create(req.body);
    res.json(film)
});

router.put('/:id', async (req, res) => {
    await Film.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ success: 'Updated Success' });
});

router.delete('/:id', async (req, res) => {
    await Film.destroy({
        where: { id: req.params.id }
    });
    res.json({ success: 'Deleted Success' })
});

module.exports = router;