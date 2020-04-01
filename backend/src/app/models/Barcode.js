import Sequelize, { Model } from 'sequelize';

class Barcode extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.hasMany(models.Reading, { sourceKey: 'id', as: 'readings' });
  }
}

export default Barcode;
