x = 1;

const inc = (x) => x++;
const doubleUp = (x) => (x *= 2);

// const fn = [inc, doubleUp];

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

// iterator(fn);

const a = (x, chain) => {
  console.log("a: ", x);

  const fnToCall = chain.next().value;
  fnToCall(x, chain);
};

const b = (x, chain) => {
  console.log("b: ", x);

  const fnToCall = chain.next().value;
  chain.next().done = true;

  fnToCall(x, chain);
};

const c = (x, chain) => {
  console.log("c: ", x);

  const fnToCall = chain.next().value;
  const done = chain.next().done;
  if (done) return;

  fnToCall(x, chain);
};

const fn = [a, b, c];

const wrappers = [];

const nextOfB = c;
const wrapperOfB = (x) => {
  b(x, () => c(x));
};

const nextOfA = wrapperOfB;
const wrapperOfA = (x) => {
  a(x, () => nextOfA(x));
};

// wrapperOfA(5);
// const fns = [a, b, c];
let index = 0;

function* fns(list) {
  for (const element of list) {
    yield element;
  }
}

const chain = fns(fn);

// chain.next().value(5, chain);

const loop = (items) => {
  const itemList = items.map((item) => `<li>${item}</li>`);

  return `<ul>${itemList.join("\n")}</ul>`;
};

console.log(loop(["a", "b", "c"]));


person = {
  firstName, lastName, age
}

ul each &item /each

page = `
<html>
  <head></head>

  <body>
    <h1>${person.name}</h1>
    <ul>${person.getGfName}</ul>
  </body>
  
</html>
`