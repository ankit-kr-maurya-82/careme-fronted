import { useLoaderData } from "react-router-dom";
import "./css/Github.css";

const Github = () => {

  const users = useLoaderData();

  return (
    <section className="github">
      <h2 className="github-title">Developers</h2>
      <div className="github-grid">
        {users.map((user) => (
          <div key={user.id} className="github-card">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="github-avatar"
            />
            <div className="github-meta">
              <h3>{user.login}</h3>
              <p>Followers: {user.followers}</p>
              <a
                className="github-link"
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Github;


export const githubInfoLoader = async () => {

  const users = [
    "ankit-kr-maurya-82",
    "bhrantiknagar",
    "hackthejack08-cmyk",
    "anshumaanpandey20-glitch"
  ];

  const responses = await Promise.all(

    users.map(user =>
      fetch(`https://api.github.com/users/${user}`)
    )

  );

  const data = await Promise.all(
    responses.map(res => res.json())
  );

  return data;
};

