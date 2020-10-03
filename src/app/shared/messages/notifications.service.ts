import { verifyHostBindings } from '@angular/compiler';
import { EventEmitter } from "@angular/core";

export class NotificationService {
  notifier = new EventEmitter<Object>();
  closeToast = new EventEmitter<void>();

  notify(message: string, messageTipe:string) {
    let messageObj = {
      message,
      messageTipe
    }
    messageObj.message = message;
    messageObj.messageTipe = messageTipe;
    this.notifier.emit(messageObj);
  }

  close(){
    this.closeToast.emit();
  }
}
