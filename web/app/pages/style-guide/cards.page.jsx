import React from 'react';

import CodeExample from '../../react/components/code-example.component.jsx';

import Grid from '../../../../assets/components/grid.component.jsx';
import GridRow from '../../../../assets/components/grid-row.component.jsx';
import GridColumn from '../../../../assets/components/grid-column.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';
import Overlay from '../../../../assets/components/overlay.component.jsx';
import Card from '../../../../assets/components/card.component.jsx';
import CardTitle from '../../../../assets/components/card-title.component.jsx';
import CardSubtitle from '../../../../assets/components/card-subtitle.component.jsx';
import CardContent from '../../../../assets/components/card-content.component.jsx';
import CardActions from '../../../../assets/components/card-actions.component.jsx';
import CardImage from '../../../../assets/components/card-image.component.jsx';
import CardHeader from '../../../../assets/components/card-header.component.jsx';
import CardFooter from '../../../../assets/components/card-footer.component.jsx';
import CardColumns from '../../../../assets/components/card-columns.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

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
        <h1>Cards</h1>
        <h4>Just text</h4>
        <Card>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
        </Card>
        <h4>With Title</h4>
        <Card>
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
        </Card>
        <h4>With Subtitle</h4>
        <Card>
          <CardTitle>I am a title</CardTitle>
          <CardSubtitle>Hello</CardSubtitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
        </Card>
        <h4>With Actions</h4>
        <Card>
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <h4>With Image</h4>
        <Card>
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
          <CardImage src="holder.js/250x180?theme=sky" />
        </Card>
        <Card>
          <CardTitle>I am a title</CardTitle>
          <CardImage src="holder.js/250x80?theme=sky" />
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card>
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <h4>Text align utilities classes</h4>
        <Card className="u-text-align-left">
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
          <CardImage src="holder.js/250x180?theme=sky" />
        </Card>
        <Card className="u-text-align-center">
          <CardTitle>I am a title</CardTitle>
          <CardImage src="holder.js/250x80?theme=sky" />
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card className="u-text-align-right">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card className="u-text-align-justify">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <h4>Header and footer</h4>
        <Card>
          <CardHeader>Header</CardHeader>
          <CardTitle>I am a title</CardTitle>
          <CardSubtitle>Small title</CardSubtitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardFooter className="u-text-align-center">5 months ago</CardFooter>
        </Card>
        <h4>With overlay</h4>
        <Card className="overlay-example">
          <CardHeader>Header</CardHeader>
          <CardTitle>I am a title</CardTitle>
          <CardSubtitle>Small title</CardSubtitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardFooter className="u-text-align-center">5 months ago</CardFooter>
          <Overlay isActive={true} isAbsolute={true}>This is top content</Overlay>
        </Card>
        <h4>Styles</h4>
        <Card styleType="success">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="info">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card styleType="info">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card styleType="warning">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card styleType="danger">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="warning">Action 2</Button>
          </CardActions>
        </Card>
        <h4>Card columns</h4>
        <CardColumns>
            <Card>
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
              <CardActions>
                <Button styleType="success">Action 1</Button>
                <Button styleType="danger">Action 2</Button>
              </CardActions>
            </Card>
            <Card>
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
              <CardActions>
                <Button styleType="info">Action 1</Button>
                <Button styleType="danger">Action 2</Button>
              </CardActions>
            </Card>
            <Card styleType="info">
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sitmagna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            </Card>
            <Card>
              <CardImage src="holder.js/250x180?theme=sky" />
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
              <CardActions>
                <Button styleType="success">Action 1</Button>
                <Button styleType="danger">Action 2</Button>
              </CardActions>
            </Card>
            <Card>
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
              <CardActions>
                <Button styleType="success">Action 1</Button>
                <Button styleType="danger">Action 2</Button>
              </CardActions>
            </Card>
            <Card>
              <CardImage src="holder.js/250x180?theme=sky" />
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
              <CardActions>
                <Button styleType="success">Action 1</Button>
                <Button styleType="danger">Action 2</Button>
              </CardActions>
            </Card>
            <Card>
              <CardTitle>I am a title</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
              <CardActions>
                <Button styleType="success">Action 1</Button>
                <Button styleType="danger">Action 2</Button>
              </CardActions>
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
