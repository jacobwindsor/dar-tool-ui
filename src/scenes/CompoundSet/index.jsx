import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Compounds from '../../data/compounds';
import Table from './components/Table';

class CompoundSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compoundSet: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const compoundSetId = match.params.compoundSetId;

    Compounds.get(compoundSetId).then((data) => {
      this.setState({
        compoundSet: data,
        loading: false,
      });
    });
  }

  render() {
    const { compoundSet, loading } = this.state;

    if (loading) return null;

    return (
      <Table
        compounds={compoundSet.compounds}
      />
    );
  }
}

CompoundSet.propTypes = {
  match: PropTypes.isRequired,
};

export default CompoundSet;

