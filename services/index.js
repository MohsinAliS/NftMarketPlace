import axios from "axios";

const createBackendServer = (baseURL) => {
  const opensea = axios.create({
    baseURL,
    headers: { Accept: "application/json" },
    timeout: 60 * 1000,
  });

  const getProfileAssets = (
    address = "0xC9B56Ad4050c1C3B0E434D6382F6B184a9FcEc7D",
    limit = 100,
    offset = 0,
    order_direction = "desc",
    include_orders = "false"
  ) =>
    opensea.get(
      `assets?&owner=${address}&order_direction=${order_direction}&include_orders=${include_orders}&offset=${offset}&limit=${limit}`
      // `collections?&offset=${offset}&limit=${limit}`
    );

  const getNfts = (
    asset_contract_addresses = "0xf92714A5EB344C29805dA8d5058faca54A5Ad894",
    order_direction = "desc",
    include_orders = "false"
  ) =>
    opensea.get(
      `assets?&asset_contract_addresses=${asset_contract_addresses}&order_direction=${order_direction}&include_orders=${include_orders}`
    );
  return { getProfileAssets, getNfts };
};

// const apis = createBackendServer("https://api.opensea.io/api/v1/");
const apis = createBackendServer("https://testnets-api.opensea.io/api/v1/");

export default apis;
