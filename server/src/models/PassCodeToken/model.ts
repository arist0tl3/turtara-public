import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPassCodeToken {
  _id: string;
  passCode: string;
  phoneNumber: string;
  expirationDate: Date;
}

const passCodeTokenSchema = new Schema<IPassCodeToken>({
  _id: { type: String, required: true, default: uuidv4 },
  expirationDate: { type: Date, required: true },
  passCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const PassCodeToken = model<IPassCodeToken>(
  "PassCodeToken",
  passCodeTokenSchema
);

export default PassCodeToken;
