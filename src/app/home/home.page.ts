import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatComponent } from '../componentes/chat/chat.component';
import { AuthService } from '../servicios/auth.service';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public chats: any =[]; //Arreglo en blanco
  public mensajes: any=[]; //Arrego para los mensajes
  //public chats: AngularFireList<any>; //Para los datos de registro
  public bd: Observable<any[]>; //Recibirá las colecciones o bd

  constructor(private s: AuthService,
    private modal: ModalController,
    public chatService: ChatService,
    public asc: ActionSheetController) {}

  salir(){
     this.s.logout();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
  this.chatService.getChatRooms().subscribe( chatsBD  => {
     this.chats = chatsBD;
  });
   //  this.chats = this.afDb.list('ChatRooms');
   //  this.bd = this.chats.valueChanges(); //Regleja en tiempo real cambios
  }

  openChat(chat: any){
    this.modal.create({
      component: ChatComponent,
      componentProps: {
         chat
      }
    }).then( (m)  => m.present());
  }

  async presentActionSheet(){
    const actionSheet = await this.asc.create(
     {
       header: 'Opciones',
       cssClass: 'fondo',
       buttons: [{
         text: 'Cerrar sesión',
         role: 'destructive',
         icon: 'log-out',
         handler:()  => {
           this.salir();
         }
       },{
         text: 'Cancelar',
         role: 'cancel',
         icon: 'close'
       }
      ]
     });
     await actionSheet.present();
  }


}
