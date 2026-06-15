import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { getColors } from "../../lib/utils";

type Theme = ReturnType<typeof getColors>;

export default function GitHubRepoButton({ t }: { t: Theme }) {
  const [stars, setStars] = useState(null);
  const repoUrl = "https://github.com/SimpleCyber/local-player";

  useEffect(() => {
    fetch("https://api.github.com/repos/SimpleCyber/local-player")
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count))
      .catch(() => {});
  }, []);

  const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        borderRadius: 6,
        overflow: "hidden",
        border: `1px solid ${t.border}`,
        fontSize: 12,
        fontWeight: 500,
        fontFamily: "sans-serif",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          backgroundColor: t.bgEl,
          color: t.txt,
          borderRight: `1px solid ${t.border}`,
        }}
      >
        <FaGithub size={13} color={t.txt} />
        Star
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "5px 8px",
          backgroundColor: t.bg,
          color: t.txt3,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <FaStar size={11} color="#e3b341" />
        {stars !== null ? fmt(stars) : "—"}
      </span>
    </a>
  );
}
