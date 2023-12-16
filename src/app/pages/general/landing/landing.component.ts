
import { Component } from '@angular/core';
import { CubeGraphicComponent } from 'src/app/components/cube-graphic/cube-graphic.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    imports: [
    CubeGraphicComponent
],
    standalone: true
})
export class LandingComponent {

    readonly projects = [{
        name: "Angular StackEdit",
        description: "A Makdown Writing application and Web Component that is fully loaded with Batteries",
        startDate: "2023-07",
        endDate: "Present",
        url: "https://md.dotglitch.dev",
        highlights: [
            "Rewrote the entire app in Angular",
            "Created custom Tokenizer to provide best-in-class markdown highlighting",
            "Packaged as .exe, .dmg, .appimage and deployed as public website",
            "Using modern technologies such as Angular, Markdown-It and TypeScript"
        ]
    },
    {
        name: "Angular Tools (ngx-common)",
        description: "A set of useful Angular utilities, used across various projects",
        startDate: "2023-07",
        endDate: "Present",
        url: "https://github.com/knackstedt/dotglitch-ngx",
        highlights: [
            "Custom Routerless Lazy-Loading with dynamic input and output binding",
            "App menu directive (supports Components/Templates, lazy loading)",
            "Custom tooltip directive that supports components and templates",
            "Monaco-Editor wrapper Component",
            "Filemanager Component",
            "Builtin standard services for standard actions such as data retrieval and dialog management"
        ]
    },
    {
        name: "Self-Hosted Kubernetes (K3s) cluster",
        description: "A kubernetes cluster running various systems for personal use",
        startDate: "2022-06",
        endDate: "Present",
        highlights: [
            "Federate traffic through Traefik ingress",
            "Control deployments via GoCD",
            "Maintain private Docker Container Registry (Harbor)",
            "Securely control pod permissions via role bindings and security contexts",
            "Routinely patch systems with zero downtime"
        ]
    },
    {
        name: "NodeJS Authentication Microservice (Oauth2.0)",
        description: "A microservice that runs on k8s which serves the primary purpose of federating authorization and authentication",
        startDate: "2021-04",
        endDate: "Present",
        highlights: [
            "Express routes securely guarded via middleware",
            "Compliant OdataV4 data endpoints for ingress/egress",
            "Sql Server model-less integration",
            "Redis and Azure endpoint integrations",
            "Transactional logging and monitoring with Dynatrace",
            "Stateless & scalable architecture enabling for elastic horizontal scaling"
        ]
    }];

    constructor() { }
}
