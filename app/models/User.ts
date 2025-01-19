import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * This represents a user of the app.
 */
export const UserModel = types
  .model("User")
  .props({
    guid: types.identifier,
    name: "",
    email: "",
    timesToDrinkCoffee: types.array(types.Date),
    coffeeHistory: types.array(types.integer),
    externalCoffeeHistory: types.array(types.integer)
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
      return user.coffeeHistory.push(amount);
    }
  }))

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
