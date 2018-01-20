import React, { Component } from 'react';

function renderItem(item) {
  return <div className ="andrew"> <h1>{item.name}</h1> {item.count}</div>
}

function generateItemsIndex (items) {
  return items.reduce((index, item) => {
    const name = item.name;

    if (!index[name])
      index[name] = {
        name,
        count: 1
      };
    else
      index[name].count += 1;

    return index;
  }, { });
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // const index = {}
  // let item
  // for (var i = 0; i < items.length; i++) {
  //   item = items[i].name
  //   if (!index[item]) index[item] = {
  //     name: item,
  //     count: 1
  //   }
  //   else index[item].count += 1
  // }
  // return index
}

export default class Inventory extends Component {
    render() {
if (this.props.items.length < 1) return null

const itemsIndex = generateItemsIndex(this.props.items)

return Object.keys(itemsIndex).map((key) => {
  return renderItem(itemsIndex[key])
})




  }
}
