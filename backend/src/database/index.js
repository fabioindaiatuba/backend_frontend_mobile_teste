import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Product from '../app/models/Product';
import Barcode from '../app/models/Barcode';
import Reading from '../app/models/Reading';

const models = [Product, Barcode, Reading];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
