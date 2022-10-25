const express = require('express')

const categoryRouter = express.Router()

const Category = require('../model/category.model')
const Product = require('../model/products.model')
const SubCategory = require('../model/subCategory.model')

const asyncWrapper = require('../middleware/asyncWrapper')

categoryRouter.get('/',asyncWrapper( async (req, res) =>{

        const catagory = await Category.find()
    if (!catagory){
        return res.status(404).json({msg:'not found'})
    }
    res.status(201).json({catagory})
    
}))

categoryRouter.get('/:id',asyncWrapper( async (req, res) => {

        const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404).json({ msg: 'The category with the given ID not exists'})
    }
    res.status(201).json({category})

    
}))

categoryRouter.post('/',asyncWrapper( async (req, res) =>{

        const category = await Category.create({name:req.body.name})
    if(!category)
    return res.status(404).send('Category cannot be created')

    res.status(201).json({category,msg:'Category is created successfully'})

    
}))


categoryRouter.patch('/:id',asyncWrapper( async (req, res) => {

        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        })
    
        if (!category)
            return res.status(404).json({msg:'Category cannot be updated'})
        res.status(201).json({category,msg:'Category is updated successfully'})
  
}))

categoryRouter.delete('/:id',asyncWrapper( async (req, res) =>{

        const {id:categoryID} = req.params
        const category = await Category.findOneAndDelete({_id:categoryID})
        await SubCategory.deleteMany({category: categoryID})
        await Product.deleteMany({category: categoryID})
        
        if(!category){
            return res.status(404).json({msg:`there is no category wit id:${category}`})
        }

        res.status(201).json({category,msg: 'Category is deleted successfully'})

}))


module.exports = categoryRouter