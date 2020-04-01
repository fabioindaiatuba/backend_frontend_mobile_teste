import * as Yup from 'yup';
import Product from '../models/Product';
import Barcode from '../models/Barcode';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Barcode,
          as: 'barcodes',
          attributes: ['id', 'value'],
        },
      ],
    });

    return res.json(products);
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      attributes: ['id', 'description'],
      include: [
        {
          model: Barcode,
          as: 'barcodes',
          attributes: ['id', 'value'],
        },
      ],
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado!' });
    }

    return res.json(product);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Falha na validação da requisição' });
    }

    const { barcodes } = req.body;
    const { id, description } = await Product.create(req.body);

    if (barcodes) {
      barcodes.map(async (barcode) => {
        await Barcode.create({
          value: barcode.value,
          product_id: id,
        });
      });

      return res.json({ id, description, barcodes });
    }

    return res.json({ id, description });
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    await product.destroy();
    return res.status(204).send();
  }
}

export default new ProductController();
