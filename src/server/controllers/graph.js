const fetch = require('node-fetch');

async function getTree(name, version) {
    let root = {};
    root[name] = version;
    let myPackgesQueue = [root];
    let graph = await createGraph(myPackgesQueue);
    //const nestedGraph = getNestedTree(graph, 0);
    // console.log(nestedGraph);
}

async function createGraph(queue) {
    let visited = [];
    let graph = [];
    let level = 0;
    while (queue.length > 0) {
        let { name, version, dependencies } = await getData(queue[0]);
        let curr = getNodeKey(name, version);
        if (name) {
            if (typeof dependencies !== 'undefined' && Object.keys(dependencies).length) {
                let result = getDepnendciesAsNode(dependencies, visited, curr);
                graph = graph.concat(result);
                level++;
            }
            visited[curr] = version;
            addDependencysToQueue(queue, dependencies, visited);
        }
        queue.shift();
    }
    return graph;
}

function getNestedTree(arr, level) {
    const result = [];
    for (let i in arr) {
        if (arr[i].level === level) {
            let children = getNestedTree(arr, arr[i].id);

            if (children.length) {
                arr[i].children = children
            }
            result.push(arr[i])
        }
    }
    return result
}

function getDepnendciesAsNode(deps, visited, parent) {
    let result = [];
    Object.keys(deps).forEach((packge => {
        let packageKey = getNodeKey(packge, deps[packge]);
        if (!visited[packageKey]) {
            result.push({ name: packageKey, parent: parent })
        }
    }));
    return  result;
}

async function getData(url) {
    let name = Object.keys(url)[0];
    let version = removePrefix(url[name]);
    try {
        const response = await fetch(`https://registry.npmjs.org/${name}/${version}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

function removePrefix(version) {
    let prefixArray = ['~', '^', '<', '>', '='];
    prefixArray.forEach((prefix) => {
        version.replace(prefix, '');
    });
    return version;
}

function addDependencysToQueue(queue, dependecies, visited) {
    for (var packge in dependecies) {
        var node = {};
        node[packge] = dependecies[packge];
        let nodeKey = getNodeKey(packge, node[packge]);
        if (typeof  visited[nodeKey] === 'undefined')
            queue.push(node);
    }
}

function getNodeKey(name, version) {
    return `${name}_v${version}`;
}

function getDependencyArr(deps) {
    if (deps) {
        return Object.entries(deps).reduce((arr, curr) => {
            [depName, depVersion] = curr;
            arr.push(getNodeKey(depName, depVersion));
            return arr;
        }, [])
    }
    return [];
}

module.exports = {
    getTree
};
