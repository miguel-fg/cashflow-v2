import PouchDB from "pouchdb-react-native";
import PouchDBFind from "pouchdb-find";
import AsyncStorage from "@react-native-async-storage/async-storage";

PouchDB.plugin(PouchDBFind);

PouchDB.plugin(require("pouchdb-adapter-asyncstorage").default);

// DB init
const db = new PouchDB("cashflow", { adapter: "asyncstorage" });

export default db;
