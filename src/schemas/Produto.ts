import {
  model, Schema, Document, Decimal128, Mongoose, MongooseQueryOptions,
} from 'mongoose';

export interface ProdutoInterface extends Document {
    codigo: number,
    descricao: string,
    preco: number,
    precoavista: number,
    estoque: number,
    linkImg: string,
}

const ProdutoSchema = new Schema({
  codigo: {
    type: Number,
    unique: true,
    required: [true, 'codigo obrigatório'],
  },
  descricao: {
    type: String,
    required: [true, 'descrição obrigatória'],
    unique: false,
  },
  preco: {
    type: Number,
    required: [true, 'preco obrigatória'],
  },
  precoavista: {
    type: Number,
    required: [true, 'preco obrigatória'],
  },
  estoque: {
    type: Number,
  },
  linkImg: String,
});

export default model<ProdutoInterface>('Produto', ProdutoSchema);
