import { ExampleChildTemplateComponent } from 'src/app/pages/@showcase/ctx-menu/examples/07-child-template/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/07-child-template/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/07-child-template/example.html').then(e => e.text())
        },
        {
            label: "example-child.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/07-child-template/example-child/example-child.ts').then(e => e.text())
        },
        {
            label: "example-child.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/07-child-template/example-child/example-child.html').then(e => e.text())
        },
        {
            label: "example-child.scss",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/07-child-template/example-child/example-child.scss').then(e => e.text())
        }

    ],
    component: ExampleChildTemplateComponent
};
