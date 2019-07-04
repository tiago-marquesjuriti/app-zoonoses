import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dblesh } from '../interfaces/dblesh';

@Injectable({
  providedIn: 'root'
})
export class DbleshService {

  private leshdbCollection : AngularFirestoreCollection <Dblesh>;

  constructor(private afs: AngularFirestore) {

    this.leshdbCollection = this.afs.collection<Dblesh>('Leshdb');
   }
   addDblesh(dblesh: Dblesh){
    return this.leshdbCollection.add(dblesh);


  }
}
