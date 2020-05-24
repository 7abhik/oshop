import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { query } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }
  getAll(){
    return this.db.list('/categories',query=>(query.orderByChild('name'))).snapshotChanges();
  }
}
