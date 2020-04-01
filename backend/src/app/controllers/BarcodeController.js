import * as Yup from 'yup';
import Barcodes from '../models/Barcode';
import Products from '../models/Product';

class BarcodeController {
  async show(req, res) {
    const { value } = req.query;

    const barcode = await Barcodes.findOne({
      attributes: ['id', 'value'],
      where: { value },
    });
    return res.json(barcode);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      value: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Falha na validação da requisição' });
    }

    const { value, product_id } = req.body;
    const isProduct = await Products.findByPk(product_id);
    if (!isProduct) {
      return res.status(404).json({ error: 'Produto não encontado!' });
    }

    const barcodeExists = await Barcodes.findOne({
      where: { value },
    });
    if (barcodeExists) {
      return res.status(401).json({ error: 'QR Code não cadastrado!' });
    }

    const { id } = await Barcodes.create({ value, product_id });
    return res.json({ id, value, product_id });
  }
}

export default new BarcodeController();
