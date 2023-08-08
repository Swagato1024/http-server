const validations = [cb1, cb2];

const validate() {
  let i = 0;

  const nextHandler => {
    i++;
    return validations[i];
  }

  const [cb] = validations;
  cb(req, res, nextHandler);
}

