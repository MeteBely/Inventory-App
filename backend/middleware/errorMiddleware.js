const notFound = (req, res, next) => {
  const error = new Error(`Not found:${req.originalUrl}`);
  res.status(404);
  next(error);
};

//global error handler. Error'ların geleceği son nokta.
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.messsage;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "noo sorry" : err.stack,
  });
};

export { notFound, errorHandler };
