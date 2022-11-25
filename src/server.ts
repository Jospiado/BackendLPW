import App from './app';
import DashController from './controllers/DashController';
import FornecedorController from './controllers/FornecedorController';
import ProdutoController from './controllers/Produto';
import TaskController from './controllers/TaskController';
import UserController from './controllers/UserController';

const app = new App([
  new UserController(),
  new TaskController(),
  new DashController(),
  new FornecedorController(),
  new ProdutoController(),
]);

app.listen(3333);
