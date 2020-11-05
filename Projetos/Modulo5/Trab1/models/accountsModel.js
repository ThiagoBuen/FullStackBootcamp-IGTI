import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  agencia: { type: Number, require: true },
  conta: { type: Number, require: true },
  name: { type: String, require: true },
  balance: {
    type: Number,
    require: true,
    min: 0,
  },
});

const accountsModel = mongoose.model('accounts', accountSchema, 'accounts');

export { accountsModel };
