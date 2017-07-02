import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, orderBy } from 'lodash';
import Compounds from '../../data/compounds';
import Table from './components/Table';

class CompoundSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compoundSet: null,
      loading: true,
      rankBy: 'totalHits',
      rankOrder: 'desc',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const compoundSetId = match.params.compoundSetId;

    Compounds.get(compoundSetId)
      .then((data) => {
        const copy = cloneDeep(data);
        copy.compounds = copy.compounds.map((singleCompound) => {
          const totalHits = singleCompound.metaCyc.pathwayCount +
            singleCompound.metaCyc.reactionCount +
            singleCompound.pubChem.pathwayCount +
            singleCompound.pubChem.assayCount;

          return Object.assign({}, singleCompound, { totalHits });
        });
        return copy;
      })
      .then((data) => {
        this.setState({
          compoundSet: data,
          loading: false,
        });
      });
  }

  render() {
    const { compoundSet, loading, rankBy, rankOrder } = this.state;

    if (loading) return null;

    const rankedCompounds = orderBy(compoundSet.compounds, [rankBy], [rankOrder]);

    return (
      <div>
        <h1>{compoundSet.name}</h1>
        <Table
          compounds={rankedCompounds}
        />
      </div>
    );
  }
}

CompoundSet.propTypes = {
  match: PropTypes.isRequired,
};

export default CompoundSet;

