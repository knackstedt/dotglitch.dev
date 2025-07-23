import { ExampleChildrenComponent } from 'src/app/pages/@showcase/ctx-menu/examples/03-children/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/03-children/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/03-children/example.html').then(e => e.text())
        }
    ],
    component: ExampleChildrenComponent
};
