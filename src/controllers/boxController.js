const Box = require('../models/Box')

class BoxController{
    // Criar novos boxs
    async create(req, res){
        const box = await Box.create({title: req.body.title});
        return res.json(box)
    }

    async show(req, res){
        const box = await Box.findById({_id: req.params.id}).populate({
            path: 'files',
            options: {sort: {createdAt: -1}}
        })

        return res.json(box)
    }
}

module.exports = new BoxController();