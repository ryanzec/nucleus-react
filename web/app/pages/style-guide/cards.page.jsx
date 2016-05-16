import React from 'react';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

import Button from '../../../../assets/components/button.component.jsx';
import Card from '../../../../assets/components/card.component.jsx';
import CardBlock from '../../../../assets/components/card-block.component.jsx';
import CardColumns from '../../../../assets/components/card-columns.component.jsx';
import CardDeck from '../../../../assets/components/card-deck.component.jsx';
import CardDeckWrapper from '../../../../assets/components/card-deck-wrapper.component.jsx';
import CardFooter from '../../../../assets/components/card-footer.component.jsx';
import CardGroup from '../../../../assets/components/card-group.component.jsx';
import CardHeader from '../../../../assets/components/card-header.component.jsx';
import CardImage from '../../../../assets/components/card-image.component.jsx';
import CardImageBottom from '../../../../assets/components/card-image-bottom.component.jsx';
import CardImageOverlay from '../../../../assets/components/card-image-overlay.component.jsx';
import CardImageTop from '../../../../assets/components/card-image-top.component.jsx';
import CardLink from '../../../../assets/components/card-link.component.jsx';
import CardText from '../../../../assets/components/card-text.component.jsx';
import CardTitle from '../../../../assets/components/card-title.component.jsx';
import CardSubTitle from '../../../../assets/components/card-sub-title.component.jsx';
import CardBlockQuote from '../../../../assets/components/card-block-quote.component.jsx';
import ListGroup from '../../../../assets/components/list-group.component.jsx';
import ListGroupItem from '../../../../assets/components/list-group-item.component.jsx';
import GridContainer from '../../../../assets/components/grid-container.component.jsx';
import GridRow from '../../../../assets/components/grid-row.component.jsx';
import GridColumn from '../../../../assets/components/grid-column.component.jsx';

class CardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Holder.run({
      images: document.querySelectorAll('.p-style-guide-cards img')
    });
  }

  render() {
    return (
      <div className="p-style-guide-cards">
        <h1 className="test">Cards</h1>
        <h4>Standard</h4>
        <Card>
          <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button styleType="primary">Button</Button>
          </CardBlock>
        </Card>
        <h4>Content Types</h4>
        <Card>
          <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          </CardBlock>
          <ListGroup isFlush={true}>
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <CardBlock>
            <CardLink>Card link</CardLink>
            <CardLink>Another link</CardLink>
          </CardBlock>
        </Card>
        <Card>
          <ListGroup isFlush={true}>
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
        </Card>
        <Card>
          <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
          <CardBlock>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          </CardBlock>
        </Card>
        <Card>
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <CardLink>Card link</CardLink>
            <CardLink>Another link</CardLink>
          </CardBlock>
        </Card>
        <Card>
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardSubTitle className="text-muted">Support card subtitle</CardSubTitle>
          </CardBlock>
          <img src="holder.js/318x180?theme=sky" alt="Card image" />
          <CardBlock>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <CardLink>Card link</CardLink>
            <CardLink>Another link</CardLink>
          </CardBlock>
        </Card>
        <h4>Sizes</h4>
        <GridContainer>
          <GridRow>
            <GridColumn smallSize={6}>
            <Card>
              <CardBlock>
                <CardTitle elementType="h3">Special title treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button styleType="primary">Go somewhere</Button>
              </CardBlock>
            </Card>
            </GridColumn>
            <GridColumn smallSize={6}>
              <Card>
                <CardBlock>
                  <CardTitle elementType="h3">Special title treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button styleType="primary">Go somewhere</Button>
                </CardBlock>
              </Card>
            </GridColumn>
          </GridRow>
        </GridContainer>
        <Card className="manual-size">
          <CardBlock>
            <CardTitle elementType="h3">Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
        </Card>
        <h4>Text alignment</h4>
        <Card>
          <CardBlock>
            <CardTitle>Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
        </Card>
        <Card>
          <CardBlock className="text-xs-center">
            <CardTitle>Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
        </Card>
        <Card>
          <CardBlock className="text-xs-right">
            <CardTitle>Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
        </Card>
        <h4>Header and footer</h4>
        <Card>
          <CardHeader>
            Featured
          </CardHeader>
          <CardBlock>
            <CardTitle>Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
        </Card>
        <Card>
          <CardHeader elementType="h3">Featured</CardHeader>
          <CardBlock>
            <CardTitle>Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
        </Card>
        <Card>
          <CardHeader>
            Quote
          </CardHeader>
          <CardBlock>
            <CardBlockQuote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CardBlockQuote>
          </CardBlock>
        </Card>
        <Card className="text-xs-center">
          <CardHeader>
            Featured
          </CardHeader>
          <CardBlock>
            <CardTitle>Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Go somewhere</Button>
          </CardBlock>
          <CardFooter className="text-muted">
            2 days ago
          </CardFooter>
        </Card>
        <h4>Image Caps</h4>
        <Card>
          <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
          </CardBlock>
        </Card>
        <Card>
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
          </CardBlock>
          <CardImageBottom src="holder.js/318x180?theme=sky" alt="Card image cap" />
        </Card>
        <h4>Image Overlays</h4>
        <Card isInverse={true}>
          <CardImage src="holder.js/318x270?theme=sky" alt="Card image" />
          <CardImageOverlay>
            <CardTitle>Card title</CardTitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
          </CardImageOverlay>
        </Card>
        <h4>Inverted Text</h4>
        <Card isInverse={true} style={{backgroundColor: '#333', borderColor: '#333'}}>
          <CardBlock>
            <CardTitle elementType="h3">Special title treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button styleType="primary">Button</Button>
          </CardBlock>
        </Card>
        <h4>Background variants</h4>
        <Card isInverse={true} styleType="primary" className="text-xs-center">
          <CardBlock>
            <CardBlockQuote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CardBlockQuote>
          </CardBlock>
        </Card>
        <Card isInverse={true} styleType="success" className="text-xs-center">
          <CardBlock>
            <CardBlockQuote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CardBlockQuote>
          </CardBlock>
        </Card>
        <Card isInverse={true} styleType="info" className="text-xs-center">
          <CardBlock>
            <CardBlockQuote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CardBlockQuote>
          </CardBlock>
        </Card>
        <Card isInverse={true} styleType="warning" className="text-xs-center">
          <CardBlock>
            <CardBlockQuote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CardBlockQuote>
          </CardBlock>
        </Card>
        <Card isInverse={true} styleType="danger" className="text-xs-center">
          <CardBlock>
            <CardBlockQuote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CardBlockQuote>
          </CardBlock>
        </Card>
        <h4>Groups</h4>
        <CardGroup>
          <Card>
            <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
            </CardBlock>
          </Card>
          <Card>
            <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
              <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
            </CardBlock>
          </Card>
          <Card>
            <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
            </CardBlock>
          </Card>
        </CardGroup>
        <h4>Decks</h4>
        <CardDeckWrapper>
          <CardDeck>
            <Card>
              <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Card title</CardTitle>
                <CardText>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
              </CardBlock>
            </Card>
            <Card>
              <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Card title</CardTitle>
                <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
              </CardBlock>
            </Card>
            <Card>
              <CardImageTop src="holder.js/318x180?theme=sky" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Card title</CardTitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
              </CardBlock>
            </Card>
          </CardDeck>
        </CardDeckWrapper>
        <h4>Columns</h4>
        <CardColumns>
          <Card>
            <CardImageTop src="holder.js/242x160?theme=sky" alt="Card image cap" />
            <CardBlock>
              <CardTitle>Card title that wraps to a new line</CardTitle>
              <CardText>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            </CardBlock>
          </Card>
          <Card>
            <CardBlock>
              <CardBlockQuote>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>
                  <small className="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </CardBlockQuote>
            </CardBlock>
          </Card>
          <Card>
            <CardImageTop src="holder.js/242x140?theme=sky" alt="Card image cap" />
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
              <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
            </CardBlock>
          </Card>
          <Card isInverse={true} styleType="primary">
            <CardBlock className="text-xs-center">
              <CardBlockQuote>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                <footer>
                  <small>
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </CardBlockQuote>
            </CardBlock>
          </Card>
          <Card>
            <CardBlock className="text-xs-center">
              <CardTitle>Card title</CardTitle>
              <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
              <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
            </CardBlock>
          </Card>
          <Card>
            <CardImage src="holder.js/242x260?theme=sky" alt="Card image" />
          </Card>
          <Card>
            <CardBlock className="text-xs-right">
              <CardBlockQuote>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>
                  <small className="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </CardBlockQuote>
            </CardBlock>
          </Card>
          <Card>
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
            </CardBlock>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

CardsPage.displayName = 'CardsPage';

CardsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CardsPage;
