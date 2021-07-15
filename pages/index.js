import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommon";
import { useState, useEffect } from "react";
import BoxList from "../src/components/BoxList";

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
  // 0 - Pegar o array de dados do github
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
  }, []);

  const handleCommunityFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);

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
      const newCommunities = [...communities, community];
      setCommunities(newCommunities);
    });
  };

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
            <h2 className="subTitle">O que você deseja fazer?</h2>
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
              <button>Criar comunidade</button>
            </form>
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
