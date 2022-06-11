import { Injectable } from "@nestjs/common";
import { auth } from "firebase-admin";
import { initializeApp } from 'firebase-admin/app';
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const firebaseAdminConfig = require('../../config/firebase-admin.json');
let admin = require('firebase-admin');

@Injectable()
export class FirebaseUtil {
  constructor(
  ) {
    // initializeApp(firebaseAdminConfig);
    admin.initializeApp(firebaseAdminConfig)
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    // return await auth().verifyIdToken(idToken);
    return await admin.auth().verifyIdToken(idToken);
  }
}