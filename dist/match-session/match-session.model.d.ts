export declare type SearchMatchSessionUserStatus = 'all' | 'host' | 'guest';
export declare enum MatchSessionSocketEvents {
    ServerMessage = "server_message",
    MatchSessionChanges = "match_session_changes",
    RegisterNewListener = "register_listener",
    LikesMatched = "likes-matched"
}
export declare enum MatchSessionChangesEvents {
    Add = "add",
    ChangeStatus = "change_status",
    FilmsMatch = "films_match"
}
