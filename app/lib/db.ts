export const getDB = (): Promise<IDBDatabase> =>
  new Promise((res, rej) => {
    const req = indexedDB.open("MelodiaDB", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("mediaFiles");
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });

export const saveMediaFile = async (id: string, file: File) => {
  const db = await getDB();
  db.transaction("mediaFiles", "readwrite").objectStore("mediaFiles").put(file, id);
};

export const getMediaFile = async (id: string): Promise<File | null> =>
  new Promise(async (res) => {
    try {
      const db = await getDB();
      const req = db.transaction("mediaFiles", "readonly").objectStore("mediaFiles").get(id);
      req.onsuccess = () => res(req.result || null);
      req.onerror = () => res(null);
    } catch {
      res(null);
    }
  });

export const deleteMediaFile = async (id: string) => {
  const db = await getDB();
  db.transaction("mediaFiles", "readwrite").objectStore("mediaFiles").delete(id);
};
