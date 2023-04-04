import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserData>

@Schema({
  toJSON: {
    virtuals: true,
  }
})
export class UserData {

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  role: string;
  
  @Prop()
  team: string;
  
  @Prop()
  password: string;
  
  @Prop()
  englishLevel: string;
  
  @Prop()
  techSkills: string;
  
  @Prop()
  cv: string;

}
const UserSchema = SchemaFactory.createForClass(UserData);

UserSchema.virtual('uid').get(function (this: UserDocument) {
  return this._id;
});

export {UserSchema};