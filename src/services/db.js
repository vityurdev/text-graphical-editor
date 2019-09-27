import Dexie from 'dexie';

export const getDBClient = (options) => {
  if (options.reset) {
    Dexie.delete('text-graphic-editor');
  }
  
  const db = new Dexie('text-graphic-editor');

  db.version(1).stores({
    paintingSteps: "++id,command,canvasMatrix"
  });

  return db;
}