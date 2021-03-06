import { Injectable } from '@angular/core';
import Noty from 'noty';

@Injectable()
export class NotifierService {
  private allowed = ['success', 'warning', 'error', 'alert', 'info'];

  constructor() { }

  notify(message: string, type: string, willTimeOut = true) {
    if (! this.allowed.indexOf(type)) {
      // Default to info
      type = 'info';
    }

    new Noty({
      type: type,
      theme: 'sunset',
      text: message,
      timeout: willTimeOut ? 5000 : false,
      closeWith: ['click', 'button'],
      queue: 'global',
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      },
    }).show();
  }

}
