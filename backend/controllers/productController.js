import ProductModel from "../models/ProductModel.js"
const productController = async(req,res)=>{
    try {
        const resp = await ProductModel.find({})
        res.status(200).json(resp)
    } catch (error) {
       res.send(error) 
    }
}

const singleProduct = async(req,res)=>{ 
    const id = req.query.id
    try {
        const product = await ProductModel.findOne({id:id});
       if(product){
        return res.send(product)
       }else{
        res.status(400).json({msg:'No product matched given Id '})
       }
    } catch (error) {
       res.send(error) 
    }
}
const addProductController = async(req,res)=>{
    try {
        
        const imgArray = []
        for(let i=0; i<req.files.length; i++){
            imgArray[i]=req.files[i].filename
        }
        const {rate ,count,...rest} = req.body
        const rating= {rate,count}
        const finaldata = {rating,image:imgArray , ...rest}
        const newProduct = await ProductModel.create(finaldata)
        if(newProduct){
            res.status(201).json({msg:'product created successfully'})
        }else{
            res.status(406).json({msg:'product not created please input valid data'})
        }
    } catch (error) {
        res.status(400).json({msg:'validator error , entered data is not valid',error})
    }
} 
const deleteProductController = async(req,res)=>{
    try {
        const val = req.params.id
   const deleted=  await ProductModel.deleteOne({id:val})
    if(deleted){
        res.send({msg:'product deleted successfully'}) 

    }else{
        res.send({msg:'error occured product not deleted'}) 

    }
        
    } catch (error) {
       res.send({msg:error}) 
    }
    
}
export {productController ,addProductController,singleProduct ,deleteProductController}