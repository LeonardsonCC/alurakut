import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommon";
import { useState, useEffect } from "react";
import BoxList from "../src/components/BoxList";
import Posts from "../src/components/Posts";

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "LeonardsonCC";
  const [favoritePersons, setFavoritePersons] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(function () {
    fetch("https://api.github.com/users/LeonardsonCC/following")
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        setFavoritePersons(
          data
            .map((favoritePerson) => {
              return {
                id: favoritePerson.id,
                title: favoritePerson.login,
                image: favoritePerson.avatar_url,
                link: favoritePerson.url,
              };
            })
            .reverse()
        );
      });
    fetch("https://api.github.com/users/LeonardsonCC/followers")
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        setFollowers(
          data
            .map((follower) => {
              return {
                id: follower.id,
                title: follower.login,
                image: follower.avatar_url,
                link: follower.url,
              };
            })
            .reverse()
        );
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "aee86b6a7e8a8627a2cbea8dd303a4",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id 
          title
          image
          creatorslug
        }
      }`,
      }),
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then(({ data }) => {
        const newCommunities = data.allCommunities;
        setCommunities(newCommunities);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "aee86b6a7e8a8627a2cbea8dd303a4",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allPosts {
          id 
          text
          creatorslug,
          createdAt
        }
      }`,
      }),
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then(({ data }) => {
        const newPosts = data.allPosts;
        setPosts(newPosts);
      });
  }, []);

  const handleCommunityFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    let newCommunities = [...communities];
    const community = {
      title: formData.get("title"),
      image: formData.get("image"),
      creatorslug: githubUser,
    };
    newCommunities.push(community);

    fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(community),
    }).then(async (response) => {
      const { newRegister } = await response.json();
      const community = newRegister;
      const newCommunities = [community, ...communities];
      setCommunities(newCommunities);
    });
  };

  const handlePostFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    let newPosts = [...posts];
    const post = {
      text: formData.get("text"),
      creatorslug: githubUser,
    };
    newPosts.push(post);

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(async (response) => {
      const { newRegister } = await response.json();
      const post = newRegister;
      const newPosts = [post, ...posts];
      setPosts(newPosts);
    });

  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">Criar comunidade</h2>
            <form onSubmit={handleCommunityFormSubmit}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar</button>
            </form>
          </Box>
          <Box>
            <h2 className="subTitle">Nova postagem</h2>
            <form onSubmit={handlePostFormSubmit}>
              <div>
                <textarea
                  placeholder="Texto da sua postagem"
                  name="text"
                  aria-label="Texto da sua postagem"
                  rows={3}
                ></textarea>
              </div>
              <button>Criar</button>
            </form>
          </Box>
          <Box>
            <h2 className="subTitle">Postagens</h2>
            <Posts list={posts} />
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <BoxList
            list={communities}
            title={"Comunidades"}
            startPath="communities"
          />
          <BoxList list={followers} title={"Seguidores"} />
          <BoxList list={favoritePersons} title={"Seguindo"} />
        </div>
      </MainGrid>
    </>
  );
}
