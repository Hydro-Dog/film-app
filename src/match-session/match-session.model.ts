export type SearchMatchSessionUserStatus = 'all' | 'host' | 'guest'

export enum MatchSessionSocketEvents {
  MatchSessionChanges = 'match_session_changes',
}

export enum MatchSessionChangesEvents {
  Add = 'add',
  ChangeStatus = 'change_status',
}
