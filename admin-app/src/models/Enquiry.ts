import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  productName: string;
  productUrl: string;
  customerName: string;
  customerPhone: string;
  message?: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    productUrl: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Closed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
