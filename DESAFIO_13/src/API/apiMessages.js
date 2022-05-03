import config from "../../config.js";
import ContainerFirebase from "../containers/containerFirebase.js";

const apiMessages = new ContainerFirebase(`${JSON.stringify(config.firebase.objCert)}`,"mensajes");

export default apiMessages;
