import * as React from 'react';
import * as Rx from 'rxjs';

import axios from 'axios';

const getResults = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            resolve([]);
            return;
        }
        return axios({
            url: `https://dcbpdlapi.azurewebsites.net/api/search/fast?q=${query}`,
            headers: {
                //'Content-type': 'application/json',
                //'Accept': 'aaplication/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InowMzl6ZHNGdWl6cEJmQlZLMVRuMjVRSFlPMCIsImtpZCI6InowMzl6ZHNGdWl6cEJmQlZLMVRuMjVRSFlPMCJ9.eyJhdWQiOiIyZmMyYzk0OC0wZTQ1LTQ1Y2YtYWEzYi1iZWFlODBiNTMxYzEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82NzJmNzFlMy1lYTc3LTQzZDUtODdlYS0xODFkNWQ5MzI0NDIvIiwiaWF0IjoxNDk0NzIwMjQxLCJuYmYiOjE0OTQ3MjAyNDEsImV4cCI6MTQ5NDcyNDE0MSwiYWlvIjoiQVNRQTIvOERBQUFBOVprRmZ3aTBubnZBYnNjRURrUXZmZHlrQVIzSytyWm9KL1JoL05pQW1tWT0iLCJhbXIiOlsicHdkIl0sImZhbWlseV9uYW1lIjoiTHVjYXMiLCJnaXZlbl9uYW1lIjoiUGF1bCIsImlwYWRkciI6IjU4LjE2MS4xMjkuMTExIiwibmFtZSI6IlBhdWwgTHVjYXMiLCJub25jZSI6IjJlMjU3YmVlLTM1MTQtNGQ1Ny05ZGQ5LTkyYTYwZmQzNDAwMyIsIm9pZCI6IjE5MTVhNzVkLThkYTgtNDQxYS1hNjRlLTM0NTI2MzM2ODBkNCIsInBsYXRmIjoiMyIsInN1YiI6ImFNZnRHZGxtOWJ4SHo1OWs3bDd6VkY2QWxnM204MndZbk5GaE43MkVtSWciLCJ0aWQiOiI2NzJmNzFlMy1lYTc3LTQzZDUtODdlYS0xODFkNWQ5MzI0NDIiLCJ1bmlxdWVfbmFtZSI6InBhdWxAamF4bWluZS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJwYXVsQGpheG1pbmUub25taWNyb3NvZnQuY29tIiwidXRpIjoiRHdPUGZ4SnR2MG1hQm96WEl5Z2JBQSIsInZlciI6IjEuMCJ9.MHSNWVGuBfMYYB-bzw86K2ac63NXFuQv5JwKRWnlpHK5uIx-7jXUUmLRe_QI3tEXV6wtXfJ_AU3hjhD67K4UvPvw5Vv-YveViS-dKSUMcjyE_2vdyALn048lFKDnCHHqyjL1zNTM1TvrYqTglZUzavTT3Y0fR9C165IvVzuX4ncifAMT20C_tKSiqvGy8w6K_nhNqVfqKMrKrkZ80KXd_HZD8aLUC0inuHDzoXMuXj3xQm-k3xj4gHUkDpn5XBDp7DzEYa_VmDi8qzt6Cb9Ma8Az_kSWijjW5NVU-KSUl36N0ZfaNyr-dHUQGNjMJXhPQqekUvIKyxIc3INvEN7yyQ'
            },
            method: "GET",
        }).then(ok => {
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

        const resultStream$ = (query) => Rx.Observable.fromPromise(getResults(query));

        const queryStream$ = this.input
            .debounceTime(650)
            .switchMap(resultStream$);

        queryStream$.subscribe(result => {
            this.setState({ result });
        });
    }

    setSearching = (is) => {
        this.setState({ searching: is });
    }

    updateText = (val) => {
        this.setState({ text: val });
        this.input.next(val);
    }

    render() {

        const heading = this.state.searching ? <h1>Searching {this.state.text}</h1> : <h1>Not searching</h1>;

        return <div className="customer-lookup">

            {heading}

            <input type="text"
                value={this.state.text}
                onChange={(event) => this.updateText(event.target.value)}
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