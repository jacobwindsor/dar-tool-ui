import React, { Component } from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import Compounds from '../../data/compounds';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compounds: [],
    };
  }

  componentDidMount() {
    Compounds.list.then((data) => {
      this.setState({
        compounds: data,
      });
    });
  }

  render() {
    const { compounds } = this.state;

    const cards = compounds.map((singleCompoundSet, i) => (
      <Card
        key={`compound-set-${Math.random() * i}`}
      >
        <CardHeader
          title={singleCompoundSet.name}
          subtitle={`${singleCompoundSet.compounds.length} compounds`}
        />
        <CardActions>
          <FlatButton label="View" />
        </CardActions>
      </Card>
    ));

    return (
      <GridList
        cols={3}
        cellHeight="auto"
        padding={20}
      >
        {cards}
      </GridList>
    );
  }
}
