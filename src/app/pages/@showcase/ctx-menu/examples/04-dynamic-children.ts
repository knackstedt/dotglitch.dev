import { ExampleDynamicChildrenComponent } from 'src/app/pages/@showcase/ctx-menu/examples/04-dynamic-children/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/ctx-menu/04-dynamic-children/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/ctx-menu/04-dynamic-children/example.html').then(e => e.text())
        }
    ],
    component: ExampleDynamicChildrenComponent
};
