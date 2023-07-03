import { ExampleBasicComponent } from 'src/app/pages/@showcase/ctx-menu/examples/00-basic/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./00-basic/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./00-basic/example.html')
        }
    ],
    component: ExampleBasicComponent
}
