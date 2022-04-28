import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../mensajes';
import firebase from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) { }
   //Obtener todas las colecciones
   getChatRooms(){
      return this.db.collection('chatRooms').valueChanges({idField: 'id'});
   }


  //Obtener un registro de la base de datos
   getChat(id: string){
      return this.db.collection('chatRooms').doc(id).valueChanges();
   }


   enviarABD(m: Message, id: string){
     this.db.collection('chatRooms').doc(id).update(
       {
        // eslint-disable-next-line @typescript-eslint/naming-convention
         Messages: firebase.firestore.FieldValue.arrayUnion(m),
       });
   }
}
