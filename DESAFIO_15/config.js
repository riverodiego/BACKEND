import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 8282,
  mongodb: {
    url: 'mongodb://localhost:27017/ecommerce'
  },
  firebase: {
    objCert: {
        type: "service_account",
        project_id: process.env.F_PROJECT_ID,
        private_key_id: process.env.F_APP_KEY_ID,
        private_key: process.env.F_PRIVATE_KEY,
        client_email: "firebase-adminsdk-e6h0a@ecommerce-74c45.iam.gserviceaccount.com",
        client_id: "107170702572173692591",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e6h0a%40ecommerce-74c45.iam.gserviceaccount.com"
    }
},
  mongo: {
    client: "mongodb",
    url: process.env.MONGOURL,
    
  },
  mariaDB: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      user: "root",
      password: "",
      database: "db_productos",
    },
    useNullAsDefault: true,
  },
  SQLite: {
    client: "better-sqlite3",
    connection: { filename: path.join(process.cwd(), "/DB/ecommerce.db3") },
    useNullAsDefault: true,
  },
  facebookApp: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
  }
};
