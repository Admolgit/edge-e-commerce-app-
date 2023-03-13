
const z = require("zod");

exports.validate = (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

exports.register = z.object({
  body: z.object({

    name: z.string(),

    email: z.string().nonempty('This is required').email({ message: 'Must be a valid email' }),

    password: z.string().nonempty('This is required').min(8, { message: 'Too short' }),
  }),
});