import { model, Schema, Document } from 'mongoose';

export interface FornecedorInterface extends Document {
    name: string,
    cnpj: string,
    email: string,
}

const FornecedorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome obrigatório'],
  },
  cnpj: {
    type: String,
    required: [true, 'Cnpj obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'E-mail obrigatório'],
    unique: true,
    lowercase: true,
  },
});

export default model<FornecedorInterface>('Fornecedor', FornecedorSchema);
