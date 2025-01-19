/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface UserItem {
    name: string
    email: string
    timesToDrinkCoffee: Date[],
    coffeeHistory: Map<string, number>,
    externalCoffeeHistory: Map<string, number>
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  apiKey: any
  authDomain: any
  projectId: any
  storageBucket: any
  messagingSenderId: any
  appId: any
}
