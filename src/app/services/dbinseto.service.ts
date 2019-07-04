import { Injectable } from '@angular/core';
import { Dbinseto } from '../interfaces/dbinseto';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbinsetoService {

 
private insetodbCollection : AngularFirestoreCollection <Dbinseto>;

constructor(private afs: AngularFirestore) {

  this.insetodbCollection = this.afs.collection<Dbinseto>('Insetodb');
 }
 addDbinseto(dbinseto: Dbinseto){
  return this.insetodbCollection.add(dbinseto);


}
}
