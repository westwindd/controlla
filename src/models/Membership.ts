import mongoose, { Schema, Document, Model } from 'mongoose';

interface IMembershipDocument extends Document {
  name: string;
  value: string;
  imageUrl: string;
  color: string;
}

interface IMembershipModel extends Model<IMembershipDocument> {
  // Define any static methods here
}

class Membership {
  private static schema: Schema = new Schema<IMembershipDocument>({
    name: { type: String, required: true },
    value: { type: String, required: true },
    imageUrl: { type: String, required: true },
    color: { type: String, required: true },
  });

  public static model: IMembershipModel = mongoose.model<IMembershipDocument, IMembershipModel>('Membership', Membership.schema);
}

export default Membership.model;
