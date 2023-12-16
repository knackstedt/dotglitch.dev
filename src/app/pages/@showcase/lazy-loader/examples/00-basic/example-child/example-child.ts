
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './example-child.html',
    styleUrls: ['./example-child.scss'],
    imports: [],
    standalone: true
})
export class ChildComponent {

    @Input() ttl = 86400;

}
