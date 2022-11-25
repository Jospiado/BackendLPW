import {
  model, Schema, Document, Decimal128,
} from 'mongoose';

export enum StatusSex {
    MASC = 'MASC',
    FEM = 'FEM'
}

export interface ClientInterface extends Document {
    name: string,
    number: number,
    sex: StatusSex,
    bithdate: Date,
}

const ClientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'nome obrigatório'],
  },
  number: {
    type: Number,
    required: [true, 'numero obrigatório'],
  },
  sex: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === StatusSex.MASC || value === StatusSex.FEM) return true;
        return false;
      },
      message: (props) => `${props.value} não é um status válido.`,
    },
    required: [true, 'Status obrigatório'],
    uppercase: true,
  },
  bithdate: {
    type: Date,
  },
});

export default model<ClientInterface>('Task', ClientSchema);
