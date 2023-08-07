import markup from 'bundle-text:./markup.html';
import * as Mustache from "mustache";

export class HotelVideoPlayer {
    constructor(video_src) {
        this.videoSrc = video_src;
    }

    render() {
        return Mustache.render(markup, { video_src: this.videoSrc });
    }

}