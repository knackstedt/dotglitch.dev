import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-basic-node',
    templateUrl: './basic-node.component.html',
    styleUrls: ['./basic-node.component.scss'],
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    standalone: true
})
export class BasicNodeComponent {

    @Input() data

    @Output() removeNode = new EventEmitter();
}
