const currencyConverter = (...args) => {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(...args);
};

const nameConverter = (args) => {
  return Object.values(args.name[0]).slice(0, -1).join("");
};
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export { currencyConverter, nameConverter, fetcher };
