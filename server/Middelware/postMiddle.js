const log = (req, res, next) => {
  console.log(
    new Date().toISOString() +
      " the method " +
      req.method +
      " from the Path " +
      req.url
  );
  next();
};

const errorHandling = (err, res) => {
  res.status(err.status || 500).send(err.message);
};

module.exports = { log, errorHandling };
