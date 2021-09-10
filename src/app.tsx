import * as b from "bobril/index";

interface IHelloData {
    name: string;
}

export class App extends b.Component<IHelloData> {
    render(): b.IBobrilChildren {
        return (
            <>
                <h1>Hello {this.data.name}</h1>
                <p>
                    This is your first <strong>bobril</strong> application.
                </p>
            </>
        );
    }
}