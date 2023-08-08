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

const generateWrapperFns = () {
this.#validations.map((cb) => {
return () => {
const next = validations[i];
cb(req, res, next);
}
})
}

const createWrapperFn = () => {
  this.#validations.map();
};

const a = (x, next) => {
  console.log("a", x);
  next();
};

const b = (x, next) => {
  console.log("b", x);
  next();
};

const c = (x, next) => {
  console.log("c", x);
};

const fn = [a, b, c];
const wrappers = fn.map((cb, index) => (x) => {
  if (index < fn.length) {
    next = fn[index + 1];
   return  cb(x, next);
  }
});
