/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 */
import Config from "../../config"
import type { ApiConfig } from "./api.types"

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import type { UserSnapshotIn } from "../../models/User";
import { getAuth } from "firebase/auth";
import { getDate } from "date-fns";

/**
 * Configuring the instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {

  public auth;
  public database;

  /**
   * Set up our API instance.
   */
  constructor(config : ApiConfig = DEFAULT_API_CONFIG) {
    initializeApp(config);
    this.auth = getAuth();
    this.database = getFirestore();
  }

  /**
   * Gets user by ID.
   */
  async getUser(userId: string): Promise<{ user: UserSnapshotIn | null }> {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return { user: userDoc.data() as UserSnapshotIn };
      } else {
        return { user: null };
      }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Error fetching user: ${e.message}`, e.stack);
      }
      return { user: null };
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
