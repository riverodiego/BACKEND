import config from "../../config.js";

import ContainerSQL from "../containers/ContainerSQL.js";

const apiProducts = new ContainerSQL(`${JSON.stringify(config.mariaDB)}`, "productos");

export default apiProducts;
