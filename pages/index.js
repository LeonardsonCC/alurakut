import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommon";
import { useState } from "react";
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
  const [favoritePersons, setFavoritePersons] = useState([
    {
      id: 1,
      title: "LeonardsonCC",
      image: "https://github.com/LeonardsonCC.png",
      link: "https://github.com/LeonardsonCC"
    },
    {
      id: 2,
      title: "LeonardsonCC",
      image: "http://github.com/LeonardsonCC.png",
      link: "https://github.com/LeonardsonCC"
    },
    {
      id: 3,
      title: "LeonardsonCC",
      image: "http://github.com/LeonardsonCC.png",
      link: "https://github.com/LeonardsonCC"
    },
    {
      id: 4,
      title: "LeonardsonCC",
      image: "http://github.com/LeonardsonCC.png",
      link: "https://github.com/LeonardsonCC"
    },
  ]);
  const [communities, setCommunities] = useState([
    {
      id: 5,
      title: "Comunidade exemplo",
      image: "http://placehold.it/300x300",
      link: "https://github.com/LeonardsonCC"
    },
    {
      id: 6,
      title: "Comunidade exemplo",
      image: "http://placehold.it/300x300",
      link: "https://github.com/LeonardsonCC"
    },
    {
      id: 7,
      title: "Comunidade exemplo",
      image: "http://placehold.it/300x300",
      link: "https://github.com/LeonardsonCC"
    },
    {
      id: 8,
      title: "Comunidade exemplo",
      image: "http://placehold.it/300x300",
      link: "https://github.com/LeonardsonCC"
    },
  ]);

  const handleCommunityFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    const formData = new FormData(event.target);

    let newCommunities = [...communities];
    newCommunities.push({
      title: formData.get("title"),
      image: formData.get("image"),
      link: formData.get("link"),
    });
    setCommunities(newCommunities);
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
              <div>
                <input
                  placeholder="Qual o link da sua comunidade?"
                  name="link"
                  aria-label="Qual o link da sua comunidade?"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <BoxList list={communities} title={"Comunidades"} />
          <BoxList list={favoritePersons} title={"Pessoas favoritas"} />
        </div>
      </MainGrid>
    </>
  );
}
