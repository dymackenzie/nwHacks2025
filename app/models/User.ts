import { Instance, SnapshotIn, SnapshotOut, types, getSnapshot } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CoffeeEntry = types.model({
  date: "",
  coffee: 0
})

/**
 * This represents a user of the app.
 */
export const UserModel = types
  .model("User")
  .props({
    name: "",
    email: "",
    timesToDrinkCoffee: types.array(types.Date),
    coffeeHistory: types.map(CoffeeEntry),
    externalCoffeeHistory: types.map(CoffeeEntry)
  })
  .actions(withSetPropAction)
  .actions((user) => ({
    addTimesToDrinkCoffee(date: Date) {
      return user.timesToDrinkCoffee.push(date);
    },
    removeTimesToDrinkCoffee(date: Date) {
      return user.timesToDrinkCoffee.remove(date);
    },
    addCoffeeHistory(amount: number) {
      const date = new Date().getMonth() + "-" + new Date().getDate() + "-" + new Date().getFullYear();
      if (user.coffeeHistory.has(date)) {
        const entry = user.coffeeHistory.get(date);
        if (entry) {
          return entry.coffee += amount;
        }
      }
      return user.coffeeHistory.put({ date, coffee: amount });
    },
    addExternalCoffeeHistory(amount: number) {
      const date = new Date().getMonth() + "-" + new Date().getDate() + "-" + new Date().getFullYear();
      if (user.externalCoffeeHistory.has(date)) {
        const entry = user.externalCoffeeHistory.get(date);
        if (entry) {
          return entry.coffee += amount;
        }
      }
      return user.externalCoffeeHistory.put({ date, coffee: amount });
    }
  }))
  .views((user) => ({
    get totalCoffee() {
      let total = 0;
      for (const entry of user.coffeeHistory.values()) {
        total += entry.coffee;
      }
      for (const entry of user.externalCoffeeHistory.values()) {
        total += entry.coffee;
      }
      return total;
    },
    get totalCoffeeToday() {
      const date = new Date().getMonth() + "-" + new Date().getDate() + "-" + new Date().getFullYear();
      const entry = user.coffeeHistory.get(date);
      if (entry) {
        return entry.coffee;
      }
      return 0;
    },
    get totalCoffeeExternalToday() {
      const date = new Date().getMonth() + "-" + new Date().getDate() + "-" + new Date().getFullYear();
      const entry = user.externalCoffeeHistory.get(date);
      if (entry) {
        return entry.coffee;
      }
      return 0;
    },
    get moneySpent() {
      return this.totalCoffee * 3;
    },
    get coffeeHistoryArray() {
      let array = new Array<number>();
      for (const entry of user.coffeeHistory.values()) {
        array.push(entry.coffee);
      }
      return array;
    },
  }))

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
