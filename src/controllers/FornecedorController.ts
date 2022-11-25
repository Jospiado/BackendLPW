import { NextFunction, Request, Response } from 'express';
import Controller from './Controller';
import Fornecedor from '../schemas/Fornecedor';
import ValidationService from '../services/ValidationService';

import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import responseCreate from '../responses/ResponseCreate';
import responseOk from '../responses/ResponseOk';
import FornecedorService from '../services/FornecedorService';

class FornecedorController extends Controller {
  constructor() {
    super('/fornecedor');
  }

  protected initRoutes(): void {
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const fornecedors = await Fornecedor.find();

      if (fornecedors.length) return responseOk(res, fornecedors);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const fornecedor = await Fornecedor.findById(id);
      if (fornecedor) return responseOk(res, fornecedor);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const fornecedor = await Fornecedor.create(req.body);

      return responseCreate(res, fornecedor);
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async edit(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const fornecedor = await Fornecedor.findByIdAndUpdate(id, req.body, () => {});
      if (fornecedor) return responseOk(res, fornecedor);

      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;
      if (await FornecedorService.validateExistAnyTask(id, next)) return;

      const fornecedor = await Fornecedor.findById(id);
      if (fornecedor) {
        fornecedor.deleteOne();
        return responseOk(res, fornecedor);
      }

      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}

export default FornecedorController;
