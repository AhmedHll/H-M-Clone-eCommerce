import dbConnect from "../../utils/dbConnect";
import Product from "../../modules/Product";
dbConnect("Products");
export default async (req, res) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      const { product } = body;
      try {
        const data = await Product.create({ ...product });
        console.log(data);
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
