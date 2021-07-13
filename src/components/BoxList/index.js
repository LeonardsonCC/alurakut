import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

const BoxList = ({ list, title }) => {
  const isGreaterThanMax = list.length > 6;
  const renderList = isGreaterThanMax ? list.slice(0, 6) : [...list];

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({list.length})
      </h2>
      <ul>
        {renderList.map((item) => (
          <li>
            <a href={item.link} key={item.id} target="_blank">
              <img src={item.image} />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
      {isGreaterThanMax ? (<a className="boxLink" href="#">Ver todos</a>) : null}
    </ProfileRelationsBoxWrapper>
  );
};

export default BoxList;
