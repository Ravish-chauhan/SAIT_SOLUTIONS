import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  mrp: number;
  offerPrice?: number;
  brand: string;
  specs: Record<string, string>;
  images: string[];
  stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  category: mongoose.Types.ObjectId;
  subcategory?: mongoose.Types.ObjectId;
  isTrending: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    mrp: { type: Number, required: true },
    offerPrice: { type: Number },
    brand: { type: String, required: true },
    specs: { type: Map, of: String, default: {} },
    images: { type: [String], default: [] },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Call for Availability'],
      default: 'In Stock',
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
