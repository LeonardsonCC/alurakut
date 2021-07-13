import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommon";

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: "8px" }} /> 
    </Box>
  )
}

export default function Home() {
  const githubUser = "LeonardsonCC";
  const favoritePersons = [
    "LeonardsonCC",
    "LeonardsonCC",
    "LeonardsonCC",
    "LeonardsonCC",
    "LeonardsonCC",
    "LeonardsonCC",
  ];
  
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: "profileArea"}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{gridArea: "welcomeArea"}}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div style={{gridArea: "profileRelationsArea"}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({favoritePersons.length})</h2>
            <ul>
            {favoritePersons.map((person, index) => (
              <li>
                <a href={`https://github.com/${person}`} key={index} target="_blank">
                  <img src={`https://github.com/${person}.png`} />
                  <span>{person}</span>
                </a>
              </li>
            ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
