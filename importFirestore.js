import admin from "firebase-admin";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Khởi tạo Firebase Admin SDK với service account
const serviceAccount = {
  type: "service_account",
  project_id: process.env.VITE_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: process.env.VITE_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.VITE_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.VITE_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.VITE_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.VITE_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.VITE_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Đọc file JSON
const projects = JSON.parse(
  fs.readFileSync(join(__dirname, "projects.json"), "utf8")
);
const certificates = JSON.parse(
  fs.readFileSync(join(__dirname, "certificates.json"), "utf8")
);

async function importCollection(collectionName, data) {
  console.log(`\nStarting import for ${collectionName}...`);

  for (const item of data) {
    try {
      await db.collection(collectionName).add(item);
      console.log(
        `✅ Imported to ${collectionName}:`,
        item.Title || item.Issuer
      );
    } catch (error) {
      console.error(
        `❌ Error importing ${item.Title || item.Issuer}:`,
        error.message
      );
    }
  }

  console.log(`\nCompleted import for ${collectionName}`);
}

async function main() {
  try {
    console.log("🚀 Starting data import...");

    // Import projects
    await importCollection("projects", projects);

    // Import certificates
    await importCollection("certificates", certificates);

    console.log("\n✨ All imports completed successfully!");
  } catch (error) {
    console.error("\n❌ Error during import:", error);
  } finally {
    // Use Node.js process.exit
    if (typeof process !== "undefined") {
      process.exit(0);
    }
  }
}

main();
