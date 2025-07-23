import { ExampleBasicComponent } from 'src/app/pages/@showcase/lazy-loader/examples/00-basic/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/lazy-loader/examples/00-basic/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/lazy-loader/examples/00-basic/example.html').then(e => e.text())
        },
        {
            label: "example-child.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/lazy-loader/examples/00-basic/example-child/example-child.ts').then(e => e.text())
        },
        {
            label: "example-child.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/lazy-loader/examples/00-basic/example-child/example-child.html').then(e => e.text())
        },
        {
            label: "example-child.scss",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/lazy-loader/examples/00-basic/example-child/example-child.scss').then(e => e.text())
        }
    ],
    component: ExampleBasicComponent
}
