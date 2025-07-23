import { ExampleTooltipComponent } from './01-tooltip/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/tooltip/examples/01-tooltip/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/tooltip/examples/01-tooltip/example.html').then(e => e.text())
        }
    ],
    component: ExampleTooltipComponent
};
