import { Injectable } from "@nestjs/common";
import { auth, credential } from "firebase-admin";
import { initializeApp } from 'firebase-admin/app';
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const firebaseAdminConfig = require('../../../config/firebase-admin.json');
@Injectable()
export class FirebaseUtil {

  constructor(
  ) {
    initializeApp({
      credential: credential.cert(firebaseAdminConfig),
    })
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    return await auth().verifyIdToken(idToken);
  }
}