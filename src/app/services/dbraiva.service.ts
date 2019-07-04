import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dbraiva } from '../interfaces/dbraiva';

@Injectable({
  providedIn: 'root'
})
export class DbraivaService {

private raivadbCollection : AngularFirestoreCollection <Dbraiva>;

  constructor(private afs: AngularFirestore) {

    this.raivadbCollection = this.afs.collection<Dbraiva>('Raivadb');
   }
   addDbraiva(dbraiva: Dbraiva){
    return this.raivadbCollection.add(dbraiva);


  }
}
