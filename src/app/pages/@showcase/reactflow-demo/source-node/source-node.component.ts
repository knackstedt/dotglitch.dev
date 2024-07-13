import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-source-node',
    templateUrl: './source-node.component.html',
    styleUrls: ['./source-node.component.scss'],
    imports: [
        MatIconModule
    ],
    standalone: true
})
export class SourceNodeComponent  {
    @Input() data


}
