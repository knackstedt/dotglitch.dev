import { Component, OnInit } from '@angular/core';
import { ReactFlowComponent } from './reactflow-wrapper';

class test {
    foo = "bar";
    constructor() {
        console.log(this.foo)
    }
}

class test2 extends test {
    override foo = "baz";
    constructor() {
        super();
    }
}

@Component({
    selector: 'app-reactflow',
    templateUrl: './reactflow-demo.component.html',
    styleUrls: ['./reactflow-demo.component.scss'],
    imports: [
        ReactFlowComponent
    ],
    standalone: true
})
export class ReactflowDemoComponent implements OnInit {

    constructor() {
        new test2()
    }

    ngOnInit() {
    }

}
