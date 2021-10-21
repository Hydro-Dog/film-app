export type SearchMatchSessionUserStatus = 'all' | 'host' | 'guest'

export enum MatchSessionSocketEvents {
  ServerMessage = 'server_message',
  MatchSessionChanges = 'match_session_changes',
  RegisterNewListener = 'register_listener',
  // InviteAccepted = 'invite_accepted',
  // InviteDeclined = 'invite_declined',
  LikesMatched = 'likes-matched',
}

export enum MatchSessionChangesEvents {
  Add = 'add',
  ChangeStatus = 'change_status',
}
