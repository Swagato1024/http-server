x = 1;

const inc = (x) => x++;
const doubleUp = (x) => (x *= 2);

const fn = [inc, doubleUp];

const iterator = (fn) => {
  let i = 0;

  while (i < 2) {
    console.log(x < 2);

    console.log(i, x);
    next = fn[i];
    next();
    i++;
  }

  console.log("end");
};

iterator(fn);
