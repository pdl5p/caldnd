import * as React from 'react';
import * as Rx from 'rxjs';

import axios from 'axios';

const getResults = (query) => {
    return new Promise((resolve, reject) => {
        search(query).then(ok => {
            if (!ok.data.error) {
                var r = ok.data.results.map(i => ({ id: i.customerId, name: i.displayName, contact: i.preferredContact }));
                resolve(r);
            } else {
                resolve([]);
            }
        }, err => {
            resolve([]);
        });
    });
}

const search = (query) => {

    return axios({
        url: `https://localhost:44338/api/search/fast?q=${query}`,
        headers: {
            'Content-type': 'application/json',
            'Accept': 'aaplication/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InowMzl6ZHNGdWl6cEJmQlZLMVRuMjVRSFlPMCIsImtpZCI6InowMzl6ZHNGdWl6cEJmQlZLMVRuMjVRSFlPMCJ9.eyJhdWQiOiIyZmMyYzk0OC0wZTQ1LTQ1Y2YtYWEzYi1iZWFlODBiNTMxYzEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82NzJmNzFlMy1lYTc3LTQzZDUtODdlYS0xODFkNWQ5MzI0NDIvIiwiaWF0IjoxNDk0NTYwNTY5LCJuYmYiOjE0OTQ1NjA1NjksImV4cCI6MTQ5NDU2NDQ2OSwiYWlvIjoiWTJaZ1lHaWJuT2ozYXVHamV3VnZ2NmFLU016bU10eWljTkxnZWhTRGVDZHo1MjJQSnpzQiIsImFtciI6WyJwd2QiXSwiZmFtaWx5X25hbWUiOiJMdWNhcyIsImdpdmVuX25hbWUiOiJQYXVsIiwiaXBhZGRyIjoiNTguMTYxLjEyOS4xMTEiLCJuYW1lIjoiUGF1bCBMdWNhcyIsIm5vbmNlIjoiMWNmMWM5ZDYtOTUwOC00ZWVmLTk3Y2UtMDhjOWNkYmQ4ZjZmIiwib2lkIjoiMTkxNWE3NWQtOGRhOC00NDFhLWE2NGUtMzQ1MjYzMzY4MGQ0IiwicGxhdGYiOiIzIiwic3ViIjoiYU1mdEdkbG05YnhIejU5azdsN3pWRjZBbGczbTgyd1luTkZoTjcyRW1JZyIsInRpZCI6IjY3MmY3MWUzLWVhNzctNDNkNS04N2VhLTE4MWQ1ZDkzMjQ0MiIsInVuaXF1ZV9uYW1lIjoicGF1bEBqYXhtaW5lLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6InBhdWxAamF4bWluZS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJUb0t6Z05yTWFFR3BON3BuVURFUkFBIiwidmVyIjoiMS4wIn0.gXmBxMkFjH6zeEThaa9lxXZ0OftIdGoaLUgHNWikxMQ9VcPGZUP2C1vpzUzP0UW2H4DG6LQedZfDjCdaNq5XmfuyKHzJbn-YLF_zNsJ_YbA0bVGhTlMWV1lLNMBXMfJpiwg9_C2-6RHYXbTMXWWc4mhtMPKso4vMtKu7XJJzVG2_vWd0zU3tj04nl_AE2e-_jJFMk5jAb4rgqunYshQHnueyl-Dsrezv9x_cUSQOIdbU--DII-qqgGeXL0_Tz2xPL8GwZiMIY5nkDxuV2aBIgy9ZW-3oPIDMCBDkBRVGjNEWiuaxFcu6AaO-d97989wQ7188-6h0gxnnxLYVCujwZQ'
        },
        method: "GET",
    });
}


class CustomerLookup extends React.Component<any, any> {

    input: Rx.Subject<any>;

    constructor(props) {
        super(props);

        this.state = {
            searching: false,
            text: "",
            result: [
            ],
            debounced: ""
        }

        this.input = new Rx.Subject();
        this.input.debounceTime(500).subscribe(query => {

            getResults(query).then((w: any) => {
                this.setState({
                    result: w
                });
            });

        });
    }

    setSearching = (is) => {
        this.setState({ searching: is });
    }

    updateText = (event) => {
        const v = event.target.value;
        this.setState({ text: v });

        this.input.next(v);
    }

    mouseMover = (event) => {
        console.log("mover");
    }

    render() {

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
                        return <div key={i}>{r.name} {r.contact}</div>
                    })}
                </div>
            </div>
        </div>
    }
}

export default CustomerLookup;