import { Injectable } from "@nestjs/common";
import { auth, credential } from "firebase-admin";
import { initializeApp } from 'firebase-admin/app';
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const firebaseAdminConfig = require('../../../config/firebase-admin.json');
@Injectable()
export class FirebaseUtil {

  constructor(
  ) {
    let FIREBASE_PROJECT_ID = process.env.SURVEY_FIREBASE_PROJECT_ID
    let FIREBASE_CLIENT_EMAIL = process.env.SURVEY_FIREBASE_CLIENT_EMAIL
    let FIREBASE_PRIVATE_KEY = process.env.SURVEY_FIREBASE_PRIVATE_KEY

    initializeApp({
      credential: credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
    })
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    return await auth().verifyIdToken(idToken);
  }
}