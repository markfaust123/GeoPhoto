import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export const init = (): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    const result = database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        )`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
    resolve(result);
  });
  return promise;
};
