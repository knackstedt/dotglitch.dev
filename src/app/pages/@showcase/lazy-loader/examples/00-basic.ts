import { ExampleBasicComponent } from 'src/app/pages/@showcase/lazy-loader/examples/00-basic/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./00-basic/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./00-basic/example.html')
        },
        {
            label: "example-child.ts",
            value: require('!!raw-loader!./00-basic/example-child/example-child.ts')
        },
        {
            label: "example-child.html",
            value: require('!!raw-loader!./00-basic/example-child/example-child.html')
        },
        {
            label: "example-child.scss",
            value: require('!!raw-loader!./00-basic/example-child/example-child.scss')
        }
    ],
    component: ExampleBasicComponent
}
