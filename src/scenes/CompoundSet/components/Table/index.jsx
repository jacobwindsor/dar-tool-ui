import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TableComp = ({ compounds }) => {
  const compoundRows = compounds.map((singleCompound, i) => (
    <TableRow>
      <TableRowColumn>{singleCompound.IUPAC}</TableRowColumn>
      <TableRowColumn>{singleCompound.CAS}</TableRowColumn>
      <TableRowColumn>{singleCompound.totalHits}</TableRowColumn>
      <TableRowColumn>{singleCompound.pubChem.IDs.join(', ')}</TableRowColumn>
      <TableRowColumn>{singleCompound.pubChem.pathwayCount}</TableRowColumn>
      <TableRowColumn>{singleCompound.pubChem.assayCount}</TableRowColumn>
      <TableRowColumn>{singleCompound.metaCyc.IDs.join(', ')}</TableRowColumn>
      <TableRowColumn>{singleCompound.metaCyc.reactionCount}</TableRowColumn>
      <TableRowColumn>{singleCompound.metaCyc.pathwayCount}</TableRowColumn>
    </TableRow>
  ));

  return (
    <Table>
      <TableHeader
        displaySelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn>IUPAC</TableHeaderColumn>
          <TableHeaderColumn>CAS</TableHeaderColumn>
          <TableHeaderColumn>Total Hits</TableHeaderColumn>
          <TableHeaderColumn>PubChem IDs</TableHeaderColumn>
          <TableHeaderColumn>PubChem Pathway</TableHeaderColumn>
          <TableHeaderColumn>PubChem BioAssays</TableHeaderColumn>
          <TableHeaderColumn>MetaCyc IDs</TableHeaderColumn>
          <TableHeaderColumn>MetaCyc Reactions</TableHeaderColumn>
          <TableHeaderColumn>MetaCyc Pathways</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        stripedRows={true}
      >
        {compoundRows}
      </TableBody>
    </Table>
  );
};

TableComp.propTypes = {
  compounds: PropTypes.isRequired,
};

export default TableComp;

