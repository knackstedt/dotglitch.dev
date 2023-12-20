
import { Component, Input, OnInit } from '@angular/core';
import { SymbolComponent } from 'src/app/components/logo/symbol/symbol.component';
import { TextComponent } from 'src/app/components/logo/text/text.component';
import { WidetextComponent } from 'src/app/components/logo/widetext/widetext.component';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    imports: [
        SymbolComponent,
        TextComponent,
        WidetextComponent
    ],
    standalone: true
})
export class LogoComponent implements OnInit {

    @Input() showText = true;

  constructor() { }

  ngOnInit() {
  }

}
