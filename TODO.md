const a = (req, res, next) => {
console.log("a: ", req, res);

next();
};

const b = (req, res, next) => {
console.log("b: ", req, res);

next();
};

functions = [a, b, c, d];

const wrapC = (req, res) => {
//do something

c(req, res, () => (req, res, d))
}

const wrapB = (req, res) => {
//do something

b(req, res, () => (req, res, wrapC))
}

const wrapA = (req, res) => {
// do something

a(req, res, () => (req, res, wrapB));
}

wrapA(req, res);





cbs = [
{req, res, fn: a, next: () => b(req, res)},

{req, res, fn: b, next: () => c(req, res)}]

fn(req, res, next)


