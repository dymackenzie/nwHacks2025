/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 */
import Config from "../../config"
import type { ApiConfig } from "./api.types"

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import type { UserSnapshotIn } from "../../models/User";
import { getAuth } from "firebase/auth";

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

  /**
   * Adds user to database.
   */
  async addUser(guid: any, name: any, email: any, timesToDrinkCoffee: [], coffeeHistory: {}, externalCoffeeHistory: {}): Promise<{ kind: "ok" } | { kind: "bad-data"}> {
    try {
      const db = getFirestore();
      const userRef = doc(api.database, "users", guid);
      await setDoc(userRef, {
        guid: guid,
        name: name,
        email: email,
        timesToDrinkCoffee: timesToDrinkCoffee,
        coffeeHistory: coffeeHistory,
        externalCoffeeHistory: externalCoffeeHistory,
      });
      return { kind: "ok" };
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Error adding user: ${e.message}`, e.stack);
      }
      return { kind: "bad-data" };
    }
  }

  /**
   * Updates times to drink coffee for a user.
   */
  async addTimesToDrinkCoffee(userId: string, date: Date): Promise<{ kind: "ok" } | { kind: "bad-data" }> {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        timesToDrinkCoffee: arrayUnion(date)
      });
      return { kind: "ok" };
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Error updating times to drink coffee: ${e.message}`, e.stack);
      }
      return { kind: "bad-data" };
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
