import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dbdengue } from '../interfaces/dbdengue';

@Injectable({
  providedIn: 'root'
})
export class DbdengueService {

  private denguedbCollection: AngularFirestoreCollection<Dbdengue>;

  constructor(private afs: AngularFirestore) { 
    this.denguedbCollection = this.afs.collection<Dbdengue>('Denguedb');

  }


  addDbdengue(dbdengue: Dbdengue){
    return this.denguedbCollection.add(dbdengue);


  }
}
