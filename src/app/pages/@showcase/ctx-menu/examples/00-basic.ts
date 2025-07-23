import { ExampleBasicComponent } from 'src/app/pages/@showcase/ctx-menu/examples/00-basic/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/00-basic/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/00-basic/example.html').then(e => e.text())
        }
    ],
    component: ExampleBasicComponent
}
