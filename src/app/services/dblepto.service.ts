import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dblepto } from '../interfaces/dblepto';

@Injectable({
  providedIn: 'root'
})
export class DbleptoService {

  
private leptodbCollection : AngularFirestoreCollection <Dblepto>;

constructor(private afs: AngularFirestore) {

  this.leptodbCollection = this.afs.collection<Dblepto>('Leptodb');
 }
 addDblepto(dblepto: Dblepto){
  return this.leptodbCollection.add(dblepto);


}
}
