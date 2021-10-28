export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=fals`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
function index({ data }) {
  const coin = data.data;
  console.log(coin);
  return (
    <div>
      <h1>test</h1>
    </div>
  );
}

export default index;
