import mongoose from 'mongoose';
const {Schema} = mongoose;

const ProductSchema = new Schema({
    id:{
        type: Number,
        required:true
    },
    title:{
        type: String ,
        required:true
    },
    price:{
        type: Number ,
        required:true
    },
    category:{
        type: String ,
        required:true
    },
    description:{
        type: String ,
        required:true
    },
    image:{
        type: Array ,
        required:true
    },
    rating:{
      rate: {type:Number, required:true},
      count:{type:Number , required:true}
    }

})

const ProductModel= mongoose.model('product',ProductSchema)
export default ProductModel;