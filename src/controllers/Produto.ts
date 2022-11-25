import { NextFunction, Request, Response } from 'express';
import Controller from './Controller';
import Produto from '../schemas/Produto';
import ValidationService from '../services/ValidationService';

import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import responseCreate from '../responses/ResponseCreate';
import responseOk from '../responses/ResponseOk';

class ProdutoController extends Controller {
  constructor() {
    super('/produto');
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
      const produtos = await Produto.find();

      if (produtos.length) return responseOk(res, produtos);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const produto = await Produto.findById(id);
      if (produto) return responseOk(res, produto);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const produto = await Produto.create(req.body);

      return responseCreate(res, produto);
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async edit(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const produto = await Produto.findByIdAndUpdate(id, req.body, () => {});
      if (produto) return responseOk(res, produto);

      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;
      if (await ProdutoService.validateExistAnyTask(id, next)) return;

      const produto = await Produto.findById(id);
      if (produto) {
        produto.deleteOne();
        return responseOk(res, produto);
      }

      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}

export default ProdutoController;
