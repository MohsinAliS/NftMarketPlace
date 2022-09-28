import axios from "axios";
import { marketPlace } from "../contract-abi/addresses";
const createBackendServer = (baseURL) => {
  const opensea = axios.create({
    baseURL,
    headers: { Accept: "application/json" },
    timeout: 60 * 1000,
  });

  const getProfileAssets = (
    account,
    // asset_contract_addresses = "0x3fdc19e2ec0bfbc80ed227716faef783ef19000a",
    limit = 100,
    offset = 0,
    order_direction = "desc",
    include_orders = "false"
  ) => {
    console.log("metamask account", account);
    return opensea.get(
      `assets?&owner=${account}&order_direction=${order_direction}&include_orders=${include_orders}&offset=${offset}&limit=${limit}`
      // `collections?&offset=${offset}&limit=${limit}`
    );
  };

  // const getProfileAssets = (
  //   account,
  //   asset_contract_addresses = "0x3fdc19e2ec0bfbc80ed227716faef783ef19000a"
  // ) => {
  //   console.log("metamask account", account);
  //   return opensea.get(
  //     `assets?&asset_contract_addresses=${asset_contract_addresses}&owner=${account}`
  //     // `collections?&offset=${offset}&limit=${limit}`
  //   );
  // };

  const getNfts = (
    asset_contract_addresses = "0x3fdc19e2ec0bfbc80ed227716faef783ef19000a",
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
