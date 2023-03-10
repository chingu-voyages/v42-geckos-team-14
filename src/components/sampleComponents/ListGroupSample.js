import ListGroup from "react-bootstrap/ListGroup";

function ListGroupSample(props) {
  return (
    <ListGroup
      id={props.id}
      onDoubleClick={() => props.handleDoubleClick(props.id)}
    >
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
}

export default ListGroupSample;
