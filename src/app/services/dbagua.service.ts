import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dbagua } from '../interfaces/dbagua';

@Injectable({
  providedIn: 'root'
})
export class DbaguaService {

  
    private aguadbCollection: AngularFirestoreCollection<Dbagua>;
  
    constructor(private afs: AngularFirestore) { 
      this.aguadbCollection = this.afs.collection<Dbagua>('Aguadb');
  
    }
  
  
    addDbagua(dbagua: Dbagua){
      return this.aguadbCollection.add(dbagua);
  
  
    }
}
