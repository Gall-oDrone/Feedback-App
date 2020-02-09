import React from "react";
import { connect } from "react-redux";
import { List, Skeleton, Table, Divider, Tag } from 'antd';
import Result from '../components/Result';
import { getGradedASNTS } from '../store/actions/gradedAssignments';
import * as actions from "../store/actions/assignments";
import assignment from '../containers/AssignmentDetail';
import Hoc from "../hoc/hoc"

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const data1 = [];
const data2 = [];
const columns = [
  {
    title: 'Assignment',
    key: 'assignment',
    //dataIndex: 'age',
    render: a => <a> {a.assignment} </a>
  },
  // {
  //   title: 'Teacher',
  //   key: 'teacher',
  //   //dataIndex: 'age',
  //   render: a => <a> {a.teacher} </a>
  // },
  {
    title: 'Progress',
    key: 'progress',
    render: a => <Result key={a.id} grade={a.grade} />
  },
];

class Profile extends React.PureComponent {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getGradedASNTS(this.props.username, this.props.token);
      // this.props.getASNTS(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getGradedASNTS(newProps.username, newProps.token);
        // this.props.getASNTS(newProps.token);
      }
    }
  }

  render() {
    // const data3 = []
    // const data4 = [this.props.gradedAssignments, this.props.assignments]
    // const data5 = []
    // var val = this.props.assignments["teacher"];
    // data3.push(this.props.gradedAssignments)
    // console.log("-1 ) val: " + JSON.stringify(val))
    // console.log("0 ) data2: " + JSON.stringify(data2))
    // console.log("0 ) data3: " + JSON.stringify(data3))
    // console.log("0 ) data4: " + JSON.stringify(data4[1]))
    // console.log("0 ) data4 length: " + (data4.length))
    // console.log("0 ) data4[0] length: " + (data4[0].length))
    // console.log("0 ) data4[1] length: " + (data4[1].length))
    // console.log("1 ) data4.flat: " + JSON.stringify((data4.flat())))
    // console.log("1 ) data4.flat length: " + JSON.stringify((data4.flat().length)))
    // const data6 = data4.flat()
    //console.log("1.5 ) data6.flat keys map : " + JSON.stringify(Object.keys(data6).map(k => data6[k])))
//     let comm = data6[0]
//     var res = Object.values(data6).reduce(function(data5, k) {
//   if (k === 'teacher') data5[k] = data6[k];
//   return data5;
// }, {});

// console.log("res: " +JSON.stringify(res));
//     console.log("comm: "+ JSON.stringify(comm))
//      console.log("1.5 ) data6.flat keys map : " + JSON.stringify(Object.keys(data6).map(function(k) 
     
//      {
//       console.log("k: " + k)
      //console.log("index: " + index)
      // console.log("loop data6[k]: " + JSON.stringify(data6[k]))
      // console.log("loop data6[k]: " + JSON.stringify(data6[k].hasOwnProperty("id")))
      // var values = {}
      // if(data6[k] !== null){
      //     values["assignment"] = data6[k]["assignment"]
      //     values["grade"] = data6[k]["grade"]
      //     values["assignmentcompleted"] = data6[k]["assignmentcompleted"]
      //     values["teacher"] = data6[k]["teacher"]
      //     data5.push(values)
          // if(data6[k]["teacher"] == null){
          //   values["teacher"] = data6[k]["teacher"]
          //   data5.shift()
          // } else {
          //   values["teacher"] = data6[k]["teacher"]
          //   data5.push(values)
          // }
    //      console.log("data5: " + JSON.stringify(data5))
    //   }
    // }
    //  )))
    //  console.log("data5 after: " + JSON.stringify(data5))
      // k => function(k) {
      //   data5["teacher"] = data4.flat()[k]["teacher"];
      // })))
    // console.log("1 ) Profile this.props.gradedAssignments: " + this.props.gradedAssignments)
    // console.log("1 ) Profile this.props.gradedAssignments: " + this.props.gradedAssignments)
    // console.log("2 ) graded assignment imported: " + JSON.stringify(this.props.gradedAssignments[0]))
    // console.log("3 ) assignment imported: " + JSON.stringify(this.props.assignments[0]))
    // console.log("3 ) assignment imported: " + JSON.stringify(this.props.assignments[1]))
    // console.log("3 ) assignment imported: " + JSON.stringify(this.props.assignments[2]))
    // console.log("3 ) assignment imported: " + JSON.stringify(Object.keys(this.props.assignments)))
    // console.log("4 ) assignment imported 2 : " + JSON.stringify(Object.keys(this.props.assignments).map(k => this.props.assignments[k]["teacher"])))
    // console.log("4 ) assignment imported 2.1 : " + JSON.stringify(Object.keys(data4).map(((k => data4[k][2])))))
    // console.log("4 ) assignment imported 2.1 : " + JSON.stringify(Object.keys(data4).map(((k => data4[1][k])))))
    // console.log("4 ) assignment imported 2.2 : " + JSON.stringify(Object.keys(data4[1])))
    // console.log("4 ) assignment values 2.2 : " + JSON.stringify(Object.values(data4[0])))
    // console.log("4 ) assignment values 2.2 : " + JSON.stringify(Object.values(data4[1])))
    // console.log("4 ) assignment entries 2.2 : " + JSON.stringify(Object.entries(data4[1])))
    // console.log("4 ) assignment imported 2.2 : " + JSON.stringify(Object.keys(data4[0])))
    // console.log("4 ) assignment imported 2.2 : " + JSON.stringify(Object.keys(data4)))
    // console.log("4 ) assignment imported 2.3 : " + JSON.stringify(Object.values(this.props.assignments).forEach((value) => this.props.assignments[value])))
    // console.log("5 ) assignment title imported: " + JSON.stringify(this.props.assignments.title))
    // console.log("6 ) assignment imported: " + JSON.stringify(this.props.assignments))
    // console.log("7 ) data4 array: " + JSON.stringify(this.get_table_data(this.props.assignments)))
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active/>
         ) : (
           <Hoc>
            <Table columns={columns} dataSource={this.props.gradedAssignments} />
            <h1>
                Hi {this.props.username}
            </h1>
        <List
          size="small"
          dataSource={this.props.gradedAssignments}
          renderItem={a => <Result key={a.id} grade={a.grade} />}
        />
        </Hoc>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    gradedAssignments: state.gradedAssignments.assignments,
    loading: state.gradedAssignments.loading,

    // assignments: state.assignments.assignments,
    // loading: state.assignments.loading,

    // assignmentChoices: state.assignmentsChoices.choices,
    // loading: state.assignmentsChoices.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGradedASNTS: (username, token) =>
      dispatch(getGradedASNTS(username, token)),
    // getASNTS: token => dispatch(actions.getASNTS(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);



  // const columns = [
//   {
//     title: 'Teacher',
//     dataIndex: 'teacher_name',
//     key: 'teacher_name',
//     render: item => <a>{item.teacher}</a>,
//   },
//   {
//     title: 'Assignment Type',
//     dataIndex: 'asnt_type',
//     key: 'age',
//     render: item => <a>{item.title}</a>,
//   },
//   {
//     title: 'Assignment progress',
//     dataIndex: 'address',
//     key: 'address',
//     render:a => <Result key={a.id} grade={a.grade} />
//   }
// ];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];