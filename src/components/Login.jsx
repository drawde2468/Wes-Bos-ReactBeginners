import React from "react";
import PropTypes from "prop-types";

// class Login extends React.Component {
//   render() {
//     return (
//       <nav className="login">
//         <h2>Inventory Login</h2>
//         <p>Sign in to manage yours store's inventory.</p>
//         <button
//           className="github"
//           onClick={() => this.props.authenticate("Github")}
//         >
//           Log In With Github
//         </button>
//       </nav>
//     );
//   }
// }

const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage yours store's inventory.</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Log In With Github
    </button>
    <button className="twitter" onClick={() => props.authenticate("Twitter")}>
      Log In With Twitter
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log In With Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
