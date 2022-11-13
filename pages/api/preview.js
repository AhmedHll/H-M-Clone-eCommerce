const axios = require("axios");
export default async (req, res) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      const { id } = body;

      const options = {
        method: "GET",
        url: `https://ali-express1.p.rapidapi.com/product/${id}`,
        params: { language: "en" },
        headers: {
          "X-RapidAPI-Key":
            "a662387d41msh9e50327b2f99c03p19479ejsnd870d5a68aff",
          "X-RapidAPI-Host": "ali-express1.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then(function (response) {
          res.status(200).json({ success: true, preview: response.data });
        });
      } catch (error) {
        res.status(400).json({ success: false, preview: error });
      }

      break;
    default:
      res.status.json({ success: false });
      break;
  }
};
