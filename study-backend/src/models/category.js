import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    unique: true,
    required: true,
  },
});

const Category = model('Category', CategorySchema);

export default Category;
