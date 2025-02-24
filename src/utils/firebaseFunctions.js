import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveNewItem = async (data) => {
  try {
    await addDoc(collection(firestore, "foodItems"), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
