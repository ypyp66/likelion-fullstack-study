import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
});

const Category = model('Category', CategorySchema);

export default Category;
