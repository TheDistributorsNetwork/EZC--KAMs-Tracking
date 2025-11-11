export async function commitChangesToGitHub(data, user) {
  const repoOwner = "YOUR_GITHUB_USERNAME";
  const repoName = "courtesy-call-tracker-data";
  const filePath = "courtesy_calls.json";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const content = btoa(JSON.stringify(data, null, 2));

  const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    headers: { Authorization: `token ${token}` },
  });

  const existing = await res.json();

  await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Update courtesy calls by ${user}`,
      content,
      sha: existing.sha,
    }),
  });
}
