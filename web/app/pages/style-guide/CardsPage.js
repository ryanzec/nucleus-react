import PropTypes from 'prop-types';
import React from 'react';
import Holder from 'holderjs';

import CodeExample from '../../react/components/CodeExample';

import Grid from 'src/components/grid/Grid';
import GridRow from 'src/components/grid/GridRow';
import GridColumn from 'src/components/grid/GridColumn';
import Button from 'src/components/button/Button';
import OverlayAbsolute from 'src/components/overlay/OverlayAbsolute';
import Card from 'src/components/card/Card';
import CardTitle from 'src/components/card/CardTitle';
import CardSubtitle from 'src/components/card/CardSubtitle';
import CardContent from 'src/components/card/CardContent';
import CardActions from 'src/components/card/CardActions';
import CardImage from 'src/components/card/CardImage';
import CardHeader from 'src/components/card/CardHeader';
import CardFooter from 'src/components/card/CardFooter';
import ColumnCard from 'src/components/card/ColumnCard';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import styles from './CardsPage.module.scss';

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
        <Card customStyles={{container: styles.card}}>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
        </Card>
        <h4>With Title</h4>
        <Card customStyles={{container: styles.card}}>
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
        </Card>
        <h4>With Subtitle</h4>
        <Card customStyles={{container: styles.card}}>
          <CardTitle>I am a title</CardTitle>
          <CardSubtitle>Hello</CardSubtitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
        </Card>
        <h4>With Actions</h4>
        <Card customStyles={{container: styles.card}}>
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <h4>With Image</h4>
        <Card customStyles={{container: styles.card}}>
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
          <CardImage src="holder.js/250x180?theme=sky" />
        </Card>
        <Card customStyles={{container: styles.card}}>
          <CardTitle>I am a title</CardTitle>
          <CardImage src="holder.js/250x80?theme=sky" />
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card customStyles={{container: styles.card}}>
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <h4>Text align utilities classes</h4>
        <Card customStyles={{container: styles.card}} className="u-text-align-left">
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
          <CardImage src="holder.js/250x180?theme=sky" />
        </Card>
        <Card customStyles={{container: styles.card}} className="u-text-align-center">
          <CardTitle>I am a title</CardTitle>
          <CardImage src="holder.js/250x80?theme=sky" />
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card customStyles={{container: styles.card}} className="u-text-align-right">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card customStyles={{container: styles.card}} className="u-text-align-justify">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <h4>Header and footer</h4>
        <Card customStyles={{container: styles.card}}>
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
        <Card customStyles={{container: styles.card}} className="overlay-example">
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
          <OverlayAbsolute isActive={true}>This is top content</OverlayAbsolute>
        </Card>
        <h4>Styles</h4>
        <Card customStyles={{container: styles.card}} styleType="success">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="info">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card customStyles={{container: styles.card}} styleType="info">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card customStyles={{container: styles.card}} styleType="warning">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="danger">Action 2</Button>
          </CardActions>
        </Card>
        <Card customStyles={{container: styles.card}} styleType="danger">
          <CardImage src="holder.js/250x180?theme=sky" />
          <CardTitle>I am a title</CardTitle>
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          <CardActions>
            <Button styleType="success">Action 1</Button>
            <Button styleType="warning">Action 2</Button>
          </CardActions>
        </Card>
        <h4>Card columns</h4>
        <div className={styles.columnCard}>
          <ColumnCard>
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            <CardActions>
              <Button styleType="success">Action 1</Button>
              <Button styleType="danger">Action 2</Button>
            </CardActions>
          </ColumnCard>
          <ColumnCard>
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            <CardActions>
              <Button styleType="info">Action 1</Button>
              <Button styleType="danger">Action 2</Button>
            </CardActions>
          </ColumnCard>
          <ColumnCard styleType="info">
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sitmagna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
          </ColumnCard>
          <ColumnCard>
            <CardImage src="holder.js/250x180?theme=sky" />
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            <CardActions>
              <Button styleType="success">Action 1</Button>
              <Button styleType="danger">Action 2</Button>
            </CardActions>
          </ColumnCard>
          <ColumnCard>
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            <CardActions>
              <Button styleType="success">Action 1</Button>
              <Button styleType="danger">Action 2</Button>
            </CardActions>
          </ColumnCard>
          <ColumnCard>
            <CardImage src="holder.js/250x180?theme=sky" />
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            <CardActions>
              <Button styleType="success">Action 1</Button>
              <Button styleType="danger">Action 2</Button>
            </CardActions>
          </ColumnCard>
          <ColumnCard>
            <CardTitle>I am a title</CardTitle>
            <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</CardContent>
            <CardActions>
              <Button styleType="success">Action 1</Button>
              <Button styleType="danger">Action 2</Button>
            </CardActions>
          </ColumnCard>
        </div>
      </div>
    );
  }
}

CardsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CardsPage;
