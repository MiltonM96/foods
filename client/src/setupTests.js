// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from "react";
import "@testing-library/jest-dom/extend-expect";
// import { configure, shallow } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// Importamos variables/componentes
import Form from './components/Form/Form';


// configure({ adapter: new Adapter() });

describe("Form | targets", () => {
    var contact;
    beforeEach(() => {
        contact = shallow(<Form />);
    });

    it("Deberia renderizar un <form>", () => {
        expect(contact.find("form")).toHaveLength(1);
    })
})

