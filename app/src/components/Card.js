import React from "react";
import "./Card.css";
import axios from "axios";
import Highlighter from "react-highlight-words";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false };
  }
  handleClick = (temp) => () => {
    //console.log(temp);
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post("http://127.0.0.1:5000/update", {
        message: this.props.message,
        label: temp,
      })
      .then((response) => {
        console.log(response.data);
      });
    //label feature is left to implement, also pass it in prop
  };

  render() {
    // let flag=false;
    // function changeValue()
    // {

    //   this.setState({flag:true})
    // }

    const className = ["message-card message-card", this.props.id];
    const id = [this.props.id];
    const fakebuttonid = [1];
    const notfakebuttonid = [-1];

    const badwords = [
      "terrorist",
      "hijacking",
      "racist",
      "jimfish",
      "crime",
      "killer",
      "gangsta",
      "enemy",
      "crack",
      "bastard ",
      "murder",
      "molestation",
      "propaganda",
      "execution",

      "abduction",
      "arson",
      "assassination",
      "assault",
      "bigamy",
      "blackmail",
      "bombing",
      "bribery",
      "burglary",
      "child abuse",
      "corruption",
      "crime",
      "cybercrime",
      "domestic violence",
      "drunk driving",
      "embezzlement",
      "espionage",
      "forgery",
      "fraud",
      "genocide",
      "hijacking",
      "hit and run",
      "homicide",
      "hooliganism",
      "identity theft",
      "kidnapping",
      "libel",
      "looting",
      "lynching",
      "manslaughter",
      "mugging",
      "murder",
      "perjury",
      "pickpocketing",
      "pilfering",
      "poaching",
      "rape",
      "riot",
      "robbery",
      "shoplifting",
      "slander",
      "smuggling",
      "speeding",
      "terrorism",
      "theft",
      "trafficking",
      "treason",
      "trespassing",
      "vandalism",
      "voyeurism",
    ];

    return (
      <div className={className} key={id}>
        <div class="text">
          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={badwords}
            autoEscape={true}
            textToHighlight={this.props.message}
          />
        </div>
        <div class="text-small">negative: {this.props.negative}</div>
        <div class="text-small">neutral: {this.props.neutral}</div>
        <div class="text-small">positive: {this.props.positive}</div>
        <button
          mode="-1"
          className="not-fake-button button"
          onClick={this.handleClick("-1")}
        >
          not fake
        </button>
        <button
          mode="1"
          className="fake-button button"
          onClick={this.handleClick("1")}
        >
          fake
        </button>
        <button onClick={() => this.setState({ flag: !this.state.flag })}>
          expand
        </button>
        <div>{this.state.flag ? <h1>open</h1> : <h1></h1>}</div>
      </div>
    );
  }
}
