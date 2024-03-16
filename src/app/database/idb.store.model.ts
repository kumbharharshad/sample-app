import { Document } from "./classes/Document";
import { LoadedStores } from './classes/loaded-store';

const documentInstance = new Document();
const loadedStoresInstance = new LoadedStores();

// Define a generic function to generate columns with a constraint
function generateColumns<T extends Record<string, any>>(instance: T): string {
  return (Object.keys(instance) as (keyof T)[]).join(',');
}

export const DBStores = {
  Document: {
    TableName: 'Document',
    Columns: generateColumns(Document),
  },
  LoadedStores: {
    TableName: 'LoadedStores',
    Columns: generateColumns(loadedStoresInstance),
  },
};
