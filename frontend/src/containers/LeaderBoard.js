import React, { Component } from 'react';
import { Row, Col } from 'antd';

import { List, Avatar, Button, Spin } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../actions/user';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      leaderBoard: [],
      length: 20,
    };
  }

  componentDidMount() {
    this.props.onLoadLeaderBoard();
  }

  onLoadMore = () => {
    console.log(this.props.leaderBoard);
    console.log('loading more');
    this.setState({
      //loadingMore: true,
      length: this.state.length + 20,
      leaderBoard: this.props.leaderBoard.slice(
        0,
        Math.min(this.state.length + 20, this.props.leaderBoard.length)
      ),
    });
  };

  render() {
    const { loading, loadingMore, showLoadingMore, leaderBoard } = this.state;
    const loadMore = showLoadingMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/**{loadingMore && <Spin />}**/}
        {true && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <List
        style={{ width: '100%', margin: '10 10 10 10' }}
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={leaderBoard}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<span>{item.userName}</span>}
              description={item.userName}
            />
            <div>content</div>
          </List.Item>
        )}
      />
    );
  }
}

LeaderBoard.propTypes = {
  leaderBoard: PropTypes.array,
  rank: PropTypes.number,
  onLoadLeaderBoard: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    leaderBoard: state.leaderBoard.leaderBoard,
    rank: state.leaderBoard.rank,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLeaderBoard: () => dispatch(userActions.sagaSyncLeaderBoard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
