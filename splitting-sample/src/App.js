import React, { Component, useState, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

const SplitMe = React.lazy(() => import("./SplitMe"));

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>Hello React</p>
        <Suspense fallback={<div>loading...</div>}>
        {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     SplitMe: null
//   };
//   handleClick = async () => {
//     const loadedModule = await import('./SplitMe');
//     this.setState({
//       SplitMe: loadedModule.default
//     });
//   };
//   render() {
//     const {SplitMe} = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p onClick={this.handleClick}>Hello React</p>
//           {SplitMe && <SplitMe/>}
//         </header>
//       </div>
//     );
//   }
// }
