const Joi = require('@hapi/joi');


const schema = Joi.object().keys({
  id: Joi.number().min(0).max(50).required(),
});

const dschema = Joi.object().keys({
  dirname: Joi.string().min(3).max(30)
    .required(),
});


const mschema = Joi.object().keys({
  rank: Joi.number().min(0).max(100).required(),
  title: Joi.string().min(3).max(30)
    .required(),
  description: Joi.string().min(3).max(1000)
    .required(),
  runtime: Joi.number().min(0).max(10000).required(),
  genre: Joi.string().min(3).max(30)
    .required(),
  rating: Joi.number().min(0).max(100).required(),
  metascore: Joi.number().min(0).max(100000).required(),
  votes: Joi.number().min(0).max(10000000).required(),
  gross_earning_in_mil: Joi.number().min(0).max(10000).required(),
  dirid: Joi.number().min(0).max(100).required(),
  actor: Joi.string().min(3).max(30)
    .required(),
  year: Joi.number().min(1000).max(3000).required(),
});
module.exports = {
  Joi,
  schema,
  dschema,
  mschema,
};
