import * as SQLite from "expo-sqlite";
import type { Place } from "../lib/types";

const database = SQLite.openDatabase("places.db");

export const init = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
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
};

export const insertPlace = (place: Place): Promise<object> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchPlaces = (): Promise<object> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places: Place[] = [];
          let place: Place;
          for (place of result.rows._array) {
            places.push(place);
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchPlaceDetails = (id: string): Promise<Place> => {
  return new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};
