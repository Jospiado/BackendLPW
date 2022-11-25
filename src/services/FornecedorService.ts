import { NextFunction } from 'express';
import { FilterQuery } from 'mongoose';
import Task, { TaskInterface } from '../schemas/Task';

class FornecedorService {
  public async validateExistAnyTask(id: string, next: NextFunction): Promise<boolean> {
    return false;
  }
}

export default new FornecedorService();
