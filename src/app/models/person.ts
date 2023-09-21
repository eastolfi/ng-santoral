// import { capitalize } from 'lodash';
const capitalize = (str: string) => {
    if (!str) return null;

    if (str.length === 1) return str.toUpperCase();

    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Getters =
    () =>
    <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                const props = Reflect.ownKeys(this);
                props.forEach((prop: string | symbol) => {
                    if (typeof prop !== 'string') {
                        return;
                    }

                    const capitalizedKey = capitalize(prop);
                    const methodName = `get${capitalizedKey}`;
                    Object.defineProperty(this, methodName, {
                        value: () => (this as any)[prop],
                    });
                });
            }
        };
    };
const Setters =
    () =>
    <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                const props = Reflect.ownKeys(this);
                props.forEach((prop: string | symbol) => {
                    if (typeof prop !== 'string') {
                        return;
                    }

                    const capitalizedKey = capitalize(prop);
                    const methodName = `set${capitalizedKey}`;
                    Object.defineProperty(this, methodName, {
                        value: (newValue: any) => {
                            (this as any)[prop] = newValue;
                        },
                    });
                });
            }
        };
    };

@Getters()
@Setters()
export class Person {
    [x: string]: any;
    nom: string;
    prenom: string;

    constructor(nom: string, prenom: string) {
        this.nom = nom;
        this.prenom = prenom;
    }
}

// function prueba() {
//     const p = new Person('asd', 'dsa');
//     p.get
// }
