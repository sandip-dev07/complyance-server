const handleError = (res, error, status = 500) => {
  res.status(status).json({ error: error.message || "Internal server error" });
};

module.exports = handleError;
