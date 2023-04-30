import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Wallpaper = {
    credit: string,
    link: string
}

const wallpapers = [
    {
        credit: `Photo by <a target="_blank" href="https://unsplash.com/@albertobobbera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alberto Bobbera</a> on <a target="_blank" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`,
        link: "https://unsplash.com/photos/KNhVlMjkNjs/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY0NDIwMjAy&force=true",
    },
    {
        credit: `Photo by <a target="_blank" href="https://unsplash.com/@heytowner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">JOHN TOWNER</a> on <a target="_blank" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`,
        link: "https://unsplash.com/photos/JgOeRuGD_Y4/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY0NDE1NTUx&force=true"
    }, 
    {
        credit: `Photo by <a target="_blank" href="https://unsplash.com/ja/@trapnation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andre Benz</a> on <a target="_blank" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`,
        link: "https://unsplash.com/photos/JnB8Gio4GZo/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY0NDE3OTg2&force=true"
    }, 
    {
        credit: `Photo by <a target="_blank" href="https://unsplash.com/@lukemichael?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luke Michael</a> on <a target="_blank" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`,
        link: "https://unsplash.com/photos/1cWZgnBhZRs/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY0NDE4MjA4&force=true"
    }, 
    {
        credit: `Photo by <a target="_blank" href="https://unsplash.com/@freestocks?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">freestocks</a> on <a target="_blank" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`,
        link: "https://unsplash.com/photos/xSGCbGYQtO4/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY0NDE4MTc1&force=true"
    }
]

@Injectable({
    providedIn: 'root'
})
export class WallpaperService extends BehaviorSubject<Wallpaper> {

    private index = 0;

    constructor() { 
        super(wallpapers[0]);
    
        setInterval(() => {
            this.index++;

            if (this.index >= wallpapers.length)
                this.index = 0;

            this.next(wallpapers[this.index]);
        }, 30 * 60 * 1000);
    }
}
