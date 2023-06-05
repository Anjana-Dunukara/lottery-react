import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import React from "react";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
  };

  async contractDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.balance);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by: {this.state.manager}</p>
        <p>There is currently {this.state.players.length} players entered.</p>
        <p>
          competing to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ether!
        </p>

        <hr />
        <form>
          <h4>Want to try out your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
