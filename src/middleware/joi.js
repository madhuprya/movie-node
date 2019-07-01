const Joi = require('@hapi/joi');


const schema = Joi.object().keys({
  id: Joi.number().min(0).max(50).required(),
});

const dschema = Joi.object().keys({
  Director: Joi.string().min(3).max(30)
    .required(),
});


const mschema = Joi.object().keys({
  Rank: Joi.number().min(0).max(100).required(),
  Title: Joi.string().min(3).max(30)
    .required(),
  Description: Joi.string().min(3).max(1000)
    .required(),
  Runtime: Joi.number().min(0).max(10000).required(),
  Genre: Joi.string().min(3).max(30)
    .required(),
  Rating: Joi.number().min(0).max(100).required(),
  Metascore: Joi.number().min(0).max(100000).required(),
  Votes: Joi.number().min(0).max(10000000).required(),
  Gross_Earning_in_Mil: Joi.number().min(0).max(10000).required(),
  directorId: Joi.number().min(0).max(100).required(),
  Actor: Joi.string().min(3).max(30)
    .required(),
  Year: Joi.number().min(1000).max(3000).required(),
});
module.exports = {
  Joi,
  schema,
  dschema,
  mschema,
};
