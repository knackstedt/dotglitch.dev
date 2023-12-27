import { ExampleCustomTriggersComponent } from 'src/app/pages/@showcase/ctx-menu/examples/06-custom-triggers/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/ctx-menu/06-custom-triggers/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/ctx-menu/06-custom-triggers/example.html').then(e => e.text())
        }
    ],
    component: ExampleCustomTriggersComponent
};
