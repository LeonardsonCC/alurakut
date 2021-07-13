import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

const BoxList = ({list, title}) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({list.length})
      </h2>
      <ul>
        {list.map((item) => (
          <li>
            <a href={item.link} key={item.id} target="_blank">
              <img src={item.image} />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

export default BoxList;
