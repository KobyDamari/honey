import React from 'react';
import 'assets/scss/App.scss';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { graph: null };
        this.getGraph = this.getGraph.bind(this);
    }


    componentDidMount() {
        this.getGraph();
    }

    getGraph() {
        fetch('http://127.0.0.1:8082/api/packages/express/latest').then((res) => {
            return res.json();
        }).then((result) => {
            this.setState({ graph: result });
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        const { graph } = this.state;
        return (
            <div className="contacts">
                {graph ? <InteractiveForceGraph
                    simulationOptions={{ height: 500, width: 500 }}
                    labelAttr="label"
                    onSelectNode={(node) => console.log(node)}
                    opacityFactor={1}
                >
                    {graph.nodes.map(node => <ForceGraphNode node={{ id: node.id, label: node.id }} fill="red" />)}
                    {graph.links.map(link => <ForceGraphLink link={{ source: link.source, target: link.target }} />)}
                </InteractiveForceGraph> : 'loading'}
            </div>
        );
    }
}

export default App;
