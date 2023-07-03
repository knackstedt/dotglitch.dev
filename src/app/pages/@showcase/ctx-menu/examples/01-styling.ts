import { ExampleStyledComponent } from 'src/app/pages/@showcase/ctx-menu/examples/01-styling/example';

export default {
    files: [
        {
            label: "template.ts",
            value: require('!!raw-loader!./01-styling/example.ts')
        },
        {
            label: "template.html",
            value: require('!!raw-loader!./01-styling/example.html')
        },
        {
            label: "template.css",
            value: require('!!raw-loader!./01-styling/example.scss')
        }
    ],
    component: ExampleStyledComponent
};
