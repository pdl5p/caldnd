import * as React from 'react';
import * as Rx from 'rxjs';

const getResults = (number) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {resolve(number)}, 200);
    });
}


class CustomerLookup extends React.Component<any, any> {

    input: Rx.Subject<any>;

    constructor(props){
        super(props);

        this.state = {
            searching: false,
            text: "",
            result: [
                { name: "A person", contact: "0407000333"},
                { name: "Someone Else", contact: "0407992233"},
            ],
            debounced: ""
        }

        this.input = new Rx.Subject();
        this.input.debounceTime(500).subscribe(x => {
            console.log("X", x);

            getResults(x).then(w => {
                //this.setState({result: w});
            });

        });
    }

    setSearching = (is) => {
        this.setState({searching: is});
    }

    updateText = (event) => {
        const v = event.target.value;
        this.setState({text: v});

        this.input.next(v);
    }

    mouseMover = (event) => {
        console.log("mover");
    }

    render(){

        const heading = this.state.searching ? <h1>Searching {this.state.text}</h1> : <h1>Not searching</h1>;

        return <div className="customer-lookup" onMouseMove={this.mouseMover}>

            {heading}

            <input type="text" 
                value={this.state.text}
                onChange={(event) => this.updateText(event)}
                onFocus={() => this.setSearching(true)} 
                onBlur={() => this.setSearching(false)} />
            <div className="result-container">
                <div className="result-list">

                    {this.state.result.map((r, i) => {
                       return <div key={i}>{r.name}</div> 
                    })}
                </div>
            </div>
        </div>
    }
}

export default CustomerLookup;