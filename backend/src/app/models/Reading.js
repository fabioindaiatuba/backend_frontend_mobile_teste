import Sequelize, { Model } from 'sequelize';

class Reading extends Model {
  static init(sequelize) {
    super.init(
      {
        device: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Barcode, { foreignKey: 'barcode_id', as: 'barcode' });
  }
}

export default Reading;
