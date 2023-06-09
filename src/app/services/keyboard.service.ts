import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type KeyCommand = {
    /**
     * The non-modifier key(s) that must be pressed for the event to fire.
     */
    key: string | string[],

    ctrl?: boolean,
    alt?: boolean,
    shift?: boolean,
    super?: boolean,
    tab?: boolean,

    /**
     * Should the handler interrupt default event handling
     */
    interrupt?: boolean,
}

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {

    private heldKeys: { [key: string]: boolean } = {};
    private keyCommands: {
        ctrl?: boolean,
        alt?: boolean,
        shift?: boolean,
        super?: boolean,
        interrupt?: boolean,
        keys: string[],
        sub: Subject<KeyboardEvent>
    }[] = [];

    constructor() {
        window.addEventListener("keydown", (evt) => this.onKeyDown(evt));
        window.addEventListener("keyup", (evt) => this.onKeyUp(evt));
        window.addEventListener("keypress", (evt) => this.onKeyPress(evt));
    }

    private onKeyDown(evt: KeyboardEvent) {
        // console.log("keydown", evt.key)
        this.heldKeys[evt.key.toLowerCase()] = true;

        // Do a general filter where all of the modifiers must be matched if specified
        // Then check that the actual keys match what was specified
        let commands = this.keyCommands
            .filter(kc =>
                (kc.ctrl == undefined || kc.ctrl === evt.ctrlKey) &&
                (kc.alt == undefined || kc.alt === evt.altKey) &&
                (kc.shift == undefined || kc.shift === evt.shiftKey) &&
                (kc.super == undefined || kc.super === evt.metaKey) &&
                kc.keys.length == kc.keys.filter(k => this.heldKeys[k])?.length
            )

        if (evt.ctrlKey && commands.length > 0 || commands.find(c => c.interrupt)) {
            evt.stopPropagation();
            evt.preventDefault();
        }

        if (evt.key == "Pause")
            debugger;

        commands.forEach(kc => kc.sub.next(evt));

    }

    private onKeyUp(evt: KeyboardEvent) {
        this.heldKeys[evt.key.toLowerCase()] = false;
    }

    private onKeyPress(evt: KeyboardEvent) {
        // this.heldKeys[evt.key] = false;
    }

    /**
     * Use this to subscribe to keyboard events throughout
     * the application. This is a passive listener and will
     * **NOT** interrupt the event chain.
     */
    public onKeyCommand(key: KeyCommand) {
        let item = {
            ...key,
            keys: (Array.isArray(key.key) ? key.key : [key.key]),
            sub: new Subject<KeyboardEvent>()
        }

        this.keyCommands.push(item);
        return item.sub;
    }

    get shiftPressed() {
        return !!this.heldKeys["shift"];
    }
    get ctrlPressed() {
        return !!this.heldKeys["control"];
    }
    get altPressed() {
        return !!this.heldKeys["alt"];
    }
    get superPressed() {
        return !!this.heldKeys["super"];
    }
    get tabPressed() {
        return !!this.heldKeys["tab"];
    }
}
