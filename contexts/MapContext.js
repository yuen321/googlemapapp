import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useState } from 'react';

export const DATABASE_NAME = "mapDatabase.db";
const DATABASE_VERSION = 1;

const TABLE_NAME_MAP_HISTORY = "map"
const COLUMN_NAME_ID = "id"
const COLUMN_NAME_NAME = "name"
const COLUMN_NAME_DESC = "description"
const COLUMN_NAME_LATITUDE = "latitude"
const COLUMN_NAME_LONGITUDE = "longitude"
const COLUMN_NAME_LATITUDE_DELTA = "latitudeDelta"
const COLUMN_NAME_LONGITUDE_DELTA = "longitudeDelta"
const COLUMN_NAME_CREATED_TIMESTAMP = "createdTimestamp"

export async function migrateDbIfNeeded(db) {
  const result = await db.getFirstAsync('PRAGMA user_version');
  let currentDbVersion = result.user_version
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME_MAP_HISTORY} (
    ${COLUMN_NAME_ID} INTEGER PRIMARY KEY AUTOINCREMENT, 
    ${COLUMN_NAME_NAME} TEXT NOT NULL,
    ${COLUMN_NAME_DESC} TEXT NOT NULL,
    ${COLUMN_NAME_LATITUDE} REAL NOT NULL, 
    ${COLUMN_NAME_LONGITUDE} REAL NOT NULL, 
    ${COLUMN_NAME_CREATED_TIMESTAMP} DATETIME DEFAULT (CURRENT_TIMESTAMP),
    UNIQUE(${COLUMN_NAME_LATITUDE}, ${COLUMN_NAME_LONGITUDE}) );
    `);
    currentDbVersion = 1;
  }
  
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

  export const MapContext = createContext()

  export function MapProvider({children}){
    const db = useSQLiteContext()
    const [map, setMap] = useState([])

    async function upsertMapHistory(data) {
      try{
        let {name, description, latitude, longitude} = data
        if(!name.trim().length || !description.trim().length || latitude == null || longitude == null){
          throw new Error("All map fields are required")
        }
        await db.runAsync(
          `INSERT INTO ${TABLE_NAME_MAP_HISTORY} (${COLUMN_NAME_NAME}, ${COLUMN_NAME_DESC}, ${COLUMN_NAME_LATITUDE}, ${COLUMN_NAME_LONGITUDE}) 
          VALUES (?, ?, ?, ?)
          ON CONFLICT( ${COLUMN_NAME_LATITUDE}, ${COLUMN_NAME_LONGITUDE} ) DO UPDATE
          SET ${COLUMN_NAME_CREATED_TIMESTAMP} = CURRENT_TIMESTAMP
          `, 
          [name, description, latitude, longitude]
        )
      }catch(error){
        console.error(error.message)
        throw Error(error.message)
      }
    }


    const fetchMapHistory = async(numOfRecord = 0) => {
      try{
        let query = `SELECT * FROM ${TABLE_NAME_MAP_HISTORY} ORDER BY ${COLUMN_NAME_CREATED_TIMESTAMP} DESC `
        if(numOfRecord > 0){
          query += ` LIMIT ${numOfRecord} `
        }
        const results = await db.getAllAsync(query)  
        setMap(results)
      }catch(error){
          console.error("error", error.message)
      }
    }

    const fetchMapHistoryById = async(id) => {
      try{
          const results = await db.getAllAsync(`SELECT * FROM ${TABLE_NAME_MAP_HISTORY} WHERE ${COLUMN_NAME_ID}= ? LIMIT 1`, id)
          setMap(results)
      }catch(error){
          console.error("error", error.message)
      }
    }

    async function deleteMapHistory(id) {
      try{
          await db.runAsync(`DELETE FROM ${TABLE_NAME_MAP_HISTORY} WHERE ${COLUMN_NAME_ID} = ?`, id)
          fetchMapHistory()
      }catch(error){
          console.error(error.message)
      }
  }

    return <MapContext.Provider
    value={{map,fetchMapHistory, fetchMapHistoryById, upsertMapHistory, deleteMapHistory}}
    >
    {children}
    </MapContext.Provider>

  }