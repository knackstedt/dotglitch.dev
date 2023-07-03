import { ExampleStyledComponent } from 'src/app/pages/@showcase/ctx-menu/examples/01-styling/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./01-styling/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./01-styling/example.html')
        },
        {
            label: "example.scss",
            value: require('!!raw-loader!./01-styling/example.scss')
        }
    ],
    component: ExampleStyledComponent
};
