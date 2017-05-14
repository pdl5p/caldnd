import * as React from 'react';

export default function({name, children}){
    return (<div className={name}><div className={`${name}-content`}>
        {children}
    </div></div>);
}
