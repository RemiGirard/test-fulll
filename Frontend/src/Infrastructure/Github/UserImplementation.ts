import type UserInterface from "../../Domain/UseCase/UserInterface.ts";
import type { User } from "../../Domain/Entity/User.ts";
import type { Query } from "../../Domain/Entity/Query.ts";

const DEFAULT_USERS: User[] = [
  { id: "547662", login: "lfalorni", avatarUrl: "https://github.com/lfalorni.png" },
  { id: "9255967", login: "utarwyn", avatarUrl: "https://github.com/utarwyn.png" },
  { id: "54712", login: "shouze", avatarUrl: "https://github.com/shouze.png" },
  { id: "1241253", login: "vibou", avatarUrl: "https://github.com/vibou.png" },
  { id: "14963069", login: "fberthereau", avatarUrl: "https://github.com/fberthereau.png" },
  { id: "3610089", login: "hadeli", avatarUrl: "https://github.com/hadeli.png" },
  { id: "42266363", login: "Maxime-Pochet", avatarUrl: "https://github.com/Maxime-Pochet.png" },
  { id: "31826065", login: "Nsb83", avatarUrl: "https://github.com/Nsb83.png" },
  { id: "3168098", login: "RemiGirard", avatarUrl: "https://github.com/RemiGirard.png" },
];

export class UserImplementation implements UserInterface {
  getUserList = async (query: Query): Promise<{ status: string, result: User[] }> => {
    const text = (query?.text ?? "").trim();

    if (!text) return {status: "ok", result: DEFAULT_USERS};

    const url = `https://api.github.com/search/users?q=${encodeURIComponent(text)}&per_page=10`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 403) {
          console.error("GitHub API rate limit exceeded");
          return {status: "GitHub API rate limit exceeded", result: []};
        }
        console.error("GitHub API error", res.status, await res.text());
        return {status: "GitHub API error", result: []};
      }

      const data:{ items: { id: number; login: string; avatar_url: string }[] } = await res.json();

      if(!data.items) {
        console.error("GitHub API error", res.status, await res.text());
        return {status: "GitHub API error", result: []};
      }

      return {
        status: "ok",
        result: data.items.map((u) => ({
          id: String(u.id),
          login: u.login,
          avatarUrl: u.avatar_url,
        }))
      };
    } catch (e) {
      console.error("Failed to fetch GitHub users", e);
      return {status: "GitHub API error", result: []};
    }
  };
}
