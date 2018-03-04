import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { List, Avatar, Button } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../actions/user';
import * as dataActions from '../actions/data';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      leaderBoard: [],
      length: 10,
    };
  }

  generateData(props) {
    console.log('generate', props.length, props);
    var dataList = [];
    for (var i = 0; i < props.length; i += 1) {
      console.log(i, props[i].assets);
      dataList.push({
        key: i,
        userName: props[i].email,
        USD: props[i].assets['USD'],
        BTC: props[i]['assets']['BTC'],
        ROI: props[i]['assets']['ROI'],
      });
    }

    return dataList;
  }

  componentDidMount() {
    this.props.onStartSyncLeaderBoard();
  }

  componentWillReceiveProps(nextProps) {
    console.log('leaderBoard', nextProps.leaderBoard);
    this.setState({
      leaderBoard: this.generateData(nextProps.leaderBoard),
    });
  }

  componentWillUnmount() {
    this.props.onStopSyncLeaderBoard();
  }

  onLoadMore = () => {
    console.log(this.props.leaderBoard);
    console.log('loading more');
    this.setState({
      loadingMore: true,
      length: this.state.length + 5,
      leaderBoard: this.props.leaderBoard.slice(
        0,
        Math.min(this.state.length + 5, this.props.leaderBoard.length)
      ),
    });
  };

  render() {
    return (
      <div style={{ marginLeft: 10, marginTop: 15 }}>
        <h4 style={{ textAlign: 'center' }}>Leader Board</h4>
        <table className="table" style={{ fontSize: 15, textAlign: 'center' }}>
          <thead>
            <tr>
              <th> Rank </th>
              <th> UserName </th>
              <th> USD </th>
              <th> BTC </th>
              <th> ROI </th>
            </tr>
          </thead>
          <tbody>
            {this.state.leaderBoard.map(item => (
              <tr key={item.key}>
                <td> {item.rank} </td>
                <td> {item.userName} </td>
                <td> {item.USD.toFixed(4)} </td>
                <td> {item.BTC.toFixed(4)} </td>
                <td> {item.ROI.toFixed(4)} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  leaderBoard: PropTypes.array,
  rank: PropTypes.number,
  onStartSyncLeaderBoard: PropTypes.func,
  onStopSyncLeaderBoard: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    leaderBoard: state.leaderBoard.leaderBoard,
    rank: state.leaderBoard.rank,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartSyncLeaderBoard: () =>
      dispatch(dataActions.sagaStartSyncLeaderBoard()),
    onStopSyncLeaderBoard: () =>
      dispatch(dataActions.sagaStopSyncLeaderBoard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
