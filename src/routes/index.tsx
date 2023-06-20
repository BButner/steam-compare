import { createSignal } from "solid-js";
import { SteamCompareClient } from "~/lib/api/steamCompareClient";

export default function Home() {
  const api = new SteamCompareClient();

  const [steamId, setSteamId] = createSignal("");

  const test = async () => {
    const result = await api.getPlayerBySteamId(steamId());
    console.log(result);
  };

  return (
    <main class="">
      {"Test Environment Variable: " + import.meta.env.VITE_TEST}
      <br />

      <input
        type="text"
        value={steamId()}
        onInput={(e) => setSteamId(e.currentTarget.value)}
      />
      <button onClick={test}>Test Retrieval</button>
    </main>
  );
}
