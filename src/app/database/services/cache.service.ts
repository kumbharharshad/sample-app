import { Injectable } from '@angular/core';
import { DexieCrudService } from './dexieCrud.service';
import { IDocument } from '../interfaces/IDocument';
import { LoadedStores } from '../classes/loaded-store';
import { AppDatabase } from '../idb-context';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  Document!: DexieCrudService<IDocument, string>;
  LoadedStores!: DexieCrudService<LoadedStores, number>;

  constructor(appDatabase: AppDatabase) {
    this.Document = new DexieCrudService<IDocument, string>(appDatabase.Document);
    this.LoadedStores = new DexieCrudService<LoadedStores, number>(
      appDatabase.LoadedStores
    );
  }
}
