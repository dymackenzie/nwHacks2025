import firebase from "./firebase"
import BaseConfig from "./config.base"

const Config = { ...BaseConfig, ...firebase }

export default Config
