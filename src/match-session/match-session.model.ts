export type SearchMatchSessionUserStatus = 'all' | 'host' | 'guest'

export enum MatchSessionSocketEvents {
  MatchSessionChanges = 'match_session_changes',
  LikesMatched = 'likes-matched',
}

export enum MatchSessionChangesEvents {
  Add = 'add',
  ChangeStatus = 'change_status',
}
