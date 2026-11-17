import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['pothole', 'junkyard', 'light', 'water'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: { type: String, default: 'Pending' },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    photo: { type: String, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('Complaint', complaintSchema)