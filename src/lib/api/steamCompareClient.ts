import { SteamPlayer, SteamPlayerRaw } from "./steamPlayer";

export class SteamCompareClient {
  apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL ?? "";
    console.log(this.apiUrl);
  }

  public async getPlayerBySteamId(steamId: string): Promise<SteamPlayer> {
    const response = await fetch(`${this.apiUrl}/user/${steamId}`);
    const json = (await response.json()) as SteamPlayerRaw;

    return new SteamPlayer(json);
  }
}
