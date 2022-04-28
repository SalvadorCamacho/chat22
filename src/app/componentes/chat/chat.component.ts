import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Message } from 'src/app/mensajes';
import { ChatService } from 'src/app/servicios/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @ViewChild('area') foco: any;
  public name: string;
  public mensaje: string;
  public msg: string;
  public room: any;
  public chat: any;

  public fecha: any;

  constructor(private navParams: NavParams,
    private modal: ModalController,
    private chatService: ChatService) { }

  ngOnInit() {
      this.name = this.navParams.get('name');
      this.chat = this.navParams.get('chat');
      this.chatService.getChat(this.chat.id).subscribe(r  => {
        this.room = r;
      });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewChecked(): void {
    this.foco.setFocus();
  }

  cerrarChat(){
     this.modal.dismiss();
  }


  sendMessage(){
    if(this.msg!==''){
      const nombreUsu = JSON.parse(localStorage.getItem('usuario'));
       const m: Message ={
          content: this.msg,
          type: nombreUsu,
          date: new Date()
       };

    this.chatService.enviarABD(m, this.chat.id);
    this.msg = ''; //Limpiar textArea
   }else{
     this.foco.setFocus();
   }
  }

  convertir(d: any){
      this.fecha = d.toDate();
   //   this.dia = this.fecha.getDay();
  //    this.mes = fecha.getMonth();
   //   this.anio = fecha.getYear();
   //   this.hora = fecha.getHours();
   //   this.minuto = fecha.getMinutes();
      return this.fecha.getDay() + '/' + this.fecha.getMonth() + '/' +
      this.fecha.getYear() + ' - ' + this.fecha.getHours()
      + ':' + this.fecha.getMinutes();
   }


}//Fin de clase
