import mongoose from 'mongoose';
const {Schema} = mongoose;

const CategorySchema = new Schema({

    category:{
        type: String ,
        required:true
    },
    subCategory:{
        title:{
            type:String,
            required:true
        }
    }
    
})

const CategoryModel= mongoose.model('category',CategorySchema)
export default CategoryModel;