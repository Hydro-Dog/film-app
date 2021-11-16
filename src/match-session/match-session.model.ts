export type SearchMatchSessionUserStatus = 'all' | 'host' | 'guest'

export enum MatchSessionSocketEvents {
  ServerMessage = 'server_message',
  MatchSessionChanges = 'match_session_changes',
  RegisterNewListener = 'register_listener',
  LikesMatched = 'likes-matched',
}

export enum MatchSessionChangesEvents {
  Add = 'add',
  ChangeStatus = 'change_status',
  FilmsMatch = 'films_match',
}
