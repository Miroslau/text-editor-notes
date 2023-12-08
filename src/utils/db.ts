import { openDB } from "idb";
import { noteType } from "../types/notes-type";

const dbName = "notesDB";
const storeName = "notesStore";

export const openDatabase = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

export const addNote = async (note: noteType, tags: string[]) => {
  if (tags && tags.length > 0) {
    note.tags = [...tags];
  }
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.add(note);
  await tx.done;
};

export const getNotes = async (): Promise<{
  status: string;
  data?: noteType[];
}> => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const data: noteType[] = await store.getAll();
    return { status: "success", data };
  } catch (error) {
    console.error("Error getting notes:", error);
    return { status: "error" };
  }
};

export const deleteNote = async (id: number) => {
  const db = await openDatabase();
  const tx = db.transaction("notesStore", "readwrite");
  const store = tx.objectStore("notesStore");
  await store.delete(id);
  await tx.done;
};

export const getNoteById = async (id: number): Promise<noteType> => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readonly");

  const notesStore = tx.objectStore(storeName);

  const note = await notesStore.get(id);
  await tx.done;

  return note;
};

export const updateNote = async (
  noteId: number,
  updatedNote: Partial<noteType>,
): Promise<void> => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const notesStore = tx.objectStore(storeName);

  const existingNote = await notesStore.get(noteId);

  if (!existingNote) {
    throw new Error(
      `The current note with the id ${noteId} has not been found`,
    );
  }

  const updatedNoteData = { ...existingNote, ...updatedNote };
  await notesStore.put(updatedNoteData);

  await tx.done;
};
