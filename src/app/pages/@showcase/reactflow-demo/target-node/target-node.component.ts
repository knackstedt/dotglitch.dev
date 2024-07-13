import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-target-node',
    templateUrl: './target-node.component.html',
    styleUrls: ['./target-node.component.scss'],
    imports: [
        MatIconModule
    ],
    standalone: true
})
export class TargetNodeComponent {

    @Input() data


}
