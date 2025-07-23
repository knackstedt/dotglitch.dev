import { Component, Input } from '@angular/core';
import { SymbolComponent } from 'src/app/components/logo/symbol/symbol.component';
import { WidetextComponent } from 'src/app/components/logo/widetext/widetext.component';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    imports: [
        SymbolComponent,
        WidetextComponent
    ],
    standalone: true
})
export class LogoComponent {

    @Input() showText = true;

}
