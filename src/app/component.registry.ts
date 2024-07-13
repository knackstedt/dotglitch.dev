import { ComponentRegistration } from '@dotglitch/ngx-common';

export const RegisteredComponents: ComponentRegistration[] = [
    // @ae-component-inject
    { id: 'Landing', label: "home", load: () => import('src/app/pages/general/landing/landing.component'), hidden: true },
    {
        id: 'RegexDiagramGenerator',
        label: "PCRE Diagram Generator",
        //(?=[?&])
        // matcher: /^RegexDiagramGenerator\/?(?:(?<view>[^/?&]+))?(?:\/(?<project>[^/?&]+))?(?:\/(?<goal>[^/?&]+))?(?:\/(?<objective>[^/?&]+))?(?:\/(?<task>[^/?&]+))?/,
        load: () => import('src/app/pages/@showcase/regex-diagram/regex-diagram.component'),
        icon: "mitre"
    },
    { id: 'ContextMenu', label: "Angular Context Menu", load: () => import('src/app/pages/@showcase/ctx-menu/ctx-menu.component'), icon: "toc" },
    { id: 'LazyLoader', label: "Angular Lazy Loader", load: () => import('src/app/pages/@showcase/lazy-loader/lazy-loader.component'), icon: "downloading" },
    { id: 'Tooltip', label: "Angular Tooltip", load: () => import('src/app/pages/@showcase/tooltip/tooltip.component'), icon: "tooltip" },

    // TODO: Replace with new markdown editor once stable.
    { id: 'Markdown', label: "Angular Markdown Editor", load: () => import('src/app/pages/@showcase/markdown-editor/editor.component'), icon: "edit_note" },

    { id: 'NGReactFlow', label: "Angular XYFlow(Reactflow) wrapper", load: () => import('src/app/pages/@showcase/reactflow-demo/reactflow-demo.component'), icon: "https://reactflow.dev/img/favicon.ico" },
    { id: 'NGExcalidraw', label: "Angular Excalidraw wrapper", load: () => import('src/app/pages/@showcase/excalidraw-demo/excalidraw-demo.component'), icon: "https://plus.excalidraw.com/favicon-32x32.png" },

    // Experimental views. Only accessible when running on localhost.
    { id: 'Experiment', load: () => import('src/app/pages/general/experiment/experiment.component'), icon: "experiment", hidden: !window.location.href.includes('localhost') }
]

