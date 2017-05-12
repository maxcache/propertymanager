import * as Settings from "./settings/main"
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Settings.Person2) {
    return "Hello mate, " + person.firstName + " " + person.lastName;
}

var user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);