import { ExampleChildTemplateComponent } from 'src/app/pages/@showcase/ctx-menu/examples/07-child-template/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./07-child-template/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./07-child-template/example.html')
        },
        {
            label: "example-child.ts",
            value: require('!!raw-loader!./07-child-template/example-child/example-child.ts')
        },
        {
            label: "example-child.html",
            value: require('!!raw-loader!./07-child-template/example-child/example-child.html')
        },
        {
            label: "example-child.scss",
            value: require('!!raw-loader!./07-child-template/example-child/example-child.scss')
        }

    ],
    component: ExampleChildTemplateComponent
};
