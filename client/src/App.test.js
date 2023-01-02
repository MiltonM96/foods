import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import '@testing-library/jest-dom';
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// Importamos variables/componentes
import Form from './components/Form/Form';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

Enzyme.configure({ adapter: new Adapter() });


describe("Form | targets", () => {
  let contact;
  beforeEach(() => {
      contact = shallow(<Form />);
  });

  it("Deberia renderizar un <form>", () => {
      expect(contact.find("form")).toHaveLength(1);
  })
})