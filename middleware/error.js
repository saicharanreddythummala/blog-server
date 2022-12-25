
export const errorMiddleWare = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  res.status(err.statusCode).send({
    error: err.message,
  });
};
