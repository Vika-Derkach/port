import UU5 from "uu5g04";
import UuInternationalport from "uu_internationalport_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuInternationalport.Bricks.PiersDetailsItem`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuInternationalport.Bricks.PiersDetailsItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
