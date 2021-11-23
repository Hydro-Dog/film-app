"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSessionChangesEvents = exports.MatchSessionSocketEvents = void 0;
var MatchSessionSocketEvents;
(function (MatchSessionSocketEvents) {
    MatchSessionSocketEvents["ServerMessage"] = "server_message";
    MatchSessionSocketEvents["MatchSessionChanges"] = "match_session_changes";
    MatchSessionSocketEvents["RegisterNewListener"] = "register_listener";
    MatchSessionSocketEvents["LikesMatched"] = "likes-matched";
})(MatchSessionSocketEvents = exports.MatchSessionSocketEvents || (exports.MatchSessionSocketEvents = {}));
var MatchSessionChangesEvents;
(function (MatchSessionChangesEvents) {
    MatchSessionChangesEvents["Add"] = "add";
    MatchSessionChangesEvents["ChangeStatus"] = "change_status";
    MatchSessionChangesEvents["FilmsMatch"] = "films_match";
})(MatchSessionChangesEvents = exports.MatchSessionChangesEvents || (exports.MatchSessionChangesEvents = {}));
//# sourceMappingURL=match-session.model.js.map