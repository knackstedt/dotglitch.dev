import { ExampleActionComponent } from 'src/app/pages/@showcase/ctx-menu/examples/02-actions/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/ctx-menu/02-actions/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/ctx-menu/02-actions/example.html').then(e => e.text())
        }
    ],
    component: ExampleActionComponent
};
