import CategoryModel from "../models/categoryModel.js"

const  categoryController = async(req,res)=>{
    try {
        const category = await CategoryModel.find({})
        if(category){
            res.status(200).json({category})
        }
    } catch (error) {
        res.send('error')
    }
}
export  {categoryController} 