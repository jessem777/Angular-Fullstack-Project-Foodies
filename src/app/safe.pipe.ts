import { Pipe, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
@Injectable()
export class SafePipe {
  constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
