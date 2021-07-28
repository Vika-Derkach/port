import UU5 from "uu5g04";
import UuInternationalport from "uu_internationalport_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuInternationalport.Routes.PierDetails`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuInternationalport.Routes.PierDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
