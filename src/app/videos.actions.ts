import { Action, createAction, props } from '@ngrx/store';
import { Video } from './videos.model';

export const add = createAction('[Video] Add Video', props<{ video: Video }>());
export const remove = createAction(
  '[Video] Delete Video',
  props<{ video: Video }>()
);

// ----------------------------------------------------------------
// import { Action } from '@ngrx/store';
// import { Video } from './videos.model';

// export enum VideoActionTypes {
//   Add = '[Video] Add Video',
//   Delete = '[Video] Delete Video',
// }

// export class Add implements Action {
//   readonly type = VideoActionTypes.Add;
//   constructor(public payload: Video) {}
// }

// export class Delete implements Action {
//   readonly type = VideoActionTypes.Delete;
//   constructor(public payload: Video) {}
// }

// export type VideoActionsUnion = Add | Delete;

// ----------------------------------------------------------------
// export type ActionsUnion = typeof actions;

// import { createAction, props, union } from '@ngrx/store';
// import { Video } from './videos.model';

// export const ADD = 'Video Add';
// export const REMOVE = 'Video Remove';

// export const add = createAction('[Video] Add', props<{ video: Video }>());
// export const remove = createAction('[Video] Remove', props<{ video: Video }>());

// const actions = union({
//   add,
//   remove,
// });

// export type ActionsUnion = typeof actions;
