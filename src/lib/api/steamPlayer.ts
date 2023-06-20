import { SteamGame } from "./steamGame";

export interface SteamPlayerRaw {
  steamId: string;
  personaName: string;
  profileUrl: string;
  avatar: string;
  avatarMedium: string;
  avatarFull: string;
  personaState: PersonaState;
  games?: SteamGame[];
}

export class SteamPlayer implements SteamPlayerRaw {
  public steamId: string;
  public personaName: string;
  public profileUrl: string;
  public avatar: string;
  public avatarMedium: string;
  public avatarFull: string;
  public personaState: PersonaState;
  public games?: SteamGame[];

  public constructor(player: SteamPlayerRaw) {
    this.steamId = player.steamId;
    this.personaName = player.personaName;
    this.profileUrl = player.profileUrl;
    this.avatar = player.avatar;
    this.avatarMedium = player.avatarMedium;
    this.avatarFull = player.avatarFull;
    this.personaState = player.personaState;
    this.games = player.games;
  }

  // Parse the persona state from enum to a string
  public getPersonaState(): string {
    switch (this.personaState) {
      case PersonaState.Offline:
        return "Offline";
      case PersonaState.Online:
        return "Online";
      case PersonaState.Busy:
        return "Busy";
      case PersonaState.Away:
        return "Away";
      case PersonaState.Snooze:
        return "Snooze";
      case PersonaState.LookingToTrade:
        return "Looking to Trade";
      case PersonaState.LookingToPlay:
        return "Looking to Play";
      default:
        return "Unknown";
    }
  }
}

export enum PersonaState {
  Offline = 0,
  Online = 1,
  Busy = 2,
  Away = 3,
  Snooze = 4,
  LookingToTrade = 5,
  LookingToPlay = 6,
}
