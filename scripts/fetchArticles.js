import dotenv from "dotenv";
import fs from "fs";
import admin from "firebase-admin";

dotenv.config(); // Loads .env.local into process.env

if (!process.env.VITE_FIREBASE_PRIVATE_KEY) {
  throw new Error(
    "❌ VITE_FIREBASE_PRIVATE_KEY is missing. Make sure .env.local is loaded."
  );
}

const privateKey = process.env.VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.VITE_FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const db = admin.firestore();

async function fetchArticles() {
  console.log("🔍 Fetching articles...");
  try {
    const snapshot = await db.collection("news").get();
    const articles = {};

    snapshot.forEach((doc) => {
      articles[doc.id] = {
        id: doc.id,
        ...doc.data(),
      };
    });

    fs.writeFileSync("public/articles.json", JSON.stringify(articles, null, 2));
    console.log("✅ Articles JSON generated!");
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    process.exit(1);
  }
}

fetchArticles();
