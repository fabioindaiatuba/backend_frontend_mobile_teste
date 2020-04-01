import * as Yup from 'yup';
import Reading from '../models/Reading';
import Barcode from '../models/Barcode';
import Product from '../models/Product';

class ReadingController {
  async index(req, res) {
    const { product_id } = req.params;

    const readings = await Reading.findAll({
      attributes: ['id', 'date', 'device'],
      include: [
        {
          model: Barcode,
          required: true,
          as: 'barcode',
          attributes: ['id', 'value', 'product_id'],
          where: { product_id },
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'description'],
              required: true,
            },
          ],
        },
      ],
    });

    return res.json(readings);
  }

  async show(req, res) {
    const { device } = req.params;
    const readings = await Reading.findAll({
      attributes: ['id', 'date', 'device'],
      where: { device },
      include: [
        {
          model: Barcode,
          required: true,
          as: 'barcode',
          attributes: ['id', 'value'],
          include: [
            {
              model: Product,
              required: true,
              as: 'product',
              attributes: ['id', 'description'],
            },
          ],
        },
      ],
    });

    return res.json(readings);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      device: Yup.string().required(),
      value: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Falha na validação da requisição' });
    }

    const { device, value } = req.body;

    const barcodeExists = await Barcode.findOne({
      where: { value },
      attributes: ['id', 'value'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'description'],
        },
      ],
    });
    if (!barcodeExists) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const date = new Date();
    const { product, id: barcode_id } = barcodeExists;

    const reading = await Reading.create({ device, value, date, barcode_id });
    return res.json({ id: reading.id, device, date, value, product });
  }
}

export default new ReadingController();
