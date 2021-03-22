import { Action, createReducer, on } from '@ngrx/store';
import * as VideoActions from './videos.actions';
import { Video } from './videos.model';

export interface VideoState {
  videos: Video[];
}

export const initialVideoState: VideoState = {
  videos: [{ id: '0qanF-91aJo' }, { id: 'SBjQ9tuuTJQ' }],
};

const reducer = createReducer(
  initialVideoState,
  on(VideoActions.add, (state, { video }) => ({
    videos: [...state.videos, video],
  })),
  on(VideoActions.remove, (state, { video }) => {
    console.log(video);
    return {
      videos: state.videos.filter((v) => v.id !== video.id),
    };
  })
);

export function videoReducer(state: VideoState | undefined, action: Action) {
  return reducer(state, action);
}

// ----------------------------------------------------------------
// import { VideoActionsUnion, VideoActionTypes } from './videos.actions';
// import { Video } from './videos.model';

// export interface VideoState {
//   videos: Video[];
// }

// export const initialVideoState: VideoState = {
//   videos: [{ id: '0qanF-91aJo' }, { id: 'SBjQ9tuuTJQ' }],
// };

// export function videoReducer(
//   state = initialVideoState,
//   action: VideoActionsUnion
// ): VideoState {
//   switch (action.type) {
//     case VideoActionTypes.Add:
//       return { videos: [...state.videos, action.payload] };

//     case VideoActionTypes.Delete:
//       return {
//         videos: state.videos.filter((video) => video.id !== action.payload.id),
//       };

//     default:
//       return state;
//   }
// }

// ----------------------------------------------------------------
// import { ActionsUnion, add, remove } from './videos.actions';
// import { Video } from './videos.model';

// const defaultState: Video[] = [{ id: '0qanF-91aJo' }, { id: 'SBjQ9tuuTJQ' }];

// export function videoReducer(state = defaultState, action: ActionsUnion) {
//   switch (action.type) {
//     case add.type: {
//       return [...state, action.video];
//     }

//     case remove.type: {
//       return state.filter((video: Video) => video.id !== action.video.id);
//     }

//     default:
//       return state;
//   }
// }
