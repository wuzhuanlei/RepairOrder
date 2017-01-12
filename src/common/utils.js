import Immutable from 'immutable';

export function uuid() {
    let i, random;
    let uuid = '';
    for(i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if(i === 8 || i === 12 || i === 16 || i === 20)
            uuid += '-';
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }
    return uuid;
}

export function store(namespace, state) {
    if(state)
        return localStorage.setItem(namespace, JSON.stringify(state.toJS()));

    const store = localStorage.getItem(namespace);
    return store ? Immutable.fromJS(JSON.parse(store)) : Immutable.fromJS({
                route: {
                    routeName: '',
                    routeParameters: ''
                }

            }
        );
}

export default {
    uuid,
    store
}
