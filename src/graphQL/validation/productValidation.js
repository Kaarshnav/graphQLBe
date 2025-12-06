const { z } = require("zod");

const productInputValidation = z.object({
  productId: z.string().min(1),
  title: z.string().min(3),
  price: z.number().positive(),
  currency: z.enum(["INR", "USD", "EUR"]),
  unit: z.enum(["kg", "liter", "piece", "packet"]).optional(),
  description: z.string().optional(),
  proteinContent: z.number().optional(),
  totalCalories: z.number().optional(),
});
module.exports = productInputValidation;
