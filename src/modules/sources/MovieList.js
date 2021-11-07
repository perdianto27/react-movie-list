import "semantic-ui-css/semantic.min.css";
import React from "react";
import axios from "axios";
import {
  Card,
  Icon,
  Image,
  Segment,
  Dimmer,
  Loader,
  Button,
  Modal,
  Rating
} from "semantic-ui-react";

const key = "k_u5lvkfdc";
const source = "https://imdb-api.com/en/API/Top250Movies/";
const dariSemantic = "https://react.semantic-ui.com";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadng: true,
      error: null,
      open: false,
      setOpen: false
    };
  }
  componentDidMount() {
    axios.get(source + key).then((result) => {
      console.log(result.data);
      this.setState({
        data: result.data.items,
        loading: false
      });
      this.detailClick = this.detailClick.bind(this);
      this.closeClick = this.closeClick.bind(this);
    });
  }

  detailClick = () => {
    console.log("detailClick");
    this.setState({ setOpen: true });
  }

  closeClick = () => {
    console.log("closeClick");
    this.setState({ setOpen: false });
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      );
    } else if (error) {
      return <Segment>{error}</Segment>;
    }
    return (
      <Card.Group>
        {data.map((source) => {
          return (
            <Card key={source.id}>
              <Card.Content>
                <Image
                  src={
                    source.image
                      ? source.image
                      : `${dariSemantic}/images/avatar/large/matthew.png`
                  }
                />

                <Card.Description>{source.fullTitle}</Card.Description>
                <Rating
                  icon="star"
                  defaultRating={source.imDbRating}
                  maxRating={10}
                />

                <Modal
                  onClose={this.setState.setOpen}
                  onOpen={this.setState.setOpen}
                  open={this.setState.open}
                  trigger={
                    <Button
                      onClick={() => this.detailClick}
                      size="small"
                      color="green"
                    >
                      <Icon name="zoom-in" />
                      Detail
                    </Button>
                  }
                >
                  <Modal.Header>{source.title}</Modal.Header>
                  <Modal.Content image>
                    <Image
                      size="medium"
                      src={
                        source.image
                          ? source.image
                          : `${dariSemantic}/images/avatar/large/matthew.png`
                      }
                      wrapped
                    />

                    <Modal.Description>
                      <p>{source.fullTitle}</p>
                      <p>Year : {source.year}</p>
                      <p>Crew : {source.crew}</p>
                      <p>
                        IMDB : {source.imDbRating} from {source.imDbRatingCount}{" "}
                        users
                      </p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                  
                  </Modal.Actions>
                </Modal>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}
export default MovieList;
