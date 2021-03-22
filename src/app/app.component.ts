import { Component, Renderer2, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Video } from './videos.model';
import * as VideoAction from './videos.actions';
import { remove, VideoActionTypes } from './videos.actions';
import { VideoState } from './videos.reducer';

interface AppState {
  message: string;
  videos: VideoState;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Riff-Repeater';
  ytId = '0qanF-91aJo' || 'SBjQ9tuuTJQ';

  playerPosition = 0;
  playbackSpeed = 1;
  positionA = -1;
  positionB = -1;

  isLooping = false;
  apiLoaded = false;

  interval: number | undefined;

  @ViewChild('player', { static: false }) playerElement:
    | YouTubePlayer
    | undefined;

  message$: Observable<string>;
  videos$: Observable<VideoState>;

  constructor(private renderer: Renderer2, private store: Store<AppState>) {
    this.message$ = this.store.select('message');
    this.videos$ = this.store.select('videos');
  }

  spanishMessage() {
    this.store.dispatch({ type: 'SPANISH' });
  }

  frenchMessage() {
    this.store.dispatch({ type: 'FRENCH' });
  }

  deleteVideo(video: Video) {
    this.store.dispatch(remove({ video }));
  }

  ngOnInit() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  onClick(event: MouseEvent) {
    console.log('CLICK');
    this.playerPosition =
      this.playerElement?.getCurrentTime() || this.playerPosition;
  }

  onPlayerReady() {
    this.playerElement?.playVideo();

    this.onPlaybackSpeedChange();

    this.interval = window.setInterval(() => {
      const time = this.playerElement?.getCurrentTime() || 0;

      if (this.isLooping) {
        if (time >= this.positionB)
          this.playerElement?.seekTo(this.positionA, true);
      }

      this.playerPosition = time || this.playerPosition;
    }, 25);
  }

  onPlaybackSpeedChange() {
    this.playerElement?.setPlaybackRate(this.playbackSpeed);
  }

  onStateChange(event: YT.OnStateChangeEvent) {
    if (this.positionA < 0) this.positionA = 0;

    if (this.positionB < 0)
      this.positionB = this.playerElement?.getDuration() || 0;
  }

  // onYouTubeIDChange() {
  //   this.playerElement?.videoId =
  // }

  switchLooper() {
    this.isLooping = !this.isLooping;

    if (this.isLooping) {
      this.playerElement?.seekTo(this.positionA, false);
      this.playerElement?.playVideo();
    } else {
      this.playerElement?.pauseVideo();
    }
  }
}
