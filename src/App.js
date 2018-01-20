import React, { Component } from 'react';
import './App.css';
import ShopButton from './components/ShopButton';
import Score from './components/Score';
import CodeDisplay from './components/CodeDisplay';
import Inventory from './components/Inventory';
import ProgressBar from './components/ProgressBar'



const UPGRADES = [

  {title:'timer',cost:'30'},
  {title:'improveClicks1', cost:'50'},
  {title:'scoreHeader', cost:'100'},
  {title:'displayCode', cost:'10'},
  {title:'improveTimer1', cost:'50'},
  {title:'upgradesHeader', cost:'80'},
  {title:'someStyling1', cost:'40'},
  {title:'localSave', cost:'120'},
  {title:'loop', cost:'10'},
  {title:'showCSS', cost:'300'},
  {title: "food", cost:"10"},
  {title: "weapons", cost:"7"},
  {title: "treasure", cost:"50"},
  {title: "monsters", cost:"-1"},
    {title:'merchandise', cost:'5'},

];

const ITEMS = {

food: [
{name: "apple"},
{name: "potato chips"},
{name: "juice"}
],

weapons: [
{name: "AK-47"},
{name: "axe"},
{name: "Tanks"},
{name: "arrows"}
],

merchandise:  [
  {name: "Wild Shield Backpack"},
  {name: "Master Sword"},
  {name: "triforce light"},
  {name: "horses"},
  {name: "parachute"}
],

monsters: [
  {name: "Moblin"},
  {name: "Armos"},
  {name: "Lynel"},
  {name: "Wizzrobe"},
  {name: "Octorok"},
],

treasure: [
  {name: "Oakles"},
  {name: "Rubies"},
  {name: "Saphires"},
  {name: "Diamonds"},
]
}

function compareUpgrades(a, b) {
  return b.cost - a.cost
}

function calculateProgress (currentScore) {
  const sortedUpgrades = UPGRADES.slice()
  sortedUpgrades.sort(compareUpgrades)
  console.log({sortedUpgrades})

  let nextAvailable

  for (var i = 1; i < sortedUpgrades.length; i++) {
    if (currentScore < sortedUpgrades[i].cost) nextAvailable = sortedUpgrades[i]
  }

  console.log(nextAvailable, currentScore/nextAvailable.cost)

  return (currentScore/nextAvailable.cost) * 100

}

calculateProgress(10)

const DEFAULT_STATE = {
  score: 0,
  timerBase: 1,
  timerInterval: 5000,
  clickBase: 1,
  loopbase: 1,
  inventory: {
    weapons: [],
    merchandise: [],
    monsters: [],
    treasure: [],
    food: []
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = JSON.parse(localStorage.getItem('state')) || DEFAULT_STATE;
  }

  createShopButton = ({ title, cost }) => {
    const { state, buy } = this;
    const props = {
      key: title,
      title,
      buy,
      cost,
      bought: state[title]
    };

    return <ShopButton { ...props} />;
  }

  createShopButtons = (upgrades) => (
    upgrades
      .filter(upgrade => this.state.score > upgrade.cost || this.state[upgrade.title])
      .map(this.createShopButton)
  )

  render() {
    const { state, increaseScore, createShopButtons } = this;
    const { upgradesHeader, score, scoreHeader, merchandise } = state;
    const styles = this.state.someStyling1 ? "style1" : "";

    const codeDisplayProps = {
      displayCode: state.displayCode,
      clickBase: state.clickBase,
      timerBase: state.timerBase,
      timerInterval: state.timerInterval,
      timerBought: state.timer,
      loopBought: state.loop,
      cssBought: state.showCSS
    };

window.calculateProgress = calculateProgress
    return (
      <div className="App">
         <div id="clicker" className={styles}>
          <h3>Clicker</h3>
          <button name="incrementor" onClick={increaseScore}>Click Me</button>
         </div>
         <div id="upgrades" className={styles}>
          {upgradesHeader && <h3 className="header">Upgrades</h3> }
          {createShopButtons(UPGRADES)}
         </div>
         <div id="scores" className={styles}>
           <Score merchandise={merchandise} score={score} headerBought={scoreHeader}/>
           <CodeDisplay { ...codeDisplayProps }/>
           <Inventory items={state.inventory.food}/>
           <Inventory items={state.inventory.monsters}/>
           <Inventory items={state.inventory.merchandise}/>
           <Inventory items={state.inventory.treasure}/>
           <Inventory items={state.inventory.weapons}/>

           <ProgressBar value={Math.floor(calculateProgress(state.score))} />

          </div>
      </div>
    );
  }

addItem = (inventory, type) => {
  const randomNumber = Math.floor(Math.random() * ITEMS[type].length)
  inventory[type].push(ITEMS[type][randomNumber])
  return inventory
}

  buy = (cost, upgrade) => {
    if (upgrade === 'timer') {
      this.timerOn();
    }

    if (upgrade === 'improveClicks1') {
      this.setState({clickBase: 5}, this.save());
    }

    if (upgrade === 'improveTimer1') {
      this.setState({timerBase: 10}, this.save());
    }

    if (upgrade === 'loop') {
      this.setState({loopbase: 10}, this.save());
    }
if (upgrade === "food") {
  this.setState({inventory: this.addItem(this.state.inventory, "food")})
}
if (upgrade === "weapons") {
  this.setState({inventory: this.addItem(this.state.inventory, "weapons")})
}
if (upgrade === "merchandise") {
  this.setState({inventory: this.addItem(this.state.inventory, "merchandise")})
}
if (upgrade === "treasure") {
  this.setState({inventory: this.addItem(this.state.inventory, "treasure")})
}
if (upgrade === "monsters") {
  this.setState({inventory: this.addItem(this.state.inventory, "monsters")})
}
    this.setState((prevState) => ({
      score : prevState.score - cost,
      [upgrade]: !(upgrade === 'food' || upgrade === 'weapons' || upgrade === 'merchandise' || upgrade === 'treasure' || upgrade === 'monsters')
    }), this.save());
  }

  save = () => {
    if (this.state.localSave) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  increaseScore = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      score: prevState.score + (prevState.clickBase * prevState.loopbase)
    }), this.save());
  }

  timerOn = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        score: prevState.score + prevState.timerBase
      }), this.save());
    }, this.state.timerInterval);
  }
}

export default App;
